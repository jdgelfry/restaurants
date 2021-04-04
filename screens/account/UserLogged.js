import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { closeSession, getCurrentUSer } from "../../utils/actions";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import InfoUser from "../../components/account/InfoUser";
import AccountOptions from "../../components/account/AccountOptions";

export default function userLogged() {
  const toastRef = useRef();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(null);
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    setUser(getCurrentUSer());
    setReloadUser(false);
  }, [reloadUser]);
  return (
    <View style={styles.container}>
      {user && (
        <View>
          <InfoUser
            user={user}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          ></InfoUser>
          <AccountOptions
            user={user}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          ></AccountOptions>
        </View>
      )}

      <Button
        title="Cerrar Sesíon"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSesionTitle}
        onPress={() => {
          closeSession();
          navigation.navigate("restaurants");
        }}
      ></Button>
      <Toast ref={toastRef} position="center" opacity={0.9}></Toast>
      <Loading isVisible={loading} text={loadingText}></Loading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#442484",
    borderBottomWidth: 1,
    borderBottomColor: "#442484",
    paddingVertical: 10,
  },
  btnCloseSesionTitle: {
    color: "#442484",
  },
});
