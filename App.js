import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:8080/telelista/contatos-alfabetica');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Erro ao obter contatos:', error.message);
      }
    };

    fetchContacts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.words}> TELELISTA </Text>
      <ImageBackground
        source={require('./src/img/bg.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.contactsContainer}>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contactItem}>
                <Text style={styles.contactName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  words: {
    color: 'white',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  contactsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo para melhor visibilidade
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '40%', // Ajuste conforme necessário
  },

  contactItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Cor de fundo dos itens
  },

  contactName: {
    color: 'white',
    fontWeight: 'bold',
  },

  contactPhone: {
    color: '#333',
  },
});
