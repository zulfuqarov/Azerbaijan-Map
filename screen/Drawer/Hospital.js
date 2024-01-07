import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { HospitalApi } from "../../Api/Hospital/Hospital";
import MapViewDirections from "react-native-maps-directions";
const Hospital = () => {
  const [location, setLocation] = useState(null);
  const [neareHospital, setneareHospital] = useState(null);
  const [errorMsg, setErrorMsg] = useState(true);

  const CheckLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Konum izni verilmedi");
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        await new Promise((resolve) => {
          setLocation(location);
          resolve();
        });
        const nearestMosque = findNearestMosque(
          location.coords.latitude,
          location.coords.longitude
        );
        setneareHospital(nearestMosque);
        setErrorMsg(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function findNearestMosque(userLatitude, userLongitude) {
    let nearestMosque;
    let minDistance = Number.MAX_VALUE;

    for (const Hospital of HospitalApi) {
      const distance = Math.sqrt(
        Math.pow(userLatitude - Hospital.Latitude, 2) +
          Math.pow(userLongitude - Hospital.Longitude, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestMosque = Hospital;
      }
    }
    return nearestMosque;
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
          {HospitalApi &&
            HospitalApi.map((oneHospital, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: oneHospital.Latitude,
                  longitude: oneHospital.Longitude,
                }}
                style={{ flex: 1 }}
                title={`${oneHospital.name}`}
              >
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/R.3f59af2e2fdc4ae4d96f2e795df85eb5?rik=VLXt2U8mdNGXqg&pid=ImgRaw&r=0",
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
              latitude: neareHospital.Latitude,
              longitude: neareHospital.Longitude,
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

export default Hospital;
