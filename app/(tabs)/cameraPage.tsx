import { Animated, AppState, Easing, Image, Pressable, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";

import LottieView from "lottie-react-native";
import { Dimensions } from 'react-native';
import { fetchResult } from "../../trashareAiConfig";
import CameraPredictionDetail from "../../component/camera/CameraPredictionDetail";


export default function CameraPage() {

    const camera = useRef<Camera>(null);
    const type = CameraType.back;

    const [device, setDevice] = useState<CameraType | undefined>(undefined);
    const [pageState, setPageState] = useState("camera")
    const [prediction, setPrediction] = useState<any>({});
    const [imageUrl, setImageUrl] = useState("");

    const animation = useRef(null);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === "granted") {
                setDevice(type);
            }
        })();
        setPageState("camera");

    }, []);

    useEffect(() => {
        (async () => {
            if (pageState == 'loading') {
                animation?.current?.reset();
                animation?.current?.play();
                camera?.current.pausePreview();
            } else if (pageState == 'result') {
                camera?.current.resumePreview();
            } else {
                camera?.current.resumePreview();
            }
        })();
        console.log(pageState);

    }, [pageState]);


    const handlePhoto = async () => {
        try {
            const photo = await camera.current?.takePictureAsync();
            setPageState("loading");
            console.log(photo?.uri);

            // convert from photo to blob
            const fetchResponse = await fetch(photo?.uri || "");
            const theBlob = await fetchResponse.blob();

            // send the blob to the API
            const result : any = await fetchResult(theBlob);
            console.log("Result: ", result);
            setPrediction(result);
            setImageUrl(result.downloadURL);

            setPageState("result");
        } catch (error) {
            console.error('Error during upload or sending:', error);
        }

    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height - 50;

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
            <View
                className='w-full h-[11vh] rounded-max mx-auto bg-white z-10 rounded-b-2xl'
            >
                <View className="mt-[6vh] justify-center items-center ml-4">
                    <Text className="text-lg font-medium">Scan</Text>
                </View>
            </View>

            <Camera
                ref={camera}
                type={device}
                style={{ aspectRatio: 3 / 4, overflow: "hidden" }}
                className="flex-1 absolute top-0 left-0 w-full h-full"
            />
            {pageState == 'loading' && <LottieView
                loop
                ref={animation}
                style={{
                    width: windowWidth * 2.7,
                    height: windowHeight,
                    position: 'absolute',
                    top: '5%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                source={require('../../assets/illustration/scan-animation.json')}
            />}
            {pageState == "result" ?
                <CameraPredictionDetail prediction={prediction.response} imageUrl={imageUrl} setPageState={setPageState} />
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
