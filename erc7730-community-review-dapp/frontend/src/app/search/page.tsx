import { MetadataSearch } from '@/components/metadata-search'

export default function SearchPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Search Metadata
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Search for ERC7730 metadata by contract ID. Find verified metadata 
          with community review scores and reliability metrics.
        </p>
      </div>
      
      <MetadataSearch />
    </div>
  )
}
