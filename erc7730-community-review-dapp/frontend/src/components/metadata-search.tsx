'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContract } from '@/hooks/use-contract'
import { formatAddress, formatDate, calculateReliabilityScore } from '@/lib/utils'
import { ContractMetadata } from '@/types'
import { Search, FileText, Database, Calendar, ThumbsUp, ThumbsDown, CheckCircle, XCircle } from 'lucide-react'

export function MetadataSearch() {
  const { useGetSubmissionByContract, useGetSubmission, useGetReliabilityScore } = useContract()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<ContractMetadata | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { refetch: refetchSubmission } = useGetSubmissionByContract(searchQuery)
  const { data: submissionId } = useGetSubmissionByContract(searchQuery)
  const { data: submission } = useGetSubmission(submissionId || 0)
  const { data: reliabilityScore } = useGetReliabilityScore(submissionId || 0)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a contract ID to search')
      return
    }
    
    setIsSearching(true)
    setError(null)
    setSearchResult(null)
    
    try {
      // Trigger the contract read
      const result = await refetchSubmission()
      
      if (result.data && result.data > 0) {
        // Wait a bit for the data to be fetched
        setTimeout(() => {
          if (submission && submission.submitter) {
            const metadata: ContractMetadata = {
              contractId: submission.contractId,
              walrusBlobId: submission.walrusBlobId,
              hypergraphId: submission.hypergraphId,
              reliabilityScore: reliabilityScore || 0,
              totalReviews: submission.totalReviews,
              positiveReviews: submission.positiveReviews,
              negativeReviews: submission.negativeReviews,
              submissionTime: submission.submissionTime
            }
            setSearchResult(metadata)
          }
        }, 500)
      } else {
        setError('No metadata found for this contract ID')
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
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Search Metadata by Contract ID</CardTitle>
          <CardDescription>
            Enter a contract ID to find its associated metadata and review information.
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
                  {searchResult.contractId}
                </p>
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
            </div>

            {/* Metadata IDs */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Walrus Blob ID
                </h4>
                <p className="text-sm text-muted-foreground break-all font-mono bg-muted p-3 rounded">
                  {searchResult.walrusBlobId}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This ID references the metadata JSON file stored in Walrus.
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
                    {searchResult.reliabilityScore}%
                  </div>
                  <div className="text-sm text-gray-700">Reliability Score</div>
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
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6 flex justify-center space-x-4">
              <Button onClick={clearSearch} variant="outline">
                New Search
              </Button>
              <Button 
                onClick={() => window.open(`https://walrus.app/blob/${searchResult.walrusBlobId}`, '_blank')}
                variant="outline"
              >
                View in Walrus
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
