import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";



export default function DetailPage() {

    const historyid = useLocalSearchParams().id;

    return (
        <View>
            <Text>{historyid}</Text>
        </View>
    )
}