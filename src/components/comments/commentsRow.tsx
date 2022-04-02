import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import { onCommentLikeDislike } from "../../sagas/mainSaga";
import { Colors, Fonts } from "../../themes";
import { ELEVATION, SPACING } from "../../themes/helpers";
import { getDiffInDates, ifUserNotLoggedIn } from "../../utilities";
import { Image } from "../image/image";
import { Loader } from "../loader/loader";
import { Text } from "../text/text";

export interface Props {
  style: StyleProp<ViewStyle>;
  item: any;
  onDeleteComment?(item: any): void;
  onEditComment?(item: any): void;
  onReplyComment?(item: any): void;
  user: any;
  getComments?(item: any): void;
  onRepliesPressed?(item: any): void;
  hideReply?: boolean;
}

export const CommentRow: React.FC<Props> = ({
  style,
  item,
  onDeleteComment,
  onEditComment,
  onReplyComment,
  user,
  getComments,
  onRepliesPressed,
  hideReply,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const row = (icon, title, isSelected, onPress) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.rowButton}>
        <Fontisto
          name={icon}
          color={isSelected ? Colors.primaryButton : Colors.lightIcon}
          size={ICON_SIZE.small}
        />
        <Text style={styles.rowButtonTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const onReplyPressed = () => {
    onReplyComment(item);
  };
  const onEditPressed = () => {
    onEditComment(item);
  };

  const onDeletePressed = () => {
    onDeleteComment(item);
  };
  const onToggleLikeDisLike = async (liked) => {
    let data = {
      member_id: user?.user_id,
      comment_id: item?.vcomment_id,
      like_unlike: liked,
    };

    setisLoading(true);
    const response = await onCommentLikeDislike(data);

    if (response?.message === "success") {
      getComments(item?.v_id);
    }
    setisLoading(false);
  };

  const onLike = () => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }

    onToggleLikeDisLike("1");
  };
  const onDisLike = () => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }
    onToggleLikeDisLike("-1");
  };

  const onShowReplies = () => {
    onRepliesPressed(item);
  };

  const getChecked = () => {
    return item?.comment_sender_name === user?.user_id;
  };

  return (
    <View style={[styles.container, style]}>
      <Loader loading={isLoading} fullScreen />
      <Image
        style={styles.userImage}
        circular
        size={ICON_SIZE.large}
        placeHolderType={"User"}
        loaderType={"ActivityIndicator"}
        source={{ uri: item?.img }}
      />
      <View style={[styles.dataWrapper, !style && ELEVATION]}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text> {getDiffInDates(item?.created_at)}</Text>
        </View>

        <Text numberOfLines={2} style={styles.comment}>
          {item?.comment}
        </Text>

        <View style={styles.iconWrapper}>
          {!hideReply && (
            <Text style={styles.rowButtonTitle} onPress={onReplyPressed}>
              Reply
            </Text>
          )}

          {row("like", item?.likes || 0, item?.like_unlike === "true", onLike)}
          {row(
            "dislike",
            item?.dislikes || 0,
            item?.like_unlike === "false",
            onDisLike,
          )}

          {getChecked() && (
            <>
              <Text style={styles.rowButtonTitle} onPress={onEditPressed}>
                Edit
              </Text>
              <Text style={styles.rowButtonTitle} onPress={onDeletePressed}>
                Delete
              </Text>
            </>
          )}
        </View>

        {item?.replies && !style && (
          <Text
            style={styles.replies}
            onPress={onShowReplies}
            text={item?.replies?.length + " REPLIES"}
          />
        )}
      </View>
    </View>
  );
};

CommentRow.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: SPACING.extraSmall,
  },
  userImage: {
    marginHorizontal: SPACING.small,
  },
  dataWrapper: {
    flex: 1,
    padding: SPACING.small,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: FONT_SIZE.medium,
  },
  comment: {
    textAlign: "justify",
    color: Colors.lightText,
    paddingVertical: SPACING.extraSmall,
  },
  rowButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row-reverse",
    padding: SPACING.extraSmall,
  },
  rowButtonTitle: {
    color: Colors.lightText,
    marginTop: SPACING.extraSmall,
    fontSize: FONT_SIZE.small,
    marginHorizontal: SPACING.extraSmall,
  },
  iconWrapper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  replies: {
    color: Colors?.replies,
    paddingLeft: SPACING.extraSmall,
    paddingVertical: SPACING.extraSmall,
  },
});
