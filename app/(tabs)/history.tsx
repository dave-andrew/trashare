import { Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";

export default function History() {
    return (
        <View>
            <Text>History</Text>
            <EditScreenInfo path="app/(tabs)/history.tsx" />
        </View>
        
    );
}