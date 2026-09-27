import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Header from '../components/header';
import KeyboardCard, { Keyboard } from '../components/keyboardCard';

export default function Checkout({ route }: any) {
  const db = useSQLiteContext();

  const id = route.params.id;

  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);

  useEffect(() => {
    async function loadKeyboards() {
      const resultado = await db.getAllAsync(
        `
          SELECT *
          FROM keyboards
          WHERE id = ?
        `,
        id
      ) as Keyboard[];

      setKeyboards(resultado);
    }

    loadKeyboards();
  }, []);

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
        {keyboards.map((keyboard) => (
          <KeyboardCard
            key={keyboard.id}
            id={keyboard.id}
            name={keyboard.name}
            category={keyboard.category}
            description={keyboard.description}
            numKeys={keyboard.numKeys}
            switches={keyboard.switches}
            led={keyboard.led}
            hotswap={keyboard.hotswap}
            avgPrice={keyboard.avgPrice}
            finalPrice={keyboard.finalPrice}
            isCheckout={true}
            onPressCheckout={() => { }}
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
