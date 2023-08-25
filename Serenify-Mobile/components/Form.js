import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../themes";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function Form() {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    gender: "",
    birthDate: "",
  });
  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  // Pemanggilan API (trycatch)
  const handleSubmit = (event) => {
    console.log(user);
  };
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex">
        {/* Back Button */}
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/SerenifyLogo.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      {/* Form */}
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          {/* Email */}
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter Email"
          />
          {/* Password */}
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            onChangeText={(text) => handleChange("password", text)}
            value={user.password}
            placeholder="Enter Password"
          />
          {/* Gender */}
          <Text className="text-gray-700 ml-4">Gender</Text>
          <TextInput
            onChangeText={(text) => handleChange("gender", text)}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={user.gender}
            placeholder="Male/Female"
          />
          {/* BirthDate */}
          <Text className="text-gray-700 ml-4">Birth Date</Text>
          <TextInput
            onChangeText={(text) => handleChange("birthDate", text)}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={user.birthDate}
            placeholder="DD-MM-YYYY"
          />

          {/* Kondisi jika belum login */}

          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3  rounded-xl"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              {user.email === "" &&
              user.password === "" &&
              user.gender === "" &&
              user.birthDate === ""
                ? "Sign Up"
                : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}