import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

// import Home from './screens/Home';
//import UserMap from './components/UserMap/UserMap';
  import TestingFetch from './components/TestingFetch';
EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $white: '#FFFF',
});

export default () => <TestingFetch />;