import React, { useEffect, useState, JSX } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import smartscrnszoo from './Zoo/smartimprtszoo/smartscrnszoo';

enableScreens();

const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 33) {
        try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
            title: 'Storage Permission',
            message: 'App needs access to storage to export PDF reports',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
        console.warn(err);
        return false;
        }
    }
    return true;
};

type RootStackParamList = {
  Smartaddanimal: undefined;
  Smartaddenclosure: undefined;
  Smartaddfeed: undefined;
  Smartaddplan: undefined;
  Smartaddvisitors: undefined;
  Smartanimalinfo: undefined;
  Smartfeedinfo: undefined;
  Smarthistoryzoo: undefined;
  Smarthomezoo: undefined;
  Smartmiddlezoo: undefined;
  Smartplaninfo: undefined;
  Smartplanzoo: undefined;
  Smartsettingszoo: undefined;
  Smartsplashzoo: undefined;
  Smartstatisticszoo: undefined;
  Smarttestzoo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
    const [hasStoragePermission, setHasStoragePermission] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkPermission() {
        const granted = await requestStoragePermission();
        setHasStoragePermission(granted);
        if (!granted) {
            Alert.alert(
            'Permission required',
            'Storage permission is needed to export PDF reports.',
            [{ text: 'OK' }]
            );
        }
        }
        checkPermission();
    }, []);

  return (
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Smartsplashzoo"
            screenOptions={{ headerShown: false }}
          >
              <Stack.Screen
                  name="Smartaddanimal"
                  component={smartscrnszoo.Smartaddanimalscrn}
              />
              <Stack.Screen
                  name="Smartaddenclosure"
                  component={smartscrnszoo.Smartaddenclosurescrn}
              />
              <Stack.Screen
                  name="Smartaddfeed"
                  component={smartscrnszoo.Smartaddfeedscrn}
              />
              <Stack.Screen 
                  name="Smartaddplan" 
                  component={smartscrnszoo.Smartaddplanscrn} 
              />
              <Stack.Screen 
                  name="Smartaddvisitors" 
                  component={smartscrnszoo.Smartaddvisitorsscrn} 
              />
              <Stack.Screen 
                  name="Smartanimalinfo" 
                  component={smartscrnszoo.Smartanimalinfoscrn} 
              />
              <Stack.Screen 
                  name="Smartfeedinfo" 
                  component={smartscrnszoo.Smartfeedinfoscrn} 
              />
              <Stack.Screen 
                  name="Smarthistoryzoo" 
                  component={smartscrnszoo.Smarthistoryzooscrn} 
              />
              <Stack.Screen 
                  name="Smarthomezoo" 
                  component={smartscrnszoo.Smarthomezooscrn} 
              />
              <Stack.Screen 
                  name="Smartmiddlezoo" 
                  component={smartscrnszoo.Smartmiddlezooscrn} 
              />
              <Stack.Screen 
                  name="Smartplaninfo" 
                  component={smartscrnszoo.Smartplaninfoscrn} 
              />
              <Stack.Screen 
                  name="Smartplanzoo" 
                  component={smartscrnszoo.Smartplanzooscrn} 
              />
              <Stack.Screen 
                  name="Smartsettingszoo" 
                  component={smartscrnszoo.Smartsettingszooscrn} 
              />
              <Stack.Screen 
                  name="Smartsplashzoo" 
                  component={smartscrnszoo.Smartsplashzooscrn} 
              />
              <Stack.Screen 
                  name="Smartstatisticszoo" 
                  component={smartscrnszoo.Smartstatisticszooscrn} 
              />
              <Stack.Screen 
                  name="Smarttestzoo" 
                  component={smartscrnszoo.Smarttestzooscrn} 
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
