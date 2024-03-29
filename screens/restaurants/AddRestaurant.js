import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";

import AddRestaurantForm from "../../components/restaurants/AddRestaurantForm";

export default function AddRestaurant({ navigation }) {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <AddRestaurantForm
        toastRef={toastRef}
        setLoading={setLoading}
        navigation={navigation}
      ></AddRestaurantForm>
      <Loading isVisible={loading} text={"Creando restaurante..."}></Loading>
      <Toast ref={toastRef} position="center" opacity={0.9}></Toast>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
