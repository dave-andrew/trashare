import { Text, View } from "react-native";
import EditScreenInfo from "../../component/EditScreenInfo";
// import {MAPBOX_API_KEY} from "../../sync.config";
// import Mapbox from "@rnmapbox/maps";
import {useEffect} from "react";



export default function Station() {

    // useEffect(() => {
    //     Mapbox.setAccessToken(MAPBOX_API_KEY);
    //     Mapbox.setConnected(true)
    //     Mapbox.setTelemetryEnabled(false)
    //     Mapbox.setWellKnownTileServer("Mapbox")
    // }, []);

    return (
        <View style={{ flex: 1 }}>
            {/*<Mapbox.MapView style={{ flex: 1 }} zoomEnabled={true} styleURL={"mapbox://styles/mapbox/streets-v12"}>*/}
            {/*    <Mapbox.Camera*/}
            {/*        zoomLevel={9}*/}
            {/*        centerCoordinate={[106.865036, -6.175110]}*/}
            {/*    />*/}
            {/*</Mapbox.MapView>*/}
            <EditScreenInfo path="app/(tabs)/station.tsx" />
        </View>
    );
}