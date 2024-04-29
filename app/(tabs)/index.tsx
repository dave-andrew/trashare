import { Button, Image, ImageBackground, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { router } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { DashboardRoundedGrayBox } from "../../component/container/DashboardRoundedGrayBox";

export default function Home() {

    const realm = useRealm();
    const user = useUser();
    const taskList = useQuery(Task).filtered(`userId == $0`, user.id);

    const createTask = useCallback(
        () => {
            const newTask = realm.write(() => {
                return realm.create(Task, {
                    description: 'ini coba ga pake subcription + reload',
                    createdAt: new Date(),
                    userId: user.id
                })
            })
            console.log(newTask)
        }, [realm, user.id]
    );

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(taskList)
        })
    }, [realm, taskList]);

    const userAdditionalInfo = useContext(AdditionalInfoContext)

    return (
        <View className="bg-white h-full">
            <ImageBackground
                className='w-full h-[11vh] mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
                imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                {userAdditionalInfo &&
                    <Text className="text-lg font-medium color-white mt-12 ml-6">Hi, {userAdditionalInfo.username}</Text>
                }
            </ImageBackground>
            <View className="flex flex-row w-full">
                <DashboardRoundedGrayBox customClass=" ml-4 mr-2" label={"Total Points"} point={1000} units={'pt'} icon={<FontAwesome size={28} name="database" color={'#656565'} />} />
                <DashboardRoundedGrayBox customClass=" mr-4 ml-2" label={"Total Weights"} point={1000} units={'gr'} icon={<FontAwesome size={28} name="anchor" color={'#656565'} />} />
            </View>
            <Text className="mt-5">Home {userAdditionalInfo?.username}</Text>
            <Button title="try add new data" onPress={() => router.push("/seeder/StationSeeder")}></Button>
            <EditScreenInfo path="app/(tabs)/home.tsx" />
        </View>

    );
}