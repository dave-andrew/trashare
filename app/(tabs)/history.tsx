import { FlatList, Text, View } from "react-native";
import { useQuery, useRealm, useUser } from "@realm/react";
import { History } from "../../models/History";
import HistoryList from "../../component/history/HistoryList";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { useContext } from "react";

export default function HistoryPage() {


    const userAdditionalInfo = useContext(AdditionalInfoContext);

    // filter the history and make sure that the orderer data is the same as the logged in data and the isComplete is true
    // const pendingOrders = useQuery(History).filtered('isComplete == false AND orderer == $0', userAdditionalInfo).sorted('createdAt', true);
    const history = useQuery(History).filtered('isComplete == true AND orderer == $0', userAdditionalInfo).sorted('createdAt', true);

    // console.log("Pending Orders ", pendingOrders)
    console.log("History ", history)

    return (
        <View>
            <View
                className='w-full h-[11vh] rounded-max mx-auto bg-white rounded-b-2xl'
            >
                <View className="mt-[6vh] justify-center items-center ml-4">
                    <Text className="text-lg font-medium">History</Text>
                </View>
            </View>
            {history.length == 0 ? (
                <View className="justify-center items-center mt-4">
                    <Text className="text-lg font-medium">No history yet? C'mon let's get some trash!</Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    renderItem={
                        ({ item }) => {
                            return (
                                <HistoryList history={item} />
                            )
                        }
                    }
                ></FlatList>
            )}
        </View >

    );
}