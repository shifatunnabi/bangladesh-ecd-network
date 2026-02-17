# Contentful Automatic Revalidation Setup Guide

This guide explains how to configure automatic content updates from Contentful CMS to your Next.js website.

## Overview

The website now uses two mechanisms to automatically update content when changes are made in Contentful:

1. **On-Demand Revalidation** (via Webhooks) - Immediate updates when content changes
2. **Incremental Static Regeneration (ISR)** - Automatic revalidation every 60 seconds as a fallback

## What Was Implemented

### 1. Webhook API Endpoint

A new API endpoint has been created at `/api/revalidate` that Contentful can call to trigger immediate page revalidation.

**File:** `app/api/revalidate/route.ts`

### 2. ISR Configuration

All pages that fetch Contentful data now have `export const revalidate = 60` which means:
- Pages are regenerated at most once every 60 seconds when requested
- Users always see content that's no more than 60 seconds old
- No need to redeploy the site for content updates

**Pages updated:**
- Homepage
- About pages (About, Committee, Secretariat, Former Members)
- Media pages (News, Events, Gallery, Conference)
- Resources pages (Research Reports, Voices, Newsletter, Policies)
- All dynamic detail pages

## Setup Instructions

### Step 1: Add Environment Variable

Add the following to your `.env.local` file:

```bash
REVALIDATION_SECRET=your-very-secure-random-secret-token-here
```

**Generate a secure secret token:**
```bash
# Using OpenSSL
openssl rand -base64 32

# Or use any random string generator
# Example: kJ8mN2pQ5wR7xT9yB3cD6fG1hK4lM8nP0qS2vU5xZ7a
```

⚠️ **Important:** Use a strong, unique token and keep it secret!

### Step 2: Deploy the Changes

Deploy your website with the new code:

```bash
# Build and deploy
pnpm build
# Deploy to your hosting platform (Vercel, etc.)
```

### Step 3: Configure Contentful Webhook

1. **Log in to Contentful:**
   - Go to https://app.contentful.com
   - Select your space

2. **Navigate to Webhooks:**
   - Click on "Settings" in the top navigation
   - Select "Webhooks" from the left sidebar
   - Click "Add Webhook" button

3. **Configure the Webhook:**

   **Name:** `Next.js Revalidation`

   **URL:** `https://your-domain.com/api/revalidate`
   - Replace `your-domain.com` with your actual website domain
   - Example: `https://bangladesh-ecd-network.vercel.app/api/revalidate`

   **Method:** `POST`

   **Headers:**
   Add a custom header:
   - **Key:** `Authorization`
   - **Value:** `Bearer your-very-secure-random-secret-token-here`
   - (Use the same token you added to `.env.local`)

   **Triggers:**
   Select the following triggers:
   - ✅ Entry: Publish
   - ✅ Entry: Unpublish
   - ✅ Entry: Archive
   - ✅ Entry: Unarchive
   - ✅ Entry: Delete
   - ✅ Asset: Publish
   - ✅ Asset: Unpublish
   - ✅ Asset: Archive
   - ✅ Asset: Unarchive
   - ✅ Asset: Delete

   **Filters (Optional):**
   - Leave empty to trigger on all content changes
   - Or specify specific content types if you want more control

4. **Save the Webhook:**
   - Click "Save" at the bottom

5. **Test the Webhook:**
   - After saving, you'll see a "Trigger test payload" button
   - Click it to test if the webhook is working
   - Check the "Activity log" tab to see if the request was successful

### Step 4: Verify Setup

1. **Test Content Update:**
   - Make a small change to any content in Contentful
   - Publish the change
   - Wait a few seconds
   - Visit your website and verify the change appears (you might need to hard refresh: Ctrl+Shift+R)

2. **Check Webhook Logs:**
   - In Contentful, go to the webhook settings
   - Click on your webhook
   - Go to "Activity log" tab
   - You should see successful POST requests with 200 status codes

