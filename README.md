# Magic SDK + Expo + React Native 0.79 Android Compatibility Issue - Minimal Reproduction

## Bug Description

Magic SDK native bridge calls hang indefinitely on **Android** when using **Expo SDK 53** (React Native 0.79.3) with New Architecture enabled. The same code works perfectly with **Expo SDK 52** (React Native 0.76.x).

**This issue specifically affects Android platforms using Expo managed workflow. iOS works correctly when the `magic.Relayer` component is properly configured.**

## Environment

- **Expo SDK**: 53.0.11
- **React Native**: 0.79.3
- **New Architecture**: Enabled
- **Affected Platform**: Android
- **Working Platform**: iOS (with proper magic.Relayer setup)
- **Magic SDK Version**: @magic-sdk/react-native-expo@30.1.0

## Setup Instructions

### 1. Create .env file

Create a `.env` file in the root directory with your Magic public key:

```
EXPO_PUBLIC_MAGIC_PUBLIC_KEY=pk_live_YOUR_TEST_KEY_HERE
```

You can use any valid Magic public key for testing - the hang occurs before any actual authentication.

### 2. Install Dependencies

```bash
npm install
```

### 3. Test the Issue

**Option A: Using Expo Go (Recommended for quick testing)**

```bash
npx expo start
# Press 'a' for Android or 'i' for iOS
```

**Option B: Using Development Build**

```bash
npx expo run:android  # For Android
npx expo run:ios      # For iOS
```

### 4. Reproduce the Hang

1. Open the app on iOS simulator or Android device/emulator
2. Press "Test Magic SDK" button
3. Check console logs - you'll see:
   ```
   🔧 Testing Magic SDK...
   ✅ Magic SDK initialized
   🔍 Calling magic.user.isLoggedIn()...
   ```
4. **On Android: The call will hang indefinitely** - no further logs will appear
5. **On iOS: The call completes successfully** - you'll see completion logs and success alert

## Expected Behavior

- `magic.user.isLoggedIn()` should complete within ~100-500ms
- Console should show completion log with timing
- Alert should appear with success message

## Actual Behavior

### Android

- `magic.user.isLoggedIn()` hangs indefinitely
- No error thrown, no timeout, no response
- App remains functional but Magic SDK calls never resolve

### iOS

- ✅ Works correctly when `magic.Relayer` component is properly configured
- `magic.user.isLoggedIn()` completes successfully
- All Magic SDK functionality works as expected

## Additional Context

- **Working Configuration**:
  - Expo SDK 52 + React Native 0.76 + New Architecture (both iOS and Android) ✅
  - Expo SDK 53 + React Native 0.79 + New Architecture + iOS ✅
- **Broken Configuration**:
  - Expo SDK 53 + React Native 0.79 + New Architecture + Android ❌
- **Android-Specific Issue**: Only affects Android in Expo managed workflow
- Other Magic SDK methods (`magic.user.getInfo()`, etc.) also hang on Android
- Issue appears to be with native bridge communication on Android, not JavaScript layer
- Magic SDK initializes successfully on both platforms - only Android runtime calls hang
- **Possible Root Causes**:
  - React Native 0.79 New Architecture compatibility issue with Magic SDK on Android
  - Expo's specific build/configuration of RN 0.79 affecting Android native modules
  - Magic SDK's Expo wrapper (`@magic-sdk/react-native-expo`) Android-specific compatibility issue

This reproduction demonstrates the exact Android-specific issue blocking production migration from Expo SDK 52 to 53.
