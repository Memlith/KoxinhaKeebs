import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/header';
import CategoryCard from '../components/categoryCard';
export default function Home() {
  return (
    <View style={styles.container}>
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

      <View style={styles.container}>
        <CategoryCard
          img=''
          icon=''
          name='Keyboard'
          description='Teclados comuns como full, tkl, 75% e 60%'
          category='keyboard'
        />
        <CategoryCard
          img=''
          icon=''
          name='Split Keyboard'
          description='Teclados com a melhor ergonomia para quem digita'
          category='splitKeyboard'
        />
        <CategoryCard
          img=''
          icon=''
          name='Macropad'
          description='Tecladinhos para agilizar os commandos mais complicados em um clique'
          category='macropad'
        />
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
});