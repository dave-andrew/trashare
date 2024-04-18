import { Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";

export default function Profile() {
    return (
        <View>
            <Text>Profile</Text>
            <EditScreenInfo path="app/(tabs)/profile.tsx" />
        </View>
        
    );
}