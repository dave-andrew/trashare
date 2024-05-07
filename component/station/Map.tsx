import { useContext, useEffect, useState } from "react";
import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Geo } from "../../app/(tabs)/stationPage";
import { Station } from "../../models/Station";
import { useRealm } from "@realm/react";
import { AdditionalInfoContext } from "../../app/providers/AdditionalInfoProvider";
import BottomStationDetail from "./BottomStationDetail";
import { getUserQueue } from "../../app/datas/queries/useQueries";
import { useQueueMutation } from "../../app/datas/mutations/useMutations";
import MapViewDirections from "react-native-maps-directions";

export default function Map({ location, station }: { location: Geo, station: Station }) {

    const [stationGeometry, setStationGeometry] = useState<Geo | null>()
    const { additionalInfo } = useContext(AdditionalInfoContext);
    const realm = useRealm()

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
        const queue = {
            location: {
                lat: location.latitude,
                lng: location.longitude
            },
            station: station,
            orderer: additionalInfo._id,
            isComplete: false,
            orderType: method
        }
        console.log(queue);

        addQueue(queue)
    }

    const getQueue = getUserQueue(realm)
    const { addQueue } = useQueueMutation(realm, getQueue)
    const { deleteQueue } = useQueueMutation(realm, getQueue)
    

    return (
        <View className="flex-1">
            <MapView className='flex-1' region={stationGeometry ? stationGeometry : location}>
                <Marker
                    coordinate={location}
                    title="You are here!">
                    <Image
                        source={require('../../assets/marker/main-pin.png')}
                        style={{ width: 50, height: 50, display: "flex" }}
                        resizeMode="contain"
                    />
                </Marker>
                {station && (
                    <Marker
                        coordinate={stationGeometry}
                        title={station.name}
                    >
                        <Image
                            source={
                                station.mainType == "Recyclable" ?
                                    require('../../assets/marker/recycle-pin.png') :
                                    station.mainType == "Compost" ?
                                        require('../../assets/marker/compost-pin.png') :
                                        require('../../assets/marker/paper-pin.png')
                            }
                            style={{ width: 50, height: 50, display: "flex" }}
                            resizeMode="contain"
                        />
                    </Marker>
                )}
                <MapViewDirections
                    origin={location}
                    destination={stationGeometry}
                    apikey={"AIzaSyDXtsGosJEIjjY8aUkldb3ougbAyDBI3xY"}
                    strokeWidth={2}
                    strokeColor="black"
                />
            </MapView>
            {station && (
                <BottomStationDetail station={station} getQueue={getQueue} handleQueue={handleQueue} deleteQueue={deleteQueue} />
            )}
        </View>
    )
}