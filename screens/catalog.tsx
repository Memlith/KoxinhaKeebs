import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Header from '../components/header';
import KeyboardCard, { Keyboard } from '../components/keyboardCard';

export default function Catalog({ route, navigation }: any) {
  const db = useSQLiteContext();

  const category = route.params.category;

  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);

  useEffect(() => {
    async function loadKeyboards() {
      const resultado = await db.getAllAsync(
        `
          SELECT *
          FROM keyboards
          WHERE category = ?
          ORDER BY id DESC
        `,
        category
      ) as Keyboard[];

      setKeyboards(resultado);
    }

    loadKeyboards();
  }, []);

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
        {keyboards.length === 0 && (
          <Text style={styles.empty}>
            Nenhum teclado cadastrado nesta categoria.
          </Text>
        )}

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
            onPressCheckout={() => navigation.navigate('Checkout', { id: keyboard.id })}
            isCheckout={false}
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

  empty: {
    padding: 20,
    fontSize: 16,
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
