import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Map from '../../component/station/Map';
import SearchStationList from '../../component/station/SearchStationList';
import * as Location from 'expo-location';
import { Station } from '../../models/Station';
import QueuePage from '../../component/queue/queue';
import { AdditionalInfoContext } from '../providers/AdditionalInfoProvider';

export interface Geo {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

export default function StationPage() {

    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const userAdditionalInfo = useContext(AdditionalInfoContext);

    const [errorMsg, setErrorMsg] = useState(null);
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [station, setStation] = useState<Station>();

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

    useEffect(() => {
        setIsSearching(false)
    }, [station])

    // TODO: kasih validasi user disini, kalo dia milik station, maka dia akan menampilkan Queue Page
    if (userAdditionalInfo?.role === 'station') {
        return <QueuePage />
    }

    return (
        <View style={{ flex: 1 }}>
            <View className='absolute top-16 left-0 right-0 z-10'>
                <SearchBar
                    placeholder='Search for a station'
                    style={{elevation: 5}}
                    onChangeText={(text) => { setSearch(text) }}
                    value={search}
                    onClearPress={() => { setSearch('') }}
                    onFocus={() => { setIsSearching(true) }}
                />
            </View>

            {isSearching ? (
                <View className='flex-1'>
                    <SearchStationList setStation={setStation} search={search} />
                </View>
            ) : (
                <View className='flex-1'>
                    <Map location={location} station={station} />
                </View>
            )}
        </View>
    );
}