import { MetadataSubmissionForm } from '@/components/metadata-submission-form'
import { PostDataHandler } from '@/components/post-data-handler'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          ERC7730 Community Review
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Submit your ERC7730 metadata for community review. Help build a reliable and 
          decentralized ecosystem for smart contract metadata.
        </p>
      </div>
      
      <PostDataHandler>
        <MetadataSubmissionForm />
      </PostDataHandler>
    </div>
  )
}
