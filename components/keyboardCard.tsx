import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

type KeyboardCardProps = {
  id: number;
  img: string
  name: string;
  category: string;
  avgPrice: number;
  onPressCheckout: any;
  isChekout: boolean
};

export default function KeyboardCard(props: any) {
  return (
    <View style={styles.card}>
      <Image source={props.img} />
      <Text style={styles.name}>
        {props.name}
      </Text>
      <Text>
        {props.description}
      </Text>
      <Text>
        Teclas: {props.numKeys}
      </Text>
      <Text>
        Switches: {props.switches}
      </Text>
      <Text>
        LED: {props.led ? 'Sim' : 'Não'}
      </Text>
      <Text>
        Hotswap: {props.hotswap ? 'Sim' : 'Não'}
      </Text>
      <Text style={styles.price}>
        Custo Médio: R$ {props.avgPrice}
      </Text>
      {!props.isCheckout && (<Pressable style={styles.button} onPress={props.onPressCheckout}>
        <Text style={styles.buttonText} >Quero esse</Text>
      </Pressable>)}
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
