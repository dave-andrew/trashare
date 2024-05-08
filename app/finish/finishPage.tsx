import { Text, View, Image, Pressable, Alert, Button } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import WasteTypeSelector from '../../component/finish/WasteTypeSelector';
import { useContext, useState } from 'react';
import WasteDataCard from '../../component/finish/WasteDataCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAdditionalInfo, getHistoryById } from '../datas/queries/useQueries';
import { useRealm } from '@realm/react';
import { useQueueMutation } from '../datas/mutations/useMutations';
import { useMutationAdditionalInfo } from '../datas/mutations/useAdditionalInfo';
import { AdditionalInfoContext } from '../providers/AdditionalInfoProvider';

export type WastePlaceholder = {
  wasteType: string;
  weight: number;
  imageUrl: string;
};

export interface UserWasteData {
  paperWeight: number;
  recylableWeight: number;
  compostWeight: number;
  totalPoint: number;
}

export default function FinishPage() {

  const realm = useRealm();
  const router = useRouter();
  const queue_id = useLocalSearchParams().id;
  const queue = getHistoryById(realm, queue_id?.toString())
  const { finishOrder } = useQueueMutation(realm, queue)
  const { updateUserWasteData, finishOrderAndUpdateUser } = useMutationAdditionalInfo()
  const { additionalInfo, setAdditionalInfo } = useContext(AdditionalInfoContext)
  const ordererAdditionalInfo = getAdditionalInfo(realm, queue?.orderer)[0]

  const [wasteList, setWasteList] = useState<WastePlaceholder[]>([{ wasteType: '', weight: null, imageUrl: '' }])
  console.log(wasteList)

  const addWaste = () => {
    if (wasteList.length >= 3) {
      Alert.alert('Maximum Types Reached', 'You can only add a maximum of three types of waste.')
      return
    }
    if (!wasteList.every((waste) => waste.wasteType != '' && waste.weight != null && waste.imageUrl != '')) {
      Alert.alert('Incomplete Information', 'Please fill in all previous fields before proceeding.')
      return
    }
    setWasteList((prevList) => [...prevList, { wasteType: '', weight: null, imageUrl: '' }])
  }

  const handleFinishOrder = () => {
    if (!wasteList.every((waste) => waste.wasteType != '' && waste.weight != null && waste.imageUrl != '')) {
      Alert.alert('Incomplete Information', 'Please fill in all previous fields before proceeding.')
      return
    }
    Alert.alert('Finish Order', 'Are you sure you want to finish this order?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          const updatedWasteList = wasteList.map((waste) => {
            return { ...waste, weight: Number(waste.weight) };
          });
          
          // const userWastes = countWeights()
          // const user = updateUserWasteData({ user_id: queue.orderer, userWastes: userWastes, realm: realm })
          // console.log("Updated User Data: ", user)
          
          // const station = updateUserWasteData({ user_id: additionalInfo._id, userWastes: userWastes, realm: realm })
          // console.log("Updated Station Data", station)
          // setAdditionalInfo(station)

          // const finish = finishOrder(queue, updatedWasteList)
          // console.log('Finish order successful!', finish)

          const data = finishOrderAndUpdateUser({
            user_id: queue.orderer, user_station_id: additionalInfo._id, queue_id: queue._id, wasteList: wasteList, realm: realm
          })
          console.log('Finished order!', data)
          router.push({ pathname: '(tabs)/queuePage' })
        }
      }
    ])
  }

  return (
    // <Button title="Finish Page" onPress={() => console.log('Finish Page')} />
    <View className='h-full'>
      <ScrollView className="bg-[#F9F9F9] flex">
        <View className='flex flex-row items-center mx-2 mb-2 mt-4'>
          <Image className='w-14 h-14 rounded-full' source={{ uri: ordererAdditionalInfo?.profileUrl ? ordererAdditionalInfo.profileUrl : "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/default-user.png?alt=media&token=7db015cf-943d-42fe-8370-744febfcee8a" }} />
          <View className='ml-4'>
            <Text className='text-gray-500 font-medium'>Ordered by</Text>
            <Text className='text-lg font-medium'>{ordererAdditionalInfo?.username}</Text>
          </View>
        </View>

        {wasteList.map((_, index) => (
          <WasteDataCard key={index} index={index} wasteList={wasteList} setWasteList={setWasteList} />
        ))}
      </ScrollView>

      <View className='flex flex-row justify-between bottom-0 w-full px-2 py-4 bg-white' style={{ elevation: 5 }}>
        <Pressable
          className='bg-[#a0a0a0] rounded-full w-[49%]'
          onPress={() => addWaste()}>
          <Text className='text-center text-white font-medium text-lg py-2'>Add Waste</Text>
        </Pressable>

        <Pressable className='bg-[#00B1F7] rounded-full w-[49%]' onPress={() => handleFinishOrder()}>
          <Text className='text-center text-white font-medium text-lg py-2'>Finish Order</Text>
        </Pressable>
      </View>
    </View>
  )
}