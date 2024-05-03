import { FlatList, ImageBackground, Text, View } from "react-native";
import { useQuery, useRealm, useUser } from "@realm/react";
import { History } from "../../models/History";
import HistoryItem from "../../component/history/HistoryItem";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { useContext } from "react";
import CircularFilterDisk from "../../component/history/CircularFilterDisk";

export default function HistoryPage() {


    const userAdditionalInfo = useContext(AdditionalInfoContext);

    // filter the history and make sure that the orderer data is the same as the logged in data and the isComplete is true
    const history = useQuery(History).filtered('orderer == $0', userAdditionalInfo).sorted('createdAt', true);

    console.log("History ", history)

    return (
        <View className="bg-white min-h-full">
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
                {userAdditionalInfo &&
                    <Text className="text-lg text-center mt-14 font-medium">History</Text>
                }
            </View>

            <View className="p-4 flex flex-row">
                <CircularFilterDisk label="Recyclable" />
                <CircularFilterDisk label="Paper" />
                <CircularFilterDisk label="Compost" />
            </View>

            {history.length == 0 ? (
                <View className="justify-center items-center mt-4">
                    <Text className="text-lg font-medium">No history yet? C'mon let's get some trash!</Text>
                </View>
            ) : (
                <FlatList
                    style={{ paddingHorizontal: 12, paddingVertical: 8}}
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