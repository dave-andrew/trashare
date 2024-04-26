import React, { useEffect, useState } from 'react';
import { Text, View, Image, Button, Pressable } from 'react-native';
import EditScreenInfo from '../../component/EditScreenInfo';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from "@gorhom/bottom-sheet"
import SearchBar from "react-native-dynamic-search-bar";

export default function StationPage() {

    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });
        })();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapView className='flex-1' region={location} />
            <View className='absolute top-16 left-0 right-0'>
                <SearchBar
                    placeholder='Search for a station'
                    onChangeText={(text) => { setSearch(text) }}
                    value={search}
                />
            </View>
            <BottomSheet
                style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4.5, elevation: 5 }}
                snapPoints={['22%', '30%']}>
                <View className='p-6 pt-0'>
                    <View className='flex items-center'>
                        <Text className='text-lg font-bold'>Compostable Station</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }} className='mt-4'>
                        <Image
                            className='w-[40%] h-24 rounded-lg mx-auto'
                            source={{
                                uri: 'https://picsum.photos/200/300',
                            }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text className='font-bold text-green-500'>Open</Text>
                                <Text className='ml-2 font-medium'>08:00 - 17:00</Text>
                            </View>
                            <Text className='text-gray-500'>Jl. Raya Bogor, No. 1, Jakarta</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }} className='justify-around mt-4'>
                        <Pressable
                            className='bg-blue-400 w-40 py-2 rounded-full flex items-center'
                            onPress={() => { }}
                        >
                            <Text className='color-white font-medium'>Send Waste</Text>
                        </Pressable>
                        <Pressable
                            className='bg-blue-400 w-40 py-2 rounded-full flex items-center'
                            onPress={() => { }}
                        >
                            <Text className='color-white font-medium'>Visit Location</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}
