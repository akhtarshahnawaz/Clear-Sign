import { SubmissionsList } from '@/components/submissions-list'

export default function SubmissionsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Metadata Submissions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Review and evaluate ERC7730 metadata submissions from the community. 
          Help maintain quality standards through decentralized review.
        </p>
      </div>
      
      <SubmissionsList />
    </div>
  )
}
