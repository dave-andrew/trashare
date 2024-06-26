import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Map from '../../component/station/Map';
import SearchStationList from '../../component/station/SearchStationList';
import * as Location from 'expo-location';
import { Station } from '../../models/Station';

import { getUserQueue } from '../datas/queries/useQueries';
import { useRealm } from '@realm/react';

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

    const realm = useRealm();
    const getQueue = getUserQueue(realm)
    console.log("Queue: ", getQueue)

    const [errorMsg, setErrorMsg] = useState(null);
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const [station, setStation] = useState<Station>();
    console.log("Current Station", station)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(getQueue)
        })
    }, [realm, getQueue]);

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

    return (
        <View style={{ flex: 1 }}>
            <View className='absolute top-12 left-0 right-0 z-10'>
                {getQueue.length === 0 && (
                    <SearchBar
                        placeholder='Search station...'
                        style={{ elevation: 5, borderRadius: 100, padding: 5, width: '95%' }}
                        onChangeText={(text) => { setSearch(text) }}
                        value={search}
                        onClearPress={() => { setIsSearching(false); setSearch('') }}
                        onFocus={() => { setIsSearching(true) }}
                    />
                )}
            </View>

            {(isSearching && getQueue.length === 0) ? (
                <View className='flex-1'>
                    <SearchStationList setStation={setStation} search={search} />
                </View>
            ) : (
                <View className='flex-1'>
                    <Map location={location} station={(getQueue.length > 0) ? getQueue[0].station : station} />
                </View>
            )}
        </View>
    );
}
