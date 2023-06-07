import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

function HomeScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();

  const goToCartScreen = () => {
    navigation.navigate('Cart', { cartItems: cartItems });
  };

  const eggsData = [
    { id: 1, name: 'Ovo Branco', price: 22, image: require('../assets/ovo_branco.jpg') },
    { id: 2, name: 'Ovo Vermelho', price: 24, image: require('../assets/ovo_vermelho.jpg') },
    { id: 3, name: 'Ovo de Codorna', price: 20, image: require('../assets/ovo_codorna.jpg') },
    // Adicione mais ovos conforme necessário
  ];

  const addToCart = (egg) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems.find((item) => item.id === egg.id);

    if (existingItem) {
      existingItem.quantity += selectedQuantity;
      existingItem.totalPrice += egg.price * selectedQuantity;
    } else {
      updatedItems.push({
        ...egg,
        quantity: selectedQuantity,
        totalPrice: egg.price * selectedQuantity,
      });
    }

    setCartItems(updatedItems);
    setSelectedQuantity(1);
    setShowAlert(true);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setSelectedQuantity(selectedQuantity - 1)}
            disabled={selectedQuantity === 1}
          >
            <FontAwesome name="minus" size={16} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={selectedQuantity.toString()}
            onChangeText={(text) => setSelectedQuantity(parseInt(text))}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setSelectedQuantity(selectedQuantity + 1)}
          >
            <FontAwesome name="plus" size={16} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Ovos</Text>

      <FlatList
        data={eggsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={styles.cartIconContainer} onPress={goToCartScreen}>
        <FontAwesome name="shopping-cart" size={24} color="black" />
        {cartItems.length > 0 && (
          <View style={styles.cartItemCount}>
            <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      <FancyAlert
        visible={showAlert}
        style={styles.alertContainer}
        onRequestClose={hideAlert}
        icon={<FontAwesome name="check" size={40} color="white" />}
        iconColor="white"
        style={{ backgroundColor: '#2ecc71' }}
      >
        <Text style={styles.alertTitle}>Produto Adicionado</Text>
        <Text style={styles.alertText}>O produto foi adicionado ao carrinho.</Text>
        <TouchableOpacity style={styles.alertButton} onPress={hideAlert}>
          <Text style={styles.alertButtonText}>OK</Text>
        </TouchableOpacity>
      </FancyAlert>
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
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
    padding: 16,
  },
  image: {
    width: 'auto',
    height: '25vh',
    resizeMode: 'cover',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 2,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 50,
    height: 30,
    marginHorizontal: 8,
    textAlign: 'center',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#337ab7',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  cartItemCountText: {
    color: '#fff',
    fontSize: 12,
  },
  alertContainer: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  alertText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
});

export default HomeScreen;
