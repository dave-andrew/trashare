import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function CircularFilterDisk(props: { label: string, selected: boolean, onPress: () => void}) {
    return (
        <View style={[{
            paddingVertical: 6,
            paddingHorizontal: 12,
            marginHorizontal: 3,
            borderRadius: 20,
            backgroundColor: props.selected ?  '#00B1F7' : '#EEEEEE',
            borderColor: props.selected ? '0071D7' : '#B0B0B0',
            borderWidth: 1,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }]}
            onTouchEnd={props.onPress}>
            {props.selected && 
                <FontAwesome size={12} name="close" color={'#FFFFFF'} style={[{
                    marginRight: 12
                }]}/>
            }
            <Text style={[{
                color: props.selected ? '#FFFFFF' : '#656565',
                fontSize: 12,
                fontWeight: 'bold',
            }]}>{props.label}</Text>
        </View>
    )
}