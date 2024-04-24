import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EditScreenInfo from '../../component/EditScreenInfo';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Station() {

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
            <Text>Station</Text>
            <MapView style={{ flex: 1 }} region={location} />
            <EditScreenInfo path="app/(tabs)/station.tsx" />
        </View>
    );
}
