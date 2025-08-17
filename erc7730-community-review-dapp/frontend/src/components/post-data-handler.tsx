'use client'

import React, { useEffect, useState, ReactNode } from 'react'

interface PostDataHandlerProps {
  children: ReactNode
}

export function PostDataHandler({ children }: PostDataHandlerProps) {
  const [postData, setPostData] = useState<string | null>(null)

  useEffect(() => {
    console.log('🔍 PostDataHandler: Checking for data...')
    
    // Check if we have POST data in the URL (from a redirect or query parameter)
    const urlParams = new URLSearchParams(window.location.search)
    const jsonData = urlParams.get('erc7730-metadata-json')
    
    if (jsonData) {
      console.log('📡 PostDataHandler: Found data in URL params')
      try {
        // Decode the JSON data if it's URL encoded
        const decodedData = decodeURIComponent(jsonData)
        // Validate it's valid JSON
        JSON.parse(decodedData)
        setPostData(decodedData)
        
        // Clean up the URL
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('erc7730-metadata-json')
        window.history.replaceState({}, '', newUrl.toString())
      } catch (error) {
        console.error('❌ PostDataHandler: Invalid JSON data in URL:', error)
      }
    }

    // Check if we have data in localStorage (from the Clear-Signing Builder)
    // This handles the case where users come from the Clear-Signing Builder app
    const storedData = localStorage.getItem('erc7730-metadata-json')
    console.log('💾 PostDataHandler: localStorage data:', storedData ? 'Found' : 'Not found')
    
    if (storedData && !postData) {
      console.log('✅ PostDataHandler: Processing localStorage data')
      try {
        // Validate it's valid JSON
        JSON.parse(storedData)
        console.log('✅ PostDataHandler: JSON is valid, setting postData')
        setPostData(storedData)
        // Clean up localStorage after reading
        localStorage.removeItem('erc7730-metadata-json')
        console.log('🧹 PostDataHandler: localStorage cleared')
      } catch (error) {
        console.error('❌ PostDataHandler: Invalid JSON data in localStorage:', error)
        localStorage.removeItem('erc7730-metadata-json')
      }
    }
  }, [postData])

  // Clone children and pass the postData as a prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { initialJsonData: postData } as any)
    }
    return child
  })

  return <>{childrenWithProps}</>
}
