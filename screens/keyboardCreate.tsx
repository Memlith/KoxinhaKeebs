import { View, Text, TextInput, Pressable, Switch, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import Header from '../components/header';
import { useSQLiteContext } from 'expo-sqlite';

export default function KeyboardCreate({ navigation, route }: any) {
  const db = useSQLiteContext();
  const category = route.params.category;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numKeys, setNumKeys] = useState('');
  const [led, setLed] = useState(false);
  const [hotswap, setHotswap] = useState(false);
  const [switches, setSwitches] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function calcAvgDays(keys: number, keyboardCategory: string, hasLed: boolean, hasHotswap: boolean): number {
    const halfKeys = keys * 0.5;
    let hours = halfKeys;

    if (hasLed) hours += halfKeys;
    if (hasHotswap) hours += halfKeys;
    if (keyboardCategory === 'macropad') hours += halfKeys;
    if (keyboardCategory === 'splitKeyboard') hours += keys;

    return Math.ceil(hours / 24);
  }

  function calcPrice(days: number): number {
    return Math.round(days * 50);
  }

  async function saveKeyboard() {
    const totalKeys = Number(numKeys);

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

    const calculatedBuildDays = calcAvgDays(totalKeys, category, led, hotswap);
    const calculatedPrice = calcPrice(calculatedBuildDays);

    await db.runAsync(
      `INSERT INTO keyboards
        (name, description, category, numKeys, led, hotswap, switches, avgBuildDays, avgPrice, finalPrice, imageUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      name,
      description,
      category,
      totalKeys,
      led ? 1 : 0,
      hotswap ? 1 : 0,
      switches,
      calculatedBuildDays,
      calculatedPrice,
      calculatedPrice,
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
    setLed(false);
    setHotswap(false);
    setSwitches('');
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
          multiline
        />

        <Text style={styles.label}>Teclas*</Text>
        <TextInput
          style={styles.input}
          placeholder='Exemplo: 86'
          keyboardType='number-pad'
          value={numKeys}
          onChangeText={(text) => setNumKeys(text.replace(/[^0-9]/g, ''))}
        />

        <Text style={styles.label}>RGB</Text>
        <Switch
          value={led}
          onValueChange={setLed}
          style={styles.switch}
        />

        <Text style={styles.label}>Hotswap</Text>
        <Switch
          value={hotswap}
          onValueChange={setHotswap}
          style={styles.switch}
        />

        <Text style={styles.label}>Switches*</Text>
        <TextInput
          style={styles.input}
          placeholder='Escolha seu switch'
          value={switches}
          onChangeText={setSwitches}
        />

        <Text style={styles.label}>URL da imagem</Text>
        <TextInput
          style={styles.input}
          placeholder='https://exemplo.com/teclado.jpg'
          value={imageUrl}
          onChangeText={setImageUrl}
          keyboardType='url'
          autoCapitalize='none'
          autoCorrect={false}
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

  switch: {
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
