import { View, Text, Image, TouchableOpacity } from 'react-native'
import {React, useState} from 'react'
import {icons } from '../constants'

const VideoCard = ({video: {title, thumbnail, video, creator: {username, avatar}}}) => {
    const [play, setPlay] = useState(false)
  return (
    <View className="flex-col items-center px-4 mb-14"> 
    {/* All for the Header */}
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">

                {/* AVatar */}
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={{uri: avatar}} className="w-full h-full rounded-lg" resizeMode='cover'/>
                </View>

                {/* Title and Creator */}
                <View className="justify-center flex-1 gap-y-1 ml-3">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-xs text-gray-100 text-pregular" numberOfLines={1}>
                        {username}
                    </Text>
                </View>


                {/* Menu  */}
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
            </View>
        </View>

        {play ? (
            <Text className="text-white">
                Playing
            </Text>
        ): (
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(video)}
            className="w-full h-60 rounded-xl mt-3 justify-center relative items-center">
                 <Image source={{uri: thumbnail} }
                 className="w-full h-full rounded-xl mt-3"
                 resizeMode='cover'/>

                 <Image source={icons.play} 
                 className="w-12 h-12 absolute"
                 resizeMode='contain'/>

            </TouchableOpacity>
        )}



    </View>
  )
}

export default VideoCard