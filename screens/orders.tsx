import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Header from '../components/header';

type Order = {
  id: number;
  keyboardName: string;
  totalPrice: number;
  createdAt: string;
};

export default function Orders() {
  const db = useSQLiteContext();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const result = await db.getAllAsync(
        `
          SELECT *
          FROM orders
          ORDER BY id DESC
        `
      ) as Order[];

      setOrders(result);
    }

    void loadOrders();
  }, [db]);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.banner}>
        <Text style={styles.title}>
          Meus Pedidos
        </Text>
        <Text style={styles.description}>
          Confira os pedidos confirmados.
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.productName}>
              {item.keyboardName}
            </Text>
            <Text style={styles.price}>
              R$ {Number(item.totalPrice).toFixed(2)}
            </Text>
            <Text style={styles.date}>
              {item.createdAt}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },

  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  date: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
  },
});