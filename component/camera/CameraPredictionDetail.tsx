import BottomSheet from "@gorhom/bottom-sheet";
import { Dispatch } from "react";
import { Image, Text, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function CameraPredictionDetail(props: { prediction: string, imageUrl: string, setPageState: Dispatch<React.SetStateAction<string>> }) {
    return (
        <BottomSheet
            style={{ elevation: 5, paddingHorizontal: 32, gap: 10 }}
            snapPoints={['30%']}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: '#eee', width: 60, height: 6 }}
            onChange={(index) => {
                if (index == -1) {
                    props.setPageState("camera")
                }
            }}>

            <View className="flex flex-row mx-auto my-[-2]">
                <FontAwesome size={20} name={'recycle'} color={'#5FD7FA'} style={[{
                    marginVertical: 8
                }]} />
                <Text className='text-center text-lg font-bold ml-4'>{props.prediction.charAt(0).toUpperCase() + props.prediction.slice(1)}</Text>
            </View>
            <View className='flex flex-row my-4'>
                <Image
                    style={{ borderRadius: 10 }}
                    className='w-28 h-28'
                    source={{
                        uri: props.imageUrl,
                    }}
                />
                <View className="ml-4 flex">
                    <Text className="mb-1 text-gray-500" style={[{
                        fontWeight: '500'
                    }]}>Category: Plastics</Text>
                    <Text className="mt-1 text-xs text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae sequi aliquid ratione minus voluptatum, est soluta, quaerat alias corrupti earum esse vel dolor! Illum culpa provident pariatur voluptatum ad alias.</Text>
                </View>
            </View>

        </BottomSheet>
    )
}