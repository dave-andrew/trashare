import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EditScreenInfo from '../../component/EditScreenInfo';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from "@gorhom/bottom-sheet"
import { SearchBar } from 'react-native-elements/dist/searchbar/SearchBar';
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';

export default function StationPage() {

    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [errorMsg, setErrorMsg] = useState(null);

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
            <View>
                <ScreenStackHeaderSearchBarView
                    placeholder='Search for a station'
                    onChangeText={() => { }}

                />
            </View>
            <BottomSheet
                backgroundStyle={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                snapPoints={["25%", "40%"]}>
                <View className='flex flex-col p-6 pt-2'>
                    <Text>Compostable Station</Text>
                </View>
            </BottomSheet>
        </View>
    );
}
