import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ImageBackground, Text, View } from "react-native";


export default function FaqPage() {
    return (
        <ImageBackground source={require('../../assets/backgrounds/RegisterBG.png')}
            style={{ width: '100%', height: '100%' }}>
            <View className="p-6 flex justify-center place-items-center h-full w-full">
                <View className="bg-white p-8 rounded-xl">
                    <View className='flex flex-row'>
                        <View className='mr-3 my-2'>
                            <View className="h-10 w-10 bg-white rounded-full flex place-items-center text-center justify-center" style={[{
                                shadowColor: '#000',
                                elevation: 3
                            }]}>
                                <FontAwesome size={18} name="question" color={'#000'} style={[{
                                    marginHorizontal: 14,
                                }]} />
                            </View>
                        </View>
                        <Text
                            className="text-xl font-bold">Frequently Asked {'\n'}Question (FAQ)</Text>
                    </View>
                    <Text className='font-medium mt-6'>Lorem Ipsum Ipsum ?</Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nobis ratione, minus saepe, odit amet enim voluptate at accusantium suscipit eum consequatur voluptatum? Maiores, molestiae cum atque eaque expedita beatae.
                    </Text>
                    <Text className='font-medium mt-4'>Lorem Ipsum Ipsum ?</Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nobis ratione, minus saepe, odit amet enim voluptate at accusantium suscipit eum consequatur voluptatum? Maiores, molestiae cum atque eaque expedita beatae.
                    </Text>
                    <Text className='font-medium mt-4'>Lorem Ipsum Ipsum ?</Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nobis ratione, minus saepe, odit amet enim voluptate at accusantium suscipit eum consequatur voluptatum? Maiores, molestiae cum atque eaque expedita beatae.
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}
