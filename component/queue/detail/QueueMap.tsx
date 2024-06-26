import { useContext, useEffect, useState } from "react"
import { View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { Geo } from "../../../app/(tabs)/stationPage"
import { AdditionalInfoContext } from "../../../app/providers/AdditionalInfoProvider"
import { useRealm } from "@realm/react"
import { History } from "../../../models/History"
import BottomOrderDetail from "./BottomOrderDetail"
import MapViewDirections from "react-native-maps-directions"
import { Image } from "react-native"

export default function QueueMap({ queue }: { queue: History }) {

  const [stationGeometry, setStationGeometry] = useState<Geo | null>()
  const [userGeometry, setUserGeometry] = useState<Geo | null>()
  const { additionalInfo } = useContext(AdditionalInfoContext);
  const realm = useRealm()

  useEffect(() => {
    if (queue) {
      setUserGeometry({
        latitude: queue.location.lat,
        longitude: queue.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
      setStationGeometry({
        latitude: queue.station.geometry.location.lat,
        longitude: queue.station.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    }
  }, [queue])

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  return (
    <View className="flex-1">
      <MapView className='flex-1' region={stationGeometry ? stationGeometry : location}>
        <Marker
          coordinate={stationGeometry}
          title={queue.station.name}>
          <Image
            source={require('../../../assets/marker/main-pin.png')}
            style={{ width: 50, height: 50, display: "flex" }}
            resizeMode="contain"
          />
        </Marker>
        <Marker
          coordinate={userGeometry}
          title="Your destination!">
          <Image
            source={require('../../../assets/marker/main-pin.png')}
            style={{ width: 50, height: 50, display: "flex" }}
            resizeMode="contain"
          />
        </Marker>
        <MapViewDirections
          origin={userGeometry}
          destination={stationGeometry}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="#4285F4"
        />
      </MapView>
    </View>
  )
}