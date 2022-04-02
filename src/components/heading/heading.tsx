import React from "react";
import { StyleSheet } from "react-native";
import { FONT_SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { Text } from "../text/text";

export interface Props {
  text: string;
}

export const Heading: React.FC<Props> = ({ text }) => {
  return (
    <Text style={styles.container}>
      <Text style={styles.bullet}>{"    "}</Text>
      {"  " + text}
    </Text>
  );
};

Heading.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    color: Colors.primaryButton,
    width: "90%",
    alignSelf: "center",
    marginVertical: SPACING.medium,
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.x2Large,
    textTransform: "uppercase",
  },
  bullet: {
    backgroundColor: Colors.primaryButton,
    lineHeight: SPACING.large,
  },
});
