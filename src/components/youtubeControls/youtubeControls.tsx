import { Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FONT_SIZE, ICON_SIZE } from "../../constants";
import {
  onAddToWatchLater,
  onFavoriteVideo,
  onVideoLikeDislike,
} from "../../sagas/mainSaga";
import { Colors } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { ifUserNotLoggedIn } from "../../utilities";
import { Loader } from "../loader/loader";

export interface Props {
  videoItem: any;
  navigation: any;
}

export const YoutubeControls: React.FC<Props> = ({ videoItem, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const [isLiked, setisLiked] = useState(false);
  const [isDisliked, setisDisliked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isFavorite, setisFavorite] = useState(false);

  const [isWatched, setisWatched] = useState(false);

  const [totalLikes, settotalLikes] = useState(0);
  const [totalDisLikes, settotalDisLikes] = useState(0);
// useEffect(()=>{
//   (async()=>{
//     let data = {
//       user_id: user?.user_id,
//       video_id: videoItem?.videoId,
//       like_dislike: "1",
//     };
//     const response = await onVideoLikeDislike(data);
//     settotalLikes(response.total_likes);
//   })()
  
// },[])
  const row = (icon, title, isSelected, onPress, disableOnSelect) => {
    return (
      <TouchableOpacity
        disabled={disableOnSelect && isSelected}
        onPress={onPress}
        style={styles.rowButton}
      >
        <Fontisto
          name={icon}
          color={isSelected ? Colors.primaryButton : Colors.lightIcon}
          size={ICON_SIZE.small}
        />
        <Text style={styles.rowButtonTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const onToggleLikeDisLike = async (liked) => {
    let data = {
      user_id: user?.user_id,
      video_id: videoItem?.videoId,
      like_dislike: liked,
    };
    setisLoading(true);
    const response = await onVideoLikeDislike(data);
    console.log("response like is:!...",response)
    if (response?.message === "success") {
      if (liked === "1") {
        if (isDisliked) {
          settotalDisLikes(response.total_dislikes);
          setisDisliked(false);
        }

        settotalLikes(response.total_likes);
      }

      if (liked === "-1") {
        if (isLiked) {
          settotalLikes((p) => p - 1);
          setisLiked(false);
        }

        settotalDisLikes(response.total_dislikes);
      }
    }
    setisLoading(false);
    // if (response.success) {
    // let data = response.response.data;
    // setisLoading(false);
    // } else {
    //   Toast.show(response.errorMessage);
    //   setisLoading(false);
    // }
  };

  const onLike = () => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }
    if (!isLiked) {
      setisLiked((p) => !p);
      onToggleLikeDisLike("1");
      
    }
  };
  const onDisLike = () => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }
    if (!isDisliked) {
      let  data = {
        user_id: user?.user_id,
        videos_id: videoItem?.videos_id,
      };
      setisDisliked((p) => !p);
      onToggleLikeDisLike("-1");
      onVideoLikeDislike(data)
    }
  };

  const onFavorite = async () => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }
  //  setisFavorite((p) => !p);
    let data = {
      data: {
        user_id: user?.user_id,
        videos_id: videoItem?.videos_id,
      },
      isFavorite: isFavorite,
    };
    console.log("on Faviourite video is",data)
    setisLoading(true);
    const response = await onFavoriteVideo(data);
    console.log("response is:!...",response)
    if (response?.status === "success") {
      console.log("status called")
      setisFavorite((p) => !p);
    } else {
      if (response?.message === "Already exist in your favorite.") {
        console.log("status message called")
        setisFavorite((p) => !p);
      }
    }

    setisLoading(false);
  };

  const onWatchLater = async () => {
    if (ifUserNotLoggedIn(user)) {
      return;
    }
    let data = {
      data: {
        user_id: user?.user_id,
        video_id: videoItem?.videos_id,
      },
      isWatched: isWatched,
    };
    console.log("watch latter video is",data)
    setisLoading(true);
    const response = await onAddToWatchLater(data);
    console.log("watch latter video is",response)
    if (response?.message === "success") {
      setisWatched((p) => !p);
    }

    setisLoading(false);
  };

  useEffect(() => {
    setisLiked(videoItem?.is_like_dislike);
    setisDisliked(videoItem?.is_like_dislike === false);
    setisLoading(false);
    setisFavorite(videoItem?.is_favourite);
    setisWatched(videoItem?.is_watch_later);

    settotalDisLikes(videoItem?.total_dislikes || 0);
    settotalLikes(videoItem?.total_likes || 0);
  }, [videoItem]);
  return (
    <View style={styles.container}>
      <Loader loading={isLoading} fullScreen />
      {row("like", `Like (${totalLikes})`, isLiked, onLike, true)}
      {row(
        "dislike",
        `DisLike (${totalDisLikes})`,
        isDisliked,
        onDisLike,
        true,
      )}
      {row("heart-alt", "Favorite", isFavorite, onFavorite)}
      {row("clock", "Watch Later", isWatched, onWatchLater)}
    </View>
  );
};

YoutubeControls.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.small,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowButton: {
    alignItems: "center",
    justifyContent: "center",

    flex: 1,
  },
  rowButtonTitle: {
    color: Colors.lightText,
    marginTop: SPACING.extraSmall,
    fontSize: FONT_SIZE.extraSmall,
  },
});
