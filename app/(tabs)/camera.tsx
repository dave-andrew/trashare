import { Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";


export default function Camera() {
    return (
        <View>
            <Text>Camera</Text>
            <EditScreenInfo path="app/(tabs)/camera.tsx" />
        </View>
        
    );
}