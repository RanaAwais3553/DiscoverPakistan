import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BackIcon, UpDown } from "../../assets/svg";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { ELEVATION, SPACING } from "../../themes/helpers";
import { Icon } from "../icon/icon";
import { Text } from "../text/text";

export interface Props {
  list: any;
  onIconPressed?(): void;
  onBackPressed?(): void;
  type: "AllComments" | "Reply" | "Default";
}

export const CommentsHeader: React.FC<Props> = ({
  list,
  onIconPressed,
  type,
  onBackPressed,
}) => {
  const getChecked = () => {
    return type === "AllComments" || type === "Reply";
  };
  return (
    <View
      style={[
        styles.commentsWrapper,
        getChecked() && styles.allCommentContainer,
      ]}
    >
      <View style={styles.backButtonWrapper}>
        {type === "Reply" && (
          <Icon
            style={styles.backButton}
            Value={BackIcon}
            height={ICON_SIZE.small}
            onPress={onBackPressed}
          />
        )}
        <Text
          style={[styles.comments, getChecked() && styles.allCommentsCount]}
        >
          {type === "Reply" ? "Replies" : "Comments  "}

          {type !== "Reply" && (
            <Text style={styles.commentsCount}>{`${list?.length || 0}`}</Text>
          )}
        </Text>
      </View>
      {getChecked() ? (
        <TouchableOpacity style={styles.crossButton} onPress={onIconPressed}>
          <Entypo
            name="cross"
            color={Colors.lightIcon}
            size={ICON_SIZE.medium}
          />
        </TouchableOpacity>
      ) : (
        <Icon onPress={onIconPressed} Value={UpDown} height={ICON_SIZE.small} />
      )}
    </View>
  );
};

CommentsHeader.defaultProps = {};

// styles
const styles = StyleSheet.create({
  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
    marginVertical: SPACING.extraSmall,
  },

  allCommentContainer: {
    ...ELEVATION,
    width: "100%",
    paddingHorizontal: SPACING.small,
  },
  backButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    color: Colors.darkText,
  },
  backButton: {
    marginRight: SPACING.medium,
  },
  allCommentsCount: {
    fontSize: FONT_SIZE.large,
    fontFamily: Fonts.bold,
  },
  commentsCount: {
    color: Colors.lightIcon,
  },
  crossButton: {
    padding: SPACING.small,
  },
});
