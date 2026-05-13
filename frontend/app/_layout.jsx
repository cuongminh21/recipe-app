import { ClerkLoaded, ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Slot } from 'expo-router'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { COLORS } from '../constants/colors.js'
import TabsLayout from './(tabs)/_layout';
import SafeScreen from '@/components/SafeScreen'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <SafeScreen>
          <TabsLayout />
        </SafeScreen>
        {/* <Slot /> */}
      </ClerkLoaded>


    </ClerkProvider>
  )
}


