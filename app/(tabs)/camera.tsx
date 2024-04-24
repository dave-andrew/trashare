import { Button, Text, View } from "react-native";
import { Camera, Templates, useCameraDevice, useCameraFormat, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";
import { useRef } from "react"; // Import useState for loading state

export default function CameraPage() {
    const device = useCameraDevice('back');

    const camera = useRef<Camera>(null);

    if (!device) {
        return <Text>No camera device detected!</Text>;
    }

    const handlePhoto = async () => {
        const photo = await camera.current?.takePhoto();
        const result = await fetch(`file://${photo.path}`)
        const data = await result.blob()

        // TODO: Save photo + pake API Deep Learningnya
        console.log(data)
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={camera}
                device={device}
                isActive={true}
                style={{ flex: 1 }}
                photo={true}
            >
                <View>
                    <Text>Camera</Text>
                </View>
            </Camera>

            <Button title={"Photo"} onPress={handlePhoto}></Button>
        </View>
    );
}
