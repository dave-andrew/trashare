import { useRouter } from "expo-router";
import { History } from "../../models/History";
import { Pressable, Text, Image, View } from "react-native";
import { getAdditionalInfo } from "../../app/datas/queries/useQueries";
import { useRealm } from "@realm/react";

export default function QueueItem({ queue }: { queue: History }) {

  const router = useRouter();
  const realm = useRealm()
  const ordererAdditionalInfo = getAdditionalInfo(realm, queue?.orderer)[0]
  console.log(queue?.orderer);
  console.log(ordererAdditionalInfo);
  

  return (
    <Pressable
      className="m-2 my-1 bg-white mb-2 p-4 rounded-xl flex flex-row"
      style={{ elevation: 5 }}
      onPress={() => { router.push({ pathname: queue.orderType == 'Send' ? 'queue/detail' : 'finish/finishPage', params: { id: queue._id } }) }}>

      <Image
        className='w-16 h-16 rounded-full mr-3'
        source={{ uri: ordererAdditionalInfo?.profileUrl ? ordererAdditionalInfo.profileUrl : "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/default-user.png?alt=media&token=7db015cf-943d-42fe-8370-744febfcee8a" }} />

      <View className="flex flex-row justify-between flex-grow">
        <View className="flex flex-col justify-between">
          <Text className="font-medium">{ordererAdditionalInfo?.username}</Text>
          <View style={[{ flexDirection: 'row' }]}>
            <Text className={`${queue.orderType == "Send" ? "text-yellow-600 bg-yellow-200" : "text-green-600 bg-green-200"} px-6 py-1 rounded-xl text-xs`}>{queue.orderType}</Text>
          </View>
        </View>
        <View className="flex flex-col items-end">
          <Text className="text-gray-400 text-xs">{queue.createdAt.toLocaleTimeString()}</Text>
          <Text className="text-gray-400 text-xs">{queue.createdAt.toLocaleDateString()}</Text>
        </View>
      </View>
    </Pressable>
  )
}