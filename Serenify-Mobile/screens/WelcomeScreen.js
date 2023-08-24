import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../themes";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="flex-1 flex justify-around my-4">
        <View className="flex-row justify-center mt-20 ">
          <Image
            source={require("../assets/SerenifyLogo.png")}
            style={{ width: 350, height: 200 }}
          />
        </View>
        <Text className="text-[#1A1B4B] font-bold text-xl text-center mx-4 -mt-20">
          Experience the future of mental health support with Serenify – where
          professional care, convenience, and community converge to empower your
          well-being journey.
        </Text>
        <View className=" mb-10 space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3  mx-7 rounded-xl"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-[#1A1B4B] font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                className="font-semibold "
                style={{ color: themeColors.bg2 }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
