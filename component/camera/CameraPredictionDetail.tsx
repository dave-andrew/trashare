import BottomSheet from "@gorhom/bottom-sheet";
import { Dispatch } from "react";
import { Image, Text, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function CameraPredictionDetail(props: { prediction: string, imageUrl: string, setPageState: Dispatch<React.SetStateAction<string>> }) {
    const classesList = {
        'cardboard': {
            "category": "Paper",
            "icon-name": "sticky-note",
            "shortDescription": "Cardboard is a generic term for heavy-duty paper-based products having greater thickness and superior durability or other specific mechanical attributes to paper;"
        },
        'glass': {
            "category": "Hazardous",
            "icon-name": "exclamation-triangle",
            "shortDescription": "Glass is a non-crystalline, often transparent amorphous solid, that has widespread practical, technological, and decorative use in, for example, window panes, tableware, and optics. "
        },
        'metal': {
            "category": "Hazardous",
            "icon-name": "exclamation-triangle",
            "shortDescription": "Metal is a material that, when freshly prepared, polished, or fractured, shows a lustrous appearance, and conducts electricity and heat relatively well."
        },
        'paper': {
            "category": "Paper",
            "icon-name": "sticky-note",
            "shortDescription": "Paper is a thin sheet material produced by mechanically and/or chemically processing cellulose fibres derived from wood, rags, grasses or other vegetable."
        },
        'plastic': {
            "category": "Recyclable",
            "icon-name": "recycle",
            "shortDescription": "Cardboard is a generic term for heavy-duty paper-based products having greater thickness and superior durability or other specific mechanical attributes to paper; such as foldability, rigidity and impact resistance. The construction can range from a thick sheet known as paperboard to corrugated fiberboard which is made of multiple corrugated and flat layers."
        },
        'trash': {
            "category": "Compost",
            "icon-name": "leaf",
            "shortDescription": "TODO: Diskusi trash itu apa"
        },
        'biological': {
            "category": "Compost",
            "icon-name": "leaf",
            "shortDescription": "Biological waste is any organic waste that can be composted, such as food waste, yard waste, and animal waste."
        },
    }
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