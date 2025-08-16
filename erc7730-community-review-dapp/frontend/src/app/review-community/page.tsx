import { CommunitySubmissionsList } from '@/components/community-submissions-list'

export default function ReviewCommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Review Community Submissions</h1>
      <CommunitySubmissionsList />
    </div>
  )
}
