import React, { useEffect, useState } from "react";
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
  onBackFromReply?(): void;
  item?: any;
}

export const CommentsReply: React.FC<Props> = ({
  toggleVisibleCommets,
  openAddCommentModal,
  onEditComment,
  onReplyComment,
  onRepliesPressed,
  onBackFromReply,
  item,
}) => {
  const user = useSelector((state) => state?.user?.user);

  const getAllComments = useSelector((state) => state?.main);

  const dispatch = useDispatch();
  const [selectedItem, setselectedItem] = useState(item);
  const [replies, setreplies] = useState([]);
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
        hideReply
        user={user}
        onDeleteComment={deleteComment}
        onEditComment={onEditComment}
        onReplyComment={onReplyComment}
        item={item}
      />
    );
  };

  useEffect(() => {
    const newItem = getAllComments?.data?.find((listitem, index) => {
      return selectedItem?.vcomment_id === listitem?.vcomment_id;
    });
    if (newItem) {
      if (newItem?.replies) {
        setselectedItem(newItem);
      } else {
        onBackFromReply();
      }
    } else {
      onBackFromReply();
    }
  }, [getAllComments?.data]);

  const onAddComment = () => {
    onReplyComment(selectedItem);
  };
  return getAllComments?.loading && !getAllComments?.data ? (
    <Loader style={[styles.container, styles.loader]} loading={true} />
  ) : (
    <View style={styles.container}>
      <CommentsHeader
        onIconPressed={toggleVisibleCommets}
        type={"Reply"}
        list={getAllComments?.data}
        onBackPressed={onBackFromReply}
      />

      <FlatList
        ListHeaderComponent={
          <>
            <CommentRow
              style={styles.reply}
              onRepliesPressed={onRepliesPressed}
              getComments={getVideoComments}
              user={user}
              hideReply
              onDeleteComment={deleteComment}
              onEditComment={onEditComment}
              onReplyComment={onReplyComment}
              item={selectedItem}
            />
            <AddComment onPress={onAddComment} user={user} />
          </>
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={selectedItem?.replies}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

CommentsReply.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
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
    ...LISTIPADDINGBOTTOM,
  },
  reply: {
    backgroundColor: Colors.dimWhite,
    width: "100%",
    paddingTop: SPACING.extraSmall,
    paddingHorizontal: SPACING.small,
    marginBottom: SPACING.medium,
  },
});
