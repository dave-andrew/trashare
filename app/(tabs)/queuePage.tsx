import { Text, View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { getStationQueue } from "../datas/queries/useQueries";
import HistoryItem from "../../component/history/HistoryItem";
import { useRealm } from "@realm/react";
import QueueItem from "../../component/queue/QueueItem";
import CircularFilterDisk from "../../component/history/CircularFilterDisk";


export default function QueuePage() {

    const realm = useRealm()
    const queues = getStationQueue(realm)
    console.log("Queue ", queues)

    return (
        <View className="bg-[#F9F9F9] min-h-full">
            <View
                className='w-[102%] h-[13vh] mb-2 ml-[-4px]'
                style={{
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                }}>
                <Text className="text-lg text-center mt-14 font-medium">Queue</Text>
            </View>

            <View className="p-4 flex flex-row">
                <CircularFilterDisk label="Send" />
                <CircularFilterDisk label="Drop" />
            </View>

            {queues.length == 0 ? (
                <View className="justify-center items-center my-auto pb-12">
                    <Image source={require('../../assets/illustration/queue-icon.png')} className={"mx-auto"} style={{ width: 160, height: 160 }} />
                    <Text className="text-lg font-medium">There is no queue yet...</Text>
                    <Text className="text-gray-500">No queue yet? C'mon let's get some trash!</Text>
                </View>
            ) : (
                <FlatList
                    style={{ paddingHorizontal: 8, paddingVertical: 8 }}
                    data={queues}
                    renderItem={
                        ({ item }) => {
                            return (
                                <QueueItem queue={item} />
                            )
                        }
                    } />
            )}
        </View>
    )
}