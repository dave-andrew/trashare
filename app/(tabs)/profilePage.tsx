import { Animated, Image, ImageBackground, Pressable, Text, View } from "react-native";
import { useContext, useEffect, useMemo } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import UserInfoDashboard from "../../component/profile/UserInfoDashboard";
import ProfileOptionList from "../../component/profile/ProfileOptionList";
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

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
    const handleUploadPhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
        }
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            if (!response.assets) {
                console.log('No image selected');
                return;
            }
            const asset = response.assets[0];
            const path = `profile-pictures/${asset.fileName}`;
            const ref = storage(path);
            const task = ref.putFile(asset);
            task.then(() => {
                console.log('Image uploaded to Firebase Storage');
            }).catch((error) => {
                console.log('Error uploading image to Firebase Storage:', error);
            });
        });
    }
    return (
        <View className="h-full bg-white">
            <Animated.View style={{ transform: [{ translateY: animation }] }} >
                <ImageBackground
                    className='w-full h-[24vh] absolute'
                    source={require('../../assets/backgrounds/RegisterBG.png')}
                    imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
                </ImageBackground>
            </Animated.View>
            <View
                className='w-full h-[28vh]'>
                {userAdditionalInfo &&
                    <>
                        <Text className="text-lg text-center color-white mt-8">Profile</Text>
                        <View className="rounded-full border-[6px] border-white h-36 w-36 mt-12 mx-auto p-0 relative">
                            <Image source={{ uri: userAdditionalInfo.profileUrl }} className="h-full w-full" />
                            <Pressable className="absolute  bottom-0 right-[-6] h-10 w-10 bg-white rounded-full flex place-items-center text-center justify-center" style={[{
                                shadowColor: '#000',
                                elevation: 3
                            }]}
                                onPress={handleUploadPhoto}>
                                <FontAwesome size={24} name="pencil" color={'#656565'} style={[{
                                    marginHorizontal: 10,
                                }]} />
                            </Pressable>
                        </View>
                    </>
                }
            </View>
            <UserInfoDashboard userAdditionalInfo={userAdditionalInfo} />
            <ProfileOptionList userAdditionalInfo={userAdditionalInfo} />

            {/* <EditScreenInfo path="app/(tabs)/profile.tsx" /> */}
        </View>

    );
}