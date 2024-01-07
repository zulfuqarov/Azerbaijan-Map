import { View, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { KfcApi } from "../../Api/Kfc/Kfc";
const Kfc = () => {
  const [location, setlocation] = useState(null);
  const [neareKfcs, setneareKfcs] = useState(null);
  const [errorMsg, setErrorMsg] = useState(true);

  const CheckLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Konum izni verilmedi");
        return;
      } else {
        let location = await Location.getCurrentPositionAsync();
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        await new Promise((resolve) => {
          setlocation(location);
          resolve();
        });
        const nearestKfc = findNearestKfcs(
          location.coords.latitude,
          location.coords.longitude
        );
        setneareKfcs(nearestKfc);
        setErrorMsg(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("serverle elqaqeder bir xeta bash verdi");
    }
  };

  function findNearestKfcs(userLatitude, userLongitude) {
    let nearestKfcs;
    let minDistance = Number.MAX_VALUE;

    for (const Kfcs of KfcApi) {
      const distance = Math.sqrt(
        Math.pow(userLatitude - Kfcs.Latitude, 2) +
          Math.pow(userLongitude - Kfcs.Longitude, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestKfcs = Kfcs;
      }
    }
    return nearestKfcs;
  }

  useEffect(() => {
    CheckLocation();
  }, []);

  return (
    <View className="w-full h-full bg-[#091b31]">
      {errorMsg ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator />
        </View>
      ) : (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          className="w-full h-full"
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            style={{ flex: 1 }}
            title="ME"
          >
            <Image
              className="w-[22px] h-[22px]"
              source={{
                uri: "https://svgsilh.com/png-512/659651.png",
              }}
            />
          </Marker>
          {KfcApi &&
            KfcApi.map((oneKfc, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: oneKfc.Latitude,
                  longitude: oneKfc.Longitude,
                }}
                style={{ flex: 1 }}
                title={`${oneKfc.name}`}
              >
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/OIP.z9tgA83izEA6YqT8SAXqkQHaHa?rs=1&pid=ImgDetMain",
                  }}
                />
              </Marker>
            ))}

          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={{
              latitude: neareKfcs.Latitude,
              longitude: neareKfcs.Longitude,
            }}
            apikey="AIzaSyCuoHJkLMxZ1raU1sSXRgsPnqN776M9wlM"
            strokeWidth={2}
            strokeColor="black"
          />
        </MapView>
      )}
    </View>
  );
};

export default Kfc;
