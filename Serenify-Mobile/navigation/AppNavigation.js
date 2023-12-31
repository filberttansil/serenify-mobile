import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon as HomeOutline,
  UserCircleIcon as UserOutline,
  ChatBubbleLeftIcon as ChatOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  UserCircleIcon as UserSolid,
  ChatBubbleLeftIcon as ChatSolid,
} from "react-native-heroicons/solid";
// Redux
import { Provider } from "react-redux";
import store from "../stores/index";

// Component
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DetailPackage from "../screens/DetailPackage";
import { StripeProvider } from "@stripe/stripe-react-native";
// ThemeColors
import { themeColors } from "../themes";
import { LogBox, View } from "react-native";
import VideoCallScreen from "../screens/VideoCallScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Functions
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// Layout Variable
const ios = Platform.OS == "ios";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

// PublishableKey
const STRIPE_KEY =
  "pk_test_51Nihe8J9rr50hPJ7wcRlTiPo8WEcrHyJxpDH9noel8JjAKrKB3dEkOMKUpDyd6iTQ9fdZvakizFw8dh5zi0Inlkk00gsKAVi6K";
// Component
export default function AppNavigation() {
  const [mounted, setMounted] = useState(false);
  const [startingPage, setStartingPage] = useState("Welcome");
  const selectPageToShow = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      setStartingPage("Home");
    }
    setMounted(true);
  };

  useEffect(() => {
    if (!mounted) {
      selectPageToShow();
    }
  }, [mounted]);

  if (mounted) {
    return (
      <Provider store={store}>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <NavigationContainer startingPage={startingPage}>
            <Stack.Navigator initialRouteName={startingPage}>
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={HomeTabs}
              />
              <Stack.Screen
                name="Welcome"
                options={{ headerShown: false }}
                component={WelcomeScreen}
              />
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
              <Stack.Screen
                name="SignUp"
                options={{ headerShown: false }}
                component={SignUpScreen}
              />
              <Stack.Screen
                name="Edit"
                options={{ headerShown: false }}
                component={EditProfileScreen}
              />
              <Stack.Screen
                name="Package"
                options={{ headerShown: false }}
                component={DetailPackage}
              />
              <Stack.Screen
                name="VideoCall"
                options={{ headerShown: false }}
                component={VideoCallScreen}
              />
              <Stack.Screen
                name="Chat"
                options={{ headerShown: false }}
                component={ChatScreen}
              />
              {/* Nambah screen payment */}
            </Stack.Navigator>
          </NavigationContainer>
        </StripeProvider>
      </Provider>
    );
  }
  return <></>;
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          height: 75,
          alignItems: "center",
          borderTopColor: themeColors.bg3,
          borderTopWidth: 1,
          backgroundColor: themeColors.bg,
        },
        tabBarItemStyle: {
          marginTop: ios ? 30 : 0,
        },
      })}
    >
      <Tab.Screen name="Home_" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === "Home_") {
    icon = focused ? (
      <HomeSolid size="30" color={themeColors.bg3} />
    ) : (
      <HomeOutline size="30" strokeWidth={2} color={themeColors.bg3} />
    );
  } else if (route.name === "Chat") {
    icon = focused ? (
      <ChatSolid size="30" color={themeColors.bg3} />
    ) : (
      <ChatOutline size="30" strokeWidth={2} color={themeColors.bg3} />
    );
  } else if (route.name === "Profile") {
    icon = focused ? (
      <UserSolid size="30" color={themeColors.bg3} />
    ) : (
      <UserOutline size="30" strokeWidth={2} color={themeColors.bg3} />
    );
  } else if (route.name === "VideoCall") {
    icon = focused ? (
      <UserSolid size="30" color={themeColors.bg3} />
    ) : (
      <UserOutline size="30" strokeWidth={2} color={themeColors.bg3} />
    );
  }

  let buttonClass = focused ? "bg-white" : "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow" + buttonClass}>
      {icon}
    </View>
  );
};
