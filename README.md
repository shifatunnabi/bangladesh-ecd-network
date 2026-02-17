# Bangladesh ECD Network (BEN)

Official website for the Bangladesh Early Childhood Development (ECD) Network - a collaborative organization dedicated to advancing early childhood development in Bangladesh.

## Features

- 🎨 Modern, responsive design with Next.js 14 and TypeScript
- 📝 Content management with Contentful CMS
- 🔄 **Automatic content updates** - No redeployment needed when content changes!
- ⚡ Incremental Static Regeneration (ISR) for optimal performance
- 🎯 Dynamic routes for news, events, galleries, and resources
- 🔐 Admin dashboard for member management
- 🎓 Learning portal integration
- 📊 Real-time visitor counter

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bangladesh-ecd-network
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Contentful credentials
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Contentful Automatic Revalidation

The website automatically updates when content changes in Contentful - no manual redeployment required!

**📖 [Complete Setup Guide](./CONTENTFUL_REVALIDATION_SETUP.md)**

### Quick Summary:
- **ISR:** Pages auto-refresh every 60 seconds
- **Webhooks:** Instant updates when content is published in Contentful
- **Zero Downtime:** Users always see fresh content without developer intervention

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **CMS:** Contentful
- **Database:** (Add your database info)
- **Deployment:** Vercel (recommended)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── revalidate/    # Contentful webhook endpoint
│   ├── about/             # About pages
│   ├── media/             # News, events, gallery
│   ├── resources/         # Research, voices, newsletters
│   └── portal/            # Member portal
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utility functions
│   ├── contentful.ts     # Contentful client & helpers
│   └── ...
└── public/               # Static assets
```

## Environment Variables

See `.env.example` for required environment variables:

- `CONTENTFUL_SPACE_ID` - Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Contentful delivery API token
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` - Contentful preview API token
- `REVALIDATION_SECRET` - Secret token for webhook authentication

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Deployment

The site is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!
5. Configure Contentful webhook (see [setup guide](./CONTENTFUL_REVALIDATION_SETUP.md))

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for the Bangladesh ECD Network**
