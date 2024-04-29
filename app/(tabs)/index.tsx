import { Button, Image, ImageBackground, Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
import { useQuery, useRealm, useUser } from "@realm/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { router } from "expo-router";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { User } from "../../models/User";

export default function Home() {

    const userAdditionalInfo = useContext(AdditionalInfoContext);
    return (
        <View>
            <Image
                className='absolute w-full h-[11vh] rounded-max mx-auto'
                source={require('../../assets/backgrounds/RegisterBG.png')}
            />
            <View className="mt-[6vh] justify-center ml-4">
                <Text className="text-lg font-medium color-white">Hi, {userAdditionalInfo?.username}</Text>
            </View>
            <Button title="try add new data" onPress={() => router.push("/seeder/StationSeeder")}></Button>
            <EditScreenInfo path="app/(tabs)/home.tsx" />
        </View>

    );
}