import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const drawer = createDrawerNavigator();

import Mosque from "./screen/Drawer/Mosque";
import Hospital from "./screen/Drawer/Hospital";
import Macdonalds from "./screen/Drawer/Macdonalds";
import Kfc from "./screen/Drawer/Kfc";
export default function App() {
  return (
    <NavigationContainer>
      <drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "black",
          },
          drawerLabelStyle: {
            color: "white",
            fontSize: 17,
          },
          drawerActiveBackgroundColor: "gray",
          headerTintColor: "#FFFFFF",
        }}
      >
        <drawer.Screen
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#0b1a2b",
            },
            headerTitleStyle: {
              color: "white",
            },
            drawerIcon: () => {
              return (
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/R.af1daba411a66427e6ca43b241ee5646?rik=RozhznpbL%2fg1mA&riu=http%3a%2f%2fclipart-library.com%2fnewhp%2fmosque_PNG30.png&ehk=f8HgVrbFpQWdGcFyHeuxaxK%2biIJOHYpW%2b581wdcb4pI%3d&risl=&pid=ImgRaw&r=0",
                  }}
                />
              );
            },
          }}
          name="Mosque"
          component={Mosque}
        />
        <drawer.Screen
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#0b1a2b",
            },
            headerTitleStyle: {
              color: "white",
            },
            drawerIcon: () => {
              return (
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/R.3f59af2e2fdc4ae4d96f2e795df85eb5?rik=VLXt2U8mdNGXqg&pid=ImgRaw&r=0",
                  }}
                />
              );
            },
          }}
          name="Hospital"
          component={Hospital}
        />
        <drawer.Screen
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#0b1a2b",
            },
            headerTitleStyle: {
              color: "white",
            },
            drawerIcon: () => {
              return (
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/R.60eacaf96ae7aca153527bc6fd44159c?rik=oKvl47ZaWUKDkA&pid=ImgRaw&r=0",
                  }}
                />
              );
            },
          }}
          name="Macdonalds"
          component={Macdonalds}
        />
        <drawer.Screen
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#0b1a2b",
            },
            headerTitleStyle: {
              color: "white",
            },
            drawerIcon: () => {
              return (
                <Image
                  className="w-[22px] h-[22px]"
                  source={{
                    uri: "https://th.bing.com/th/id/OIP.z9tgA83izEA6YqT8SAXqkQHaHa?rs=1&pid=ImgDetMain",
                  }}
                />
              );
            },
          }}
          name="Kfc"
          component={Kfc}
        />
      </drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
