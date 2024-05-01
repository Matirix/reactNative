import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import {searchPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/videoCard'


const Search = () => {
    const {query} = useLocalSearchParams()
    // Call back is used for this this function that requires a parameter to be passed into the hook
    const {data : posts, refetch} = useAppWrite(() => searchPosts(query));
    console.log(posts)

    useEffect(() => {
        refetch()
    }, [query])
 

  return (
    <SafeAreaView className="h-full bg-primary">
        <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ListEmptyComponent={() => (
            <EmptyState title="No videos found" subtitle={`No videos found for ${query}`}/>
        )}
        renderItem={({item}) =>(
            <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
            <View className="my-6 px-4"> 
                <Text className="font-pmedium text-sm text-gray-100">Search Results:</Text>
                <Text className="text-2xl font-psemibold text-white">{query}</Text>
                <View className="mt-6 mb-8">
                    <SearchInput initialQuery={query}/>
                </View>
            </View>
        )}
        
        />


    </SafeAreaView>
  )
}

export default Search