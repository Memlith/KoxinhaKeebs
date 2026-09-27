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
  const [price, setPrice] = useState('');
  const [led, setLed] = useState(false);
  const [hotswap, setHotswap] = useState(false);
  const [switches, setSwitches] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function calcBuildDays(keys: number, keyboardCategory: string, hasLed: boolean, hasHotswap: boolean): number {
    const halfKeys = keys * 0.5;
    let hours = halfKeys;

    if (hasLed) hours += halfKeys;
    if (hasHotswap) hours += halfKeys;
    if (keyboardCategory === 'macropad') hours += halfKeys;
    if (keyboardCategory === 'splitKeyboard') hours += keys;

    return Math.ceil(hours / 24);
  }

  async function saveKeyboard() {
    const totalKeys = Number(numKeys);
    const manualPrice = Number(price.replace(',', '.'));
    const normalizedImageUrl = imageUrl.trim();

    if (!name.trim()) {
      Alert.alert('Atenção', 'Informe o nome do teclado.');
      return;
    }

    if (!Number.isInteger(totalKeys) || totalKeys <= 0) {
      Alert.alert('Atenção', 'Informe uma quantidade inteira de teclas.');
      return;
    }

    if (!/^\d+(?:[.,]\d{1,2})?$/.test(price) || manualPrice <= 0) {
      Alert.alert('Atenção', 'Informe um preço válido. Exemplo: 150,00');
      return;
    }

    if (!switches.trim()) {
      Alert.alert('Atenção', 'Informe os switches do teclado.');
      return;
    }

    if (normalizedImageUrl && !/^https?:\/\/.+/i.test(normalizedImageUrl)) {
      Alert.alert('Atenção', 'Informe uma URL pública que comece com http:// ou https://.');
      return;
    }

    const calculatedBuildDays = calcBuildDays(totalKeys, category, led, hotswap);

    await db.runAsync(
      `INSERT INTO keyboards
        (name, description, category, numKeys, led, hotswap, switches, avgBuildDays, avgPrice, finalPrice, imageUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      name.trim(),
      description.trim(),
      category,
      totalKeys,
      led ? 1 : 0,
      hotswap ? 1 : 0,
      switches.trim(),
      calculatedBuildDays,
      manualPrice,
      manualPrice,
      normalizedImageUrl || null,
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
    setPrice('');
    setLed(false);
    setHotswap(false);
    setSwitches('');
    setImageUrl('');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header
        onBackPress={() => navigation.goBack()}
        canGoBack={navigation.canGoBack()}
      />

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
          accessibilityLabel='Nome do teclado'
          accessibilityHint='Campo obrigatório'
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder='Descreva seu teclado'
          value={description}
          onChangeText={setDescription}
          multiline
          accessibilityLabel='Descrição do teclado'
        />

        <Text style={styles.label}>Teclas*</Text>
        <TextInput
          style={styles.input}
          placeholder='Exemplo: 86'
          keyboardType='number-pad'
          value={numKeys}
          onChangeText={(text) => setNumKeys(text.replace(/[^0-9]/g, ''))}
          accessibilityLabel='Quantidade de teclas'
          accessibilityHint='Informe um número inteiro maior que zero'
        />

        <Text style={styles.label}>Preço*</Text>
        <TextInput
          style={styles.input}
          placeholder='Exemplo: 150,00'
          keyboardType='decimal-pad'
          value={price}
          onChangeText={setPrice}
          accessibilityLabel='Preço do teclado'
          accessibilityHint='Campo obrigatório. Use vírgula ou ponto para os centavos.'
        />

        <Text style={styles.label}>RGB</Text>
        <Switch
          value={led}
          onValueChange={setLed}
          style={styles.switch}
          accessibilityLabel='Iluminação RGB'
          accessibilityHint='Ative se o teclado possuir iluminação RGB'
        />

        <Text style={styles.label}>Hotswap</Text>
        <Switch
          value={hotswap}
          onValueChange={setHotswap}
          style={styles.switch}
          accessibilityLabel='Hotswap'
          accessibilityHint='Ative se os switches puderem ser trocados sem solda'
        />

        <Text style={styles.label}>Switches*</Text>
        <TextInput
          style={styles.input}
          placeholder='Escolha seu switch'
          value={switches}
          onChangeText={setSwitches}
          accessibilityLabel='Switches do teclado'
          accessibilityHint='Campo obrigatório'
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
          accessibilityLabel='URL da imagem do teclado'
          accessibilityHint='Campo opcional. Informe uma imagem pública que comece com http:// ou https://.'
        />

        <Pressable
          style={styles.button}
          onPress={saveKeyboard}
          accessibilityRole='button'
          accessibilityLabel='Salvar teclado'
          accessibilityHint='Salva o teclado no catálogo'
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
