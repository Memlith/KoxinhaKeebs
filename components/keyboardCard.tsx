import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';

type Keyboard = {
  id: number;
  img: string;
  name: string;
  category: string;
  description: string;
  numKeys: number;
  switches: string;
  led: boolean;
  hotswap: boolean;
  avgPrice: number;
  finalPrice: number;
  onPressCheckout: () => void;
  isCheckout: boolean;
};

export default function KeyboardCard({ category }: Keyboard) {
  const db = useSQLiteContext();

  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);

  useEffect(() => { loadKeyboards(); }, []);

  async function loadKeyboards() {

    const resultado = await db.getAllAsync(`
        SELECT *
        FROM keyboads
        ORDER BY id DESC
        WHERE category = ?
      `) as Keyboard[]; //cast para o tipo Keyboard[]

    setKeyboards(resultado);
  }

  return (
    <View style={styles.card}>
      <FlatList
        data={keyboards}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Image source={{ uri: item.img }} />

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>
              {item.description}
            </Text>

            <Text>
              Teclas: {item.numKeys}
            </Text>

            <Text>
              Switches: {item.switches}
            </Text>

            <Text>
              LED: {item.led ? 'Sim' : 'Não'}
            </Text>

            <Text>
              Hotswap: {item.hotswap ? 'Sim' : 'Não'}
            </Text>

            <Text style={styles.price}>
              Custo Médio: R$ {Number(item.avgPrice || item.finalPrice).toFixed(2)}
            </Text>

            {!isCheckout && (
              <Pressable style={styles.button} onPress={onPressCheckout}>
                <Text style={styles.buttonText}>Quero esse</Text>
              </Pressable>
            )}

          </View>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  button: {
    backgroundColor: '#222',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
