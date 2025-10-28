# macOS-Inspired Portfolio Website

A fully interactive, browser-based portfolio website that authentically replicates the macOS desktop experience. Built with React, Tailwind CSS, and Framer Motion.

## Features

- **macOS Menu Bar**: Apple logo, title, contact menu, and system icons (WiFi, Battery, Clock)
- **Interactive Desktop**: Wallpaper background with desktop icons (Projects, Certifications, About Me, Resume)
- **macOS-Style Dock**: 8 apps with magnification effect on hover
- **Draggable Windows**: Finder-style windows with traffic lights (close, minimize, maximize)
- **Portfolio Content**: Projects, certifications, about me, and resume sections
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React-RND** - Draggable/resizable windows

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to view the portfolio.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Desktop/        # Desktop with wallpaper and icons
│   ├── Dock/           # macOS-style dock
│   ├── MenuBar/        # Top menu bar
│   ├── Window/         # Draggable windows
│   └── Apps/           # App content (Finder, etc.)
├── context/
│   └── WindowManagerContext.jsx  # Window state management
├── App.jsx
└── main.jsx
```

## Customization

### Personal Information

Edit `src/components/Desktop/Desktop.jsx` to update desktop icon labels and actions.

### Portfolio Content

- **Projects**: Edit `src/components/Apps/Finder/ProjectsContent.jsx`
- **Certifications**: Edit `src/components/Apps/Finder/CertificationsContent.jsx`
- **About Me**: Edit `src/components/Apps/Finder/AboutContent.jsx`
- **Resume**: Edit `src/components/Apps/Finder/ResumeViewer.jsx`

### Dock Apps

Edit `src/components/Dock/Dock.jsx` to customize dock applications and their actions.

### Wallpaper

Replace `public/wallpaper.jpg` with your preferred macOS-style wallpaper image.

## Features in Detail

### Menu Bar

- Apple logo (clickable)
- Portfolio title
- Contact menu
- System icons (WiFi, Battery, Clock, Search, Control Center)

### Desktop Icons

- Projects folder
- Certifications folder
- About Me
- Resume.pdf

### Dock Applications

1. Finder - Opens file manager window
2. Photos - Opens photo gallery
3. Messages - Opens contact form
4. Mail - Opens email client
5. GitHub - External link to GitHub profile
6. LinkedIn - External link to LinkedIn profile
7. Spotify - External link to Spotify
8. Trash - Trash bin

### Windows

- Fully draggable by title bar
- Traffic light buttons (red, yellow, green)
- Close, minimize, and maximize functionality
- Multiple windows can be open simultaneously
- z-index management for proper stacking

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## Credits

Inspired by macOS Big Sur and Monterey design language.
