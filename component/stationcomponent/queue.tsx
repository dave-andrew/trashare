import { Text, View } from "react-native";


export default function QueuePage() {


    return (
        <View>
            <View
                className='w-full h-[11vh] rounded-max mx-auto bg-white z-10 rounded-b-2xl'
            >
                <View className="mt-[6vh] justify-center items-center ml-4">
                    <Text className="text-lg font-medium">Queue</Text>
                </View>
            </View>
        </View>
    )
}