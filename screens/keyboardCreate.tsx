import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import Header from '../components/header';
import { useSQLiteContext } from 'expo-sqlite';

export default function KeyboardCreate({ navigation, route }: any) {
  const db = useSQLiteContext();
  const category = route.params.category;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numKeys, setNumKeys] = useState('');
  const [switches, setSwitches] = useState('');
  const [buildDays, setBuildDays] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function saveKeyboard() {
    const totalKeys = Number(numKeys);
    const totalDays = Number(buildDays) || 1;
    const totalPrice = Number(price);

    if (!name.trim()) {
      Alert.alert('Atenção', 'Informe o nome do teclado.');
      return;
    }

    if (!Number.isInteger(totalKeys) || totalKeys <= 0) {
      Alert.alert('Atenção', 'Informe uma quantidade inteira de teclas.');
      return;
    }

    if (!switches.trim()) {
      Alert.alert('Atenção', 'Informe os switches do teclado.');
      return;
    }

    if (!price || totalPrice <= 0) {
      Alert.alert('Atenção', 'Informe um preço válido.');
      return;
    }

    await db.runAsync(
      `INSERT INTO keyboards
        (name, description, category, numKeys, led, hotswap, switches, avgBuildDays, avgPrice, finalPrice, imageUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      name.trim(),
      description,
      category,
      totalKeys,
      0,
      0,
      switches,
      totalDays,
      totalPrice,
      totalPrice,
      imageUrl || null,
    );

    Alert.alert(
      'Sucesso',
      'Seu teclado foi criado!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );

    setName('');
    setDescription('');
    setNumKeys('');
    setSwitches('');
    setBuildDays('');
    setPrice('');
    setImageUrl('');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header />

      <View style={styles.banner}>
        <Text style={styles.title}>
          Crie teclados para se adaptar a você.
        </Text>
        <Text style={styles.description}>
          Melhore seu tec tec.
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>
          NOVO {category.toUpperCase()}
        </Text>

        <Text style={styles.label}>Nome*</Text>
        <TextInput
          style={styles.input}
          placeholder='Nomeie seu teclado'
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder='Descreva seu teclado'
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Teclas*</Text>
        <TextInput
          style={styles.input}
          placeholder='Exemplo: 86'
          keyboardType='decimal-pad'
          value={numKeys}
          onChangeText={setNumKeys}
        />

        <Text style={styles.label}>Switches*</Text>
        <TextInput
          style={styles.input}
          placeholder='Escolha seu switch'
          value={switches}
          onChangeText={setSwitches}
        />

        <Text style={styles.label}>Dias de montagem</Text>
        <TextInput
          style={styles.input}
          placeholder='Exemplo: 2'
          keyboardType='decimal-pad'
          value={buildDays}
          onChangeText={setBuildDays}
        />

        <Text style={styles.label}>Preço*</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite o preço'
          keyboardType='decimal-pad'
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>URL da imagem</Text>
        <TextInput
          style={styles.input}
          placeholder='https://exemplo.com/teclado.jpg'
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <Pressable
          style={styles.button}
          onPress={saveKeyboard}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </View>
    </ScrollView>
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

  form: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    marginTop: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
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