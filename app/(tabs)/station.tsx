import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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
            <View className='absolute top-5 left-0 right-0'>
                <SearchBar
                    placeholder='Search for a station'
                    onChangeText={(text) => { setSearch(text) }}
                    value={search}
                />
            </View>
            <BottomSheet
                style={{shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}
                snapPoints={["25%", "40%"]}>
                <View className='flex flex-col p-6 pt-2'>
                    <Text>Compostable Station</Text>
                </View>
            </BottomSheet>
        </View>
    );
}
