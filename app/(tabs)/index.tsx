import { Button, Image, ImageBackground, Pressable, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useContext } from "react";
import { router } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { DashboardRoundedGrayBox } from "../../component/container/DashboardRoundedGrayBox";
import SummaryInformationBar from "../../component/container/SummaryInformationBar";
import NewsPortal from "../../component/index/NewsPortal";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {

    const userAdditionalInfo = useContext(AdditionalInfoContext);
    return (
        <View className="bg-white min-h-full">
            <ImageBackground
                className='w-full h-[12vh] mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
                imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                {userAdditionalInfo &&
                    <Text className="text-lg font-medium color-white mt-14 ml-6">Hi, {userAdditionalInfo.username}</Text>
                }
            </ImageBackground>
            <ScrollView>
                <View className="flex flex-row w-full">
                    <DashboardRoundedGrayBox customClass=" ml-4 mr-2"
                        label={"Total Points"}
                        point={userAdditionalInfo?.points}
                        units={'pt'}
                        icon={<FontAwesome size={28} name="database" color={'#656565'} />} />
                    <DashboardRoundedGrayBox customClass=" mr-4 ml-2" label={"Total Weights"}
                        point={userAdditionalInfo?.compostWaste + userAdditionalInfo?.paperWaste + userAdditionalInfo?.recyclableWaste}
                        units={'gr'}
                        icon={<FontAwesome size={28} name="anchor" color={'#656565'} />} />
                </View>
                <Pressable className="my-1 bg-blue-200" onPress={() => router.push("/seeder/NewsSeeder")}><Text>News Seeder</Text></Pressable>
                <Pressable className="my-1 bg-blue-200" onPress={() => router.push("/seeder/StationSeeder")}><Text>Station Seeder</Text></Pressable>
                <EditScreenInfo path="app/(tabs)/home.tsx" />
                <SummaryInformationBar compostPoints={userAdditionalInfo?.compostWaste}
                    paperPoints={userAdditionalInfo?.paperWaste}
                    recyclablePoints={userAdditionalInfo?.recyclableWaste} />
                <NewsPortal />
            </ScrollView>
        </View>

    );
}