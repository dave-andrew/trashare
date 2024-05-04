import { useContext } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { getUserHistory } from "../datas/queries/useQueries";


export default function QueuePage() {

    const { additionalInfo } = useContext(AdditionalInfoContext);
    console.log("Queue Additional Info ", additionalInfo)
    const getQueue = getUserHistory()

    return (
        <View className="bg-[#F9F9F9] min-h-full">
            <View
                className='w-full h-[12vh] mb-2 bg-white'
                style={{
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                <Text className="text-lg text-center mt-14 font-medium">Queue</Text>
            </View>
        </View>
    )
}