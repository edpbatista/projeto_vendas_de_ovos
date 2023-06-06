import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function WelcomeScreen({ navigation }) {
    
  const goToHomeScreen = () => {
    navigation.navigate('Home'); // Navega para a tela HomeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App de Venda de Ovos!</Text>
      <TouchableOpacity style={styles.button} onPress={goToHomeScreen}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
