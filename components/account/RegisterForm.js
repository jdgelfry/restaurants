import { size } from "lodash";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { validateEmail } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../utils/actions";
import Loading from "../Loading";

const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" };
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const doRegisterUser = async () => {
    if (!validateData()) {
      return;
    }

    setLoading(true);
    const result = await registerUser(formData.email, formData.password);
    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }

    navigation.navigate("account");
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirm("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email válido.");
      isValid = false;
    }
    if (size(formData.password) < 6) {
      setErrorPassword(
        "Debes ingresar una contraseña de al menos 6 carácteres."
      );
      isValid = false;
    }
    if (size(formData.confirm) < 6) {
      setErrorConfirm(
        "Debes ingresar una confirmacion de contraseña de al menos 6 carácteres."
      );
      isValid = false;
    }
    if (size(formData.password) !== size(formData.confirm)) {
      setErrorPassword("La contraseña y la confirmación no son iguales");
      setErrorConfirm("La contraseña y la confirmación no son iguales");
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email..."
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      ></Input>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña..."
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          ></Icon>
        }
      ></Input>
      <Input
        containerStyle={styles.input}
        placeholder="Confirma tu contraseña..."
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "confirm")}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          ></Icon>
        }
      ></Input>
      <Button
        title="Registrar Nuevo Usuario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doRegisterUser()}
      ></Button>
      <Loading isVisible={loading} text="Creando cuenta..."></Loading>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#442484",
  },
  icon: {
    color: "#c1c1c1",
  },
});
