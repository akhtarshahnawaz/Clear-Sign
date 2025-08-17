'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContract } from '@/hooks/use-contract'
import { formatAddress, formatDate } from '@/lib/utils'
import { SubmissionWithReviews } from '@/types'
import { Eye, Clock, RefreshCw, Plus, X } from 'lucide-react'
import { usePublicClient } from 'wagmi'
import { CONTRACT_ADDRESS } from '@/lib/constants'
import { ERC7730_COMMUNITY_REVIEW_ABI } from '@/lib/contract-abi'
import Link from 'next/link'

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

export function MySubmissionsList() {
  return (
    <ClientOnly>
      <MySubmissionsListContent />
    </ClientOnly>
  )
}

// Main content component for user's own submissions
function MySubmissionsListContent() {
  const { address, isConnected } = useAccount()
  const { useGetTotalSubmissions } = useContract()
  const publicClient = usePublicClient()
  
  const [mySubmissions, setMySubmissions] = useState<SubmissionWithReviews[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithReviews | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  
  const { data: totalSubmissions } = useGetTotalSubmissions()

  // Fetch only the current user's submissions
  const fetchMySubmissions = useCallback(async () => {
    if (!totalSubmissions || Number(totalSubmissions) === 0 || !address) {
      setMySubmissions([])
      setIsLoading(false)
      return
    }
    
    setIsLoading(true)
    
    try {
      const submissionsList: SubmissionWithReviews[] = []
      const totalCount = Number(totalSubmissions)
      
      console.log(`Fetching ${totalCount} submissions to find user's submissions...`)
      
      // Fetch each submission and filter for current user
      for (let i = 1; i <= totalCount; i++) {
        try {
          const submission = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: ERC7730_COMMUNITY_REVIEW_ABI,
            functionName: 'getSubmission',
            args: [BigInt(i)],
          })
          
          const reviews = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: ERC7730_COMMUNITY_REVIEW_ABI,
            functionName: 'getSubmissionReviews',
            args: [BigInt(i)],
          })
          
          const reliabilityScore = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: ERC7730_COMMUNITY_REVIEW_ABI,
            functionName: 'getReliabilityScore',
            args: [BigInt(i)],
          })
          
          if (submission && submission.submitter.toLowerCase() === address.toLowerCase()) {
            const submissionData: SubmissionWithReviews = {
              id: i,
              submitter: submission.submitter as `0x${string}`,
              contractId: submission.contractId as `0x${string}`,
              walrusBlobId: submission.walrusBlobId,
              hypergraphId: submission.hypergraphId,
              submissionTime: Number(submission.submissionTime) * 1000,
              isActive: submission.isActive,
              totalReviews: Number(submission.totalReviews || 0),
              positiveReviews: Number(submission.positiveReviews || 0),
              negativeReviews: Number(submission.negativeReviews || 0),
              reliabilityScore: Number(reliabilityScore || 0),
              reviews: (reviews?.[0] || []).map((reviewId: bigint) => ({
                reviewer: '0x0000000000000000000000000000000000000000' as `0x${string}`,
                isApproved: false,
                comment: 'Review data not loaded',
                reviewTime: Date.now()
              }))
            }
            
            submissionsList.push(submissionData)
            console.log(`Found user submission ${i}:`, submissionData)
          }
        } catch (error) {
          console.error(`Error loading submission ${i}:`, error)
        }
      }
      
      console.log(`Found ${submissionsList.length} user submissions:`, submissionsList)
      setMySubmissions(submissionsList)
    } catch (error) {
      console.error('Error loading user submissions:', error)
      setMySubmissions([])
    } finally {
      setIsLoading(false)
    }
  }, [totalSubmissions, publicClient, address])

  // Fetch submissions when totalSubmissions or address changes
  useEffect(() => {
    if (totalSubmissions && publicClient && address && isConnected) {
      fetchMySubmissions()
    }
  }, [totalSubmissions, publicClient, address, isConnected, fetchMySubmissions])

  const handleViewSubmission = (submission: SubmissionWithReviews) => {
    setSelectedSubmission(submission)
    setShowModal(true)
  }

  const handleCloseSubmission = () => {
    setSelectedSubmission(null)
    setShowModal(false)
  }

  const handleRefreshData = () => {
    fetchMySubmissions()
  }

  // Show loading state
  if (isLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>My Submissions</CardTitle>
          <CardDescription>Loading your submissions from blockchain...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 animate-spin" />
            <span>Fetching your submissions...</span>
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
            Please connect your wallet to view your submissions.
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
              <CardTitle>My Submissions</CardTitle>
              <CardDescription>
                {mySubmissions.length > 0 ? `You have ${mySubmissions.length} submission(s)` : 'No submissions found'}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleRefreshData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Link href="/">
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Submission
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {mySubmissions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p className="mb-4">You haven't submitted any metadata yet.</p>
              <Link href="/">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your First Metadata
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mySubmissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Contract: {submission.contractId}</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted by: {submission.submitter}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Walrus Blob ID: {submission.walrusBlobId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Hypergraph ID: {submission.hypergraphId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(submission.submissionTime).toLocaleDateString()}
                      </p>
                      
                      {/* Review Statistics with Colors */}
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Reviews:</span>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {submission.totalReviews}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Positive:</span>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {submission.positiveReviews}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Negative:</span>
                          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                            {submission.negativeReviews}
                          </span>
                        </div>
                      </div>
                      
                      {/* Reliability Score Bar */}
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Reliability Score:</span>
                          <span className="text-sm font-bold">
                            {submission.reliabilityScore.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              submission.reliabilityScore >= 80 ? 'bg-green-500' :
                              submission.reliabilityScore >= 60 ? 'bg-yellow-500' :
                              submission.reliabilityScore >= 40 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${submission.reliabilityScore}%` }}
                          ></div>
                        </div>
                      </div>
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

      {/* Submission Details Modal */}
      {showModal && selectedSubmission && (
        <SubmissionDetailsModal
          submission={selectedSubmission}
          onClose={handleCloseSubmission}
        />
      )}
    </>
  )
}

// Submission Details Modal (Read-only for user's own submissions)
interface SubmissionDetailsModalProps {
  submission: SubmissionWithReviews
  onClose: () => void
}

function SubmissionDetailsModal({ submission, onClose }: SubmissionDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Submission Details</CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            View the details of your metadata submission.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Submission Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Contract Address</h4>
              <p className="text-sm text-muted-foreground break-all">
                {submission.contractId}
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

          {/* Status */}
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Status</h4>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${submission.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                {submission.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {submission.isActive 
                ? 'Your submission is active and can be reviewed by the community.'
                : 'Your submission is currently inactive and cannot be reviewed.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
