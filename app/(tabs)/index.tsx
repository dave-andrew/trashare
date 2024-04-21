import { Button, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { Results } from "realm";

export default function Home() {

    const realm = useRealm();
    const user = useUser();
    const taskList = useQuery('Task').sorted('createdAt');

    console.log(taskList)

    const createTask = useCallback(
        () => {
            const task = realm.write(() => {
                return new Task(realm, { description: 'new task', userId: user.id });
            })
            
            console.log('task created', task)

        }, [realm, user]
    );

    const [tasks, setTasks] = useState(false);

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(realm.objects(Task))
        })
    }, [realm, user, tasks]);

    return (
        <View>
            <Text>Home</Text>
            <Button title="try add new data" onPress={createTask}></Button>
            <EditScreenInfo path="app/(tabs)/home.tsx" />
        </View>
        
    );
}