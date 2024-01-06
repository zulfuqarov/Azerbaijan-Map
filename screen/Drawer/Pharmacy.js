import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Pharmacy = () => {
  const initialRegion = {
    latitude: 40.36424552684153,
    longitude: 49.963442814696954,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markerCoordinate = {
    latitude: 40.36424552684153,
    longitude: 49.963442814696954,
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#091b31" }}>
      <MapView initialRegion={initialRegion} style={{ flex: 1 }}>
        <Marker coordinate={markerCoordinate} title="ME">
          <Image
            className="w-[22px] h-[22px]"
            source={{
              uri: "https://svgsilh.com/png-512/659651.png",
            }}
          />
        </Marker>
      </MapView>
    </View>
  );
};

export default Pharmacy;
