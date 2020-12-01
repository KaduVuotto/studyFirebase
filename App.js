import React, { Children, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard, FlatList, ActivityIndicator, Alert } from 'react-native';
import firebase from './src/firebaseConnection';


export default function App() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')


  async function logar() {
    Keyboard.dismiss();
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(value => {
        alert('Bem vindo: ' + value.user.email);
        setEmail('')
        setPassword('')
        setUser(value.user.email)
        return;
      })
      .catch(error => {
        console.warn(error)
        alert('Oops, algo deu errado...');
        return;
      })
  }
  async function logout() {
    Keyboard.dismiss();
    await firebase.auth().signOut();
    setUser('')
    alert('Deslogado com sucesso!')
    return;
  }

  async function cadastrar() {
    Keyboard.dismiss();
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(value => {
        firebase.database().ref('usuarios').child(value.user.uid).set({
          nome: nome
        })
        alert('Usuario criado');
        setEmail('')
        setPassword('')
        setUser(value.user.email)
        return;
      })
      .catch(error => {
        alert('Oops, algo deu errado...');
        return;
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Nome:
      </Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        value={nome}
        onChangeText={(texto) => setNome(texto)}
      />

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

      {user.length == 1 ?
        <Button
          title='Acessar'
          onPress={logar}
        /> : null}


      {user.length > 0 ?
        <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center' }}>
          {user}
        </Text>
        : null}

      {user.length == 0 ?
        <View>
          <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center' }}> - ou - </Text>
          <Button
            title='Cadastrar'
            onPress={cadastrar}
          />
        </View> : null}


      {user.length > 0 ?
        <Button
          title='Sair'
          onPress={logout}
        />
        : null}
    </View >
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