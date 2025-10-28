# Deployment Guide

This guide will help you deploy your macOS-inspired portfolio website to various platforms.

## Pre-Deployment Checklist

1. **Update Personal Information**

   - Edit `src/data/config.js` with your personal information
   - Update `src/components/Apps/Finder/` files with your content
   - Replace placeholder images with your project screenshots
   - Update the README.md with your information

2. **Build the Project**

   ```bash
   npm run build
   ```

   This creates an optimized production build in the `dist` directory.

3. **Test Locally**
   ```bash
   npm run preview
   ```
   Test the production build locally before deploying.

## Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Follow the prompts and your site will be live!

**Or use GitHub integration:**

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Netlify

1. Install Netlify CLI:

   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:

   ```bash
   npm run build
   netlify deploy --prod
   ```

3. Configure settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages

1. Install gh-pages:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:

   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or higher

## Environment Configuration

### Adding Environment Variables (if needed)

Create a `.env.production` file:

```env
VITE_API_KEY=your_api_key
VITE_APP_URL=https://yoursite.com
```

Access in code:

```javascript
import.meta.env.VITE_API_KEY;
```

## Custom Domain

1. Purchase a domain (Namecheap, GoDaddy, etc.)
2. Configure DNS settings:
   - **Vercel**: Add your domain in project settings
   - **Netlify**: Configure DNS in domain settings
   - Point your domain to the hosting provider's servers
3. Enable HTTPS (automatic on most platforms)

## Performance Optimization

1. **Image Optimization**

   - Compress images before uploading
   - Use WebP format for better compression
   - Use appropriate image sizes (responsive images)

2. **Code Splitting**

   - The build already includes code splitting
   - Lazy load components where possible

3. **Caching**
   - Configure cache headers
   - Use CDN for assets
   - Enable gzip compression

## Post-Deployment

1. Test all functionality on production
2. Check mobile responsiveness
3. Test cross-browser compatibility
4. Set up analytics (optional)
5. Add custom favicon
6. Update meta tags for SEO

## Troubleshooting

### Build Errors

- Check Node version (should be 18+)
- Clear node_modules and reinstall
- Check for TypeScript errors

### 404 Errors

- Ensure all routes are configured correctly
- Check if hosting platform supports SPA routing

### Images Not Loading

- Use absolute URLs or public folder paths
- Check image paths are correct
- Verify image file sizes

## Analytics

Consider adding analytics to track visitors:

### Google Analytics

Add to `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

## Security

1. Enable HTTPS (automatic on most platforms)
2. Keep dependencies updated
3. Review and remove unused dependencies
4. Use environment variables for sensitive data
