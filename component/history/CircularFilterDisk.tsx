import { Text, View } from "react-native";



export default function CircularFilterDisk(props: { label: string }) {
    return (
        <View style={[{
            width: 96,
            paddingVertical: 8,
            marginHorizontal: 4,
            borderRadius: 20,
            backgroundColor: '#EEEEEE',
            borderColor: '#E1E1E1',
            borderWidth: 1,
            alignItems: 'center',
        }]}>
            <Text>{props.label}</Text>
        </View>
    )
}