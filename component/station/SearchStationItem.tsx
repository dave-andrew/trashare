import { Image, Pressable, Text, View } from "react-native";
import { Station } from "../../models/Station";


export default function SearchStationItem({ station, setStation }: { station: Station, setStation: React.Dispatch<React.SetStateAction<Station>>}) {

    const test = () => {
        setStation(station)
    }

    return (
        <Pressable onPress={test}
            className="m-2 my-0">
            <View style={{ flexDirection: 'row', elevation: 5 }} className="bg-white mb-2 p-4 rounded-xl">

                <Image
                    className='w-[30%] h-20 rounded-lg mr-4'
                    source={{
                        uri: 'https://picsum.photos/200/300',
                    }} />

                <View>
                    <Text className="font-medium">{station.name}</Text>
                    <Text className="text-xs">{station.openingHours.open} - {station.openingHours.close}</Text>
                    <Text className="text-xs">{station.formattedAddress}</Text>
                </View>
            </View>
        </Pressable>
    )
}