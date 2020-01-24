import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarComponent from './src/CalendarComponent';

export default function App() {
  return (

    <View style={styles.container}>
      <CalendarComponent/>
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