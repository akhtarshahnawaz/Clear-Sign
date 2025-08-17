'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContract } from '@/hooks/use-contract'
import { formatAddress, formatDate } from '@/lib/utils'
import { SubmissionWithReviews } from '@/types'
import { Eye, Clock, X, RefreshCw } from 'lucide-react'
import { usePublicClient } from 'wagmi'
import { CONTRACT_ADDRESS } from '@/lib/constants'
import { ERC7730COMMUNITYREVIEW_ABI } from '@/lib/contract-abi'

// Client-only wrapper to prevent hydration errors
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 animate-spin" />
            <span>Loading...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}

export function SubmissionsList() {
  return (
    <ClientOnly>
      <SubmissionsListContent />
    </ClientOnly>
  )
}

// Main content component with full blockchain functionality
function SubmissionsListContent() {
  const { address, isConnected } = useAccount()
  const { useGetTotalSubmissions } = useContract()
  const publicClient = usePublicClient()
  
  const [submissions, setSubmissions] = useState<SubmissionWithReviews[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithReviews | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  
  const { data: totalSubmissions } = useGetTotalSubmissions()

  // Fetch real blockchain data
  const fetchAllSubmissions = useCallback(async () => {
    if (!totalSubmissions || Number(totalSubmissions) === 0) {
      setSubmissions([])
      setIsLoading(false)
      return
    }
    
    setIsLoading(true)
    
    try {
      const submissionsList: SubmissionWithReviews[] = []
      const totalCount = Number(totalSubmissions)
      
      console.log(`Fetching ${totalCount} submissions from blockchain...`)
      
      // Fetch each submission from the blockchain
      for (let i = 1; i <= totalCount; i++) {
        try {
          // Fetch real data from the blockchain using publicClient
          const submission = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: ERC7730COMMUNITYREVIEW_ABI,
            functionName: 'getSubmission',
            args: [BigInt(i)],
          })
          
          const reviews = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: ERC7730COMMUNITYREVIEW_ABI,
            functionName: 'getSubmissionReviews',
            args: [BigInt(i)],
          })
          
          const reliabilityScore = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: ERC7730COMMUNITYREVIEW_ABI,
            functionName: 'getReliabilityScore',
            args: [BigInt(i)],
          })
          
          if (submission) {
            const submissionData: SubmissionWithReviews = {
              id: i,
              submitter: submission.submitter as `0x${string}`,
              contractAddress: submission.contractAddress as `0x${string}`,
              walrusBlobId: submission.walrusBlobId,
              hypergraphId: submission.hypergraphId,
              submissionTime: Number(submission.submissionTime) * 1000, // Convert to milliseconds
              isActive: submission.isActive,
              totalReviews: Number(submission.totalReviews || 0),
              positiveReviews: Number(submission.positiveReviews || 0),
              negativeReviews: Number(submission.negativeReviews || 0),
              reliabilityScore: Number(reliabilityScore || 0),
              reviews: (reviews?.[0] || []).map((reviewId: bigint) => ({
                reviewer: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Placeholder, need to fetch actual review data
                isApproved: false, // Placeholder, need to fetch actual review data
                comment: 'Review data not loaded', // Placeholder, need to fetch actual review data
                reviewTime: Date.now() // Placeholder, need to fetch actual review data
              }))
            }
            
            submissionsList.push(submissionData)
            console.log(`Loaded submission ${i}:`, submissionData)
          }
        } catch (error) {
          console.error(`Error loading submission ${i}:`, error)
          // Add a placeholder for failed submissions
          submissionsList.push({
            id: i,
            submitter: '0x0000000000000000000000000000000000000000' as `0x${string}`,
            contractAddress: '0x0000000000000000000000000000000000000000' as `0x${string}`,
            walrusBlobId: 'Failed to fetch',
            hypergraphId: 'Failed to fetch',
            submissionTime: Date.now(),
            isActive: false,
            totalReviews: 0,
            positiveReviews: 0,
            negativeReviews: 0,
            reliabilityScore: 0,
            reviews: []
          })
        }
      }
      
      console.log(`Loaded ${submissionsList.length} submissions:`, submissionsList)
      setSubmissions(submissionsList)
    } catch (error) {
      console.error('Error loading submissions:', error)
      setSubmissions([])
    } finally {
      setIsLoading(false)
    }
  }, [totalSubmissions, publicClient])

  // Fetch submissions when totalSubmissions changes
  useEffect(() => {
    if (totalSubmissions && publicClient) {
      fetchAllSubmissions()
    }
  }, [totalSubmissions, publicClient, fetchAllSubmissions])

  const handleViewSubmission = (submission: SubmissionWithReviews) => {
    setSelectedSubmission(submission)
    setShowModal(true)
  }

  const handleCloseSubmission = () => {
    setSelectedSubmission(null)
    setShowModal(false)
  }

  const handleRefreshData = () => {
    fetchAllSubmissions()
  }

  // Show loading state
  if (isLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Metadata Submissions for Review</CardTitle>
          <CardDescription>Loading submissions from blockchain...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 animate-spin" />
            <span>Fetching blockchain data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show connect wallet message
  if (!isConnected) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>
            Please connect your wallet to view and review submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Use the connect button in the header to connect your MetaMask wallet.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Show submissions list
  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Metadata Submissions for Review</CardTitle>
              <CardDescription>
                {totalSubmissions ? `Total submissions: ${totalSubmissions}` : 'Loading...'}
              </CardDescription>
            </div>
            <Button onClick={handleRefreshData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No submissions found.
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-500 pl-3">
                        <h3 className="font-semibold text-lg">Contract Address</h3>
                        <p className="text-sm font-mono text-gray-700 break-all">
                          {formatAddress(submission.contractAddress)}
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-3">
                        <h4 className="font-medium text-gray-800">Submitted by</h4>
                        <p className="text-sm font-mono text-gray-700">
                          {formatAddress(submission.submitter)}
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-3">
                        <h4 className="font-medium text-gray-800">Walrus Blob ID</h4>
                        <p className="text-sm font-mono text-gray-700 break-all">
                          {submission.walrusBlobId}
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-orange-500 pl-3">
                        <h4 className="font-medium text-gray-800">Hypergraph ID</h4>
                        <p className="text-sm font-mono text-gray-700 break-all">
                          {submission.hypergraphId}
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-indigo-500 pl-3">
                        <h4 className="font-medium text-gray-800">Submitted</h4>
                        <p className="text-sm text-gray-700">
                          {formatDate(submission.submissionTime)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Reviews: {submission.totalReviews} (Positive: {submission.positiveReviews}, Negative: {submission.negativeReviews})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Reliability Score: {submission.reliabilityScore.toFixed(2)}%
                      </p>
                      {!submission.isActive && (
                        <p className="text-sm text-red-600 font-medium">
                          ⚠️ Submission inactive
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleViewSubmission(submission)}
                      variant="outline"
                      size="sm"
                      disabled={!submission.isActive}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Modal */}
      {showModal && selectedSubmission && (
        <ReviewModal
          submission={selectedSubmission}
          onClose={handleCloseSubmission}
          currentAddress={address}
          onReviewSubmitted={handleRefreshData}
        />
      )}
    </>
  )
}

// Review Modal Component
interface ReviewModalProps {
  submission: SubmissionWithReviews
  onClose: () => void
  currentAddress: string | undefined
  onReviewSubmitted: () => void
}

function ReviewModal({ submission, onClose, currentAddress, onReviewSubmitted }: ReviewModalProps) {
  const [isApproved, setIsApproved] = useState<boolean | null>(null)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { useSubmitReview } = useContract()
  const { submit: submitReview, isLoading, isSuccess, error: contractError } = useSubmitReview(
    submission.id,
    isApproved || false,
    comment
  )

  const handleSubmitReview = async () => {
    if (isApproved === null || !comment.trim()) {
      setError('Please select approval status and provide a comment')
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      await submitReview?.()
      if (isSuccess) {
        onClose()
        onReviewSubmitted() // Refresh the data
        alert('Review submitted successfully!')
      }
    } catch (err: any) {
      console.error('Review submission error:', err)
      
      // Handle specific contract errors
      if (err.message?.includes('Already reviewed this submission')) {
        setError('You have already reviewed this submission')
      } else if (err.message?.includes('Cannot review your own submission')) {
        setError('You cannot review your own submission')
      } else if (err.message?.includes('Submission is not active')) {
        setError('This submission is not active and cannot be reviewed')
      } else {
        setError(`Error submitting review: ${err.message || 'Unknown error'}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if current user can review this submission
  const canReview = currentAddress && 
    currentAddress.toLowerCase() !== submission.submitter.toLowerCase() && 
    submission.isActive

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Submission Details & Review</CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Review this metadata submission and provide your feedback.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Submission Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Contract ID</h4>
              <p className="text-sm text-muted-foreground break-all">
                {submission.contractAddress}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Submitter</h4>
              <p className="text-sm text-muted-foreground">
                {formatAddress(submission.submitter)}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Walrus Blob ID</h4>
              <p className="text-sm text-muted-foreground break-all">
                {submission.walrusBlobId}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Hypergraph ID</h4>
              <p className="text-sm text-muted-foreground break-all">
                {submission.hypergraphId}
              </p>
            </div>
          </div>

          {/* Review Stats */}
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Review Statistics</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {submission.positiveReviews}
                </div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {submission.negativeReviews}
                </div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {submission.reliabilityScore}%
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          {canReview ? (
            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Submit Your Review</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Approval Status
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="approval"
                        value="approve"
                        checked={isApproved === true}
                        onChange={() => setIsApproved(true)}
                        className="text-primary"
                      />
                      <span>Approve</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="approval"
                        value="reject"
                        checked={isApproved === false}
                        onChange={() => setIsApproved(false)}
                        className="text-primary"
                      />
                      <span>Reject</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide your reasoning for this review..."
                    className="w-full p-3 border rounded-md"
                    rows={3}
                  />
                </div>
                
                {(error || contractError) && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                    {error || contractError?.message || 'Unknown error occurred'}
                  </div>
                )}
                
                <Button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || isLoading}
                  className="w-full"
                >
                  {isSubmitting || isLoading ? 'Submitting Review...' : 'Submit Review'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-t pt-6">
              <div className="text-center text-muted-foreground py-4">
                {currentAddress?.toLowerCase() === submission.submitter.toLowerCase() 
                  ? "You cannot review your own submission."
                  : !submission.isActive
                  ? "This submission is not active and cannot be reviewed."
                  : "This submission is not available for review."
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
