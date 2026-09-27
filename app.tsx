import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Catalog from './screens/catalog'
import Checkout from './screens/checkout'
import KeyboardCreate from './screens/keyboardCreate';
import { SQLiteProvider } from 'expo-sqlite';
import { startDatabase } from './database/database';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SQLiteProvider databaseName="koxinhakeebs.db" onInit={startDatabase}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Catalog"
            component={Catalog}
          />
          <Stack.Screen
            name="KeyboardCreate"
            component={KeyboardCreate}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}