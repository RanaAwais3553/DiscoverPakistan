import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import React, { useEffect } from "react";
import { LogBox, StyleSheet, Text } from "react-native";
import { Provider } from "react-redux";
import { AppNavigator } from "./navigation/appNavigation";
import createStore from "./redux";
import { Colors, FontFamily } from "./themes";

const store = createStore();

const App = (props) => {
  let [fontsLoaded] = useFonts(FontFamily);

  useEffect(() => {
    LogBox.ignoreAllLogs();

    checkUpdates();
  }, []);

  const checkUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Updates.reloadAsync();
      }
    } catch (e) {}
  };
  if (!fontsLoaded) {
    return <Text></Text>;
  } else {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default App;
