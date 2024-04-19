import { Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";

export default function Station() {
    return (
        <View>
            <Text>Station</Text>
            <EditScreenInfo path="app/(tabs)/station.tsx" />
        </View>
        
    );
}