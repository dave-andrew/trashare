import { Animated, ImageBackground, Text, View } from "react-native";
import { useContext, useEffect, useMemo } from "react";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import UserInfoDashboard from "../../component/profile/UserInfoDashboard";
import ProfileOptionList from "../../component/profile/ProfileOptionList";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function ProfilePage() {

    const animation = useMemo(() => new Animated.Value(-142), []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 0,
            delay: 500,
            duration: 1200,
            useNativeDriver: true
        }).start();
    }, [animation]);

    const userAdditionalInfo = useContext(AdditionalInfoContext);
    return (
        <View className="h-full bg-white">
            <Animated.View style={{ transform: [{ translateY: animation } ]}}>
                <ImageBackground
                    className='w-full h-[28vh] absolute'
                    source={require('../../assets/backgrounds/RegisterBG.png')}
                    imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                </ImageBackground>
            </Animated.View>
            <View
                className='w-full h-[28vh]'>
                {userAdditionalInfo &&
                    <Text className="text-lg text-center color-white mt-14">Profile</Text>
                }
            </View>
            <UserInfoDashboard userAdditionalInfo={userAdditionalInfo} />
            <ProfileOptionList userAdditionalInfo={userAdditionalInfo} />

            {/* <EditScreenInfo path="app/(tabs)/profile.tsx" /> */}
        </View>

    );
}