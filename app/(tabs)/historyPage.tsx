import { FlatList, Image, Text, View } from "react-native";
import HistoryItem from "../../component/history/HistoryItem";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { useContext } from "react";
import CircularFilterDisk from "../../component/history/CircularFilterDisk";
import { getStationHistory, getUserHistory } from "../datas/queries/useQueries";
import { useRealm } from "@realm/react";


export default function HistoryPage() {
    const realm = useRealm()
    const { additionalInfo } = useContext(AdditionalInfoContext);
    const history = additionalInfo.role == 'station' ? getStationHistory(realm) : getUserHistory(realm);
    console.log("History ", history)

    return (
        <View className="min-h-full" style={[{
            backgroundColor: '#F9F9F9'
        }]}>
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
                {additionalInfo &&
                    <Text className="text-lg text-center mt-14 font-medium">History</Text>
                }
            </View>

            <View className="p-4 flex flex-row">
                <CircularFilterDisk label="Recyclable" />
                <CircularFilterDisk label="Paper" />
                <CircularFilterDisk label="Compost" />
            </View>

            {history.length == 0 ? (
                <View className="justify-center items-center my-auto pb-12">
                    <Image source={require('../../assets/illustration/trash.png')} className={"mx-auto"} style={{ width: 160, height: 160 }} />
                    <Text className="text-lg font-medium">There is no history yet...</Text>
                    <Text className="text-gray-500">No history yet? C'mon let's get some trash!</Text>
                </View>
            ) : (
                <FlatList
                    className="mb-48"
                    style={{ paddingHorizontal: 8, paddingVertical: 8 }}
                    data={history}
                    renderItem={
                        ({ item }) => {
                            return (
                                <HistoryItem history={item} />
                            )
                        }
                    }
                ></FlatList>
            )}
        </View >
    );
}