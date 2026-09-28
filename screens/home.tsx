import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Header from '../components/header';
import CategoryCard from '../components/categoryCard';

export default function Home({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Header />
        </View>

        <View style={styles.banner}>
          <Text style={styles.title}>
            Ergonomia e Estilo na sua rotina.
          </Text>

          <Text style={styles.description}>
            melhore seu *tec* *tec*
          </Text>
        </View>

        <View>
          <CategoryCard
            icon='⌨️'
            name='Keyboard'
            description='Teclados comuns como full, tkl, 75% e 60%'
            category='keyboard'
          />
          <CategoryCard
            icon='👐'
            name='Split Keyboard'
            description='Teclados com a melhor ergonomia para quem digita'
            category='splitKeyboard'
          />
          <CategoryCard
            icon='🎛️'
            name='Macropad'
            description='Tecladinhos para agilizar os commandos mais complicados em um clique'
            category='macropad'
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Pedidos')}
        >
          <Text style={styles.buttonText}>
            Ver Pedidos
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
  },

  content: {
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
