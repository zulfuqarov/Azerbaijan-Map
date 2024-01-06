import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const drawer = createDrawerNavigator();

import Pharmacy from "./screen/Drawer/Pharmacy";
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
          name="Pharmacy"
          component={Pharmacy}
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#0b1a2b",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
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
