import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Header from '../components/header';
import KeyboardCard from '../components/keyboardCard';
import type { Keyboard } from '../data/keyboard';

export default function Checkout({ route, navigation }: any) {
  const db = useSQLiteContext();
  const id = route.params.id;
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);

  useEffect(() => {
    async function loadKeyboard() {
      const result = await db.getFirstAsync(
        `
          SELECT *
          FROM keyboards
          WHERE id = ?
        `,
        id
      ) as Keyboard | null;

      setKeyboard(result);
    }

    void loadKeyboard();
  }, [db, id]);

  const totalPrice = keyboard
    ? Number(keyboard.finalPrice || keyboard.avgPrice)
    : 0;

  async function finishOrder() {
    if (!keyboard) {
      return;
    }

    await db.runAsync(
      `INSERT INTO orders (keyboardId, keyboardName, totalPrice)
       VALUES (?, ?, ?)`,
      keyboard.id,
      keyboard.name,
      totalPrice,
    );

    Alert.alert(
      'Pedido confirmado!',
      'Seu pedido foi salvo neste dispositivo.',
      [
        {
          text: 'Voltar ao início',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <View style={styles.banner}>
          <Text style={styles.title}>
            Seu teclado já é quase seu!
          </Text>
          <Text style={styles.description}>
            Só falta confirmar o pedido.
          </Text>
        </View>

        <View style={styles.content}>
          {keyboard ? (
            <>
              <KeyboardCard {...keyboard} />

              <View style={styles.total}>
                <Text style={styles.totalLabel}>
                  Total: R$ {totalPrice.toFixed(2)}
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.empty}>
              Carregando teclado...
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.button}
          onPress={finishOrder}
        >
          <Text style={styles.buttonText}>
            Finalizar Compra
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20,
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

  content: {
    flexGrow: 1,
  },

  total: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  empty: {
    padding: 20,
    fontSize: 16,
  },

  footer: {
    padding: 20,
  },

  button: {
    backgroundColor: '#222',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
