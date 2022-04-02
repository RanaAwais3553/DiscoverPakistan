import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { FONT_SIZE, ICON_SIZE, IOS, PlaceHolders } from "../../constants";
import { Colors, Fonts } from "../../themes";
import { BORDERRADIUS, ROW, SPACING } from "../../themes/helpers";
import { Image } from "../image/image";
import { Text } from "../text/text";

export interface Props {
  user: any;
  style?: StyleProp<ViewStyle>;
  onPress?(): void;
  closeModal?(): void;
  onSend?(message: void): void;
  onEdit?(message: void): void;
  selectedComment: any;
  onReply?(message: any): void;
}

export const AddComment: React.FC<Props> = ({
  user,
  style,
  onPress,
  onSend,
  onEdit,
  onReply,
  selectedComment,
}) => {
  const [commentText, setcommentText] = useState("");
  const textInputRef = useRef(null);

  useEffect(() => {
    if (selectedComment && !selectedComment?.isReply) {
      setcommentText(selectedComment.comment);
    }

    setTimeout(() => {
      !onPress && textInputRef.current.focus();
    }, 200);
  }, []);

  const onSendPressed = () => {
    let data = { ...selectedComment };
    data.comment = commentText;

    if (!selectedComment) {
      onSend(commentText);
    } else if (selectedComment?.isReply) {
      let data = { ...selectedComment };
      data.comment = commentText;

      onReply(data);
    } else {
      let data = { ...selectedComment };
      data.comment = commentText;

      onEdit(data);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.userImage}
        circular
        size={ICON_SIZE.large}
        placeHolderType={"User"}
        loaderType={"ActivityIndicator"}
        source={{ uri: user?.image_url }}
      />
      <TouchableOpacity style={styles.submitCommentsWrapper} onPress={onPress}>
        {onPress ? (
          <Text style={styles.disableTextInput}>Add a comment...</Text>
        ) : (
          <View style={styles.textInputWrapper}>
            <TextInput
              ref={textInputRef}
              placeholder={PlaceHolders.addComment}
              placeholderTextColor={Colors.lightText}
              style={styles.textInput}
              onChangeText={setcommentText}
              onSubmitEditing={onSendPressed}
              value={commentText}
            />
            {commentText ? (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={onSendPressed}
              >
                <Ionicons
                  name="send"
                  color={Colors.primaryButton}
                  size={responsiveFontSize(2.5)}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

AddComment.defaultProps = {};

// styles
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: responsiveWidth(100),
  },
  container: {
    ...ROW,
    width: "95%",
    alignSelf: "center",

    marginBottom: SPACING.large,
  },
  userImage: {
    margin: SPACING.extraSmall,
  },
  submitCommentsWrapper: {
    flex: 1,
    paddingLeft: SPACING.small,
  },

  disableTextInput: {
    height: SPACING.x2Large,
    lineHeight: SPACING.x2Large,
    backgroundColor: Colors.dimLightIcon,
    paddingLeft: SPACING.small,
    color: Colors.placeHolder,
    ...BORDERRADIUS,
  },
  textInputWrapper: {
    backgroundColor: Colors.white,
    ...BORDERRADIUS,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  textInput: {
    height: SPACING.x2Large,
    ...(!IOS ? { lineHeight: SPACING.x2Large } : null),
    paddingHorizontal: SPACING.small,
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.medium,
    color: Colors.darkText,
  },
  sendButton: {
    padding: SPACING.small,
  },
});
