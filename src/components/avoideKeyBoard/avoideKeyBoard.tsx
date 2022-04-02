import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { IOS } from "../../constants";

export interface Props {}

export const AvoideKeyBoard: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={IOS ? "padding" : null}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

AvoideKeyBoard.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
