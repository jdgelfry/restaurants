import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function ListRestaurants({ restaurants, navigation }) {
  return (
    <View>
      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(restaurant) => (
          <Restaurant
            restaurant={restaurant}
            navigation={navigation}
          ></Restaurant>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({});
