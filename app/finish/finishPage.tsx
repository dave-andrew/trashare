import { Text, View, Image, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WasteTypeSelector from '../../component/finish/WasteTypeSelector';
import { useState } from 'react';
import WasteDataCard from '../../component/finish/WasteDataCard';

export default function FinishPage() {

  return (
    <View className="bg-white min-h-full">
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

      <View className='flex flex-row items-center mx-2 my-2'>
        <Image className='w-14 h-14 rounded-full' source={{ uri: 'https://picsum.photos/200' }} />
        <View className='ml-4'>
          <Text className='text-gray-500 font-medium'>Ordered by</Text>
          <Text className='text-lg font-medium'>Orderer Name</Text>
        </View>
      </View>

      <WasteDataCard/>
    </View>
  )
}