3. **Test API Directly (Optional):**
   ```bash
   # Test the revalidation endpoint
   curl -X GET "https://your-domain.com/api/revalidate?secret=your-secret-token"
   ```

## How It Works

### On-Demand Revalidation Flow:

1. User updates content in Contentful
2. User publishes the content
3. Contentful triggers the webhook
4. Webhook calls your `/api/revalidate` endpoint
5. API verifies the secret token
6. API determines which pages need to be revalidated based on content type
7. API calls Next.js `revalidatePath()` for each affected page
8. Next.js regenerates those pages with fresh data
9. **New content is live within seconds!**

### ISR Fallback:

Even if webhooks fail or are delayed:
- Pages automatically check for updates every 60 seconds
- First user after 60 seconds triggers a background regeneration
- All subsequent users see the updated content
- No manual redeployment needed

## Troubleshooting

### Webhook Not Firing

1. **Check Contentful Activity Log:**
   - Settings → Webhooks → Your webhook → Activity log
   - Look for error messages or failed requests

2. **Common Issues:**
   - Incorrect URL (make sure it's publicly accessible)
   - Wrong secret token
   - Webhook disabled
   - Content type filters too restrictive

### Content Not Updating

1. **Wait 60 seconds:** Due to ISR, content updates at most every 60 seconds
2. **Hard refresh:** Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
3. **Check server logs:** Look for revalidation messages
4. **Verify environment variable:** Make sure `REVALIDATION_SECRET` is set

### Testing the API

```bash
# Test with GET request (for debugging)
curl "https://your-domain.com/api/revalidate?secret=your-secret-token"

# Simulate Contentful webhook (POST)
curl -X POST https://your-domain.com/api/revalidate \
  -H "Authorization: Bearer your-secret-token" \
  -H "Content-Type: application/json" \
  -d '{
    "sys": {
      "id": "test123",
      "contentType": {
        "sys": {
          "id": "news"
        }
      }
    }
  }'
```

## Content Type Mapping

The following Contentful content types are mapped to specific pages:

| Content Type | Pages Revalidated |
|--------------|-------------------|
| `carousel` | Homepage |
| `homepageCoreValues` | Homepage |
| `homepageOurImpact` | Homepage |
| `homepageQuote` | Homepage |
| `homepageFinalSection` | Homepage |
| `whoWeAre` | Homepage |
| `homepagePartner` | Homepage |
| `about` | About, Former Members |
| `committee` | About Committee |
| `secretariat` | About Secretariat |
| `news` | Media News, Homepage |
| `events` | Media Events |
| `gallery` | Media Gallery |
| `conference` | Media Conference |
| `researchReports` | Resources Research Reports, Homepage |
| `voices` | Resources Voices, Homepage |
| `newsletter` | Resources Newsletter, Homepage |
| `policiesLinks` | Resources Policies |

## Benefits

✅ **No More Manual Redeployments:** Content updates automatically
✅ **Fast Updates:** Changes appear within seconds via webhooks
✅ **Fallback Protection:** ISR ensures updates even if webhooks fail
✅ **Better Performance:** Pages remain static and fast
✅ **Cost Effective:** Only regenerates pages when needed
✅ **Better UX:** Users always see up-to-date content

## Adjusting Revalidation Time

If you want to change the ISR revalidation interval (currently 60 seconds):

1. Edit the `revalidate` value in any page file:
   ```typescript
   // Change from 60 to your desired seconds
   export const revalidate = 60;  // Change this value
   ```

2. Recommended values:
   - `60` - Good balance (1 minute)
   - `300` - Less frequent (5 minutes)
   - `3600` - Hourly updates
   - `false` - Disable ISR (only use webhooks)
   - `0` - Disable static generation (always use SSR - not recommended)

## Support

If you encounter issues:
1. Check this documentation
2. Review the troubleshooting section
3. Check webhook activity logs in Contentful
4. Review server logs for revalidation messages
5. Contact the development team

---

**Last Updated:** February 17, 2026
