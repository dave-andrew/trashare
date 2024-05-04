import { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Geo } from "../../app/(tabs)/stationPage";
import { Station } from "../../models/Station";
import { useRealm } from "@realm/react";
import { History } from "../../models/History";
import { AdditionalInfoContext } from "../../app/providers/AdditionalInfoProvider";
import BottomStationDetail from "./BottomStationDetail";
import { getUserHistory, getUserQueue } from "../../app/datas/queries/useQueries";
import { useQueueMutation } from "../../app/datas/mutations/useMutations";
import MapViewDirections from 'react-native-maps-directions';
import { SYNC_CONFIG } from "../../sync.config";

export default function Map({ location, station }: { location: Geo, station: Station }) {

    const [stationGeometry, setStationGeometry] = useState<Geo>()
    const realm = useRealm()
    const { additionalInfo } = useContext(AdditionalInfoContext);

    const getQueue = getUserQueue()
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(getQueue)
        })
        console.log(getQueue);
    }, [realm]);

    useEffect(() => {
        if (getQueue[0]?.station) {
            setStationGeometry({
                latitude: getQueue[0].station.geometry.location.lat,
                longitude: getQueue[0].station.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })

            return;
        }

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
        const queue = {
            location: {
                lat: location.latitude,
                lng: location.longitude
            },
            station: station,
            waste: [],
            orderer: additionalInfo,
            isComplete: false,
            orderType: method
        }
        addQueue(queue)
    }

    const { addQueue } = useQueueMutation(realm, getQueue)
    const { deleteQueue } = useQueueMutation(realm, getQueue)

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
                        title={getQueue[0].station.name}
                        image={require("../../assets/pin.png")}
                    />
                )}
                {/* <MapViewDirections
                    origin={location}
                    destination={stationGeometry}
                    apikey={"AIzaSyDXtsGosJEIjjY8aUkldb3ougbAyDBI3xY"}
                    strokeWidth={2}
                    strokeColor="lightblue"
                /> */}
            </MapView>
            {station && (
                <BottomStationDetail station={station} getQueue={getQueue} handleQueue={handleQueue} deleteQueue={deleteQueue} />
            )}

            {!station && getQueue.length > 0 && (
                <BottomStationDetail station={getQueue[0].station} getQueue={getQueue} handleQueue={handleQueue} deleteQueue={deleteQueue} />
            )}
        </View>
    )
}