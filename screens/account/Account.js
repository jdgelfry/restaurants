import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import Loading from "../../components/Loading";
import { getCurrentUSer, isUserLogged } from "../../utils/actions";
import { useFocusEffect } from "@react-navigation/native";

import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

export default function Account() {
  const [login, setLogin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const user = getCurrentUSer(null);
      user ? setLogin(true) : setLogin(false);
    }, [])
  );

  if (login == null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return login ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
