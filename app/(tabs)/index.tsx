import { Button, Image, ImageBackground, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { router } from "expo-router";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";

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
        <View>
            <Image
                className='absolute w-full h-[11vh] rounded-max mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
            />
            <View className="mt-[6vh] justify-center ml-4">
                {userAdditionalInfo &&
                    <Text className="text-lg font-medium color-white">Hi, {userAdditionalInfo.username}</Text>
                }
            </View>

            <Text className="mt-5">Home {userAdditionalInfo?.username}</Text>
            <Button title="try add new data" onPress={() => router.push("/seeder/StationSeeder")}></Button>
            <EditScreenInfo path="app/(tabs)/home.tsx" />
        </View>

    );
}