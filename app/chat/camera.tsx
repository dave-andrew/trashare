import { Animated, AppState, Easing, Image, Pressable, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useContext, useEffect, useRef, useState } from "react";

import LottieView from "lottie-react-native";
import { Dimensions } from 'react-native';
import { fetchResult } from "../../trashareAiConfig";
import CameraPredictionDetail from "../../component/camera/CameraPredictionDetail";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { router, useLocalSearchParams } from "expo-router";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { storage } from "../../firebaseConfig";
import { useChatMutation } from "../datas/mutations/useMutations";
import { useRealm } from "@realm/react";
import { getStationById, getUserChat } from "../datas/queries/useQueries";

export default function CameraChat() {
    const camera = useRef<Camera>(null);
    const type = CameraType.back;

    const [device, setDevice] = useState<CameraType | undefined>(undefined);
    const [pageState, setPageState] = useState("camera")
    const [imageUrl, setImageUrl] = useState("");

    const realm = useRealm()

    const station_id = useLocalSearchParams().station
    console.log(station_id)
    const station = getStationById(realm, station_id)

    const chat = getUserChat(station)

    const additionalInfo = useContext(AdditionalInfoContext);
    const { addMessage } = useChatMutation(realm, chat)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === "granted") {
                setDevice(type);
            }
        })();
        setPageState("camera");

    }, []);

    const handlePhoto = async () => {
        try {
            const photo = await camera.current?.takePictureAsync();

            setImageUrl(photo?.uri || "");
            camera?.current.pausePreview();
            setPageState("result")

        } catch (error) {
            console.error('Error during upload or sending:', error);
        }

    }

    const handleBack = () => {
        if(pageState == "result"){
            setPageState("camera");
            camera?.current.resumePreview();
        } else {
            router.back()
        }
    }

    const sendImage = async () => {

        const theBlob = await fetch(imageUrl).then(response => response.blob());
        const imageRef = ref(storage, `chat-images/${additionalInfo?.uid}+${new Date().getTime()}.jpg`);
        const uploadTask = uploadBytesResumable(imageRef, theBlob);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    addMessage(chat[0], {
                        text: downloadURL,
                        user: additionalInfo,
                        type: "image"
                    })
                    router.back()
                });
            })
    }

    const spinValue = new Animated.Value(0);
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start()
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    if (!device) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width: '100%',
                height: '100%',
            }}>
                <Animated.Image source={require('../../assets/illustration/loading.png')} style={{
                    width: 100,
                    height: 100,
                    transform: [{ rotate: spin }]
                }} />
                <Text className="text-xl font-bold mt-2">Loading your camera</Text>
                <Text className="mx-3">Make sure to accept the permission to get started</Text>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={camera}
                type={device}
                style={{ aspectRatio: 3 / 4, overflow: "hidden" }}
                className="flex-1 absolute top-0 left-0 w-full h-full"
            />
            <Pressable onPress={handleBack} className="absolute" style={{ top: 50, left: 25 }}>
                <Image source={require('../../assets/arrow-white.png')} style={{width: 25, height: 25}} />
            </Pressable>
            {pageState == "result" ?
                <Pressable onPress={sendImage} className="absolute" style={{ bottom: 25, right: 25 }}>
                    <Image source={require('../../assets/send-message.png')} style={{width: 25, height: 25}} />
                </Pressable>
                :
                <Pressable
                    onPress={handlePhoto}
                    className="absolute bottom-8 left-0 right-0 flex items-center justify-center h-15"
                >
                    <Image
                        source={require("../../assets/capture.png")}
                        className="w-16 h-16"
                        style={{ tintColor: 'white' }} />
                </Pressable>
            }
        </View>
    );
}