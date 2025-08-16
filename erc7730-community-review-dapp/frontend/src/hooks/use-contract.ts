'use client'

import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ERC7730_COMMUNITY_REVIEW_ABI } from '@/lib/contract-abi'
import { CONTRACT_ADDRESS } from '@/lib/constants'

export function useContract() {
  // Contract address - this should be set based on your deployment
  const contractAddress = CONTRACT_ADDRESS

  // Test function to check if contract is accessible
  const useTestContractAccess = () => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
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
      if (!totalSubmissions || totalSubmissions === 0) {
        setSubmissions([])
        return
      }
      
      const fetchSubmissions = async () => {
        setIsLoading(true)
        try {
          // This is a simplified approach - in production you'd want to batch calls
          const submissionPromises = []
          for (let i = 1; i <= totalSubmissions; i++) {
            submissionPromises.push(
              publicClient.readContract({
                address: contractAddress,
                abi: ERC7730_COMMUNITY_REVIEW_ABI,
                functionName: 'getSubmission',
                args: [i],
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
    }, [totalSubmissions])
    
    return { submissions, isLoading }
  }

  // Read functions
  const useGetSubmission = (submissionId: number) => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
      functionName: 'getSubmission',
      args: [submissionId],
      enabled: !!submissionId && submissionId > 0,
    })
  }

  const useGetSubmissionByContract = (contractId: string) => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
      functionName: 'getSubmissionByContract',
      args: [contractId],
      enabled: !!contractId,
    })
  }

  const useGetTotalSubmissions = () => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
      functionName: 'getTotalSubmissions',
    })
  }

  const useGetReliabilityScore = (submissionId: number) => {
    return useContractRead({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
      functionName: 'getReliabilityScore',
      args: [submissionId],
      enabled: !!submissionId && submissionId > 0,
    })
  }

  // Write functions
  const useSubmitMetadata = (contractId: string, walrusBlobId: string, hypergraphId: string) => {
    // Debug logging
    console.log('useSubmitMetadata called with:', { contractId, walrusBlobId, hypergraphId })
    
    const { config, error: prepareError } = usePrepareContractWrite({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
      functionName: 'submitMetadata',
      args: [contractId, walrusBlobId, hypergraphId],
      enabled: !!contractId && !!walrusBlobId && !!hypergraphId,
      gas: 500000, // Add explicit gas limit
    })

    // Debug logging for prepare errors
    if (prepareError) {
      console.error('Prepare contract write error:', prepareError)
    }

    const { data, write, isLoading, error } = useContractWrite(config)
    const { isLoading: isPending, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      submit: write,
      isLoading: isLoading || isPending,
      isSuccess,
      error,
      hash: data?.hash,
    }
  }

  const useSubmitReview = (submissionId: number, isApproved: boolean, comment: string) => {
    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
      functionName: 'submitReview',
      args: [submissionId, isApproved, comment],
      enabled: !!submissionId && submissionId > 0,
    })

    const { data, write, isLoading, error } = useContractWrite(config)
    const { isLoading: isPending, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      submit: write,
      isLoading: isLoading || isPending,
      isSuccess,
      error,
      hash: data?.hash,
    }
  }

  const useDeactivateSubmission = (submissionId: number) => {
    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: ERC7730_COMMUNITY_REVIEW_ABI,
      functionName: 'deactivateSubmission',
      args: [submissionId],
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
