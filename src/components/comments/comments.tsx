import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MainActions } from "../../constants/actionNames";
import { AddComment } from "../addComment/addComment";
import { Loader } from "../loader/loader";
import { CommentsHeader } from "./commentsHeader";

export interface Props {
  selectedVideo: any;
  onShowAllComments?(): void;
  onAddComment?(): void;
}

export const Comments: React.FC<Props> = ({
  selectedVideo,
  onShowAllComments,
  onAddComment,
}) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);

  const submitComment = useSelector((state) => state?.main?.submitComment);
  const deleteComment = useSelector((state) => state?.main?.deleteComment);
  const getAllComments = useSelector((state) => state?.main?.getAllComments);
  const updateComment = useSelector((state) => state?.main?.updateComment);

  const getVideoComments = async () => {
    let data = {
      user_id: user?.user_id,
      v_id: selectedVideo?.videos_id,
    };

    dispatch(MainActions.getAllCommentsRequest(data));
  };

  useEffect(() => {
    getVideoComments(selectedVideo);
  }, [selectedVideo]);

  const onShowHideComments = () => {
    onShowAllComments();
  };

  const openAddCommentModal = () => {
    onShowAllComments();
    onAddComment();
  };

  return (
    <>
      <Loader
        fullScreen
        loading={
          submitComment.loading ||
          deleteComment.loading ||
          updateComment.loading
          // getAllComments?.loading
        }
      />
      <CommentsHeader
        onIconPressed={onShowHideComments}
        list={getAllComments?.data}
      />
      <AddComment onPress={openAddCommentModal} user={user} />
    </>
  );
};

Comments.defaultProps = {};

// styles
const styles = StyleSheet.create({});
