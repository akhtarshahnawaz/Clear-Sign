import { MySubmissionsList } from '@/components/my-submissions-list'

export default function MySubmissionsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Submissions</h1>
      <MySubmissionsList />
    </div>
  )
}
