import { Text, View, Image, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WasteTypeSelector from '../../component/finish/WasteTypeSelector';
import { useState } from 'react';
import WasteDataCard from '../../component/finish/WasteDataCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function FinishPage() {

  return (
    <View className='h-full'>
      {/* <View
        className='w-full h-[12vh] mb-2 bg-white'
        style={{
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Text className="text-lg text-center mt-14 font-medium">Finish Order</Text>
      </View> */}

      <ScrollView className="bg-white flex">
        <View className='flex flex-row items-center mx-2 mb-2 mt-4'>
          <Image className='w-14 h-14 rounded-full' source={{ uri: 'https://picsum.photos/200' }} />
          <View className='ml-4'>
            <Text className='text-gray-500 font-medium'>Ordered by</Text>
            <Text className='text-lg font-medium'>Orderer Name</Text>
          </View>
        </View>

        <WasteDataCard />
        <WasteDataCard />

        <Pressable className='w-12 h-12 bg-gray-400 flex items-center justify-center rounded-full'
          onPress={() => { }}>
          <FontAwesome name='plus' size={20} color={"#fff"} />
        </Pressable>
      </ScrollView>

      <View className='bottom-0 w-full py-4 bg-white' style={{elevation: 5 }}>
        <Pressable className='bg-[#00B1F7] mx-2 rounded-full'>
          <Text className='text-center text-white font-medium text-lg py-2'>Finish Order</Text>
        </Pressable>
      </View>
    </View>
  )
}