import React, { Children, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native';
import firebase from './src/firebaseConnection';

export default function App() {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')


  useEffect(() => {

    async function dados() {
      //Criar um nó
      //await firebase.database().ref('tipo').set('Cliente')

      //Remover nó
      //await firebase.database().ref('tipo').remove()

      //Adicionando child
      //await firebase.database().ref('usuarios').child(3).set({
      //  nome:'José',
      //  cargo:'Programador'
      //})

      //Alterando chiald
      //await firebase.database().ref('usuarios').child(3).update({
      //  nome:'José Augusto'
      //})

    }

    dados();

  }, []);

  async function cadastrar() {
    if (nome !== '' && cargo !== '') {
      let usuarios = await firebase.database().ref('usuarios')
      let chave = (await usuarios.push()).key;

      usuarios.child(chave).set({
        nome: nome,
        cargo: cargo
      })

      alert('Cadastrado com sucesso');
      setCargo('')
      setNome('')
      Keyboard.dismiss();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Nome
      </Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        value={nome}
        onChangeText={(texto) => setNome(texto)}
      />

      <Text style={styles.texto}>
        Cargo
      </Text>
      <TextInput
        style={styles.input}
        value={cargo}
        underlineColorAndroid='transparent'
        onChangeText={(texto) => setCargo(texto)}
      />

      <Button
        title='Novo Funcionario'
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
    fontSize: 17
  },
})