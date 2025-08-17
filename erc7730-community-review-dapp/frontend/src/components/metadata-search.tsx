'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContract } from '@/hooks/use-contract'
import { formatAddress, formatDate, calculateReliabilityScore } from '@/lib/utils'
import { CONTRACT_ADDRESS } from '@/lib/constants'
import { ContractMetadata } from '@/types'
import { Search, FileText, Database, Calendar, ThumbsUp, ThumbsDown, CheckCircle, XCircle, Eye } from 'lucide-react'
import { WalrusContentModal } from './walrus-content-modal'
import { usePublicClient } from 'wagmi'

export function MetadataSearch() {
  const { useGetSubmissionByContract, useGetSubmission, useGetReliabilityScore } = useContract()
  const publicClient = usePublicClient()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<ContractMetadata | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walrusModalOpen, setWalrusModalOpen] = useState(false)
  const [selectedBlobId, setSelectedBlobId] = useState<string>('')
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  
  const { refetch: refetchSubmission } = useGetSubmissionByContract(searchQuery as `0x${string}`)
  const { data: submissionId } = useGetSubmissionByContract(searchQuery as `0x${string}`)
  const { data: submission } = useGetSubmission(Number(submissionId || 0))
  const { data: reliabilityScore } = useGetReliabilityScore(Number(submissionId || 0))

  const fetchReviews = async (submissionId: number) => {
    if (!submissionId || !publicClient) return
    
    setIsLoadingReviews(true)
    try {
      const reviewsData = await publicClient.readContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: await import('@/lib/contract-abi').then(m => m.ERC7730COMMUNITYREVIEW_ABI),
        functionName: 'getSubmissionReviews',
        args: [BigInt(submissionId)],
      })
      
      if (reviewsData && reviewsData[0]) {
        const reviewIds = reviewsData[0] as bigint[]
        const reviewPromises = reviewIds.map(async (reviewId) => {
          try {
            const review = await publicClient.readContract({
              address: CONTRACT_ADDRESS as `0x${string}`,
              abi: await import('@/lib/contract-abi').then(m => m.ERC7730COMMUNITYREVIEW_ABI),
              functionName: 'reviews',
              args: [BigInt(submissionId), reviewId],
            })
            return {
              id: Number(reviewId),
              reviewer: review[0],
              isApproved: review[1],
              comment: review[2],
              reviewTime: Number(review[3])
            }
          } catch (err) {
            console.error('Error fetching review:', err)
            return null
          }
        })
        
        const reviewResults = await Promise.all(reviewPromises)
        setReviews(reviewResults.filter(Boolean))
      } else {
        setReviews([])
      }
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setReviews([])
    } finally {
      setIsLoadingReviews(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a contract address to search')
      return
    }
    
    setIsSearching(true)
    setError(null)
    setSearchResult(null)
    setReviews([])
    
    try {
      // Trigger the contract read
      const result = await refetchSubmission()
      
      if (result.data && result.data > 0) {
        // Wait a bit for the data to be fetched
        setTimeout(async () => {
          if (submission && submission.submitter) {
            const metadata: ContractMetadata = {
              contractAddress: submission.contractAddress as `0x${string}`,
              submitter: submission.submitter as `0x${string}`,
              walrusBlobId: submission.walrusBlobId,
              hypergraphId: submission.hypergraphId,
              reliabilityScore: Number(reliabilityScore || 0),
              totalReviews: Number(submission.totalReviews || 0),
              positiveReviews: Number(submission.positiveReviews || 0),
              negativeReviews: Number(submission.negativeReviews || 0),
              submissionTime: Number(submission.submissionTime || 0)
            }
            setSearchResult(metadata)
            
            // Fetch reviews for this submission
            await fetchReviews(Number(submissionId))
          }
        }, 500)
      } else {
        setError('No metadata found for this contract address')
      }
    } catch (err) {
      setError('Error searching for metadata')
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResult(null)
    setError(null)
    setReviews([])
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Search Metadata by Contract Address</CardTitle>
          <CardDescription>
            Enter a contract address to find its associated metadata and review information.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="0x1234567890123456789012345678901234567890"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? (
                <>
                  <Search className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResult && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Metadata Found</CardTitle>
            <CardDescription>
              Contract metadata and community review information.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Contract Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Contract ID
                </h4>
                <p className="text-sm text-muted-foreground break-all font-mono">
                  {searchResult.contractAddress}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Submitted By
                </h4>
                <p className="text-sm text-muted-foreground break-all font-mono">
                  {searchResult.submitter}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Submission Date
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatDate(searchResult.submissionTime)}
              </p>
            </div>

            {/* Metadata IDs */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Walrus Blob ID
                </h4>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground break-all font-mono bg-muted p-3 rounded flex-1">
                    {searchResult.walrusBlobId}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBlobId(searchResult.walrusBlobId)
                      setWalrusModalOpen(true)
                    }}
                    className="p-2 h-10 w-10 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    title="View Walrus content"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This ID references the metadata JSON file stored in Walrus. Click the eye icon to view the content.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Database className="mr-2 h-4 w-4" />
                  Hypergraph ID
                </h4>
                <p className="text-sm text-muted-foreground break-all font-mono bg-muted p-3 rounded">
                  {searchResult.hypergraphId}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This ID references the metadata knowledge graph in Hypergraph.
                </p>
              </div>
            </div>

            {/* Review Statistics */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Community Review Results</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {searchResult.positiveReviews}
                  </div>
                  <div className="text-sm text-green-700">Approved</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {searchResult.negativeReviews}
                  </div>
                  <div className="text-sm text-red-700">Rejected</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {searchResult.totalReviews}
                  </div>
                  <div className="text-sm text-blue-700">Total Reviews</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {searchResult.reliabilityScore.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-700">Reliability Score</div>
                </div>
              </div>
              
              {/* Additional Review Statistics with Colors */}
              <div className="mt-6 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Total Reviews:</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {searchResult.totalReviews}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Positive:</span>
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {searchResult.positiveReviews}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Negative:</span>
                  <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    {searchResult.negativeReviews}
                  </span>
                </div>
              </div>
              
              {/* Reliability Score Indicator */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 p-3 rounded-lg bg-muted">
                  {searchResult.reliabilityScore >= 70 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : searchResult.reliabilityScore >= 40 ? (
                    <div className="h-5 w-5 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className="font-medium">
                    {searchResult.reliabilityScore >= 70 ? 'High Reliability' :
                     searchResult.reliabilityScore >= 40 ? 'Medium Reliability' :
                     'Low Reliability'}
                  </span>
                </div>
              </div>
              
              {/* Reliability Score Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-sm font-medium">Reliability Score:</span>
                  <span className="text-sm font-bold">
                    {searchResult.reliabilityScore.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      searchResult.reliabilityScore >= 80 ? 'bg-green-500' :
                      searchResult.reliabilityScore >= 60 ? 'bg-yellow-500' :
                      searchResult.reliabilityScore >= 40 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${searchResult.reliabilityScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Review Comments Section */}
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Review Comments</h4>
              
              {isLoadingReviews ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-muted-foreground">Loading reviews...</span>
                  </div>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={review.id || index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {formatAddress(review.reviewer)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            review.isApproved 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {review.isApproved ? 'Approved' : 'Rejected'}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.reviewTime * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No reviews submitted yet for this metadata.</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6 flex justify-center space-x-4">
              <Button onClick={clearSearch} variant="outline">
                New Search
              </Button>
              <Button 
                onClick={() => {
                  setSelectedBlobId(searchResult.walrusBlobId)
                  setWalrusModalOpen(true)
                }}
                variant="outline"
              >
                View in Walrus
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Walrus Content Modal */}
      <WalrusContentModal
        isOpen={walrusModalOpen}
        onClose={() => setWalrusModalOpen(false)}
        blobId={selectedBlobId}
        title="View Walrus Content"
      />
    </div>
  )
}
