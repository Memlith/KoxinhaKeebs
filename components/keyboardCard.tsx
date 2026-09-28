import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import type { Keyboard } from '../data/keyboard';

type KeyboardCardProps = Keyboard & {
  onBuyNow?: () => void;
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
  onBuyNow,
  imageUrl,
}: KeyboardCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {name}
      </Text>

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      )}

      <Text style={styles.body}>
        {description}
      </Text>

      <Text style={styles.body}>
        Teclas: {numKeys}
      </Text>

      <Text style={styles.body}>
        Switches: {switches}
      </Text>

      <Text style={styles.body}>
        LED: {Boolean(led) ? 'Sim' : 'Não'}
      </Text>

      <Text style={styles.body}>
        Hotswap: {Boolean(hotswap) ? 'Sim' : 'Não'}
      </Text>

      <Text style={styles.price}>
        Preço: R$ {Number(finalPrice || avgPrice).toFixed(2)}
      </Text>

      {onBuyNow && (
        <Pressable
          style={styles.button}
          onPress={onBuyNow}
        >
          <Text style={styles.buttonText}>Comprar agora</Text>
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
    backgroundColor: '#1a1d24',
    borderWidth: 1,
    borderColor: '#2f3644',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2f4f8',
  },

  body: {
    color: '#9aa3b2',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#a5b4fc',
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#232833',
  },

  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
