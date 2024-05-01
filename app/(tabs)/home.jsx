import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Tabs, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/videoCard'


const Home = () => {
    const {data : posts, refetch} = useAppWrite(getAllPosts);
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch();
        setRefreshing(false)
    }
 

  return (
    <SafeAreaView className="h-full bg-primary">
        <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ListEmptyComponent={() => (
            <EmptyState title="No videos found" subtitle="Check back later for more videos"/>

        )}
        renderItem={({item}) =>(
            <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
                {/* Header Row*/}
                <View className="flex justify-between items-start flex-row mb-6">
                    {/* Text */}
                    <View>
                        <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
                        <Text className="text-2xl font-psemibold text-white">Matthew</Text>
                    </View>
                    {/* Image */}
                    <View className="mt-1.5">
                        <Image
                            source={images.logoSmall}
                            className="w-9 h-10"
                            resizeMode='contain'
                        />
                    </View>
                </View>
                {/* Search */}
                <SearchInput/>

                {/* Latest Videos */}
                <View className="w-full  flex-1 pt-5 pb-8">
                    <Text className="text-gray-100 text-lg font-pregular mb-3">
                        Latest Videos
                    </Text>
                </View>
                <Trending posts={[{id:1}] ?? []} />



            </View>
        )}
        
        />


    </SafeAreaView>
  )
}

export default Home