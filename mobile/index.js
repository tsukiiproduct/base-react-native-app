/**
 * @format
 */

// IMPORTANT: react-native-gesture-handler must be imported at the very top
// of the entry file. Without this, gestures break on Android.
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
