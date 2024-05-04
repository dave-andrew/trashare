import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Station } from "../../../models/Station";


export default function HistoryDetailTripInfo(props: { station: Station }) {
    return (
        <View className="flex flex-col px-2 py-4 relative border-b border-gray-300">
            <View className="flex flex-row">
                <FontAwesome size={24} name="sitemap" color={'#BBBBBB'} style={[{ marginRight: 14 }]} />
                <Text className="my-1">{props.station.name}</Text>
            </View>
            <View className="h-4 border-l border-gray-500" style={[{
                marginLeft: 11
            }]}></View>
            <View className="flex flex-row">
                <FontAwesome size={24} name="map-marker" color={'#00B1F7'} style={[{ marginRight: 14, paddingHorizontal: 5 }]} />
                <Text style={[{
                    marginTop: 1
                }]}>My Location</Text>
            </View>

        </View>
    )
}