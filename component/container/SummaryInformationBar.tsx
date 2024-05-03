import { View } from "react-native";
import SummaryInformationRoundedBox from "./SummaryInformationRoundedBox";


export default function SummaryInformationBar(props: {paperPoints: Number, recyclablePoints: Number, compostPoints: Number}) {
    return (
        <View className="flex flex-row mx-4">
            <SummaryInformationRoundedBox categoryName={'Paper'} iconName={'sticky-note'} point={props.paperPoints}/>
            <SummaryInformationRoundedBox categoryName={'Recyclable'} customClass="mx-3" iconName={'recycle'} point={props.recyclablePoints}/>
            <SummaryInformationRoundedBox categoryName={'Compost'} iconName={'leaf'} point={props.compostPoints}/>
        </View>
    )
}