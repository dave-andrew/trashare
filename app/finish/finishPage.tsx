import { Text, View, Image, Pressable, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WasteTypeSelector from '../../component/finish/WasteTypeSelector';
import { useState } from 'react';
import WasteDataCard from '../../component/finish/WasteDataCard';
import { ScrollView } from 'react-native-gesture-handler';

export type WastePlaceholder = {
  wasteType: string;
  weight: string;
  imageUrl: string;
};

export default function FinishPage() {

  const [wasteList, setWasteList] = useState<WastePlaceholder[]>([{ wasteType: '', weight: '', imageUrl: '' }])
  console.log(wasteList)

  const addWaste = () => {
    // if (wasteList.length >= 3) {
    //   Alert.alert('Maximum Types Reached', 'You can only add a maximum of three types of waste.')
    //   return
    // }
    if (!wasteList.every((waste) => waste.wasteType != '' && waste.weight != '' && waste.imageUrl != '')) {
      Alert.alert('Incomplete Information', 'Please fill in all previous fields before proceeding.')
      return
    }
    setWasteList((prevList) => [...prevList, { wasteType: '', weight: '', imageUrl: '' }])
  }

  return (
    <View className='h-full'>
      <ScrollView className="bg-white flex">
        <View className='flex flex-row items-center mx-2 mb-2 mt-4'>
          <Image className='w-14 h-14 rounded-full' source={{ uri: 'https://picsum.photos/200' }} />
          <View className='ml-4'>
            <Text className='text-gray-500 font-medium'>Ordered by</Text>
            <Text className='text-lg font-medium'>Orderer Name</Text>
          </View>
        </View>

        {wasteList.map((_, index) => (
          <WasteDataCard key={index} index={index} wasteList={wasteList} setWasteList={setWasteList}/>
        ))}
      </ScrollView>

      <View className='flex flex-row justify-between bottom-0 w-full px-2 py-4 bg-white' style={{ elevation: 5 }}>
        <Pressable
          className='bg-[#a0a0a0] rounded-full w-[49%]'
          onPress={() => addWaste()}>
          <Text className='text-center text-white font-medium text-lg py-2'>Add Waste</Text>
        </Pressable>

        <Pressable className='bg-[#00B1F7] rounded-full w-[49%]'>
          <Text className='text-center text-white font-medium text-lg py-2'>Finish Order</Text>
        </Pressable>
      </View>
    </View>
  )
}