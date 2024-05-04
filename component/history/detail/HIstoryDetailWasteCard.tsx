import { Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, View } from "react-native";
import { AccumulationPointGraySpan } from "../../container/AccumulationPointGraySpan";



export default function HistoryDetailWasteCard(props: { waste: any }) {

    let points;
    if (props.waste.wasteType === 'Compost') {
        points = props.waste.weight * 7;
    } else if (props.waste.wasteType === 'Paper') {
        points = props.waste.weight * 2;
    } else {
        points = props.waste.weight;
    }

    return (
        <View className="flex flex-row w-full py-4 border-b border-gray-300 place-items-center ">
            {/* Image */}
            <Image className="rounded-xl w-20 h-20" source={{
                uri: props.waste.imageUrl
            }} />

            {/* Waste Data */}
            <View className="flex flex-col pl-3 justify-center flex-grow">
                <Text className="font-medium mb-1" style={[{
                    fontSize: 16,
                    fontWeight: 'bold'
                }]}>Category: {props.waste?.wasteType} Waste</Text>
                <View className="flex flex-row place-items-center">
                    <View className='py-1 rounded-md flex flex-row mr-8'>
                        <View className='flex flex-row place-items-center'>
                            <FontAwesome size={16} name="anchor" color={'#656565'} style={[{ marginRight: 10, marginVertical: 2 }]} />
                            <Text className="text-gray-800 mr-1 font-medium my-[1px]">
                                {props.waste.weight.toFixed(2)}
                            </Text>
                        </View>
                        <Text className="text-gray-700 font-medium my-[1px]">
                            g
                        </Text>
                    </View>
                    <View className='py-1 rounded-md flex flex-row'>
                        <View className='flex flex-row place-items-center'>
                            <FontAwesome size={16} name="database" color={'#656565'} style={[{ marginRight: 10, marginVertical: 2 }]} />
                            <Text className="text-gray-800 mr-1 font-medium my-[1px]">
                                {points}
                            </Text>
                        </View>
                        <Text className="text-gray-700 font-medium my-[1px]">
                            pts
                        </Text>
                    </View>
                </View>
            </View>
            {props.waste.wasteType == 'Paper' ? <FontAwesome size={20} name="sticky-note" color={'#FFAA7A'} style={[{
                padding: 2
            }]} /> :
                props.waste.wasteType == 'Recyclable' ? <FontAwesome size={20} name="recycle" color={'#5FD7FA'} style={[{
                    padding: 2
                }]} /> :
                    <FontAwesome size={20} name="leaf" color={'#4FE3B7'} style={[{
                        padding: 2
                    }]} />}
        </View>
    )
}