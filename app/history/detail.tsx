import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { getHistoryById } from "../datas/queries/useQueries";
import { url } from "../../trashareAiConfig";
import { AccumulationPointGraySpan } from "../../component/container/AccumulationPointGraySpan";
import HistoryDetailStationInfo from "../../component/history/detail/HistoryDetailStationInfo";
import HistoryDetailTripInfo from "../../component/history/detail/HistoryDetailTripInfo";
import HistoryDetailWasteCard from "../../component/history/detail/HIstoryDetailWasteCard";
import { useRealm } from "@realm/react";


export default function DetailPage() {

    const realm = useRealm();
    const historyid = useLocalSearchParams().id;
    const history = getHistoryById(realm, historyid?.toString())
    // console.log(typeof(new BSON.ObjectID(historyid?.toString())));

    return (
        <View className="flex flex-col p-5">
            <HistoryDetailStationInfo station={history?.station} wastes={history?.waste} createdAt={history?.createdAt} />
            <HistoryDetailTripInfo station={history?.station} />
            <View className="flex flex-col">
                {history?.waste.map((waste, index) => {
                    return <HistoryDetailWasteCard key={index} waste={waste} />
                })}
            </View>
        </View>
    )
}