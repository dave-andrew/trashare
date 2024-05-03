import { Text, View, Image, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function FinishPage() {
  return (
    <View className="bg-white min-h-full">
      <View
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
      </View>

      <View className='flex flex-row items-center mx-2 my-2'>
        <Image className='w-16 h-16 rounded-full' source={{ uri: 'https://picsum.photos/200' }} />
        <View className='ml-4'>
          <Text className='text-gray-500 font-medium'>Ordered by</Text>
          <Text className='text-lg font-medium'>Orderer Name</Text>
        </View>
      </View>

      <View className='flex flex-col mx-2 p-4 rounded-md bg-gray-100'>
        <Pressable className='rounded-full absolute z-10 bg-white w-10 h-10 flex items-center justify-center top-6 right-6'>
          <FontAwesome name='close' size={28} color={"#ccc"} />
        </Pressable>

        <Pressable className='w-full relative'>
          <Image source={{ uri: 'https://picsum.photos/200' }} className='w-full h-40 rounded-md' />
        </Pressable>

        <View className='flex flex-row gap-2'>
          <Pressable className='w-14 h-14 bg-gray-400 flex items-center justify-center rounded-full'>
            <FontAwesome name='sticky-note' size={28} color={"#fff"}/>
          </Pressable>
          <Pressable className='w-14 h-14 bg-gray-400 flex items-center justify-center rounded-full'>
            <FontAwesome name='recycle' size={28} color={"#fff"}/>
          </Pressable>
          <Pressable className='w-14 h-14 bg-gray-400 flex items-center justify-center rounded-full'>
            <FontAwesome name='leaf' size={28} color={"#fff"}/>
          </Pressable>
        </View>
      </View>


    </View>
  )
}