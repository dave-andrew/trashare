import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Geo } from "../../app/(tabs)/station";
import { Station } from "../../models/Station";


export default function Map({ location, station }: { location: Geo, station: Station }) {

    let [stationGeometry, setStationGeometry] = useState<Geo>()

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

    console.log(stationGeometry)

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
            <BottomSheet
                style={{ elevation: 5 }}
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
                            onPress={() => {

                            }}
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
    )
}