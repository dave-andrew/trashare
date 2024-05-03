import { Image, Pressable, Text, View } from "react-native";
import { Station } from "../../models/Station";
import { useEffect, useState } from "react";


export default function SearchStationItem({ station, setStation }: { station: Station, setStation: React.Dispatch<React.SetStateAction<Station>>}) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (station) {
        if (parseInt(station.openingHours.open) < new Date().getHours() && parseInt(station.openingHours.close) > new Date().getHours()) {
            setIsOpen(true)
            return
        }
        setIsOpen(false)
        }
    }, [])

    const test = () => {
        setStation(station)
    }

    return (
        <Pressable onPress={test} className="mx-4">
            <View style={{ flexDirection: 'row', elevation: 5 }} className="bg-white mb-2 p-4 rounded-xl">

                <Image
                    className='w-[30%] h-24 rounded-lg mr-4'
                    source={{
                        uri: station.imageUrl,
                    }} />

                <View className="w-[65%]">
                    <Text className="font-bold">{station.name}</Text>
                    <View className="flex flex-row items-center gap-1">
                        <Text className={`font-bold ${isOpen ? "text-green-500" : "text-red-500"}`}>{isOpen ? "Open" : "Close"}</Text>
                        <Text className="text-xs font-medium">({station.openingHours.open} - {station.openingHours.close})</Text>
                    </View>
                    <Text className="text-xs mt-1">{station.formattedAddress}</Text>
                </View>
            </View>
        </Pressable>
    )
}