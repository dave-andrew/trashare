import React, { useContext } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { AdditionalInfoContext } from '../providers/AdditionalInfoProvider';

export default function TabLayout() {

    const { additionalInfo } = useContext(AdditionalInfoContext);
    console.log("Additional Info", additionalInfo)
    
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#00B1F7',
            tabBarStyle: {
                height: 70,
                marginHorizontal: 12,
                marginBottom: 16,
                borderRadius: 10,
                backgroundColor: '#fff',
            },
            tabBarLabelStyle: {
                marginTop: -10,
                marginBottom: 10,
                fontSize: 12,
            },
            headerStyle: {
                borderRadius: 10,
            },
        }}>
            
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="stationPage"
                options={{
                    title: 'Station',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-marker" color={color} />,
                    headerShown: false,
                    href: (additionalInfo?.role === 'user') ? 'stationPage' : null
                }}
            />
            <Tabs.Screen
                name="queuePage"
                options={{
                    title: 'Queue',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
                    headerShown: false,
                    href: (additionalInfo?.role === 'station') ? 'queuePage' : null
                }}
            />
            <Tabs.Screen
                name="cameraPage"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="camera" color={"#fff"}
                        style={[{
                            backgroundColor: '#00B1F7',
                            padding: 20,
                            borderRadius: 56,
                            marginTop: -32
                        }]} />,
                    tabBarItemStyle: {
                        marginHorizontal: -7,
                    },
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="historyPage"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="profilePage"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                    headerShown: false
                }}
            />
            
        </Tabs>
    );
}
