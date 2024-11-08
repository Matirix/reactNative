import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import {Redirect, router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants'
import CustomButton from '../components/customButton';
import { useGlobalContext } from '../context/globalProvider';
export default function App() { 
    const { isLoading, isLoggedIn} = useGlobalContext();
    if (!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{height:'100%'}}>
            <View className="h-min-[85vh] w-full items-center px-4 justify-center">
                {/* Logo */}
                <Image
                    source={images.logo}
                    className="w-[130px] h-[84px]"
                    resizeMode='contain'/>
                {/* Cards */}
                <Image 
                    source={images.cards}
                    className="max-w-[380px] w-full h-[300px]"
                    resizeMode='contain'/>

                {/* Text Boxes */}
                <View className="relative mt-5">
                    {/* Text */}
                    <Text className="text-3xl text-white font-bold items-center">
                        Discover Endless Possibilities with {' '}
                        <Text className="text-secondary-200">Aora</Text>
                    </Text>
                    {/* Underlined */}
                    <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                    resizeMode="contain"/>

                    <Text className="text-gray-100 text-sm font-pregular mt-7 text-center">
                        Where creativity meets inovation: embark on a journey of endless possibilities with Aora.
                    </Text>
                </View>

                {/* Button */}
                <CustomButton 
                    title="Continue with email"
                    handlePress={()=>router.push('/sign-in')}
                    containerStyles="w-full mt-7"/>
            </View>
            

        </ScrollView>
        <StatusBar backgroundColor="#161622"style="light"/>
    </SafeAreaView>
  );
}
