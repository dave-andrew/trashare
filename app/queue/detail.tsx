import { Pressable, View } from 'react-native';
import Map from '../../component/station/Map';
import { useState } from 'react';
import { useRealm } from '@realm/react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getHistoryById } from '../datas/queries/useQueries';
import QueueMap from '../../component/queue/detail/QueueMap';
import BottomOrderDetail from '../../component/queue/detail/BottomOrderDetail';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function QueueDetail() {

  const realm = useRealm();
  const queue_id = useLocalSearchParams().id;
  const queue = getHistoryById(realm, queue_id?.toString())
  const router = useRouter()

  return (
    <View style={{ flex: 1 }}>
      <View className='flex-1'>
        <QueueMap queue={queue}/>
        <Pressable className='rounded-full bg-white absolute bottom-[28%] left-2 w-14 h-14 flex items-center justify-center' style={{elevation: 3}} onPress={() => router.back()}>
          <FontAwesome name='arrow-left' size={28} color='#bbb'/>
        </Pressable>
        <BottomOrderDetail queue={queue} />
      </View>
    </View>
  )
}