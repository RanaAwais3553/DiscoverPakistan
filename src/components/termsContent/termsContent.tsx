import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { FONT_SIZE } from "../../constants";
import fonts from "../../themes/fonts";
import { LISTIPADDINGBOTTOM, SPACING } from "../../themes/helpers";
import { keyExtractor } from "../../utilities";
import { Heading } from "../heading/heading";
import { Text } from "../text/text";

export interface Props {
  dataList: any;
  title: string;
}

export const TermsContent: React.FC<Props> = ({ dataList, title }) => {
  const renderItem = ({ item }: any) => {
    return (
      <>
        {item?.title ? <Text style={styles.title}>{item?.title}</Text> : null}

        <Text style={styles.description}>{item?.description}</Text>
      </>
    );
  };
  return (
    <>
      <Heading text={title} />
      <FlatList
        style={styles.flatList}
        contentContainerStyle={LISTIPADDINGBOTTOM}
        showsVerticalScrollIndicator={false}
        data={dataList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </>
  );
};

TermsContent.defaultProps = {};

// styles
const styles = StyleSheet.create({
  flatList: {
    alignSelf: "center",
    paddingHorizontal: "5%",
  },

  title: {
    marginVertical: SPACING.small,
    fontSize: FONT_SIZE.medium,
    fontFamily: fonts.bold,
    textTransform: "uppercase",
  },
  description: {
    marginBottom: SPACING.small,
    textAlign: "justify",
  },
});
