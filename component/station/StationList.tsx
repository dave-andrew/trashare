import { Image, Pressable, Text, View } from "react-native";
import { Station } from "../../models/Station";


export default function StationList({ station, setStation }: { station: Station, setStation: any}) {

    const test = () => {
        setStation(station)
    }

    return (
        <Pressable onPress={test}
            className="m-2 my-0">
            <View style={{ flexDirection: 'row', elevation: 5 }} className="bg-white mb-2 p-4 rounded-2xl">

                <Image
                    className='w-[30%] h-16 rounded-lg mr-4'
                    source={{
                        uri: 'https://picsum.photos/200/300',
                    }} />

                <View>
                    <Text className="font-medium">{station.name}</Text>
                    <Text className="text-xs">{station.formattedAddress}</Text>
                </View>
            </View>
        </Pressable>
    )
}