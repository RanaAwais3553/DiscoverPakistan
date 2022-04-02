import { Entypo, Feather, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { ICON_SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { ROW, SPACING } from "../../themes/helpers";

export interface Props {
  onPlayPauseToggle(): void;
  onFullScreenPressed(): void;
  onToggleMute(): void;
  shouldPlay: boolean;
}

const PlayerControls: React.FC<Props> = ({
  onFullScreenPressed,
  onPlayPauseToggle,
  onToggleMute,
  shouldPlay,
}) => {
  const [isMuted, setisMuted] = useState(false);

  const onMutePressed = () => {
    setisMuted((p) => !p);

    onToggleMute();
  };

  return (
    <View style={styles.container}>
      <View style={ROW}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={onPlayPauseToggle}
        >
          <Entypo
            name={shouldPlay ? "controller-paus" : "controller-play"}
            color={Colors.primary}
            size={ICON_SIZE.medium}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconWrapper} onPress={onMutePressed}>
          <Octicons
            name={isMuted ? "mute" : "unmute"}
            color={Colors.primary}
            size={ICON_SIZE.medium}
          />
        </TouchableOpacity>

        <View style={styles.bulletContainer}>
          <View style={styles.bullet} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={onFullScreenPressed}
      >
        <Feather
          name={"maximize"}
          color={Colors.primary}
          size={ICON_SIZE.medium}
        />
      </TouchableOpacity>
    </View>
  );
};

PlayerControls.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    bottom: 0,
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    backgroundColor: Colors.live,
    width: responsiveFontSize(0.7),
    height: responsiveFontSize(0.7),
    borderRadius: responsiveFontSize(0.7),
    marginHorizontal: SPACING.small,
  },
  liveText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
  },
  iconWrapper: {
    padding: SPACING.small,
  },
});

export default PlayerControls;
