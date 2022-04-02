import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { MainActions } from "../../constants/actionNames";
import { Colors } from "../../themes";
import { LISTIPADDINGBOTTOM, SPACING } from "../../themes/helpers";
import { keyExtractor } from "../../utilities";
import { AddComment } from "../addComment/addComment";
import { Loader } from "../loader/loader";
import { CommentsHeader } from "./commentsHeader";
import { CommentRow } from "./commentsRow";

export interface Props {
  selectedVideo: any;
  toggleVisibleCommets?(): void;
  openAddCommentModal?(): void;
  onEditComment?(item: any): void;
  onReplyComment?(item: any): void;
  onRepliesPressed?(item: any): void;
}

export const AllComments: React.FC<Props> = ({
  toggleVisibleCommets,
  openAddCommentModal,
  onEditComment,
  onReplyComment,
  onRepliesPressed,
}) => {
  const getAllComments = useSelector((state) => state?.main?.getAllComments);
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  const deleteComment = (comment) => {
    let payload = { user_id: user?.user_id, vcomment_id: comment?.vcomment_id };
    dispatch(MainActions.deleteCommentRequest(payload, comment.v_id));
  };

  const getVideoComments = async (videoId) => {
    let data = {
      user_id: user?.user_id,
      v_id: videoId,
    };

    dispatch(MainActions.getAllCommentsRequest(data));
  };
  const renderItem = ({ item }: any) => {
    return (
      <CommentRow
        onRepliesPressed={onRepliesPressed}
        getComments={getVideoComments}
        user={user}
        onDeleteComment={deleteComment}
        onEditComment={onEditComment}
        onReplyComment={onReplyComment}
        item={item}
      />
    );
  };
  return getAllComments?.loading && !getAllComments?.data ? (
    <Loader style={[styles.container, styles.loader]} loading={true} />
  ) : (
    <View style={styles.container}>
      <CommentsHeader
        onIconPressed={toggleVisibleCommets}
        type={"AllComments"}
        list={getAllComments?.data}
      />

      <FlatList
        ListHeaderComponent={
          <AddComment onPress={openAddCommentModal} user={user} />
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={getAllComments?.data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

AllComments.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: responsiveWidth(100),
    height: "65%",
    bottom: 0,
    backgroundColor: Colors.white,
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingVertical: SPACING.medium,
    ...LISTIPADDINGBOTTOM,
  },
});
