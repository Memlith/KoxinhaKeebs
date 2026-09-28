import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/home';
import Catalog from './screens/catalog'
import Checkout from './screens/checkout'
import KeyboardCreate from './screens/keyboardCreate';
import Orders from './screens/orders';
import { SQLiteProvider } from 'expo-sqlite';
import { startDatabase } from './database/database';

const Stack = createNativeStackNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#4f46e5',
    background: '#0f1115',
    card: '#1a1d24',
    text: '#f2f4f8',
    border: '#2f3644',
    notification: '#4f46e5',
  },
};

export default function App() {
  return (
    <SQLiteProvider databaseName="koxinhakeebs.db" onInit={startDatabase}>
      <StatusBar style="light" />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Catálogo"
            component={Catalog}
          />
          <Stack.Screen
            name="Crie um Teclado"
            component={KeyboardCreate}
          />
          <Stack.Screen
            name="Carrinho"
            component={Checkout}
          />
          <Stack.Screen
            name="Pedidos"
            component={Orders}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
