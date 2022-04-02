import { AntDesign } from "@expo/vector-icons";
import { Video } from "expo-av";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import {
  addOrientationChangeListener,
  lockAsync,
  OrientationLock,
} from "expo-screen-orientation";
import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import WebView from "react-native-webview";
import { CONSTANTS, getUrl, ICON_SIZE } from "../../constants";
import { Colors } from "../../themes";
import { SPACING } from "../../themes/helpers";
import { Loader } from "../loader/loader";
import PlayerControls from "../videoPlayer/PlayerControls";

export interface Props {
  source: {
    uri: string;
  };
  slug: string;
  type: "Youtube" | "videoPlayer";
  navigation: any;
}

const VideoPlayer: React.FC<Props> = ({ source, type, navigation, slug }) => {
  const videoRef = useRef();
  const [isMuted, setisMuted] = useState(false);
  const [shouldPlay, setshouldPlay] = useState(true);
  const [isLooping, setisLooping] = useState(true);
  const [isVideoLoading, setisVideoLoading] = useState(false);
  const [isFullScreenEnabled, setisFullScreenEnabled] = useState(false);
  const isMounted = useRef(true);

  const onPlayIconPressed = () => {};

  const onPlayToggle = () => {
    setshouldPlay((p) => !p);
  };
  const onFullScreenToggle = async () => {
    // await lockAsync(OrientationLock.LANDSCAPE);
    console.log("toggle called")
    onToggleMute()
    setTimeout(() => {
      onToggleMute();
    }, 0);
    await videoRef.current.presentFullscreenPlayerAsync();
  };
  const onToggleMute = () => {
    setisMuted((p) => !p);
  };

  const onLoadEnd = () => {
    setisVideoLoading(false);
  };

  const onLoadStart = () => {
    setisVideoLoading(true);
  };

  const onWillFocus = () => {
    setshouldPlay(true);
    activateKeepAwake();
    isMounted.current = true;
  };

  const onWillBlur = () => {
    setshouldPlay(false);
    deactivateKeepAwake();
    isMounted.current = false;
  };

  useEffect(() => {
    if (!navigation) {
      return;
    }
    const unsubscribe = navigation.addListener("focus", () => {
      onWillFocus();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!navigation) {
      return;
    }
    const unsubscribe = navigation.addListener("blur", () => {
      onWillBlur();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!navigation) {
      return;
    }
    const unsubscribe = addOrientationChangeListener(async (event) => {
      if (!isMounted.current || type === "Youtube") {
        console.log("orientation called")
        return;
      }
      if ([3, 4].includes(event?.orientationInfo?.orientation)) {
        // await lockAsync(OrientationLock.ALL);
        console.log("orientation called 2")
        await videoRef.current.presentFullscreenPlayerAsync();
        setisFullScreenEnabled(true);
      } else {
        videoRef.current.dismissFullscreenPlayer();
        console.log("orientation called 3")
        // await lockAsync(OrientationLock.PORTRAIT);
        setisFullScreenEnabled(false);
      }
    });

    return () => unsubscribe.remove();
  }, []);

  const onFullscreenUpdate = async (orientation) => {
   // return;
    if (!isFullScreenEnabled) {
      onToggleMute()
      setTimeout(() => {
        onToggleMute();
      }, 0);
    } 

    // if (isFullScreenEnabled) {
    //   await lockAsync(OrientationLock.PORTRAIT);
    //   setisFullScreenEnabled(false);
    // } else {
    //   await lockAsync(OrientationLock.LANDSCAPE);
    //   setisFullScreenEnabled(true);
    // }
  };
console.log("type is:!...",type)
  return (
    <View style={styles.container}>
      {type === "Youtube" ? (
        <WebView
        style={styles.webView}
        contentInset={styles.contentInset}
        startInLoadingState={isVideoLoading}
        allowsFullscreenVideo={false}
        mediaPlaybackRequiresUserAction={true}
        allowsInlineMediaPlayback={true}
        scrollEnabled={false}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        javaScriptEnabled={true}
        useWebKit={false}
        originWhitelist={["*"]}
        source={{ ...getUrl(slug, true) }}
        height={responsiveHeight(100)}
        // video width -> screen height
        width={responsiveWidth(100)}
        webViewProps={{
          injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.paddingBottom = 'unset';
            true;
          `,
        }}
      />
      ) : (
        <>
          <Video
            ref={videoRef}
            source={source}
            onFullscreenUpdate={onFullscreenUpdate}
            onPlaybackStatusUpdate={(data) => {
              //   !isVideoLoaded && this.setStateObj({ isVideoLoaded: data.isLoaded });
              //   if (data.isLoaded) {
              //     // playAsync(true);
              //   }
            }}
            rate={1.0}
            volume={1.0}
            isMuted={isMuted}
            resizeMode="stretch"
            shouldPlay={shouldPlay}
            isLooping={isLooping}
            style={styles.playerStyle}
          />

          {!shouldPlay && isVideoLoading && (
            <TouchableOpacity
              style={styles.playIcon}
              onPress={onPlayIconPressed}
            >
              <AntDesign
                name="play"
                color={Colors.primaryButton}
                size={ICON_SIZE.x3Large}
              />
            </TouchableOpacity>
          )}

          <PlayerControls
            onPlayPauseToggle={onPlayToggle}
            onFullScreenPressed={onFullScreenToggle}
            onToggleMute={onToggleMute}
            shouldPlay={shouldPlay}
          />

          <Loader style={styles.loader} isLoading={isVideoLoading} />
        </>
      )}
      
    </View>
  );
};

VideoPlayer.defaultProps = {
  source: {
    uri: CONSTANTS.LIVE_URL,
  },
};

// styles
const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(25),
    width: responsiveWidth(100),
  },
  playerStyle: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  loader: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  playIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    left: SPACING.large,
    zIndex: 1,
  },
  playerControls: {
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    height: ICON_SIZE.medium,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    width: "100%",
    bottom: 0,
  },
  webView: { backgroundColor: "black" },
  contentInset: { top: 0, left: 0, bottom: 0, right: 0 },
});

export default VideoPlayer;
