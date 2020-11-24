import React, { Children, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnection';


export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function cadastrar() {
    Keyboard.dismiss();
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(value => {
        alert('Usuario criado: ' + value.user.email);
        setEmail('')
        setPassword('')
        return;
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          alert('Senha deve ter pelo menos 6 caracteres');
          return;
        }
        if (error.code === 'auth/invalid-email') {
          alert('Email inválido');
          return;
        }
        else {
          console.warn(error)
          alert('Oops, algo deu errado...');
          return;
        }
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        E-Mail:
      </Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <Text style={styles.texto}>
        Senha:
      </Text>
      <TextInput
        style={styles.input}
        value={password}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setPassword(texto)}
      />

      <Button
        title='Cadastrar'
        onPress={cadastrar}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  texto: {
    fontSize: 20
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: 'white'
  },
})