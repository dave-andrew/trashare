import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SummaryInformationRoundedBox(props: { categoryName: String, customClass?: String, point: Number, iconName: any }) {
    const bgColor = props.categoryName == "Paper" ? '#feebbb' : props.categoryName == 'Recyclable' ? '#BBF0FE' : '#BBFECA'
    const accentColor = props.categoryName == 'Paper' ? '#FFAA7A' : props.categoryName == 'Recyclable' ? '#5FD7FA' : '#4fe3b7'
    return (
        <View className={"h-28 flex-1 rounded-lg flex flex-col justify-center place-items-center " + props.customClass}
            style={[{
                backgroundColor: bgColor
            }]}>
            <Text className="text-center"><FontAwesome size={40} name={props.iconName} color={accentColor} /></Text>
            <Text className="text-center text-xs font-semibold">{props.categoryName} Waste</Text>
            <Text className="text-center text-lg font-extrabold mt-[-4]">{props?.point?.toFixed(1).toString()} gr</Text>
        </View>
    )
}