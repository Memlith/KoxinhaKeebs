import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Header from '../components/header';
import KeyboardCard from '../components/keyboardCard';
import { keyboardLayouts } from '../data/keyboard'

export default function Catalog({ route, navigation, props }: any) {
  const category = route.params.category;

  const filteredKeyboards = category === 'all'
    ? keyboardLayouts
    : keyboardLayouts.filter(
      keyboard => keyboard.category === category
    );

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header />
      </View>

      <View style={styles.banner}>
        <Text style={styles.title}>
          Ergonomia e Estilo na sua rotina.
        </Text>
        <Text style={styles.description}>
          Melhore seu *tec* *tec*
        </Text>
      </View>

      <View style={styles.container}>
        {filteredKeyboards.map((keyboard) => (
          <KeyboardCard
            key={keyboard.id}
            name={keyboard.name}
            description={keyboard.description}
            numKeys={keyboard.numKeys}
            switches={keyboard.switches}
            led={keyboard.led}
            hotswap={keyboard.hotswap}
            avgPrice={keyboard.avgPrice}
            onPressCheckout={() => navigation.navigate('Checkout', { id: keyboard.id })}
          />
        ))}
      </View>

      <View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('KeyboardCreate', { category: category })}>
          <Text style={styles.buttonText}>
            Novo Teclado
          </Text>
        </Pressable>
      </View>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    padding: 20,
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  banner: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});