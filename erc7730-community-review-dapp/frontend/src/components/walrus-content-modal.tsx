'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WALRUS_AGGREGATOR_BASE_URL } from '@/lib/constants'
import { Eye, X, Download, RefreshCw } from 'lucide-react'

interface WalrusContentModalProps {
  isOpen: boolean
  onClose: () => void
  blobId: string
  title?: string
}

interface WalrusContent {
  content: any
  metadata?: any
  error?: string
}

export function WalrusContentModal({ isOpen, onClose, blobId, title }: WalrusContentModalProps) {
  const [content, setContent] = useState<WalrusContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWalrusContent = async () => {
    if (!blobId) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${WALRUS_AGGREGATOR_BASE_URL}/v1/blobs/${blobId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setContent({ content: data })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch content'
      setError(errorMessage)
      setContent(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && blobId) {
      fetchWalrusContent()
    }
  }, [isOpen, blobId])

  const handleClose = () => {
    setContent(null)
    setError(null)
    onClose()
  }

  const formatJSON = (obj: any): string => {
    try {
      return JSON.stringify(obj, null, 2)
    } catch {
      return String(obj)
    }
  }

  const downloadContent = () => {
    if (!content?.content) return
    
    const dataStr = formatJSON(content.content)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `walrus-${blobId}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            {title || 'Walrus Content Viewer'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchWalrusContent}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            {content?.content && (
              <Button
                variant="outline"
                size="sm"
                onClick={downloadContent}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Blob ID:</span>
            <code className="text-sm bg-gray-200 px-2 py-1 rounded font-mono break-all">
              {blobId}
            </code>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Fetching content from Walrus network...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-red-800 font-medium mb-2">Error Loading Content</h4>
              <p className="text-red-700 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-2">
                This could mean the blob doesn't exist, the aggregator is down, or there's a network issue.
              </p>
            </div>
          )}

          {content?.content && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Content Preview</h4>
                <span className="text-xs text-gray-500">
                  {typeof content.content === 'object' ? 'JSON' : 'Text'} format
                </span>
              </div>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm whitespace-pre-wrap break-words">
                  {formatJSON(content.content)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
