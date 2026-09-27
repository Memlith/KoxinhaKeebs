import { View, Text, StyleSheet, Pressable } from 'react-native';

export type Keyboard = {
  id: number;
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

export default function KeyboardCard({
  name,
  description,
  numKeys,
  switches,
  led,
  hotswap,
  avgPrice,
  finalPrice,
  onPressCheckout,
  isCheckout,
}: Keyboard) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {name}
      </Text>

      <Text>
        {description}
      </Text>

      <Text>
        Teclas: {numKeys}
      </Text>

      <Text>
        Switches: {switches}
      </Text>

      <Text>
        LED: {led ? 'Sim' : 'Não'}
      </Text>

      <Text>
        Hotswap: {hotswap ? 'Sim' : 'Não'}
      </Text>

      <Text style={styles.price}>
        Custo Médio: R$ {Number(avgPrice || finalPrice).toFixed(2)}
      </Text>

      {!isCheckout && (
        <Pressable style={styles.button} onPress={onPressCheckout}>
          <Text style={styles.buttonText}>Quero esse</Text>
        </Pressable>
      )}
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
