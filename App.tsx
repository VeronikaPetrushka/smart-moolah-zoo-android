import React, { JSX } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import smartscrnszoo from './Zoo/smartimprtszoo/smartscrnszoo';

enableScreens();

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
