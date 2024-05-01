import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfileOption(props: { points?: number, menu: string, icon: any, onPress?: () => void }) {
    if (props.menu == 'Total Points') {
        return (
            <View style={[{
                backgroundColor: 'white',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
                paddingHorizontal: 26,
                paddingVertical: 16,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }]}>
                {props.icon}
                <View style={[{
                    marginHorizontal: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }]}>
                    <View style={[{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    }]}>
                        <Text style={[{
                            fontSize: 16,
                        }]}>{props.menu}</Text>
                        <View style={[{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }]}>
                            <Text style={[{
                                fontSize: 24,
                                fontWeight: 'bold',
                            }]}>{props.points}</Text>
                            <Text style={[{
                                marginLeft: 4,
                                fontSize: 16,
                            }]}>pt</Text>
                        </View>
                    </View>
                    
                    
                    <Text style={[{
                        borderRadius: 20,
                        paddingHorizontal: 32,
                        paddingVertical: 6,
                        backgroundColor: '#00B1F7',
                        color: 'white',
                    }]}>
                        Withdraw
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={[{
            backgroundColor: 'white',
            marginVertical: 8,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
            paddingHorizontal: 26,
            paddingVertical: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }]}
            onTouchEnd={props.onPress}>
            {props.icon}
            <View style={[{
                marginHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }]}>
                <Text className="flex-1" style={[{
                    fontSize: 16,
                }]}>{props.menu}</Text>
                <FontAwesome size={16} name="chevron-right" color={'#656565'} />
            </View>
        </View>
    )
}