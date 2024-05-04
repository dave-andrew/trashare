import { Image, Text, View } from "react-native";
import { AccumulationPointGraySpan } from "../../container/AccumulationPointGraySpan";
import { Station } from "../../../models/Station";
import { Waste } from "../../../models/Waste";


export default function HistoryDetailStationInfo(props: { station: Station, wastes: any[], createdAt: Date }) {
    let totalWeight = props.wastes.reduce((total, waste) => total + waste.weight, 0);
    let totalPoints = props.wastes.reduce((total, waste) => {
        if (waste.wasteType == "Paper") {
            return total + waste.weight * 2
        } else if (waste.wasteType == "Recyclable") {
            return total + waste.weight
        } else {
            return total + waste.weight * 7
        }
    }, 0)
    return (
        <View className="flex flex-row w-full pb-6 pt-2 border-b border-gray-300">
            {/* Image */}
            <Image className="rounded-xl w-20 h-20" source={{
                uri: props.station.imageUrl
            }} />

            {/* Station Data */}
            <View className="flex flex-col justify-between pl-3 w-[52%]">
                <Text className="font-medium" style={[{
                    fontSize: 16,
                    fontWeight: 'bold'
                }]}>{props.station?.name}</Text>
                <View className="flex flex-row place-items-center">
                    <AccumulationPointGraySpan nominalNumber={totalWeight.toFixed(1)} units="g" icon="anchor" />
                    <AccumulationPointGraySpan nominalNumber={totalPoints.toFixed(1)} units="pt" icon="database" />
                </View>
            </View>
            <Text className="text-xs text-gray-600">{props.createdAt?.toDateString()}</Text>
        </View>
    )
}