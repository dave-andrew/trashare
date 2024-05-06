import { FlatList, Image, Text, View } from "react-native";
import HistoryItem from "../../component/history/HistoryItem";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { useContext, useEffect, useState } from "react";
import CircularFilterDisk from "../../component/history/CircularFilterDisk";
import { getStationHistory, getUserHistory } from "../datas/queries/useQueries";
import { useRealm } from "@realm/react";


export default function HistoryPage() {
    const realm = useRealm()
    const { additionalInfo } = useContext(AdditionalInfoContext);
    const history = additionalInfo.role == 'station' ? getStationHistory(realm) : getUserHistory(realm);
    console.log("History ", history)

    const [filter, setFilter] = useState({
        "Recyclable": false,
        "Paper": false,
        "Compost": false,
    })

    const filterFunction = (h) => {

        // If not filtered at all
        if (!filter.Paper && !filter.Compost && !filter.Recyclable) {
            return true
        }

        // If one filtered is true, then include if any of the waste is valid
        let isValid = false
        h.waste.map((w) => {
            if (filter.Paper && w.wasteType == "Paper") {
                isValid = true
                return
            }
            if (filter.Compost && w.wasteType == "Compost") {
                isValid = true
                return
            }
            if (filter.Recyclable && w.wasteType == "Recyclable") {
                isValid = true
                return
            }
        })

        return isValid
    }

    const [filteredHistory, setFilteredHistory] = useState(history.filter(filterFunction))

    useEffect(() => {
        setFilteredHistory(history.filter(filterFunction))
    }, [filter])

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
                {/* Filter Set */}
                <CircularFilterDisk label="Recyclable" selected={filter.Recyclable} onPress={() => setFilter(prevFilter => ({
                    ...prevFilter,
                    Recyclable: !prevFilter.Recyclable
                }))} />
                <CircularFilterDisk label="Paper" selected={filter.Paper} onPress={() => setFilter(prevFilter => ({
                    ...prevFilter,
                    Paper: !prevFilter.Paper
                }))} />
                <CircularFilterDisk label="Compost" selected={filter.Compost} onPress={() => setFilter(prevFilter => ({
                    ...prevFilter,
                    Compost: !prevFilter.Compost
                }))} />

            </View>

            {history.length == 0 ? (
                <View className="justify-center items-center my-auto pb-12">
                    <Image source={require('../../assets/illustration/history-icon.png')} className={"mx-auto"} style={{ width: 160, height: 160 }} />
                    <Text className="text-lg font-medium">There is no history yet...</Text>
                    <Text className="text-gray-500">No history yet? C'mon let's get some trash!</Text>
                </View>
            ) : (
                <FlatList
                    className="mb-48"
                    style={{ paddingHorizontal: 8, paddingVertical: 8 }}
                    data={filteredHistory}
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