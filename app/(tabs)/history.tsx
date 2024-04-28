import { Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";

export default function History() {
    return (
        <View>
            <View
                className='w-full h-[11vh] rounded-max mx-auto bg-white rounded-b-2xl'
            >
                <View className="mt-[6vh] justify-center items-center ml-4">
                    <Text className="text-lg font-medium">History</Text>
                </View>
            </View>
            <Text>History</Text>
            <EditScreenInfo path="app/(tabs)/history.tsx" />
        </View>

    );
}