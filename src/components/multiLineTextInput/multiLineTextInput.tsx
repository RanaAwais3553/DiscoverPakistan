import React, { useState } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { FONT_SIZE } from "../../constants";
import { Colors } from "../../themes";
import { BORDERRADIUS, SPACING } from "../../themes/helpers";
import { TextInput } from "../textInput/textInput";

export interface Props {
  value: string;
  onChangeText(text: string): void;
  placeHolderText: string;
  showLength?: boolean;
  maxLength?: number;
  style?: ViewStyle;
  containerStyle: any;
  headingStyle?: TextStyle;
  textInputStyle?: TextStyle;
  lengthTextStyle?: TextStyle;
  editable?: boolean;
}

export const MultiLineTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  containerStyle,
  placeHolderText,
  showLength,
  maxLength,
  style,

  textInputStyle,
  lengthTextStyle,
  editable,
}) => {
  const [textLength, settextLength] = useState(value.length);
  const [val, setVal] = useState("");
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.textInputContainer, containerStyle]}>
        {editable ? (
          <TextInput
            maxLength={maxLength}
            editable={editable}
            containerStyle={[styles.textInputContainer, containerStyle]}
            returnKeyType={"default"}
            style={[styles.orderMessage, textInputStyle]}
            placeholder={placeHolderText}
            keyboardType="default"
            placeholderTextColor={Colors.placeHolder}
            multiline={true}
            {...(maxLength
              ? {
                  maxLength: maxLength,
                }
              : null)}
            numberOfLines={5}
            //value={value}
            {...(value ? { value: value } : null)}
            onChangeText={async (text) => {
              setVal(text);
              if (maxLength) {
                if (text.length < maxLength + 1) {
                  settextLength(text.length);
                  onChangeText(text);
                }
                return;
              }

              settextLength(text.length);
              onChangeText(text);
            }}
          />
        ) : (
          <Text style={[styles.orderMessage, textInputStyle]}>{value}</Text>
        )}

        {showLength ? (
          !editable ? null : (
            <Text
              style={[
                styles.orderMessageTextLength,
                textLength === maxLength && styles.maxLength,
                lengthTextStyle,
              ]}
            >
              {textLength}/{maxLength}
            </Text>
          )
        ) : null}
      </View>
    </View>
  );
};

MultiLineTextInput.defaultProps = {
  value: "value is missing",
  onChangeText: () => {},

  showLength: true,
  maxLength: 500,

  style: {},
  headingStyle: {},
  textInputStyle: {},
  lengthTextStyle: {},
  editable: true,
};

const styles = StyleSheet.create({
  container: { width: "100%" },

  textInputContainer: {
    width: "100%",
    paddingVertical: "1%",
    minHeight: responsiveHeight(20),
  },
  orderMessage: {
    textAlignVertical: "top",
    flex: 1,
    padding: SPACING.small,
    ...BORDERRADIUS,
    backgroundColor: "transparent",
    fontSize: FONT_SIZE.medium,
    width: "100%",
  },
  maxLength: { color: Colors.error },

  orderMessageTextLength: {
    fontSize: FONT_SIZE.small,
    alignSelf: "flex-end",
    marginRight: SPACING.small,
    color: Colors.darkText,
    marginVertical: SPACING.small,
  },
});
