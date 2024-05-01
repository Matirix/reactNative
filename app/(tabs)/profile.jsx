import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import {getUserPosts, signOut } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/videoCard'
import { useGlobalContext } from '../../context/globalProvider'
import {icons} from '../../constants'
import {router} from 'expo-router'



const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
    return (
      <View className={containerStyles}>
        <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
          {title}
        </Text>
        <Text className="text-sm text-gray-100 text-center font-pregular">
          {subtitle}
        </Text>
      </View>
    );
  };

const Profile = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext()
    // Call back is used for this this function that requires a parameter to be passed into the hook
    const {data : posts, refetch} = useAppWrite(() => getUserPosts(user.$id));
    const logOut = async() => {
        await signOut();
        setUser(null)
        setIsLoggedIn(false)
        router.replace('/sign-in')
    }
    const safePosts = posts || [];



  return (
    <SafeAreaView className="h-full bg-primary">
        <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ListEmptyComponent={() => (
            <EmptyState title="No videos found" subtitle={`No videos found for ${user.username}`}/>
        )}
        renderItem={({item}) =>(
            <VideoCard video={item}/>

        )}
        ListHeaderComponent={() => (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                {/* Logout */}
                <TouchableOpacity 
                onPress={logOut}
                className="w-full items-end mb-10">
                    <Image source={icons.logout} className="w-6 h-6"/>
                </TouchableOpacity>

                <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                    <Image source={{uri: user?.avatar}} className="w-[90%] h-[90%] rounded-lg" resizeMode='cover'/>
                </View>
                <Text className="text-2xl text-white font-psemibold mt-4">{user.username}</Text>
                <View className="mt-5 flex-row">
                    <InfoBox title={safePosts.length || 0} subtitle="Videos" containerStyles="mr-10" titleStyles={"text-xl"}/>
                    <InfoBox title={"239"} subtitle="Followers" titleStyles={"text-xl"}/>

                </View>
            </View>
        )}
        
        />


    </SafeAreaView>
  )
}

export default Profile