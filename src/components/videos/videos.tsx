import React, { ReactElement, useCallback,useState,useRef, useEffect } from "react";
import { Button, FlatList, NativeScrollEvent,Animated, NativeSyntheticEvent, StyleSheet, Text,PanResponder, View, Image, Pressable, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ICON_SIZE, VideoTypes } from "../../constants";
import { MainActions } from "../../constants/actionNames";
import { EMPTY_List_MESSAGE } from "../../constants/empty_screen_messages";
import { SCREEN_NAME } from "../../constants/screenNames";
import { ROUTE } from "../../navigation/routeNames";
import { LISTIPADDINGBOTTOM } from "../../themes/helpers";
import { keyExtractor } from "../../utilities";
import { EmptyScreenMessage } from "../emptyScreenMessage/emptyScreenMessage";
import { Loader } from "../loader/loader";
import { VideoRow } from "../videos/videoRow";
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";

export interface Props {
  navigation?: any;
  onVideoPress?(video: any): any;
  headerComponent: ReactElement;
  type: "Youtube" | "videoPlayer";
  navigates():void;
}

const getItemLayout = (data, index) => {
  return {
    length: ICON_SIZE.x4Large,
    offset: ICON_SIZE.x4Large * index,
    index,
  };
};

export const Videos: React.FC<Props> = ({
  navigation,
  onVideoPress,
  headerComponent,
  type,
  navigates,
}) => {
  const route = useRoute();
// console.log(route.name);
  // const [pan , setPan] = useState(new Animated.ValueXY())
  const dispatch = useDispatch();
  const [page , setPages] = useState(1)
  const [load , setLoading] = useState(false)
  const getVideoBySlug = useSelector((state) => state?.main?.getVideoBySlug);

  const onVideoPressed = 
   async (video) => {
      console.log("video pressed",video.slug)
      if (onVideoPress) {
        console.log("on video Press is:!..........")
         await  dispatch(MainActions.getShowsVideosRequest(video.slug));
        onVideoPress(video);
      } else {
        if (video?.repeat) {
          console.log("on video repeate is:!..........")
        await  dispatch(MainActions.getShowsVideosRequest(video.slug));
          return;
        }
        console.log("video pressed in else if block")
        await  dispatch(MainActions.getShowsVideosRequest(video.slug));
        navigation.navigate(ROUTE.VideoDetails, { videoDetails: video });
      }
    };

  const renderItem = ({ item }: any) => {
    return (
      <VideoRow key={item?.videos_id} onPress={onVideoPressed} item={item} />
    );
  };
  const pan = useState(new Animated.ValueXY())[0]
  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder:() => true,
      onPanResponderGrant:()=>{
        pan.setOffset({
          x:pan.x._value,
          y:pan.y._value,
        })
      },
      onPanResponderMove:Animated.event([null,{
        dx:pan.x,dy:pan.y
      }]),
      onPanResponderRelease:()=>{
        pan.flattenOffset()
      }
    })
  )[0]
  useEffect(() => {
    if (onVideoPress) {
      console.log("pressesss calls multi times")
      dispatch(
        MainActions.getVideoBySlugRequest(
          VideoTypes.mostViewed,
          SCREEN_NAME.Home,
          page,
        ),
      );
    }
    setPages(1)
    dispatch(
      MainActions.getVideoBySlugRequest(
        VideoTypes.mostViewed,
        SCREEN_NAME.Home,
        page,
      ),
    );
  }, [onVideoPress]);
  console.log("get videos" , VideoTypes.mostViewed,SCREEN_NAME.Home,route.name)
  const  onContentOffsetChanged = (distanceFromTop: number) => {
    // console.log("height",distanceFromTop)
    // console.log("scroll value is",distanceFromTop)
  //  type == "Youtube" && navigation.navigate(ROUTE.SignIn);
  distanceFromTop == 0 && setPages(1)
     distanceFromTop == 0 && 
      dispatch(
        MainActions.getVideoBySlugRequest(
          VideoTypes.Shows,
          SCREEN_NAME.Home,
          page,
        ),
      );
      
      
  }
  const getVideosByScrollingEndReached = async() => {
    setLoading(true)
    try {
      await setPages(page+1)
    await dispatch(
      MainActions.getVideoBySlugRequest(
        VideoTypes.Shows,
        SCREEN_NAME.Home,
        page,
      ),
    );
    setLoading(false)
    } catch (error) {
      setLoading(false)  
    }
  }
  return (
    <View style={styles.container}>
      {/* {getVideoBySlug?.loading ? (
        <Loader style={styles.loader} loading={true} />
      ) : ( */}
        <FlatList
          removeClippedSubviews={true}
          ListHeaderComponent={headerComponent}
          initialNumToRender={5}
          maxToRenderPerBatch={60}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
          onScroll={
            (event: NativeSyntheticEvent<NativeScrollEvent>) => 
                onContentOffsetChanged(event.nativeEvent.contentOffset.y)
        }
          contentContainerStyle={
            getVideoBySlug?.data && getVideoBySlug?.data?.length
              ? LISTIPADDINGBOTTOM
              : styles.contentContainer
          }
          data={getVideoBySlug?.data}
          ListEmptyComponent={
            <EmptyScreenMessage message={EMPTY_List_MESSAGE.NO_DATA} />
          }
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.1}
          onEndReached={() =>
            getVideoBySlug?.data.length > 9 ?  getVideosByScrollingEndReached() : console.log("list end")
          }
          ListFooterComponent={() => {
            //it will show indicator at the bottom of the list when data is loading otherwise it returns null
            if (!load) return null;
            return (
              <View style={{justifyContent: 'center'}}>
                <ActivityIndicator size={25} color={'#9F172E'} />
              </View>
            );
          }}
          windowSize={30}
        />
       {/* )}  */}
      { type === "Youtube" &&
      
      <View
      style={{
       // flex:1,
       position:'absolute', 
       right:40,
       top:0,
      //  justifyContent:'center',
      //  alignItems:'center',
        
      }}
    >
     <Pressable onPress={navigates}> 
      {/* <View  style={{position:'absolute',top:20,right:30}}> */}
            <Image style={{height:40,width:40,backgroundColor:'#fff'}} resizeMode="contain" source={require("../../assets/images/Livestream.png")}/>
      {/* </View> */}
      </Pressable>
      </View>
      
      // </View>
}
    </View>
  );
};

Videos.defaultProps = {};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: "5%",

    flexGrow: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});
function value(value: any, arg1: { x: number; y: number; }): Animated.Mapping {
  throw new Error("Function not implemented.");
}

