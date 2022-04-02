import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { AddComment } from "../../components/addComment/addComment";
import { AllComments } from "../../components/comments/allComments";
import { Comments } from "../../components/comments/comments";
import { CommentsReply } from "../../components/comments/replyComment";
import { MainHeader } from "../../components/mainHeader/mainHeader";
import { Modal } from "../../components/modal/modal";
import { Separator } from "../../components/separator/separator";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import { Videos } from "../../components/videos/videos";
import { YoutubeControls } from "../../components/youtubeControls/youtubeControls";
import { FONT_SIZE } from "../../constants";
import { MainActions } from "../../constants/actionNames";
import { ROUTE } from "../../navigation/routeNames";
import { Colors, Fonts } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { ifUserNotLoggedIn } from "../../utilities";

export const VideoDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [load , setLoad] = useState(false)
  const user = useSelector((state) => state?.user?.user);

  const selectedComment = useRef();

  const [selectedVideo, setselectedVideo] = useState({ slug: "" });
  const [modalVisible, setmodalVisible] = useState(false);
  const [showAllReplies, setshowAllReplies] = useState(false);
  const [showAllComments, setshowAllComments] = useState(false);
let timer=1;
  const onVideoPressed = (video) => {
    // console.log("video detail is:!....",video)
    setselectedVideo(video);
  };
// console.log("route is:!.......",selectedVideo)
  useEffect(() => {
    setselectedVideo(route.params.videoDetails);
    return()=> {clearInterval(timer); clearTimeout(timer)}
  }, []);

  const toggleShowComments = () => {
    setshowAllComments((p) => !p);
    setshowAllReplies(false);
  };

  const onBackFromReply = () => {
    setshowAllReplies(false);
  };

  const openModal = () => {
    setmodalVisible(true);
  };
  const closeModal = () => {
    setmodalVisible(false);
    selectedComment.current = null;
  };

  const onSend = (message) => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }

    let payload = {
      user_id: user?.user_id,
      v_id: selectedVideo.videos_id,
      parent_comment_id: 0,
      comment: message,
    };

    setTimeout(() => {
      dispatch(MainActions.submitCommentRequest(payload));
      closeModal();
    }, timer);
  };

  const onReply = (comment) => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }

    let payload = {
      user_id: user?.user_id,
      v_id: comment?.v_id,
      parent_comment_id: comment?.vcomment_id,
      comment: comment?.comment,
    };

    setTimeout(() => {
      dispatch(MainActions.submitCommentRequest(payload));
      closeModal();
    }, timer);
  };

  const onEdit = (message) => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }

    let data = {
      user_id: user?.user_id,
      parent_comment_id: message.parent_comment_id,
      v_id: message.v_id,
      vcomment_id: message.vcomment_id,
      comment: message.comment,
    };

    setTimeout(() => {
      dispatch(MainActions.updateCommentRequest(data));
      closeModal();
    }, timer);
  };

  const editComment = (comment) => {
    selectedComment.current = comment;
    openModal();
  };

  const onReplyComment = (comment) => {
    selectedComment.current = {
      isReply: true,
      ...comment,
    };

    openModal();
  };

  const onRepliesPressed = (comment) => {
    selectedComment.current = {
      isReply: true,
      ...comment,
    };

    setshowAllReplies(true);
  };
  const navigates = () =>{
    setLoad(true)
    setTimeout(()=>{
      navigation.navigate(ROUTE.HomeFirst)
setLoad(false)
    },timer)
  }
if(load){
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <ActivityIndicator color="#121212" size={24}/>
  </View>
  );
}
console.log("video slug is:!...",selectedVideo?.slug)
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} navigates={navigates} />
      <VideoPlayer type={"Youtube"} slug={selectedVideo?.slug} />

      <View style={styles.detailsWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          {selectedVideo?.title}
        </Text>

        <Text numberOfLines={1} style={styles.views}>{`${
          Number(selectedVideo?.video_views)+1 || 0
        } views | ${selectedVideo?.release}`}</Text>
      </View>
      <YoutubeControls navigation={navigation} videoItem={selectedVideo} />
      <Separator style={styles.separator} />

      <Videos
        headerComponent={
          <Comments
            onShowAllComments={toggleShowComments}
            onAddComment={openModal}
            selectedVideo={selectedVideo}
          />
        }
        onVideoPress={onVideoPressed}
        navigation={navigation}
        type={"Youtube"}
        navigates={navigates}
      />

      {showAllComments && (
        <AllComments
          onRepliesPressed={onRepliesPressed}
          onReplyComment={onReplyComment}
          onEditComment={editComment}
          openAddCommentModal={openModal}
          toggleVisibleCommets={toggleShowComments}
          selectedVideo={selectedVideo}
        />
      )}

      {showAllReplies && (
        <CommentsReply
          onBackFromReply={onBackFromReply}
          toggleVisibleCommets={toggleShowComments}
          item={selectedComment.current}
          onReplyComment={onReplyComment}
          onEditComment={editComment}
        />
      )}

      <Modal
        style={styles.modalStyle}
        closeModal={closeModal}
        visible={modalVisible}
      >
        <AddComment
          selectedComment={selectedComment.current}
          onSend={onSend}
          onEdit={onEdit}
          onReply={onReply}
          closeModal={closeModal}
          user={user}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  detailsWrapper: {
    justifyContent: "space-between",
    padding: SPACING.small,

    paddingHorizontal: "4%",
  },
  title: {
    color: Colors.darkText,
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.x1Large,
  },

  views: {
    color: Colors.lightText,
    fontSize: FONT_SIZE.small,
    marginVertical: SPACING.extraSmall,
    fontFamily: Fonts.light,
  },
  separator: {
    marginHorizontal: SPACING.small,
    width: "90%",
    alignSelf: "center",
    backgroundColor: Colors.lightIcon,
    height: responsiveHeight(0.2),
    marginVertical: SPACING.small,
  },

  modalStyle: {
    justifyContent: "flex-end",
  },
});
