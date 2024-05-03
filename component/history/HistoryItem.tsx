import FontAwesome from '@expo/vector-icons/FontAwesome';
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
            <View style={{ flexDirection: 'row', elevation: 5 }} className="bg-white mb-2 p-4 rounded-xl">

                <Image
                    className='w-16 h-16 rounded-full mr-4'
                    source={{
                        uri: 'https://picsum.photos/200/300',
                    }} />
                <View className="flex flex-row justify-between flex-grow">
                    <View className="flex flex-col justify-between">
                        <Text className=" font-medium">{history.station.name}</Text>
                        {history.isComplete ? (() => {
                            let totalWeight = history.waste.reduce((total, waste) => total + waste.weight, 0);
                            let totalPoints = history.waste.reduce((total, waste) => {
                                if (waste.wasteType == "Paper") {
                                    return total + waste.weight * 2
                                } else if (waste.wasteType == "Recyclable") {
                                    return total + waste.weight
                                } else {
                                    return total + waste.weight * 7
                                }
                            }, 0)
                            return (
                                <View className="flex flex-row place-items-center">
                                    <View className='bg-gray-200 w-[74px] px-2 py-1 rounded-md flex flex-row justify-between mr-1'>
                                        <View className='flex flex-row place-items-center'>
                                            <FontAwesome size={9} name="anchor" color={'#656565'} style={[{ paddingVertical: 4, marginRight: 3 }]} />
                                            <Text className="text-gray-700 text-xs">
                                                {totalWeight.toFixed(1)}
                                            </Text>
                                        </View>
                                        <Text className="text-gray-600 text-xs">
                                            g
                                        </Text>
                                    </View>
                                    <View className='bg-gray-200 w-[74px] px-2 py-1 rounded-md flex flex-row justify-between'>
                                        <View className='flex flex-row place-items-center'>
                                            <FontAwesome size={9} name="anchor" color={'#656565'} style={[{ paddingVertical: 4, marginRight: 3 }]} />
                                            <Text className="text-gray-700 text-xs">
                                                {totalPoints.toFixed(1)}
                                            </Text>
                                        </View>
                                        <Text className="text-gray-600 text-xs">
                                            pt
                                        </Text>
                                    </View>
                                </View>
                            )
                        })() : (
                            <View style={[{
                                flexDirection: 'row',
                            }]}>
                                <Text className="text-yellow-600 bg-yellow-300 px-2 py-1 rounded-xl">Pending</Text>
                            </View>

                        )}

                    </View>

                    <View className="flex flex-col justify-between">
                        <Text className="text-xs text-gray-400">{history.createdAt.toLocaleDateString()}</Text>
                        {/* Create logo for each waste*/}
                        <View className='flex flex-row justify-end'>
                            {history.isComplete &&
                                history.waste.map((waste, index) => {
                                    return (
                                        waste.wasteType == 'Paper' ? <FontAwesome key={index} size={14} name="sticky-note" color={'#FFAA7A'} style={[{
                                            padding: 2
                                        }]} /> :
                                            waste.wasteType == 'Recyclable' ? <FontAwesome key={index} size={14} name="recycle" color={'#5FD7FA'} style={[{
                                                padding: 2
                                            }]} /> :
                                                <FontAwesome key={index} size={14} name="leaf" color={'#4FE3B7'} style={[{
                                                    padding: 2
                                                }]} />
                                    )
                                })
                            }
                        </View>
                    </View>

                </View>
            </View>
        </Pressable>
    )
}