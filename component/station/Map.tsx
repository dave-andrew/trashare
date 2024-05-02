import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useContext, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Geo } from "../../app/(tabs)/station";
import { Station } from "../../models/Station";
import { useQuery, useRealm, useUser } from "@realm/react";
import { History } from "../../models/History";
import { AdditionalInfoContext } from "../../app/providers/AdditionalInfoProvider";

export default function Map({ location, station }: { location: Geo, station: Station }) {

    const [stationGeometry, setStationGeometry] = useState<Geo>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const realm = useRealm()
    const userAdditionalInfo = useContext(AdditionalInfoContext);
    const user = useUser();

    // check if there is a queue that is not completed and the orderer is the same as the logged in user
    const getQueue = useQuery(History).filtered(`isComplete == false`);
    console.log("queue", getQueue)

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
        const queue : History = {
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
        if (station) {
            if (parseInt(station.openingHours.open) < new Date().getHours() && parseInt(station.openingHours.close) > new Date().getHours()) {
                setIsOpen(true)
                return
            }
            setIsOpen(false)
        }
    }, [])

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
                <BottomSheet
                    style={{ elevation: 5 }}
                    snapPoints={['22%', '30%']}>
                    <View className='p-6 pt-0'>
                        <View className='flex items-center'>
                            <Text className='text-lg font-bold'>{station.name}</Text>
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
                                    <Text className={`font-bold ${isOpen ? "text-green-500" : "text-red-300"}`}>{isOpen ? "Open" : "Close"}</Text>
                                    <Text className='ml-2 font-medium'>{station.openingHours.open} - {station.openingHours.close}</Text>
                                </View>
                                <Text className='text-gray-500'>{station.formattedAddress}</Text>
                            </View>
                        </View>
                        {getQueue.length == 0 ? (
                            <View style={{ flexDirection: 'row' }} className='justify-around mt-4'>
                                <Pressable
                                    className='bg-blue-400 w-40 py-2 rounded-full flex items-center'
                                    onPress={() => {
                                        handleQueue('send')
                                    }}
                                >
                                    <Text className='color-white font-medium'>Send Waste</Text>
                                </Pressable>
                                <Pressable
                                    className='bg-blue-400 w-40 py-2 rounded-full flex items-center'
                                    onPress={() => {
                                        handleQueue('visit')
                                    }}
                                >
                                    <Text className='color-white font-medium'>Visit Location</Text>
                                </Pressable>
                            </View>
                        ) : (
                            <View className='mt-4'>
                                <Text className='font-bold'>Queue On Progress</Text>
                                <Pressable
                                    className='bg-red-400 w-40 py-2 rounded-full flex items-center'
                                    onPress={() => {
                                        deleteQueue(getQueue[0])
                                    }}
                                >
                                    <Text className='color-white font-medium'>Cancel</Text>
                                </Pressable>
                            </View>
                        )}



                    </View>
                </BottomSheet>
            )}
        </View>
    )
}