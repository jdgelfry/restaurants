import { isEmpty, size } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { reauthenticate, updatePassword } from "../../utils/actions";
import { validateEmail } from "../../utils/helpers";

export default function ChangePasswordForm({ setShowModal, toastRef }) {
  const [newPassword, setNewPassword] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorNewPassword, setErrorNewPassword] = useState(null);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const resultReauthenticate = await reauthenticate(currentPassword);
    setLoading(false);

    if (!resultReauthenticate.statusResponse) {
      setLoading(false);
      setErrorCurrentPassword("Contraseña incorrecta.");
      return;
    }

    const resultUpdatePassword = await updatePassword(newPassword);
    setLoading(false);

    if (!resultUpdatePassword.statusResponse) {
      setErrorNewPassword(
        "Hubo un problema cambiando la contraseña, por favor intente mas tarde."
      );
      return;
    }

    toastRef.current.show("Se ha actualizado la contraseña.", 3000);
    setShowModal(false);
  };
  const validateForm = () => {
    setErrorNewPassword(null);
    setErrorCurrentPassword(null);
    setErrorConfirmPassword(null);
    let isValid = true;

    if (isEmpty(currentPassword)) {
      setErrorCurrentPassword("Debes ingresar tu contraseña actual.");
      isValid = false;
    }

    if (size(newPassword) < 6) {
      setErrorNewPassword(
        "Debes ingresar una nueva contraseña de al menos 6 carácteres."
      );
      isValid = false;
    }
    if (size(confirmPassword) < 6) {
      setErrorConfirmPassword(
        "Debes ingresar una nueva confirmación de tu contraseña de al menos 6 carácteres."
      );
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      setErrorNewPassword("No coinciden las contraseñas.");
      setErrorConfirmPassword("No coinciden las contraseñas.");
      isValid = false;
    }

    if (newPassword === currentPassword) {
      setErrorCurrentPassword(
        "Debes ingresar una contreseña diferente a la actual."
      );
      setErrorNewPassword(
        "Debes ingresar una contreseña diferente a la actual."
      );
      setErrorConfirmPassword(
        "Debes ingresar una contreseña diferente a la actual."
      );

      isValid = false;
    }

    return isValid;
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Ingresa tu contraseña actual..."
        containerStyle={styles.input}
        defaultValue={currentPassword}
        onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
        errorMessage={errorCurrentPassword}
        password={true}
        secureTextEntry={!showPassword}
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
        placeholder="Ingresa tu nueva contraseña..."
        containerStyle={styles.input}
        defaultValue={newPassword}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        errorMessage={errorNewPassword}
        password={true}
        secureTextEntry={!showPassword}
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
        placeholder="Ingresa tu confirmación de nueva contraseña..."
        containerStyle={styles.input}
        defaultValue={confirmPassword}
        onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
        errorMessage={errorConfirmPassword}
        password={true}
        secureTextEntry={!showPassword}
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
        title="Cambiar Contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
