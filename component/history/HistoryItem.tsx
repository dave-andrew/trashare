import { Image, Pressable, Text, View } from "react-native";
import { History } from "../../models/History";
import { useRouter } from "expo-router";
import { AccumulationPointGraySpan } from "../container/AccumulationPointGraySpan";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HistoryItem({ history }: { history: History }) {

    const router = useRouter();

    const handleNavigate = () => {
        if (!history.isComplete) {
            router.push({ pathname: "/(tabs)/stationPage" })
        } else {
            router.push({ pathname: "/history/detail", params: { id: history._id } })
        }
    }
    return (
        <Pressable onPress={handleNavigate}
            className="m-2 my-1">
            <View style={{ flexDirection: 'row', elevation: 5 }} className="bg-white mb-2 p-4 rounded-xl">

                <Image
                    className='w-16 h-16 rounded-full mr-3'
                    source={{
                        uri: history?.station?.imageUrl,
                    }} />
                <View className="flex flex-row justify-between flex-grow">
                    <View className="flex flex-col justify-between">
                        <Text className=" font-medium">{history?.station?.name}</Text>
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
                                    <AccumulationPointGraySpan nominalNumber={totalWeight.toFixed(1)} units="g" icon="anchor" />
                                    <AccumulationPointGraySpan nominalNumber={totalPoints.toFixed(1)} units="pt" icon="database" />
                                </View>
                            )
                        })() : (
                            <View style={[{
                                flexDirection: 'row',
                            }]}>
                                <Text className="text-yellow-600 bg-yellow-200 px-6 py-1 rounded-xl text-xs">Pending</Text>
                            </View>

                        )}

                    </View>

                    <View className="flex flex-col justify-between place-items-end">
                        <Text className="text-gray-400 text-end" style={[{
                            fontSize: 10,
                            alignSelf: 'flex-end'
                        }]}>{history.createdAt.toLocaleDateString()}</Text>
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