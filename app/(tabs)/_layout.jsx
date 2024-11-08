import { View, Text, Image } from 'react-native'
import React from 'react'

import {Tabs, Redirect} from 'expo-router'
import {icons} from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2 ">
            <Image 
            source={icon} 
            resizeMode='contain'
            tintColor={color}
            className="w-6 h-6"/>
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
        </View>

    )
}

// This layout is used for the screens 
const _layout = () => {
  return (
    <>
    {/* Automatically adds all of the tabs under */}
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#2323533',
                height: 84, // pixels

            },
            
        }}>
        {/* Home Tab */}
        <Tabs.Screen name="home"
        options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.home}
                        color={color}
                        name="home"
                        focused={focused}/>
                )
            }}/>
        {/* Bookmark Tab */}
        <Tabs.Screen name="bookmark"
        options={{
                title: 'Bookmark',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.bookmark}
                        color={color}
                        name="bookmark"
                        focused={focused}/>
                )
            }}/>
        {/*  */}
        <Tabs.Screen name="create"
        options={{
                title: 'Create',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.plus}
                        color={color}
                        name="Create"
                        focused={focused}/>
                )
            }}/>
        {/* Profile Tab */}
        <Tabs.Screen name="profile"
        options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={icons.profile}
                        color={color}
                        name="profile"
                        focused={focused}/>
                )
            }}/>

    </Tabs>
    </>
  )
}

export default _layout