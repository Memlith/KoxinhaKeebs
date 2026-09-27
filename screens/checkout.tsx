import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Header from '../components/header';
import KeyboardCard, { Keyboard } from '../components/keyboardCard';

export default function Checkout({ route, navigation }: any) {
  const db = useSQLiteContext();
  const id = route.params.id;
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    async function loadKeyboard() {
      try {
        const result = await db.getFirstAsync(
          `
            SELECT *
            FROM keyboards
            WHERE id = ?
          `,
          id
        ) as Keyboard | null;

        if (!result) {
          setLoadError('Teclado não encontrado. Volte ao catálogo e escolha outro modelo.');
          return;
        }

        setKeyboard(result);
      } catch {
        setLoadError('Não foi possível carregar o teclado. Tente novamente.');
      }
    }

    void loadKeyboard();
  }, [db, id]);

  async function finishOrder() {
    if (!keyboard || isFinishing) {
      return;
    }

    setIsFinishing(true);

    try {
      const totalPrice = Number(keyboard.finalPrice || keyboard.avgPrice);

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
    } catch {
      Alert.alert('Erro', 'Não foi possível confirmar o pedido. Tente novamente.');
    } finally {
      setIsFinishing(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header
          onBackPress={() => navigation.goBack()}
          canGoBack={navigation.canGoBack()}
        />

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
            <KeyboardCard {...keyboard} isCheckout />
          ) : (
            <Text style={styles.empty} accessibilityRole='alert'>
              {loadError || 'Carregando teclado...'}
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, (!keyboard || isFinishing) && styles.buttonDisabled]}
          onPress={finishOrder}
          disabled={!keyboard || isFinishing}
          accessibilityRole='button'
          accessibilityLabel='Finalizar compra'
          accessibilityHint='Salva o pedido neste dispositivo'
          accessibilityState={{ disabled: !keyboard || isFinishing }}
        >
          <Text style={styles.buttonText}>
            {isFinishing ? 'Salvando pedido...' : 'Finalizar Compra'}
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

  buttonDisabled: {
    backgroundColor: '#777',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
