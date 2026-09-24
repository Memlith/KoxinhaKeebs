import { View, Text, TextInput, Pressable, Switch, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import Header from '../components/header';
import { useSQLiteContext } from 'expo-sqlite';

export default function KeyboardCreate({ navigation, route }: any) {
  const db = useSQLiteContext();

  const category = route.params.category;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numKeys, setNumKeys] = useState(0);
  const [led, setLed] = useState(false);
  const [hotswap, setHotswap] = useState(false);
  const [switches, setSwitches] = useState('');

  function calcBuildDays(keys: number, category: string, led: boolean, hotswap: boolean): number {
    const halfKeys = keys * 0.5;
    let hours = halfKeys;
    if (led) hours += halfKeys;
    if (hotswap) hours += halfKeys;
    if (category === 'macropad') hours += halfKeys;
    if (category === 'splitKeyboard') hours += keys;
    return Math.ceil(hours / 24);
  }

  function calcFinalPrice(days: number): number {
    return Math.round(days * 50);
  }

  async function saveKeyboard() {
    if (!name.trim()) {
      Alert.alert(
        'Atenção',
        'Informe o nome do teclado.'
      );
      return;
    }

    if (numKeys <= 0) {
      Alert.alert(
        'Atenção',
        'Informe a quantidade de teclas.'
      );
      return;
    }

    if (!switches.trim()) {
      Alert.alert(
        'Atenção',
        'Informe os switches do teclado.'
      );
      return;
    }

    const calculatedBuildDays = calcBuildDays(numKeys, category, led, hotswap);
    const calculatedPrice = calcFinalPrice(calculatedBuildDays);

    await db.runAsync(
      `INSERT INTO keyboards
        (name, description, category, numKeys, led, hotswap, switches, avgBuildDays, avgPrice, finalPrice)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      name,
      description,
      category,
      Number(numKeys),
      led ? 1 : 0,
      hotswap ? 1 : 0,
      switches,
      calculatedBuildDays,
      calculatedPrice,
      calculatedPrice,
    );

    Alert.alert(
      'Sucesso',
      'Seu Teclado foi criado!',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.goBack(),
        },
      ]
    );

    setName('');
    setDescription('');
    setNumKeys(0);
    setLed(false);
    setHotswap(false);
    setSwitches('');
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header />
      </View>

      <View style={styles.banner}>
        <Text style={styles.title}>
          Crie Teclados para se adaptar a voce
        </Text>
        <Text style={styles.description}>
          Melhore seu *tec* *tec*
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          NOVO {category.toUpperCase()}
        </Text>
        <Text style={styles.label}>
          Nome*
        </Text>
        <TextInput style={styles.input}
          placeholder='Nomeie seu Teclado'
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>
          Descrição
        </Text>
        <TextInput style={styles.input}
          placeholder='Descreva seu Teclado'
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.label}>
          Teclas*
        </Text>
        <TextInput style={styles.input}
          placeholder='86'
          keyboardType='decimal-pad'
          value={String(numKeys)}
          onChangeText={(text) => setNumKeys(Number(text) || 0)}
        />
        <Text style={styles.label}>
          RGB*
        </Text>
        <Switch
          value={led}
          onValueChange={setLed}
          style={styles.input}
        />
        <Text style={styles.label}>
          Hotswap*
        </Text>
        <Switch
          value={hotswap}
          onValueChange={setHotswap}
          style={styles.input}
        />
        <Text style={styles.label}>
          Switches*
        </Text>
        <TextInput style={styles.input}
          placeholder='Escolha seu Switch'
          value={switches}
          onChangeText={setSwitches}
        />
        <Pressable style={styles.button} onPress={saveKeyboard}>
          <Text style={styles.buttonText}>
            Salvar
          </Text>
        </Pressable>
      </View>

    </ScrollView>
  )
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
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
});
