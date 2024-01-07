import { View, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { MacdonaldsApi } from "../../Api/Macdonalds/Macdonalds";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
const Macdonalds = () => {
  const [location, setlocation] = useState(null);
  const [neareMacdonalds, setneareMacdonalds] = useState(null);
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
        const nearestMacdonald = findNearestMacdonalds(
          location.coords.latitude,
          location.coords.longitude
        );
        setneareMacdonalds(nearestMacdonald);
        setErrorMsg(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("serverle elqaqeder bir xeta bash verdi");
    }
  };

  function findNearestMacdonalds(userLatitude, userLongitude) {
    let nearestMacdonalds;
    let minDistance = Number.MAX_VALUE;

    for (const Macdonalds of MacdonaldsApi) {
      const distance = Math.sqrt(
        Math.pow(userLatitude - Macdonalds.Latitude, 2) +
          Math.pow(userLongitude - Macdonalds.Longitude, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestMacdonalds = Macdonalds;
      }
    }
    return nearestMacdonalds;
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
          {MacdonaldsApi &&
            MacdonaldsApi.map((oneMacdonalds, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: oneMacdonalds.Latitude,
                  longitude: oneMacdonalds.Longitude,
                }}
                style={{ flex: 1 }}
                title={`${oneMacdonalds.name}`}
              >
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/R.60eacaf96ae7aca153527bc6fd44159c?rik=oKvl47ZaWUKDkA&pid=ImgRaw&r=0",
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
              latitude: neareMacdonalds.Latitude,
              longitude: neareMacdonalds.Longitude,
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

export default Macdonalds;
