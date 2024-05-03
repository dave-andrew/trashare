import { useQuery } from "@realm/react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { History } from "../../models/History";
import { AdditionalInfoContext } from "../../app/providers/AdditionalInfoProvider";
import { useContext } from "react";


export default function QueuePage() {

    const { additionalInfo } = useContext(AdditionalInfoContext);
    const stationQueue = useQuery(History).filtered('isComplete == true').sorted('createdAt', true);
    console.log("Station Queue ", stationQueue)

    console.log(additionalInfo.station)

    return (
        <View>
            <View className='w-full h-[11vh] rounded-max mx-auto bg-white z-10 rounded-b-2xl'>
                <View className="mt-[6vh] justify-center items-center ml-4">
                    <Text className="text-lg font-medium">Queue</Text>
                </View>
                <FlatList
                    style={{ paddingHorizontal: 12, paddingVertical: 8 }}
                    data={[]}
                    renderItem={
                        ({ item }) => {
                            return (
                                <Text>Queue</Text>
                            )
                        }
                    }
                />
            </View>
        </View>
    )
}