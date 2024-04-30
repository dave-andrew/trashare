import { GestureResponderEvent, RecursiveArray, RegisteredStyle, Text, View, ViewProps, ViewStyle } from "react-native";


export default function RoundedRadioButton(props: ViewProps & { selected?: boolean, label: string, customClass?: string, value: string, onTouchFunction?: () => void }) {
    return (
        <View className={props.customClass + (props.selected ? " border-sky-300" : " border-gray-300") +" flex flex-row grow p-2 align-middle border rounded-lg my-2"}
            style={[{
                borderColor: props.selected ? '#0B5DB7' : '#9ca3af',
            }]}
            onTouchStart={props.onTouchFunction}>
            <View style={[{
                height: 20,
                width: 20,
                borderRadius: 12,
                borderColor: props.selected ? '#0B5DB7' : '',
                borderStyle: 'solid',
                borderWidth: props.selected ? 1 : 0,
                backgroundColor: props.selected ? '#fff' : '#d9d9d9',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
            }]}>
                {
                    props.selected ?
                        <View style={{
                            height: 10,
                            width: 10,
                            borderRadius: 20,
                            backgroundColor: '#0B5DB7',
                        }} />
                        : null
                }
            </View>
            <Text>{props.label}</Text>
        </View>
    );
}