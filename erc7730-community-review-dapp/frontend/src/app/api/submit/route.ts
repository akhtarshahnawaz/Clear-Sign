import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    let jsonData: string | null = null;
    
    // Check content type to handle both JSON and form data
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      // Handle JSON request
      const body = await request.json();
      jsonData = body['erc7730-metadata-json'];
    } else if (contentType?.includes('application/x-www-form-urlencoded') || contentType?.includes('multipart/form-data')) {
      // Handle form data request
      const formData = await request.formData();
      jsonData = formData.get('erc7730-metadata-json') as string;
    }
    
    if (!jsonData) {
      return NextResponse.json(
        { error: 'Missing erc7730-metadata-json field' },
        { status: 400 }
      )
    }

    // Validate that it's valid JSON
    try {
      JSON.parse(jsonData)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON format in erc7730-metadata-json field' },
        { status: 400 }
      )
    }

    // Redirect to homepage with the JSON data as a query parameter
    const encodedData = encodeURIComponent(jsonData)
    const redirectUrl = `/?erc7730-metadata-json=${encodedData}`
    
    return NextResponse.redirect(new URL(redirectUrl, request.url))
    
  } catch (error) {
    console.error('Error processing POST request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint accepts POST requests with erc7730-metadata-json field' },
    { status: 405 }
  )
}
