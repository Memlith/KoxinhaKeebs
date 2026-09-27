import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Header from '../components/header';
import KeyboardCard, { Keyboard } from '../components/keyboardCard';

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
    return navigation.addListener('focus', loadKeyboards);
  }, [category, db, navigation]);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={keyboards}
      keyExtractor={(keyboard) => keyboard.id.toString()}
      renderItem={({ item: keyboard }) => (
        <KeyboardCard
          {...keyboard}
          isCheckout={false}
          onPressCheckout={() => navigation.navigate('Checkout', { id: keyboard.id })}
        />
      )}
      ListHeaderComponent={(
        <>
          <Header
            onBackPress={() => navigation.goBack()}
            canGoBack={navigation.canGoBack()}
          />
          <View style={styles.banner}>
            <Text style={styles.title}>
              Ergonomia e estilo na sua rotina.
            </Text>
            <Text style={styles.description}>
              Melhore seu tec tec.
            </Text>
          </View>
        </>
      )}
      ListEmptyComponent={(
        <Text style={styles.empty}>
          Nenhum teclado cadastrado nesta categoria.
        </Text>
      )}
      ListFooterComponent={(
        <View style={styles.footer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('KeyboardCreate', { category })}
            accessibilityRole='button'
            accessibilityLabel='Cadastrar novo teclado'
            accessibilityHint='Abre o formulário para criar um teclado nesta categoria'
          >
            <Text style={styles.buttonText}>
              Novo Teclado
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
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

  empty: {
    padding: 20,
    fontSize: 16,
  },

  footer: {
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: '#2563eb',
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
