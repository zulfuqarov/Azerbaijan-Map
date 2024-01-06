import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { MosqueApi } from "../../Api/Mosque/Mosque";

const Mosque = () => {
  const [location, setLocation] = useState(null);
  const [neareMosque, setneareMosque] = useState(null);
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
        setneareMosque(nearestMosque);
        setErrorMsg(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckLocation();
  }, []);

  function findNearestMosque(userLatitude, userLongitude) {
    let nearestMosque;
    let minDistance = Number.MAX_VALUE;

    for (const mosque of MosqueApi) {
      const distance = Math.sqrt(
        Math.pow(userLatitude - mosque.Latitude, 2) +
          Math.pow(userLongitude - mosque.Longitude, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestMosque = mosque;
      }
    }

    return nearestMosque;
  }

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

          {MosqueApi &&
            MosqueApi.map((oneMosque, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: oneMosque.Latitude,
                  longitude: oneMosque.Longitude,
                }}
                style={{ flex: 1 }}
                title={`${oneMosque.name}`}
              >
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/R.af1daba411a66427e6ca43b241ee5646?rik=RozhznpbL%2fg1mA&riu=http%3a%2f%2fclipart-library.com%2fnewhp%2fmosque_PNG30.png&ehk=f8HgVrbFpQWdGcFyHeuxaxK%2biIJOHYpW%2b581wdcb4pI%3d&risl=&pid=ImgRaw&r=0",
                  }}
                />
              </Marker>
            ))}
          <Polyline
            coordinates={[
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              {
                latitude: neareMosque.Latitude,
                longitude: neareMosque.Longitude,
              },
            ]}
            strokeWidth={2}
            strokeColor="black"
          />
        </MapView>
      )}
    </View>
  );
};

export default Mosque;
