import React from "react";
import { StyleSheet, View } from "react-native";

export interface Props {}

export const VideoLoader: React.FC<Props> = ({}) => {
  return <View style={styles.container}></View>;
};

VideoLoader.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
