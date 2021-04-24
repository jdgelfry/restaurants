import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import { getDocumentById } from "../../utils/actions";

import Loading from "../../components/Loading";
import { ScrollView } from "react-native";
import CarouselImages from "../../components/CarouselImages";

const widthScreen = Dimensions.get("window").width;

export default function Restaurant({ navigation, route }) {
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);

  navigation.setOptions({ title: name });

  useEffect(() => {
    (async () => {
      const response = await getDocumentById("restaurants", id);
      if (response.statusResponse) {
        setRestaurant(response.document);
      } else {
        setRestaurant({});
        Alert.alert(
          "Ocurrio un problema cargando el restaurante, intente más tarde."
        );
      }
    })();
  }, []);

  if (!restaurant) {
    return <Loading isVisible={true} text="Cargando..."></Loading>;
  }

  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImages
        images={restaurant.images}
        height={250}
        width={widthScreen}
      ></CarouselImages>
      <Text>{restaurant.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});
