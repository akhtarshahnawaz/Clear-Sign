import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.text()
    
    // Get Walrus publisher URL from environment
    const publisherUrl = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_BASE_URL || 'https://walrus-testnet-publisher.starduststaking.com'
    
    console.log('🦭 Publishing to Walrus:', publisherUrl)
    
    // Make request to Walrus publisher
    const response = await fetch(`${publisherUrl}/v1/blobs`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: body
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Walrus publish failed:', response.status, errorText)
      return NextResponse.json(
        { error: `Walrus publish failed: ${response.status} ${errorText}` },
        { status: response.status }
      )
    }
    
    const result = await response.json()
    console.log('✅ Walrus publish successful:', result)
    
    return NextResponse.json(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
    
  } catch (error) {
    console.error('❌ Error publishing to Walrus:', error)
    return NextResponse.json(
      { error: 'Failed to publish to Walrus network' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint accepts PUT requests to publish to Walrus network' },
    { status: 405 }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}
