import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
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
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
  },

  banner: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f2f4f8',
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#9aa3b2',
  },

  card: {
    backgroundColor: '#1a1d24',
    borderWidth: 1,
    borderColor: '#2f3644',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },

  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f2f4f8',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a5b4fc',
  },

  date: {
    fontSize: 13,
    color: '#9aa3b2',
    marginTop: 6,
  },
});