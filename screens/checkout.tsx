import { View, Text, StyleSheet, Pressable } from 'react-native';
import Header from '../components/header';
import { keyboardLayouts } from '../data/keyboard';
import KeyboardCard from '../components/keyboardCard';
export default function Checkout({ route }: any) {

  const id = route.params.id
  const filteredKeyboards = keyboardLayouts.filter(
    keyboard => keyboard.id === id
  );

  return (
    <View style={styles.container}>
      <View>
        <Header />
      </View>

      <View style={styles.banner}>
        <Text style={styles.title}>
          Seu Teclado já é quase seu!
        </Text>
        <Text style={styles.description}>
          So falta confirmar o Pedido
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
            isCheckout={true}
          />
        ))}
      </View>
      <View style={styles.container}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} >Finalizar Compra</Text>
        </Pressable>
      </View>
    </View>
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
    backgroundColor: '#222',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});