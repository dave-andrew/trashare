import { Animated, Image, ImageBackground, Pressable, Text, View } from "react-native";
import { useContext, useEffect, useMemo } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import UserInfoDashboard from "../../component/profile/UserInfoDashboard";
import ProfileOptionList from "../../component/profile/ProfileOptionList";
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseConfig";

export default function ProfilePage() {

    const userAdditionalInfo = useContext(AdditionalInfoContext);
    const animation = useMemo(() => new Animated.Value(-142), []);
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 0,
            delay: 500,
            duration: 1200,
            useNativeDriver: true
        }).start();
    }, [animation]);

    const handleUploadPhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
        }
        launchImageLibrary(options, async (response) => {
            // Validation
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            if (!response.assets) {
                console.log('No image selected');
                return;
            }
            // Convert image from URI to BLOB
            const fetchResponse = await fetch(response.assets[0].uri);
            const theBlob = await fetchResponse.blob();
            // console.log("The Blob", theBlob);

            const imageRef = ref(storage, `profile-pictures/${userAdditionalInfo?.uid}`);
            const uploadTask = uploadBytesResumable(imageRef, theBlob);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    console.log('Upload is done');
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
                }
            )
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