import { Button, Image, ImageBackground, Pressable, Text, View } from "react-native";
import { useContext } from "react";
import { router } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { DashboardRoundedGrayBox } from "../../component/container/DashboardRoundedGrayBox";
import SummaryInformationBar from "../../component/container/SummaryInformationBar";
import NewsPortal from "../../component/index/NewsPortal";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {

    const { additionalInfo } = useContext(AdditionalInfoContext);

    return (
        <View className="min-h-full" style={[{
            backgroundColor: '#F9F9F9'
        }]}>
            <ImageBackground
                className='w-full h-[14vh] mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
                imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                {additionalInfo &&
                    <Text className="text-lg font-medium color-white mt-14 ml-6">Hi, {additionalInfo.username}</Text>
                }
            </ImageBackground>
            <ScrollView className="mb-24">
                <View className="flex flex-row w-full">
                    {additionalInfo?.role == 'user' && <DashboardRoundedGrayBox customClass=" ml-4 mr-2"
                        label={"Total Points"}
                        point={additionalInfo?.points}
                        units={'pt'}
                        icon={<FontAwesome size={28} name="database" color={'#656565'} />} />}
                    <DashboardRoundedGrayBox customClass={additionalInfo?.role == 'station' ? 'mx-4' : ' mr-4 ml-2'} label={"Total Weights"}
                        point={additionalInfo?.compostWaste + additionalInfo?.paperWaste + additionalInfo?.recyclableWaste}
                        units={'gr'}
                        icon={<FontAwesome size={28} name="anchor" color={'#656565'} />} />
                </View>

                {/* <Pressable className="my-1 bg-blue-200" onPress={() => router.push("/seederPage/NewsSeeder")}><Text>News Seeder</Text></Pressable>
                <Pressable className="my-1 bg-blue-200" onPress={() => router.push("/seederPage/StationSeeder")}><Text>Station Seeder</Text></Pressable>
                <EditScreenInfo path="app/(tabs)/home.tsx" /> */}

                <SummaryInformationBar compostPoints={additionalInfo?.compostWaste}
                    paperPoints={additionalInfo?.paperWaste}
                    recyclablePoints={additionalInfo?.recyclableWaste} />
                <NewsPortal />
            </ScrollView>
        </View>

    );
}