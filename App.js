/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import requestAddress from './functions/requestAddress';
import requestLocationPermission from './functions/requestLocationPermission';
import requestSunlightData from './functions/requestSunlightData';
import requestWeatherData from './functions/requestWeatherData';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

const App: () => React$Node = () => {
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const [currentPostalCode, setCurrentPostalCode] = useState(undefined);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sunlightData, setSunlightData] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);

  const makeLocationDataRequests = async () => {
    Geolocation.getCurrentPosition(
      async (info) => {
        const {latitude, longitude} = info.coords;
        const address = await requestAddress(latitude, longitude);
        const {formatted_address, postalCode} = address;
        setCurrentLocation(formatted_address);
        setCurrentPostalCode(postalCode);
        setSunlightData(
          await requestSunlightData(latitude, longitude, currentDate),
        );
        setWeatherData(await requestWeatherData(latitude, longitude));
      },
      (error) => console.log(error),
      {timeout: 1000, maximumAge: 10000, enableHighAccuracy: true},
    );
  };

  useEffect(() => {
    console.log('Current Location: ' + currentLocation);
    console.log('postcode: ' + currentPostalCode);
    console.log('Sunlight Hours' + sunlightData);
    console.log('Weather Data');
    console.log(weatherData);

    return () => {};
  }, [currentLocation, currentPostalCode]);

  return (
    <NavigationContainer>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Plan Your Gardens</Text>
      </View>
      {!currentLocation && !sunlightData ? (
        <View style={styles.titleContainer}>
          <Button
            onPress={async () => {
              await requestLocationPermission();
              await makeLocationDataRequests();
            }}
            title="use Location"
            color="#841584"
          />
        </View>
      ) : (
        <View>
          <Text> Your Current Location: {currentLocation}</Text>
          <Text>
            {' '}
            You are Currently getting
            {sunlightData?.day_length} amount of sunlight a day
            {console.log('console.log' + sunlightData)}
          </Text>
        </View>
      )}
    </NavigationContainer>
  );
};

{
  /* <StatusBar barStyle="dark-content" />
<SafeAreaView>
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
    <Header />
    {global.HermesInternal == null ? null : (
      <View style={styles.engine}>
        <Text style={styles.footer}>Engine: Hermes</Text>
      </View>
    )}
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Step One</Text>
        <Text style={styles.sectionDescription}>
          Edit <Text style={styles.highlight}> HELLO WORLD</Text>
          HELLO WORLD
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>See Your Changes</Text>
        <Text style={styles.sectionDescription}>
          <ReloadInstructions />
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Debug</Text>
        <Text style={styles.sectionDescription}>
          <DebugInstructions />
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Learn More</Text>
        <Text style={styles.sectionDescription}>
          Read the docs to discover what to do next:
        </Text>
      </View>
      <LearnMoreLinks />
    </View>
  </ScrollView>
</SafeAreaView> */
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 24,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'red',
    width: '100%',
    // height: '100%',
  },
});

export default App;

// scrollView: {
//   backgroundColor: Colors.lighter,
// },
// engine: {
//   position: 'absolute',
//   right: 0,
// },
// body: {
//   backgroundColor: Colors.white,
// },
// sectionContainer: {
//   marginTop: 32,
//   paddingHorizontal: 24,
// },
// sectionTitle: {
//   fontSize: 24,
//   fontWeight: '600',
//   color: Colors.black,
// },
// sectionDescription: {
//   marginTop: 8,
//   fontSize: 18,
//   fontWeight: '400',
//   color: Colors.dark,
// },
// highlight: {
//   fontWeight: '700',
// },
// footer: {
//   color: Colors.dark,
//   fontSize: 12,
//   fontWeight: '600',
//   padding: 4,
//   paddingRight: 12,
//   textAlign: 'right',
// },
