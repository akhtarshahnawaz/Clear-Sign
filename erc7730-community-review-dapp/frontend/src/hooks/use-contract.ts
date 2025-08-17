'use client'

import { useState, useEffect } from 'react'
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction, usePublicClient } from 'wagmi'
import { ERC7730COMMUNITYREVIEW_ABI } from '@/lib/contract-abi'
import { CONTRACT_ADDRESS } from '@/lib/constants'

export function useContract() {
  // Contract address - this should be set based on your deployment
  const contractAddress = CONTRACT_ADDRESS as `0x${string}`
  const publicClient = usePublicClient()

  // Test function to check if contract is accessible
  const useTestContractAccess = () => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'getTotalSubmissions',
      enabled: !!contractAddress,
    })
  }

  // Hook to get all submissions
  const useGetAllSubmissions = () => {
    const { data: totalSubmissions } = useGetTotalSubmissions()
    
    const [submissions, setSubmissions] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
      if (!totalSubmissions || totalSubmissions === BigInt(0)) {
        setSubmissions([])
        return
      }
      
      const fetchSubmissions = async () => {
        setIsLoading(true)
        try {
          // This is a simplified approach - in production you'd want to batch calls
          const submissionPromises = []
          for (let i = 1; i <= Number(totalSubmissions); i++) {
            submissionPromises.push(
              publicClient.readContract({
                address: contractAddress,
                abi: ERC7730COMMUNITYREVIEW_ABI,
                functionName: 'getSubmission',
                args: [BigInt(i)],
              })
            )
          }
          
          const results = await Promise.all(submissionPromises)
          setSubmissions(results.filter(Boolean))
        } catch (error) {
          console.error('Error fetching submissions:', error)
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchSubmissions()
    }, [totalSubmissions, publicClient, contractAddress])
    
    return { submissions, isLoading }
  }

  // Read functions
  const useGetSubmission = (submissionId: number) => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'getSubmission',
      args: [BigInt(submissionId)],
      enabled: !!submissionId && submissionId > 0,
    })
  }

  const useGetSubmissionByContract = (submissionContractAddress: `0x${string}`) => {
    return useContractRead({
      address: contractAddress, // Use the global contract address
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'getSubmissionByContract',
      args: [submissionContractAddress],
      enabled: !!submissionContractAddress,
    })
  }

  const useGetTotalSubmissions = () => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'getTotalSubmissions',
    })
  }

  const useGetReliabilityScore = (submissionId: number) => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'getReliabilityScore',
      args: [BigInt(submissionId)],
      enabled: !!submissionId && submissionId > 0,
    })
  }

  // Write functions
  const useSubmitMetadata = (submissionContractAddress: `0x${string}`, walrusBlobId: string, hypergraphId: string) => {
    // Debug logging
    console.log('useSubmitMetadata called with:', { submissionContractAddress, walrusBlobId, hypergraphId })
    
    const { config, error: prepareError } = usePrepareContractWrite({
      address: contractAddress, // Use the global contract address
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'submitMetadata',
      args: [submissionContractAddress, walrusBlobId, hypergraphId], // submissionContractAddress is the contract being submitted
      enabled: !!submissionContractAddress && !!walrusBlobId && !!hypergraphId,
      gas: BigInt(500000), // Add explicit gas limit
    })

    // Debug logging for prepare errors
    if (prepareError) {
      console.error('Prepare contract write error:', prepareError)
    }

    const { data, write, isLoading, error } = useContractWrite(config)
    const { isLoading: isPending, isSuccess, error: transactionError } = useWaitForTransaction({
      hash: data?.hash,
    })

    // Combine prepare errors and transaction errors
    const combinedError = prepareError || error || transactionError

    return {
      submit: write,
      isLoading: isLoading || isPending,
      isSuccess,
      error: combinedError,
      hash: data?.hash,
    }
  }

  const useSubmitReview = (submissionId: number, isApproved: boolean, comment: string) => {
    const { config, error: prepareError } = usePrepareContractWrite({
      address: contractAddress,
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'submitReview',
      args: [BigInt(submissionId), isApproved, comment],
      enabled: !!submissionId && submissionId > 0,
    })

    const { data, write, isLoading, error } = useContractWrite(config)
    const { isLoading: isPending, isSuccess, error: transactionError } = useWaitForTransaction({
      hash: data?.hash,
    })

    // Combine prepare errors and transaction errors
    const combinedError = prepareError || error || transactionError

    return {
      submit: write,
      isLoading: isLoading || isPending,
      isSuccess,
      error: combinedError,
      hash: data?.hash,
    }
  }

  const useDeactivateSubmission = (submissionId: number) => {
    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: ERC7730COMMUNITYREVIEW_ABI,
      functionName: 'deactivateSubmission',
      args: [BigInt(submissionId)],
      enabled: !!submissionId && submissionId > 0,
    })

    const { data, write, isLoading, error } = useContractWrite(config)
    const { isLoading: isPending, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      deactivate: write,
      isLoading: isLoading || isPending,
      isSuccess,
      error,
      hash: data?.hash,
    }
  }

  return {
    useGetSubmission,
    useGetSubmissionByContract,
    useGetTotalSubmissions,
    useGetReliabilityScore,
    useSubmitMetadata,
    useSubmitReview,
    useDeactivateSubmission,
    useTestContractAccess,
    useGetAllSubmissions,
  }
}
