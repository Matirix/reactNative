import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/customButton';
import {Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [isSubmitting, setisSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password || !form.username) {
            Alert.alert('Error', 'Please fill in all the fields')
        }

        setisSubmitting(true)
        
        try{
            await createUser(form.email, form.password, form.username)
            router.replace('/home')
            
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setisSubmitting(false)
        }
    }

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
        <View  className="w-full min-h-[83vh] justify-center px-4 my-6">
            <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold"> Sign up for Aora</Text>

            {/* Form Fields */}
            <FormField 
                title="Username"
                value={form.username}
                handleChangeText={(e) => setForm({ ...form, username: e })}
                otherStyles="mt-7"
                keyboardType="email-address"/>  
            <FormField 
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"/>  
            <FormField 
                title="Password"
                value={form.password}
                handleChangeText={(e)=>setForm({...form, password: e})}  
                otherStyles="mt-7"
           />  
           {/* Submit Button */}
           <CustomButton title="Sign Up" 
           handlePress={submit}
           containerStyles={"mt-7"}
           isLoading={isSubmitting}/>

           <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
                <Link className='text-secondary text-lg font-psemibold' href={'/sign-in'}>Sign in</Link>
           </View>

        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp