# How to Add Images to Your Portfolio

## Where to Put Images

### 📁 Folder Structure

```
public/
├── images/
│   ├── projects/
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   └── project3.jpg
│   ├── certifications/
│   │   ├── aws-cert.png
│   │   └── kubernetes-badge.png
│   └── about/
│       └── profile-photo.jpg
├── wallpaper.jpg          # Desktop wallpaper
└── resume.pdf            # Your resume PDF
```

## Using Images in Your Components

### Method 1: Using Public Folder (Easiest)

Files in the `public` folder are served from the root URL (`/`).

**Example in ProjectsContent.jsx:**

```jsx
const projects = [
  {
    title: "E-Commerce Platform",
    image: "/images/projects/ecommerce.jpg", // ← Use this path
    // ... other fields
  },
];
```

**Example for wallpaper in Desktop.jsx:**

```jsx
style={{
  backgroundImage: 'url(/wallpaper.jpg)',  // ← Use this path
  ...
}}
```

### Method 2: Import Images

You can also import images directly in your components:

```jsx
import profilePhoto from "../../assets/images/profile.jpg";

<img src={profilePhoto} alt="Profile" />;
```

## Where to Add Images for Each Component

### 1. **Desktop Wallpaper**

- **File**: `public/wallpaper.jpg`
- **Current code**: `src/components/Desktop/Desktop.jsx` (line 74-79)
- **To change**: Replace the Unsplash URL with `url(/wallpaper.jpg)`

### 2. **Project Images**

- **Folder**: `public/images/projects/`
- **Current code**: `src/components/Apps/Finder/ProjectsContent.jsx` (line 8-28)
- **To add**:
  ```jsx
  {
    title: "My Project",
    image: "/images/projects/my-project.jpg",  // Your image path
    ...
  }
  ```

### 3. **Certification Badges**

- **Folder**: `public/images/certifications/`
- **Current code**: `src/components/Apps/Finder/CertificationsContent.jsx` (line 5-22)
- **To add**:
  ```jsx
  {
    name: "AWS Certified",
    image: "/images/certifications/aws.png",  // Your badge image
    ...
  }
  ```

### 4. **Profile Photo (About Me)**

- **Folder**: `public/images/about/`
- **Current code**: `src/components/Apps/Finder/AboutContent.jsx` (line 8)
- **To add**: Replace placeholder URL with `/images/about/profile.jpg`

### 5. **Resume PDF**

- **File**: `public/resume.pdf`
- **Current code**: `src/components/Apps/Finder/ResumeViewer.jsx` (line 73)
- **To add**: The link already points to `/resume.pdf` - just add your PDF to the public folder

## Quick Start Guide

1. **Add your desktop wallpaper:**

   ```bash
   # Add your wallpaper to public folder
   cp ~/Downloads/my-wallpaper.jpg public/wallpaper.jpg
   ```

2. **Add project images:**

   ```bash
   # Add project screenshots
   cp project-screenshots/* public/images/projects/
   ```

3. **Add certification badges:**

   ```bash
   # Add certification images
   cp certifications/* public/images/certifications/
   ```

4. **Add profile photo:**

   ```bash
   # Add your profile photo
   cp ~/Pictures/profile.jpg public/images/about/profile.jpg
   ```

5. **Add resume:**
   ```bash
   # Add your resume PDF
   cp ~/Documents/my-resume.pdf public/resume.pdf
   ```

## Image Optimization Tips

### Recommended Sizes

- **Desktop wallpaper**: 1920x1080 or larger (High resolution)
- **Project thumbnails**: 800x600px (optimized web size)
- **Certification badges**: 300x300px (square)
- **Profile photo**: 400x400px (square, cropped to circle)

### File Formats

- **Photos**: Use JPG for smaller file sizes
- **Logos/Badges with transparency**: Use PNG
- **Optimized delivery**: Consider WebP format (modern browsers)

### Tools for Optimization

- [TinyPNG](https://tinypng.com/) - Compress PNG/JPG
- [Squoosh](https://squoosh.app/) - Online image optimizer
- [ImageOptim](https://imageoptim.com/) - Mac app for optimization

## Current Image Paths to Update

Open these files and replace the placeholder URLs:

1. **`src/components/Desktop/Desktop.jsx`** - Line 74

   - Change: Unsplash URL → `/wallpaper.jpg`

2. **`src/components/Apps/Finder/ProjectsContent.jsx`** - Line 9, 16, 23

   - Change: Placeholder URLs → `/images/projects/project1.jpg`

3. **`src/components/Apps/Finder/CertificationsContent.jsx`** - Lines 8, 15, 22

   - Change: Placeholder URLs → `/images/certifications/aws.png`

4. **`src/components/Apps/Finder/AboutContent.jsx`** - Line 8
   - Change: Placeholder URL → `/images/about/profile.jpg`

## External Images (Currently Used)

The project currently uses Unsplash for the wallpaper and placeholder.com for other images. Replace these with your own images in the `public` folder.
