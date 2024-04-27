import { Button, Image, ImageBackground, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { router } from "expo-router";

export default function Home() {

    const realm = useRealm();
    const user = useUser();
    const taskList = useQuery(Task).filtered(`userId == $0`, user.id);
    console.log(taskList)

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

    console.log(user)
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(taskList)
        })
    }, [realm, taskList]);

    return (
        <View>
            <Image
                className='absolute w-full h-[11vh] rounded-max mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
            />
            <View className="mt-[6vh] justify-center ml-4">
                <Text className="text-lg font-medium color-white">Hi, Username</Text>
            </View>

            <Text className="mt-5">Home</Text>
            <Button title="try add new data" onPress={() => router.push("/seeder/StationSeeder")}></Button>
            <EditScreenInfo path="app/(tabs)/home.tsx" />
        </View>

    );
}