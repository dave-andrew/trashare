import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import {useUser} from "@realm/react";

export default function TabLayout() {

    return (
        <Tabs screenOptions={{ 
            tabBarActiveTintColor: 'blue',
            tabBarStyle: {
                margin: 8,
                marginBottom: 16,
                borderRadius: 10,
                paddingVertical: 8,
            },
            headerStyle: {
                borderRadius: 10,
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="station"
                options={{
                    title: 'Station',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-pin" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="camera" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                    headerShown: false
                }}
            />
        </Tabs>
    );
}
