import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { categoryImages } from '../data/keyboard';
import type { KeyboardCategory } from '../data/keyboard';

type CategoryCardProps = {
  icon: string
  name: string
  description: string
  category: KeyboardCategory
  imageUrl?: string
};

export default function CategoryCard({
  icon,
  name,
  description,
  category,
  imageUrl,
}: CategoryCardProps) {
  const navigation: any = useNavigation();
  const image = imageUrl ?? categoryImages[category];

  return (
    <Pressable
      onPress={() => navigation.navigate('Catálogo', { category })}
    >
      <View style={styles.card}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        )}

        <Text style={styles.icon}>{icon}</Text>

        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.description}>
          {description}
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
    backgroundColor: '#1e1b4b',
    borderWidth: 1,
    borderColor: '#4338ca',
  },

  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#232833',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f2f4f8',
  },

  icon: {
    fontSize: 28,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    marginTop: 10,
    color: '#c7d0e0',
  },
});
