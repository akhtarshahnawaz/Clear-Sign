'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useContract } from '@/hooks/use-contract'
import { MIN_CONTRACT_ID_LENGTH, MIN_BLOB_ID_LENGTH, MIN_HYPERGRAPH_ID_LENGTH, CONTRACT_ADDRESS } from '@/lib/constants'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export function MetadataSubmissionForm() {
  const { address, isConnected } = useAccount()
  const { useSubmitMetadata, useTestContractAccess } = useContract()
  
  // Test contract access
  const { data: totalSubmissions, error: contractError } = useTestContractAccess()
  
  const [formData, setFormData] = useState({
    contractId: '',
    walrusBlobId: '',
    hypergraphId: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { submit, isLoading, isSuccess, error, hash } = useSubmitMetadata(
    formData.contractId,
    formData.walrusBlobId,
    formData.hypergraphId
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.contractId) {
      newErrors.contractId = 'Contract ID is required'
    } else if (formData.contractId.length < MIN_CONTRACT_ID_LENGTH) {
      newErrors.contractId = `Contract ID must be at least ${MIN_CONTRACT_ID_LENGTH} characters`
    }
    
    if (!formData.walrusBlobId) {
      newErrors.walrusBlobId = 'Walrus Blob ID is required'
    } else if (formData.walrusBlobId.length < MIN_BLOB_ID_LENGTH) {
      newErrors.walrusBlobId = `Walrus Blob ID must be at least ${MIN_BLOB_ID_LENGTH} characters`
    }
    
    if (!formData.hypergraphId) {
      newErrors.hypergraphId = 'Hypergraph ID is required'
    } else if (formData.hypergraphId.length < MIN_HYPERGRAPH_ID_LENGTH) {
      newErrors.hypergraphId = `Hypergraph ID must be at least ${MIN_HYPERGRAPH_ID_LENGTH} characters`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    // Debug logging
    console.log('Submitting metadata with:', {
      contractId: formData.contractId,
      walrusBlobId: formData.walrusBlobId,
      hypergraphId: formData.hypergraphId,
      address: address
    })
    
    try {
      await submit?.()
    } catch (err) {
      console.error('Submission error:', err)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const resetForm = () => {
    setFormData({
      contractId: '',
      walrusBlobId: '',
      hypergraphId: ''
    })
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
          Submit your ERC7730 metadata for community review. All fields are required.
        </CardDescription>
        
        {/* Contract status debugging */}
        <div className="text-sm text-muted-foreground">
          Contract Address: {CONTRACT_ADDRESS}
          {contractError && (
            <div className="text-red-500 mt-2">
              Contract Error: {contractError.message}
            </div>
          )}
          {totalSubmissions !== undefined && (
            <div className="text-green-500 mt-2">
              Total Submissions: {totalSubmissions.toString()}
            </div>
          )}
        </div>
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
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="contractId" className="text-sm font-medium">
                Contract ID *
              </label>
              <Input
                id="contractId"
                type="text"
                placeholder="0x1234567890123456789012345678901234567890"
                value={formData.contractId}
                onChange={(e) => handleInputChange('contractId', e.target.value)}
                className={errors.contractId ? 'border-destructive' : ''}
              />
              {errors.contractId && (
                <p className="text-sm text-destructive">{errors.contractId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="walrusBlobId" className="text-sm font-medium">
                Walrus Blob ID *
              </label>
              <Input
                id="walrusBlobId"
                type="text"
                placeholder="vtrj4hZwDbqha2sCDBtJryloe8AqCD-Rq_C_TyNXBE4"
                value={formData.walrusBlobId}
                onChange={(e) => handleInputChange('walrusBlobId', e.target.value)}
                className={errors.walrusBlobId ? 'border-destructive' : ''}
              />
              {errors.walrusBlobId && (
                <p className="text-sm text-destructive">{errors.walrusBlobId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="hypergraphId" className="text-sm font-medium">
                Hypergraph ID *
              </label>
              <Input
                id="hypergraphId"
                type="text"
                placeholder="QmHash123456789012345678901234567890123456789"
                value={formData.hypergraphId}
                onChange={(e) => handleInputChange('hypergraphId', e.target.value)}
                className={errors.hypergraphId ? 'border-destructive' : ''}
              />
              {errors.hypergraphId && (
                <p className="text-sm text-destructive">{errors.hypergraphId}</p>
              )}
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Error: {error.message}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for Review'
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
