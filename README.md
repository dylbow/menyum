# Menyum 🍽️

Your favorite orders, always ready. A beautiful, mobile-first Progressive Web App for saving and ordering your go-to meals from your favorite restaurants.

## Features

- ✨ Liquid glass UI with advanced glassmorphism
- 📱 Progressive Web App (install on iOS/Android)
- 🎨 Beautiful animations and micro-interactions  
- 🚀 Offline-first with service worker caching
- ⚡ Lightning fast performance
- 📦 App Store ready (Capacitor integration)

## Tech Stack

- Vanilla JavaScript (no frameworks)
- CSS3 with advanced effects
- PWA (Service Worker + Manifest)
- Capacitor (for native app builds)

## Development

```bash
# Start local server
npx live-server --port=8401

# Deploy to GitHub Pages
./deploy.sh
```

## App Store Deployment

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor
npx cap init

# Add platforms
npx cap add ios
npx cap add android

# Build and sync
npm run build
npx cap sync

# Open in Xcode/Android Studio
npx cap open ios
npx cap open android
```

## License

Private - Dylan Bowman 2026
