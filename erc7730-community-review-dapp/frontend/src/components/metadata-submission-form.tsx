'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useContract } from '@/hooks/use-contract'
import { WALRUS_PUBLISHER_BASE_URL } from '@/lib/constants'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function MetadataSubmissionForm() {
  const { address, isConnected } = useAccount()
  const { useSubmitMetadata, useTestContractAccess } = useContract()
  
  // Test contract access
  const { data: totalSubmissions, error: contractError } = useTestContractAccess()
  
  const [jsonInput, setJsonInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState<string>('')
  const [extractedData, setExtractedData] = useState<{
    contractAddress: string
    walrusBlobId: string
    hypergraphId: string
  } | null>(null)
  const [showSubmitPrompt, setShowSubmitPrompt] = useState(false)
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { submit, isLoading, isSuccess, error, hash } = useSubmitMetadata(
    extractedData?.contractAddress as `0x${string}`,
    extractedData?.walrusBlobId || '',
    extractedData?.hypergraphId || ''
  )

  const validateJsonInput = () => {
    const newErrors: Record<string, string> = {}
    
    if (!jsonInput.trim()) {
      newErrors.jsonInput = 'JSON input is required'
    } else {
      try {
        JSON.parse(jsonInput)
      } catch (err) {
        newErrors.jsonInput = 'Invalid JSON format'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const processJsonAndPublish = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    
    if (!validateJsonInput()) {
      return
    }
    
    setIsProcessing(true)
    setErrors({})
    
    try {
      // Step 1: Parse JSON and extract contract address
      setProcessingStep('Parsing JSON and extracting contract address...')
      const jsonData = JSON.parse(jsonInput)
      
      // Extract contract address from deployments
      const contractAddress = jsonData?.context?.contract?.deployments?.[0]?.address
      if (!contractAddress) {
        throw new Error('No contract address found in JSON deployments')
      }
      
      if (!contractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        throw new Error('Invalid contract address format in JSON')
      }
      
      // Step 2: Publish to Walrus
      setProcessingStep('Publishing JSON to Walrus network...')
      const walrusResponse = await fetch(`${WALRUS_PUBLISHER_BASE_URL}/v1/blobs`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput
      })
      
      if (!walrusResponse.ok) {
        throw new Error(`Failed to publish to Walrus: ${walrusResponse.status}`)
      }
      
      const walrusData = await walrusResponse.json()
      const blobId = walrusData?.newlyCreated?.blobObject?.blobId || walrusData?.alreadyCertified?.blobId
      
      if (!blobId) {
        throw new Error('Failed to get blob ID from Walrus response')
      }
      
      // Step 3: Set extracted data
      setProcessingStep('Preparing submission data...')
      const extracted = {
        contractAddress,
        walrusBlobId: blobId,
        hypergraphId: blobId // Using same blob ID for hypergraph as requested
      }
      
      setExtractedData(extracted)
      setShowSubmitPrompt(true)
      
      console.log('Successfully processed JSON:', extracted)
      
    } catch (err: any) {
      console.error('Processing error:', err)
      setErrors({ jsonInput: err.message || 'Failed to process JSON' })
    } finally {
      setIsProcessing(false)
      setProcessingStep('')
    }
  }

  const handleSubmitForReview = async () => {
    if (!extractedData) return
    
    try {
      await submit?.()
    } catch (err) {
      console.error('Submission error:', err)
    }
  }

  const handleInputChange = (value: string) => {
    setJsonInput(value)
    if (errors.jsonInput) {
      setErrors(prev => ({ ...prev, jsonInput: '' }))
    }
  }

  const resetForm = () => {
    setJsonInput('')
    setExtractedData(null)
    setShowSubmitPrompt(false)
    setErrors({})
  }

  if (!isConnected) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>
            Please connect your wallet to submit metadata for review.
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

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Metadata for Review</CardTitle>
        <CardDescription>
          Paste your ERC7730 metadata JSON and we'll automatically extract the contract address and publish to Walrus for community review.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isSuccess ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Metadata submitted successfully!</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Transaction hash: {hash}
            </div>
            <Button onClick={resetForm} variant="outline">
              Submit Another
            </Button>
          </div>
        ) : showSubmitPrompt ? (
          <div className="space-y-6">
            {/* Show extracted data for confirmation */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Extracted Data</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Contract Address</label>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                    {extractedData?.contractAddress}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Walrus Blob ID</label>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                    {extractedData?.walrusBlobId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Hypergraph ID</label>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                    {extractedData?.walrusBlobId}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Ready to submit this metadata for community review?
              </p>
              <div className="flex space-x-3 justify-center">
                <Button onClick={() => setShowSubmitPrompt(false)} variant="outline">
                  Edit JSON
                </Button>
                <Button onClick={handleSubmitForReview} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit for Review'
                  )}
                </Button>
              </div>
            </div>

            {(error || contractError) && (
              <div className="flex items-center space-x-2 text-destructive bg-red-50 p-3 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">
                  {error?.message || contractError?.message || 'Unknown error occurred'}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="jsonInput" className="text-sm font-medium">
                ERC7730 Metadata JSON *
              </label>
              <Textarea
                id="jsonInput"
                placeholder="Paste your ERC7730 metadata JSON here..."
                value={jsonInput}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`font-mono text-sm h-64 ${
                  errors.jsonInput ? 'border-destructive' : ''
                }`}
              />
              {errors.jsonInput && (
                <p className="text-sm text-destructive">{errors.jsonInput}</p>
              )}
              <p className="text-xs text-muted-foreground">
                The JSON should contain contract deployment information and metadata. 
                We'll automatically extract the contract address and publish to Walrus.
              </p>
            </div>

            {/* Processing Progress */}
            {isProcessing && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">{processingStep}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            )}

            <Button
              onClick={processJsonAndPublish}
              disabled={isProcessing || !jsonInput.trim()}
              variant="outline"
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Process JSON & Publish to Walrus'
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
