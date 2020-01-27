import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarComponent from './src/components/CalendarComponent';
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware} from "redux";
import reminders from "./src/store/reducers/reminders";
import thunk from "redux-thunk";

const store = createStore(reminders, compose(applyMiddleware(thunk)));

export default function App() {
  return (
    
    <View style={styles.container}>
      <Provider store={store}>
      <CalendarComponent/>
      </Provider>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});