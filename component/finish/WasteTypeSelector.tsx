import { View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

export default function WasteTypeSelector({wasteType, setWasteType}: {wasteType: string, setWasteType: (type: string) => void}) {
  
  return (
    <View className='flex flex-row gap-1'>
      <Pressable
        className={`w-12 h-12 ${wasteType == 'Paper' ? 'bg-orange-500' : 'bg-gray-400'} flex items-center justify-center rounded-full`}
        onPress={() => setWasteType('Paper')}>
        <FontAwesome name='sticky-note' size={20} color={"#fff"} />
      </Pressable>

      <Pressable
        className={`w-12 h-12 ${wasteType == 'Recyclable' ? 'bg-[#00B1F7]' : 'bg-gray-400'} flex items-center justify-center rounded-full`}
        onPress={() => setWasteType('Recyclable')}>
        <FontAwesome name='recycle' size={20} color={"#fff"} />
      </Pressable>

      <Pressable
        className={`w-12 h-12 ${wasteType == 'Compost' ? 'bg-green-600' : 'bg-gray-400'} flex items-center justify-center rounded-full`}
        onPress={() => setWasteType('Compost')}>
        <FontAwesome name='leaf' size={20} color={"#fff"} />
      </Pressable>
    </View>
  )
}