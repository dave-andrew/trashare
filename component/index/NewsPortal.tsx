import { Text, View } from "react-native";
import NewsPortalCard from "./NewsPortalCard";
import { getNews } from "../../app/datas/queries/useQueries";
import { useEffect } from "react";
import { useRealm } from "@realm/react";


export default function NewsPortal() {
    const newsList = getNews()
    const realm = useRealm()

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(newsList)
        })
        // console.log(newsList);
    }, [realm]);


    return (
        <View className="m-4 mt-6">
            <Text className="text-xl" style={[{
                fontWeight: '500',
            }]}>News & Articles</Text>
            {newsList.length > 0 ?
                <View className="mt-2 flex flex-row flex-wrap flex-start mx-[-8px]">
                    {newsList.map((news, index) => {
                        return (
                            <NewsPortalCard news={news} key={index} />
                        )
                    })}
                </View>
                :
                <Text className="text-center text-sm text-gray-500 mt-24">No News Found</Text>
            }
        </View>
    )
}