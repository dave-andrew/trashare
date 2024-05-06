import { useContext } from "react";
import { useMutationAdditionalInfo } from "../datas/mutations/useAdditionalInfo";
import { getStationById, getStations } from "../datas/queries/useQueries";
import { AdditionalInfoContext } from "../providers/AdditionalInfoProvider";
import { useRealm } from "@realm/react";
import { Pressable, Text } from "react-native";

export default function UserToStation() {

  const { additionalInfo } = useContext(AdditionalInfoContext);
  const { setAdditionalInfo } = useContext(AdditionalInfoContext);
  const { updateUserToStation } = useMutationAdditionalInfo()
  
  const realm = useRealm()
  const station = getStationById(realm, '6634f92d90bc139d4d15a5b0')
  console.log("Station", station);

  const handleUpdateUserToStation = () => {
    const user = updateUserToStation({
      user_id: additionalInfo._id,
      station_id: station._id,
      realm: realm
    })
    setAdditionalInfo(user)
  };

  return (
    <Pressable onPress={() => handleUpdateUserToStation()} className="bg-[#00B1F7] rounded-full w-[80%] mx-auto mt-4">
      <Text>Upgrade to Station Rekosistem</Text>
    </Pressable>
  )
}