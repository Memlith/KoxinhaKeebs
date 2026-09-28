import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Header from '../components/header';
import KeyboardCard from '../components/keyboardCard';
import type { Keyboard } from '../data/keyboard';

export default function Catalog({ route, navigation }: any) {
  const db = useSQLiteContext();
  const category = route.params.category;
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);

  useEffect(() => {
    async function loadKeyboards() {
      const result = await db.getAllAsync(
        `
          SELECT *
          FROM keyboards
          WHERE category = ?
          ORDER BY id DESC
        `,
        category
      ) as Keyboard[];

      setKeyboards(result);
    }

    void loadKeyboards();
  }, [category, db]);

  function buyNow(keyboard: Keyboard) {
    navigation.navigate('Carrinho', { id: keyboard.id });
  }

  return (
    <View style={styles.container}>
      <View>
        <Header />

        <View style={styles.banner}>
          <Text style={styles.title}>
            Ergonomia e estilo na sua rotina.
          </Text>
          <Text style={styles.description}>
            Melhore seu tec tec.
          </Text>
        </View>
      </View>
      <FlatList
        data={keyboards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <KeyboardCard
            {...item}
            onBuyNow={() => buyNow(item)}
          />
        )}
      />
      <View style={styles.footer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Crie um Teclado', { category })}
        >
          <Text style={styles.buttonText}>
            Novo Teclado
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
  },

  banner: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f2f4f8',
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#9aa3b2',
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2f3644',
  },

  button: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
