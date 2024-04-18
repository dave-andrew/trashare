import { Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";

export default function Home() {
    return (
        <View>
            <Text>Home</Text>
            <EditScreenInfo path="app/(tabs)/home.tsx" />
        </View>
        
    );
}