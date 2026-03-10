# Menyum PWA Pink Version - Installation Instructions

## ✅ What Was Fixed

1. **Service Worker Cache Version**: Bumped from `v1` to `v2-pink-20260310` to force cache invalidation
2. **Manifest.json Updates**:
   - Added version `2.0.0`
   - Added `?v=2` cache-busting parameters to all icon URLs
   - Added `purpose: "any maskable"` to icons for better iOS support
   - Updated start_url to `"./?v=2"` to force refresh
3. **HTML Cache Control**: Added no-cache meta tags to prevent aggressive browser caching
4. **Icon Links**: Added `?v=2` to Apple touch icon links

## 📱 How to Install the Pink Version on iPhone

### Step 1: Clear Old PWA (if installed)
1. Find the Menyum app on your home screen
2. Long-press the icon → **Remove App** → **Delete App**

### Step 2: Clear Safari Cache
1. Open **Settings** app
2. Scroll to **Safari**
3. Tap **Clear History and Website Data**
4. Confirm (this won't affect your saved passwords)

### Step 3: Force Refresh the Site
1. Open Safari on your iPhone
2. Go to: **https://dylbow.github.io/menyum/?v=2** (note the `?v=2`)
3. Pull down on the page to force refresh
4. Verify you see the **pink theme** in the browser

### Step 4: Add to Home Screen
1. Tap the **Share** button (square with arrow pointing up)
2. Scroll down and tap **Add to Home Screen**
3. You should now see the **pink icon** in the preview!
4. Tap **Add** in the top right

### Step 5: Verify
1. Open the app from your home screen
2. The icon should be pink, and the app should show the pink theme

## 🔧 If It Still Shows Purple

If you still see purple after following the steps above:

1. **Wait 5 minutes** - GitHub Pages cache needs to propagate
2. Try opening in **Private/Incognito mode** first to verify the pink version is live
3. Force-quit Safari completely:
   - Swipe up from bottom and pause (or double-click home button)
   - Swipe Safari up to close
4. Repeat Step 2-4 above

## 🚀 Technical Changes Made

- **Service Worker**: Now `menyum-v2-pink-20260310` with automatic old cache deletion
- **Manifest Version**: `2.0.0` with cache-busted icon URLs
- **Cache Headers**: Added no-cache directives to HTML
- **Icon Purpose**: Added `any maskable` for better iOS PWA support

## 📊 Deployment Status

- ✅ Committed to Git: `2b0fab9`
- ✅ Pushed to GitHub: main branch
- 🔄 GitHub Actions Deployment: In Progress (check https://github.com/dylbow/menyum/actions)
- Live URL: https://dylbow.github.io/menyum/

Wait for the GitHub Actions deployment to complete (usually 1-2 minutes) before trying to install on iPhone.
