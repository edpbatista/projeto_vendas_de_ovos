import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function CartScreen({ route }) {
  const { cartItems } = route.params;
  const [cartData, setCartData] = useState(cartItems);

  const increaseQuantity = (itemId) => {
    setCartData((prevData) =>
      prevData.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.totalPrice + item.price,
          };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartData((prevData) =>
      prevData.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: item.totalPrice - item.price,
          };
        }
        return item;
      })
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <FontAwesome name="minus" size={18} color="#888" style={styles.quantityButton} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <FontAwesome name="plus" size={18} color="#888" style={styles.quantityButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getTotalPrice = () => {
    const totalPrice = cartData.reduce((acc, item) => acc + item.totalPrice, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>R$ {getTotalPrice()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  totalPrice: {
    fontSize: 18,
    color: '#888',
  },
});

export default CartScreen;
