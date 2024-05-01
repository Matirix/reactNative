import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import {ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/customButton'
import * as ImagePicker from 'expo-image-picker'
import {router} from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'

const Create = () => {
    const {user} = useGlobalContext()
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        thumbnail: '',
        prompt: '',

    })

    const openPicker = async (selectType) => {
        // const result = await DocumentPicker.getDocumentAsync({
        //     type: selectType === 'image' 
        //     ? ['image/png', 'image/jpg', 'image/jpeg']
        //     : ['video/mp4', 'video/gif']
        // }) 

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4,3],
            quality: 1,

        })

        if(!result.canceled) {
            if(selectType === 'image') {
                setForm({...form, thumbnail: result.assets[0]})
            }
            
            if(selectType === 'video') {
                setForm({...form, video: result.assets[0]})
            }
        } else {
            setTimeout(() => {
                Alert.alert('Document picked', 'Document Picked!')
            }, 100)
        }

    }

    const submit = async () => {
        if(!form.title || !form.video || !form.thumbnail || !form.prompt) {
            return Alert.alert('Error', 'Please fill in all the fields')
        }
        setUploading(true)

        try {
            await createVideo({...form, userId: user.$id})
            Alert.alert('Success', 'Video uploaded successfully')
        } catch (error) {
            Alert.alert('Error', error.message)
            router.push('/home')
        } finally {
            setForm({
                title: '',
                description: '',
                thumbnail: '',
                prompt: '',
            })
            setUploading(false)
        }
    }
  return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView className="px-4 my-6">
            <Text className="text-2xl text-white font-psemibold">
                Upload Video
            </Text>
            {/* Title field */}
            <FormField title="Title"
            value={form.value}
            placeholder={'Give your video a catchy title'}
            handleChangeText={(e) => setForm({...form, title: e})}
            otherStyles="mt-10"/>

            {/* Upload Video */}
            <View className="mt-6">
                <Text className="text-base text-gray-100 font-pmedium ">
                    Upload Video
                </Text>
                <TouchableOpacity onPress={() => openPicker('video')}>
                    {form.video ? (<Video
                    source={{uri: form.video.uri}}
                    className="w-full h-64 rounded-2xl"
                    resizeMode={ResizeMode.COVER}
                    />) : 
                    (<View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                        <View className="w-14 h-14 border border-dashed border-secondary-100 justify center items-center">
                            <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain'/>
                        </View>

                    </View>)}
                </TouchableOpacity>
            </View>
            {/* Thumbnail Image */}
            <View className="mt-7 space-y-2">
                <Text className="text-base text-gray-100 font-pmedium ">
                    Upload Thumbnail
                </Text>

                <TouchableOpacity onPress={() => openPicker('image')}>
                    {form.thumbnail ? 
                    (<Image source={{uri: form.thumbnail.uri}}
                    resizeMode='cover'
                    className="w-full h-64 rounded-2xl"/>) 
                    : 
                    (<View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                        <Image source={icons.upload} className="w-1/4 h-1/2" resizeMode='contain'/>
                        <Text className="text-sm font-pmedium text-gray-100">Choose a file</Text>
                    </View>)}
                </TouchableOpacity>
            </View>

            {/* Prompt */}
            <FormField title="AI Prompt"
            value={form.prompt}
            placeholder={'The prompt you used to create this video'}
            handleChangeText={(e) => setForm({...form, prompt: e})}
            otherStyles="mt-10"/>
            {/* Button */}
            <CustomButton
            title={"Submit & Publish"}
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={uploading}
            />



        </ScrollView>

    </SafeAreaView>

  )
}

export default Create