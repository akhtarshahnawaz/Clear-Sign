import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const blobId = searchParams.get('blobId')
    
    if (!blobId) {
      return NextResponse.json(
        { error: 'Missing blobId parameter' },
        { status: 400 }
      )
    }
    
    // Get Walrus aggregator URL from environment
    const aggregatorUrl = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_BASE_URL || 'http://agg.test.walrus.eosusa.io'
    
    console.log('🦭 Retrieving from Walrus:', `${aggregatorUrl}/v1/blobs/${blobId}`)
    
    // Make request to Walrus aggregator
    const response = await fetch(`${aggregatorUrl}/v1/blobs/${blobId}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Walrus retrieve failed:', response.status, errorText)
      return NextResponse.json(
        { error: `Walrus retrieve failed: ${response.status} ${errorText}` },
        { status: response.status }
      )
    }
    
    const result = await response.text()
    console.log('✅ Walrus retrieve successful for blob:', blobId)
    
    // Return the content as JSON with proper content type
    return new NextResponse(result, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
    
  } catch (error) {
    console.error('❌ Error retrieving from Walrus:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve from Walrus network' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { message: 'This endpoint accepts GET requests with blobId parameter' },
    { status: 405 }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}
