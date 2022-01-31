import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMovies } from '../types';
import { Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Favorites = () => {

    const [favoriteMovies, setFavoriteMovies] = useState<IMovies[]>([]);

    useEffect(() => {
        getData()
    }, [favoriteMovies])


    const getData = async () => {
        const storageData = await AsyncStorage.getItem('favorites');
        let currentData: any[] = JSON.parse((storageData) || '[]');
        let movies = Array.from(new Set(currentData.map((i: any) => i)))
        setFavoriteMovies(movies);
    }

    const removeFavorites = async (value: any) => {
        const storageData = await AsyncStorage.getItem('favorites');
        let currentData: any[] = JSON.parse((storageData) || '[]');
        let remove = currentData.filter(i => i.id !== value.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(remove));
    }


    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Your favorites</Text>
            <View >
                {favoriteMovies?.map((i) => {
                    return (
                        <View key={i?.id} style={styles.view}>
                            <Text > </Text>
                            <View style={styles.viewButton}>
                                <Text style={styles.movieTitle}>{i?.original_title}</Text>

                                <Button onPress={() => { removeFavorites(i); }} buttonStyle={styles.button} icon={<MaterialCommunityIcons style={{ marginTop: 10, marginRight: 3 }} name='trash-can-outline' color='red' size={20} />} />
                            </View>
                        </View>
                    )
                })
                }
            </View>
        </ScrollView>
    )
}
export default Favorites



const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 18,
        paddingBottom: 19,
        marginBottom: 20,
        
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#383A6A'
    },
    scrollView: {
        backgroundColor: '#23244E',

    },
    viewButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: '#383A6A',
        borderRadius: 10
    },
    movieTitle: {
        color: 'white',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 5,
        marginLeft: 5
    },
    button: {
        marginTop: 10,
        padding: 0,
        backgroundColor: '#383A6A'
    },

    view: {
        marginLeft: 20,
        marginRight: 20,

    }


});
