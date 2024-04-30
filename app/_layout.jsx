import { Text, View } from 'react-native'
import {Stack, SplashScreen } from 'expo-router'
import { useFonts} from 'expo-font'
import React, { useEffect } from 'react'

// Prevents autohiding before the assets are loadin
SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
      });

    useEffect(() => {
        if (error) throw error;
        // Make sure you have a splashscreen to show otherwise it'll just be a white screen
        // This is used to hide the native splash screen
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null;
        
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerShown: false
        }}/>
    </Stack>
  )
}

export default RootLayout

