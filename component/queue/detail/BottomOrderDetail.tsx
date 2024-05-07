import BottomSheet from "@gorhom/bottom-sheet";
import { History } from "../../../models/History";
import { View, Image, Text, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { getAdditionalInfo } from "../../../app/datas/queries/useQueries";
import { useRealm } from "@realm/react";
import { useContext } from "react";
import { AdditionalInfoContext } from "../../../app/providers/AdditionalInfoProvider";

export default function BottomOrderDetail({ queue }: { queue: History }) {

  const router = useRouter();
  const realm = useRealm();
  const ordererAdditionalInfo = getAdditionalInfo(realm, queue?.orderer)[0]
  const { additionalInfo } = useContext(AdditionalInfoContext)

  if(!additionalInfo) {
    return <></>
  }

  return (
    <BottomSheet
      style={{ elevation: 5, paddingHorizontal: 12, gap: 10 }}
      snapPoints={['25%', '25%']}
      handleIndicatorStyle={{ backgroundColor: '#eee', width: 60, height: 6 }}>

      <View className="flex flex-col">
        <View className="flex flex-row justify-between items-center pt-2 pb-4">
          <View className="flex flex-row gap-3 items-center">
            <Image className="rounded-full w-16 h-16" source={{ uri: ordererAdditionalInfo?.profileUrl ? ordererAdditionalInfo.profileUrl : "https://firebasestorage.googleapis.com/v0/b/trashare-3a2a9.appspot.com/o/default-user.png?alt=media&token=7db015cf-943d-42fe-8370-744febfcee8a" }} />
            <View className="flex- flex-col">
              <Text className="text-[#656565] font-medium">Ordered By</Text>
              <Text className="font-bold text-xl">{ordererAdditionalInfo?.username}</Text>
            </View>
          </View>
          <Pressable onPress={() => router.push({pathname: 'chat/chat', params: {station: additionalInfo.station._id}})}>
            <Image className="w-10 h-10" source={require('../../../assets/chat-icon.png')}></Image>
          </Pressable>
        </View>

        <Pressable
          className="bg-[#00B1F7] rounded-full py-2"
          onPress={() => router.push({ pathname: 'finish/finishPage', params: { id: queue._id } })}>
          <Text className="text-center text-white font-medium text-lg">Finish Order</Text>
        </Pressable>
      </View>
    </BottomSheet>
  )
}