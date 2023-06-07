import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

function CartScreen({ route }) {
  const { cartItems, onItemRemove } = route.params;
  const [cartData, setCartData] = useState(cartItems);
  const [showAlert, setShowAlert] = useState(false);

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

  const removeItem = (item) => {
    setCartData((prevData) => prevData.filter((cartItem) => cartItem.id !== item.id));
    onItemRemove(item);
    setShowAlert(true);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
              <FontAwesome name="minus" size={18} color="#888" style={styles.quantityButton} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
              <FontAwesome name="plus" size={18} color="#888" style={styles.quantityButton} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeItem(item)} style={styles.removeButton}>
            <FontAwesome name="trash" size={18} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getTotalPrice = () => {
    const totalPrice = cartData.reduce((acc, item) => acc + item.totalPrice, 0);
    return totalPrice.toFixed(2);
  };

  const hideAlert = () => {
    setShowAlert(false);
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

      {showAlert && (
        <FancyAlert
          visible={showAlert}
          style={styles.alertContainer}
          onRequestClose={hideAlert}
          icon={<FontAwesome name="check" size={40} color="white" />}
          iconColor="white"
          style={{ backgroundColor: '#2ecc71' }}
        >
          <Text style={styles.alertText} onPress={hideAlert}>Item excluído com sucesso!</Text>
        </FancyAlert>
      )}
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
    marginBottom: 16,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    paddingHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  removeButton: {
    marginLeft: 'auto',
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
  alertContainer: {
    backgroundColor: '#fff', // Defina uma cor de fundo adequada
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CartScreen;
