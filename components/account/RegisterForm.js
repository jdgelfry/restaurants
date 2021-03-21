import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues);

  const defaultFormValues = () => {
    return { email: "", password: "", confirm: "" };
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email..."
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
      ></Input>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña..."
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
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
        onPress={() => console.log(formData)}
      ></Button>
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