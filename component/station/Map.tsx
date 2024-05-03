import { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Geo } from "../../app/(tabs)/station";
import { Station } from "../../models/Station";
import { useQuery, useRealm } from "@realm/react";
import { History } from "../../models/History";
import { AdditionalInfoContext } from "../../app/providers/AdditionalInfoProvider";
import BottomStationDetail from "./BottomStationDetail";

export default function Map({ location, station }: { location: Geo, station: Station }) {

    const [stationGeometry, setStationGeometry] = useState<Geo>()
    const realm = useRealm()
    const userAdditionalInfo = useContext(AdditionalInfoContext);

    // check if there is a queue that is not completed and the orderer is the same as the logged in user
    const getQueue = useQuery(History).filtered('isComplete == false AND orderer == $0', userAdditionalInfo)

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(getQueue)
        })
        console.log(getQueue);
    }, [realm]);

    useEffect(() => {
        if (station) {
            setStationGeometry({
                latitude: station.geometry.location.lat,
                longitude: station.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        }
    }, [station])

    const handleQueue = (method: string) => {

        const userLocation = {
            lat: location.latitude,
            lng: location.longitude
        }
        const queue: History = {
            location: userLocation,
            station: station,
            waste: [],
            orderer: userAdditionalInfo,
            isComplete: false,
            orderType: method
        }

        addQueue(queue)
        console.log(queue)
    }

    const addQueue = useCallback((queue) => {
        const res = realm.write(() => {
            return realm.create(History, queue)
        }
        )
    }, [realm])

    const deleteQueue = useCallback((queue) => {
        realm.write(
            () => {
                realm.delete(queue)
            }
        )
    }, [realm])

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(getQueue)
        })
    }, [realm, getQueue])

    return (
        <View className="flex-1">
            <MapView className='flex-1' region={stationGeometry ? stationGeometry : location}>
                <Marker
                    coordinate={location}
                    title="You are here!"
                    image={require("../../assets/pin.png")} />
                {stationGeometry && (
                    <Marker
                        coordinate={stationGeometry}
                        title={station.name}
                        image={require("../../assets/pin.png")}
                    />
                )}
            </MapView>
            {station && (
                <BottomStationDetail station={station} getQueue={getQueue} handleQueue={handleQueue} deleteQueue={deleteQueue}/>
            )}

            {!station && getQueue.length > 0 && (
                <BottomStationDetail station={getQueue[0].station} getQueue={getQueue} handleQueue={handleQueue} deleteQueue={deleteQueue}/>
            )}
        </View>
    )
}