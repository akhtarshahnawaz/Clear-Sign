export interface Submission {
  id: number
  submitter: `0x${string}`
  contractId: `0x${string}` // Changed from string to address type
  walrusBlobId: string
  hypergraphId: string
  submissionTime: number
  isActive: boolean
  totalReviews: number
  positiveReviews: number
  negativeReviews: number
  reliabilityScore: number
}

export interface Review {
  reviewer: `0x${string}`
  isApproved: boolean
  comment: string
  reviewTime: number
}

export interface SubmissionWithReviews extends Submission {
  reviews: Review[]
}

export interface ContractMetadata {
  contractId: string
  walrusBlobId: string
  hypergraphId: string
  reliabilityScore: number
  totalReviews: number
  positiveReviews: number
  negativeReviews: number
  submissionTime: number
}
