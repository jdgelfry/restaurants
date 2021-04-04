import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { updateProfile, uploadImage } from "../../utils/actions";
import { loadImageFromGallery } from "../../utils/helpers";

export default function infoUser({ user, setLoading, setLoadingText }) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1]);
    if (!result.status) {
      return;
    }
    setLoadingText("Actualizando imagen...");
    setLoading(true);
    const resultUploadImage = await uploadImage(
      result.image,
      "avatars",
      user.uid
    );
    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      Alert.alert("Ha ocurrido error al almacenar la foto de perfil.");
      return;
    }
    const resultUploadProfile = await updateProfile({
      photoURL: resultUploadImage.url,
    });
    setLoading(false);
    if (resultUploadProfile.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
    } else {
      Alert.alert("Ha ocurrido error al actualizar la foto de perfil.");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        onPress={changePhoto}
        source={
          photoUrl
            ? { uri: photoUrl }
            : require("../../assets/avatar-default.jpg")
        }
      ></Avatar>
      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {user.displayName ? user.displayName : "Anónimo"}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    paddingVertical: 30,
  },
  infoUser: {
    marginLeft: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
