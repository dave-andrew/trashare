import { Text, View } from "react-native";



export default function CircularFilterDisk(props: { label: string }) {
    return (
        <View style={[{
            width: 84,
            paddingVertical: 6,
            marginHorizontal: 3,
            borderRadius: 20,
            backgroundColor: '#EEEEEE',
            borderColor: '#E2E2E2',
            borderWidth: 1,
            alignItems: 'center',
        }]}>
            <Text>{props.label}</Text>
        </View>
    )
}