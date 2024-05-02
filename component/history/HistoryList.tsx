

import { Image, Pressable, Text, View } from "react-native";
import { History } from "../../models/History";
import { useNavigation, useRouter } from "expo-router";


export default function HistoryList({ history }: { history: History}) {

    const navigation = useNavigation();
    const router = useRouter();

    return (
        <Pressable onPress={() => router.push({pathname: "/history/detail", params: {id: history._id}})}
            className="m-2 my-0">
            <View style={{ flexDirection: 'row', elevation: 5 }} className="bg-white mb-2 p-4 rounded-2xl">

                <Image
                    className='w-[30%] h-16 rounded-lg mr-4'
                    source={{
                        uri: 'https://picsum.photos/200/300',
                    }} />

                <View>
                    
                    {history.waste.map((waste, index) => {
                        return (
                            <Text key={index} className="text-xs">{waste.station.name}</Text>
                        )
                    })}

                </View>
            </View>
        </Pressable>
    )
}