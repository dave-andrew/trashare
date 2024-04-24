import { Button, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../../models/Task";

export default function Home() {

    const realm = useRealm();
    const user = useUser();

    const createTask = useCallback(
        () => {
            const newTask = realm.write(() => {
                return realm.create(Task, {
                    description: 'coba without subscription',
                    createdAt: new Date(),
                    userId: user.id
                })
            })

            console.log(newTask)
        }, [realm, user.id]
    );

    console.log(user)
    // useEffect(() => {
    //     realm.subscriptions.update(mutableSubs => {
    //         mutableSubs.add(taskList)
    //     })
    // }, [realm, taskList]);

    return (
        <View>
            <Text>Home</Text>
            <Button title="try add new data" onPress={createTask}></Button>
            <EditScreenInfo path="app/(tabs)/home.tsx" />
        </View>
        
    );
}