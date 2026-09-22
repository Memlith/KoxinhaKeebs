import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function CategoryCard(props: any) {
  const navigation: any = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Catalog', { category: props.category })}
    >
      <View style={styles.card}>
        <Image source={props.img} />
        <Text>{props.icon}</Text>
        <Text style={styles.name}>
          {props.name}
        </Text>
        <Text style={styles.description}>
          {props.description}
        </Text>
      </View>
    </Pressable >
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#e4b787',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 14,
    marginTop: 10,
  },
});