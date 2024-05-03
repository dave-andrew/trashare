

import { Image, Pressable, Text, View } from "react-native";
import { History } from "../../models/History";
import { useNavigation, useRouter } from "expo-router";


export default function HistoryItem({ history }: { history: History }) {

    const navigation = useNavigation();
    const router = useRouter();
    console.log("History Item ", history);

    return (
        <Pressable onPress={() => router.push({ pathname: "/history/detail", params: { id: history._id } })}
            className="m-2 my-1">
            <View style={{ flexDirection: 'row', elevation: 5 }} className="bg-white mb-2 p-4 rounded-2xl">

                <Image
                    className='w-[25%] h-16 rounded-lg mr-4'
                    source={{
                        uri: 'https://picsum.photos/200/300',
                    }} />
                <View className="flex flex-row justify-between flex-grow">
                    <View className="flex flex-col justify-between">
                        <Text className="text-lg font-medium">{history.station.name}</Text>
                        {history.isComplete ? (
                            history.waste.map((waste, index) => {
                                return (
                                    <Text key={index} className="text-xs">{waste}</Text>
                                )
                            })
                        ) : (
                            <View style={[{
                                flexDirection: 'row',
                            }]}>
                                <Text className="text-xs">{history.createdAt.toLocaleDateString()}</Text>
                            </View>

                        )}

                    </View>

                    <View className="flex flex-col justify-between">
                        <Text className="text-xs">{history.createdAt.toLocaleDateString()}</Text>
                        <Text className="text-xs">{history.createdAt.toLocaleDateString()}</Text>
                    </View>

                </View>
            </View>
        </Pressable>
    )
}