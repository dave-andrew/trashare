import { Image, Pressable, Text, View } from "react-native";
import { Station } from "../../models/Station";
import { useEffect, useState } from "react";


export default function SearchStationItem({ station, setStation }: { station: Station, setStation: React.Dispatch<React.SetStateAction<Station>> }) {

    const [isOpen, setIsOpen] = useState<boolean>(false)


    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        return new Date().setHours(parseInt(hours), parseInt(minutes), 0);
    };

    useEffect(() => {
        if (station) {
            const currentTimeMillis = new Date().getTime();
            console.log("Time: ", currentTimeMillis, parseTime(station?.openingHours.open), parseTime(station?.openingHours.close));

            if (parseTime(station?.openingHours.open) <= currentTimeMillis &&
                parseTime(station?.openingHours.close) >= currentTimeMillis) {
                setIsOpen(true);
            }
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