import { Text, View, ViewProps } from "react-native";

export function DashboardRoundedGrayBox(props: ViewProps & { label: String, units: String, point: Number, customClass: string, icon: any }) {
    return (
        <View
            className={"flex flex-row my-4 place-items-end h-15 flex-1 rounded-lg " + props.customClass}
            style={[{
                padding: 12,
                backgroundColor: '#eee',
            }]}>
            <View className="mt-1">
                {props.icon}
            </View>
            <View className="flex flex-col ml-2">
                <Text className="text-xs">
                    {props.label}
                </Text>
                <View className="flex flex-row">
                    <Text className="text-lg font-bold mt-[-5]">
                        {props.point.toFixed(1).toString()}
                    </Text>
                    <Text className="text-xs font-bold ml-1 mt-[3]">
                        {props.units}
                    </Text>
                </View>
            </View>
        </View>
    )
}