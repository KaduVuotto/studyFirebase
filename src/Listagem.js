import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Listagem({ data }) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                {data.nome}
            </Text>
            <Text style={styles.texto}>
                {data.cargo}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#121212'
    },
    texto: {
        color: 'white',
        fontSize: 18
    }
})