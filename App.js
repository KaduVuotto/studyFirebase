import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from './src/firebaseConnection';

export default function App() {
  const [nome, setNome] = useState('Carregando...')
  const [idade, setIdade] = useState('')


  useEffect(() => {

    async function dados() {
      //.on = sempre procura escutar o evento
      await firebase.database().ref('usuarios/1').on('value', (snapshot) => {
        setNome(snapshot.val().nome)
        setIdade(snapshot.val().idade)
      });

      //.once = escuta o evento uma vez
      //await firebase.database().ref('nome').once('value', (snapshot) => {
      //  setNome(snapshot.val())
      //});
    }

    dados();

  }, []);

  return (
    <View style={{ marginTop: 25 }}>
      <Text>
        Oi, {nome}
      </Text>
      <Text>
        idade: {idade}
      </Text>
    </View>
  );
}