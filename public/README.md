# Public Assets

This folder contains static assets that are served directly by Vite.

## Folder Structure

```
public/
├── images/
│   ├── projects/          # Project screenshots/thumbnails
│   ├── certifications/    # Certification badges/logos
│   └── about/             # Profile photo and personal images
├── icons/                 # Custom icons (optional)
├── fonts/                 # Custom fonts (optional)
└── resume.pdf            # Your resume PDF file
```

## How to Use Images in Your Code

### Option 1: Reference from public folder (Recommended)

Images in the `public` folder are served from the root URL:

```jsx
// In public/images/projects/project1.png
<img src="/images/projects/project1.png" alt="Project 1" />

// In public/images/certifications/aws.png
<img src="/images/certifications/aws.png" alt="AWS Certification" />
```

### Option 2: Import in component

You can also import images from the `src` folder:

```jsx
import projectImage from "../assets/images/project1.png";

<img src={projectImage} alt="Project 1" />;
```

## Adding a Wallpaper

Place a macOS-style wallpaper in the root of `public` folder:

```
public/
└── wallpaper.jpg    # Your desktop wallpaper
```

Then reference it in `src/components/Desktop/Desktop.jsx`:

```jsx
style={{
  backgroundImage: 'url(/wallpaper.jpg)',
  ...
}}
```

## Tips

- **Images**: Use JPG for photos, PNG for logos with transparency, WebP for optimized delivery
- **Sizes**: Optimize images before adding them (use tools like TinyPNG or ImageOptim)
- **Naming**: Use descriptive, lowercase names with hyphens (e.g., `e-commerce-platform.jpg`)
