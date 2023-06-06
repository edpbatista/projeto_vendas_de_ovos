import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function HomeScreen() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  const goToCartScreen = () => {
    navigation.navigate('Cart', { cartItems: cartItems });
  };

  const eggsData = [
    { id: 1, name: 'Ovo Branco', price: 20, image: require('../assets/ovo_branco.jpg') },
    { id: 2, name: 'Ovo Vermelho', price: 23, image: require('../assets/ovo_vermelho.jpg') },
    { id: 3, name: 'Ovo de Codorna', price: 20, image: require('../assets/ovo_codorna.jpg') },
    // Adicione mais ovos conforme necessário
  ];

  const addToCart = (egg) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex((item) => item.id === egg.id);

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += 1;
        updatedItems[existingItemIndex].totalPrice += egg.price;
      } else {
        updatedItems.push({
          ...egg,
          quantity: 1,
          totalPrice: egg.price,
        });
      }

      return updatedItems;
    });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => addToCart(item)}>
        <View style={styles.itemContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Ovos</Text>

      <FlatList
        data={eggsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.cartIconContainer} onPress={goToCartScreen}>
        <FontAwesome name="shopping-cart" size={24} color="black" />
        {cartItems.length > 0 && <Text style={styles.cartItemCount}>{cartItems.length}</Text>}
      </TouchableOpacity>
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
  listContainer: {
    paddingBottom: 80,
  },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  cartIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  cartItemCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 12,
  },
});

export default HomeScreen;
