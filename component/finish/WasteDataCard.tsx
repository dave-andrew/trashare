import { Text, View, Image, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WasteTypeSelector from '../../component/finish/WasteTypeSelector';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { WastePlaceholder } from '../../app/finish/finishPage';

export default function WasteDataCard({ index, wasteList, setWasteList, handleAddImage }: { index: number, wasteList: WastePlaceholder[], setWasteList: (list: WastePlaceholder[]) => void, handleAddImage: () => void}) {

  const handleWeightChange = (text: string) => {
    setWasteList((prevList) => {
      const newList = [...prevList];
      newList[index].weight = text;
      return newList;
    });
  }

  const handleTypeChange = (type: string) => {
    setWasteList((prevList) => {
      const newList = [...prevList];
      newList[index].wasteType = type;
      return newList;
    });
  }

  const handleDelete = () => {
    if (wasteList.length <= 1) return
    setWasteList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  return (
    <View
      className='flex flex-col m-2 p-4 rounded-lg bg-white'
      style={{ elevation: 3 }}>
      <Pressable
        className='rounded-full absolute z-10 bg-white w-10 h-10 flex items-center justify-center top-6 right-6'
        onPress={() => handleDelete()}>
        <FontAwesome name='close' size={28} color={"#ccc"} />
      </Pressable>

      <Pressable className='w-full' onPress={() => handleAddImage()}>
        {wasteList[index].imageUrl != '' ?
          <Image source={{ uri: wasteList[index].imageUrl }} className='w-full h-40 rounded-lg' />
          :
          <View className='w-full h-40 rounded-lg bg-[#ccc] flex items-center justify-center'>
            <FontAwesome name='camera' size={40} color={'#a0a0a0'}/>
            <Text className='text-[#a0a0a0]'>Click to add image</Text>
          </View>
        }
      </Pressable>

      <View className='flex flex-row justify-between mt-4'>
        <TextInput
          className={"rounded-full border border-gray-400 py-2 px-4 w-[45%]"}
          placeholder={"Weight (g)"}
          value={wasteList[index].weight}
          onChangeText={(text) => handleWeightChange(text)}
          keyboardType='numeric'
        />
        <WasteTypeSelector wasteType={wasteList[index].wasteType} setWasteType={handleTypeChange} />
      </View>
    </View>
  )
}