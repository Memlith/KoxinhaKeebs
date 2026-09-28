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
        LED: {Boolean(led) ? 'Sim' : 'Não'}
      </Text>

      <Text>
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

  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#222',
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
