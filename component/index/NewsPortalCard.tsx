import { Image, Linking, Text, View } from "react-native";
import { News } from "../../models/News";


export default function NewsPortalCard(props: { news: any }) {
    return (
        <View className="w-[46%] rounded-xl shadow-2xl mb-4 mx-[6px]" style={[{
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }]} onTouchEnd={() => Linking.openURL(props.news.newsLink)}>
            <Image source={{ uri: props.news.imageLink }} style={{ height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} resizeMode="cover" />
            <Text className="p-2">{props.news.title}</Text>
        </View>
    )
}