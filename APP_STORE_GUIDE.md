# App Store Deployment Guide

## Prerequisites

### iOS (App Store)
- Mac with Xcode 14+ installed
- Apple Developer Account ($99/year)
- Provisioning profiles and certificates

### Android (Play Store)  
- Android Studio installed
- Google Play Developer Account ($25 one-time)
- Signing key

## Step 1: Install Dependencies

```bash
cd /Users/dylbot/menyum
npm install
```

## Step 2: Initialize Capacitor (First Time Only)

```bash
npm run cap:init
```

## Step 3: Add Platforms

```bash
# iOS
npm run cap:add:ios

# Android
npm run cap:add:android
```

## Step 4: Build & Sync

```bash
npm run build
npm run cap:sync
```

## Step 5: Open in Native IDE

### iOS (Xcode)
```bash
npm run cap:open:ios
```

In Xcode:
1. Select your team in Signing & Capabilities
2. Update bundle identifier if needed
3. Set deployment target (iOS 13+)
4. Archive → Distribute to App Store

### Android (Android Studio)
```bash
npm run cap:open:android
```

In Android Studio:
1. Build → Generate Signed Bundle/APK
2. Create/use signing key
3. Build release APK/AAB
4. Upload to Play Console

## App Store Metadata

### Name
**Menyum**

### Subtitle (iOS)
Your Favorite Orders, Always Ready

### Description
Never forget your go-to orders again. Menyum saves your favorite meals from your favorite restaurants with quick links to order instantly.

**Features:**
• Save favorite orders with custom names
• Quick links to restaurant ordering pages  
• Beautiful, modern design with liquid glass effects
• Works offline with PWA technology
• Fast and lightweight

Perfect for couples, families, or anyone who orders from the same places regularly.

### Keywords (iOS, 100 chars max)
food,restaurant,orders,meals,favorites,delivery,takeout,dining

### Category
- **Primary:** Food & Drink
- **Secondary:** Lifestyle

### Screenshots Needed

#### iPhone (6.5" & 5.5")
- Home screen (Dylan's orders)
- Home screen (Audrey's orders)  
- Taco Bell order detail
- McDonald's order detail
- Order button interaction

#### iPad (12.9" & 11")
- Same as iPhone but optimized for tablet

### App Icon
- 1024x1024 PNG (no transparency, no rounded corners)
- Located at: `/Users/dylbot/menyum/icons/icon-512x512.png`
- **Resize to 1024x1024 before submission**

### Privacy Policy
Required for App Store. Draft:

```
Menyum Privacy Policy

Menyum does not collect, store, or transmit any personal data. All order information is stored locally on your device only.

We do not:
- Collect personal information
- Track user behavior
- Share data with third parties
- Use analytics or advertising

When you click "Order Now," you are redirected to the restaurant's website. Their privacy policy applies.

For questions: dylbot.ai@gmail.com
```

## Submission Checklist

### iOS
- [ ] Xcode project builds without errors
- [ ] App icon 1024x1024 added
- [ ] Screenshots captured (all required sizes)
- [ ] Privacy policy URL added
- [ ] Support URL added
- [ ] App description written
- [ ] Keywords added
- [ ] Age rating set (4+)
- [ ] Pricing (Free)
- [ ] Archived and uploaded via Xcode
- [ ] Submitted for review

### Android
- [ ] Android Studio project builds
- [ ] Signed APK/AAB generated
- [ ] Feature graphic (1024x500)
- [ ] Phone screenshots (2-8)
- [ ] 7" tablet screenshots (2-8)
- [ ] 10" tablet screenshots (2-8)
- [ ] App icon 512x512
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)
- [ ] Privacy policy URL
- [ ] Content rating questionnaire
- [ ] Uploaded to Play Console
- [ ] Submitted for review

## Timeline

- **iOS Review:** 1-3 days typically
- **Android Review:** 1-7 days typically

## Support & Updates

After approval:
1. Monitor reviews and ratings
2. Respond to user feedback
3. Regular updates every 3-6 months
4. Keep dependencies updated

## Notes

- The app currently runs as a PWA (web app wrapper)
- All functionality works through WebViews
- No native code required unless adding device features
- Future: Add native features (camera, notifications, etc.)

## Questions?

Contact: dylbot.ai@gmail.com
