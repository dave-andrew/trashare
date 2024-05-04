import { Text } from "react-native";
import { View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function AccumulationPointGraySpan(props: { nominalNumber: string, units: string, icon: any }) {
    return (
        <View className='bg-gray-200 px-2 py-1 rounded-md flex flex-row mr-1'>
            <View className='flex flex-row place-items-center'>
                <FontAwesome size={12} name={props.icon} color={'#656565'} style={[{ marginRight: 6, marginVertical: 2}]} />
                <Text className="text-gray-800 text-xs mr-1 font-medium my-[1px]">
                    {props.nominalNumber}
                </Text>
            </View>
            <Text className="text-gray-700 text-xs font-medium my-[1px]">
                {props.units}
            </Text>
        </View>
    )
}