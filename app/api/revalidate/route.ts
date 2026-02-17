import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// This is a secret token that should be set in your environment variables
// It should match the secret you configure in the Contentful webhook
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'your-secret-token-here'

// Map of Contentful content types to Next.js paths that need revalidation
const CONTENT_TYPE_TO_PATHS: Record<string, string[]> = {
  // Homepage content
  carousel: ['/'],
  homepageCoreValues: ['/'],
  homepageOurImpact: ['/'],
  homepageQuote: ['/'],
  homepageFinalSection: ['/'],
  whoWeAre: ['/'],
  homepagePartner: ['/'],

  // About pages
  about: ['/about', '/about/former-members'],
  committee: ['/about/committee'],
  secretariat: ['/about/secretariat'],

  // Media pages
  news: ['/media/news', '/'],
  events: ['/media/events'],
  gallery: ['/media/gallery'],
  conference: ['/media/conference'],

  // Resources pages
  researchReports: ['/resources/research-reports', '/'],
  voices: ['/resources/voices', '/'],
  newsletter: ['/resources/newsletter', '/'],
  policiesLinks: ['/resources/policies'],
}

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token !== REVALIDATION_SECRET) {
      console.error('Invalid revalidation token')
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Parse the webhook payload from Contentful
    const payload = await request.json()
    
    // Extract content type from the payload
    const contentType = payload?.sys?.contentType?.sys?.id || payload?.contentType

    console.log('Revalidation webhook received:', {
      contentType,
      entryId: payload?.sys?.id,
      timestamp: new Date().toISOString(),
    })

    // Get paths to revalidate based on content type
    const pathsToRevalidate = contentType 
      ? CONTENT_TYPE_TO_PATHS[contentType] || []
      : []

    // If no specific paths found, revalidate common pages
    if (pathsToRevalidate.length === 0) {
      console.log('No specific paths found, revalidating homepage')
      pathsToRevalidate.push('/')
    }

    // Revalidate all relevant paths
    const revalidationPromises = pathsToRevalidate.map(async (path) => {
      try {
        await revalidatePath(path, 'page')
        console.log(`✓ Revalidated: ${path}`)
        return { path, success: true }
      } catch (error) {
        console.error(`✗ Failed to revalidate ${path}:`, error)
        return { path, success: false, error: String(error) }
      }
    })

    const results = await Promise.all(revalidationPromises)

    // Also revalidate the media and resources overview pages
    await revalidatePath('/media', 'page')
    await revalidatePath('/resources', 'page')

    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length

    return NextResponse.json({
      message: 'Revalidation triggered',
      contentType,
      revalidated: pathsToRevalidate,
      results,
      summary: {
        success: successCount,
        failed: failureCount,
        total: results.length,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { 
        message: 'Error processing revalidation', 
        error: String(error) 
      },
      { status: 500 }
    )
  }
}

// Handle GET requests for testing
export async function GET(request: NextRequest) {
  // Verify the secret token
  const token = request.nextUrl.searchParams.get('secret')

  if (token !== REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    )
  }

  // Test revalidation - revalidate homepage
  try {
    await revalidatePath('/', 'page')
    return NextResponse.json({
      message: 'Test revalidation successful',
      revalidated: ['/'],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Test revalidation failed', error: String(error) },
      { status: 500 }
    )
  }
}
