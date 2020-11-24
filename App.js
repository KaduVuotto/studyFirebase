import React, { Children, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnection';

import Listagem from './src/Listagem';

export default function App() {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    async function dados() {

      await firebase.database().ref('usuarios').on('value',
        (snapshot) => {
          setUsuarios([])

          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
              cargo: childItem.val().cargo,
            };

            setUsuarios(oldArray => [...oldArray, data].reverse())

            setLoading(false)
          })
        })

    }

    dados();

  }, []);

  async function cadastrar() {
    if (nome !== '' && cargo !== '') {
      let usuarios = await firebase.database().ref('usuarios')
      let chave = await usuarios.push().key;

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

      <View style={styles.content}>
        {loading ?
          (<ActivityIndicator color='#121212' size={45} />) :
          (<FlatList
            data={usuarios}
            keyExtractor={item => item.key}
            renderItem={({ item }) => <Listagem data={item} />}
          />)
        }
      </View>

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
  content: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center'
  }
})