import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { Button, Card } from 'react-native-elements';
import { IMovies } from '../types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Movies({ navigation }: any) {
    const API_KEY = '9d8e0a3d2d0e5e53b1d557a9d2c4a646';

    const [movies, setMovies] = useState<IMovies[]>([]);
    const [searchedMovies, setSearchedMovies] = useState<IMovies[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchVal, setSearchVal] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(false)
    const scrollRef = useRef<ScrollView>();

    const getMovies = async () => {
        await fetch(`https://api.themoviedb.org/3/discover/movie?page=${pageNumber}&api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
            })
    }

    useEffect(() => {
        getMovies()
    }, [pageNumber])

    const scrollTop = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true
        });
    }

    const handleRemovePage = () => {
        if (pageNumber === 0) {
            return;
        }
        else {
            return setPageNumber(pageNumber - 1), scrollTop;
        }
    }
    const handleAddPage = () => {
        if (pageNumber === 0) {
            return;
        }
        else {
            return setPageNumber(pageNumber + 1), scrollTop;
        }
    }

    const handlePress = async () => {

        if (searchVal) {
            await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchVal}&page=${pageNumber}&include_adult=false`)
                .then(res => res.json())
                .then(data => {
                    setSearchedMovies(data.results)
                    if (data.results.length === 0) {
                        alert("No movies were found!");
                    }
                })
            setSearchVal('')
        }
    }

    const handleSearch = (e: any) => {
        setSearchVal(e)
    }

    const colorRate = (input: any) => {
        if (input >= 8) {
            return 'green';
        }
        else if (input >= 6) {
            return 'orange';
        }
        else {
            return 'red';
        }
    }

    const addFavorites = async (value: IMovies) => {
        const storageData = await AsyncStorage.getItem('favorites');
        let currentData: any[] = JSON.parse((storageData) || '[]');
        if (!currentData.some(i => i.id === value.id)) {
            await AsyncStorage.setItem('favorites', JSON.stringify([...currentData, value]));
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.viewInput}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={handleSearch}
                    value={searchVal}
                />
                <Button buttonStyle={styles.searchBtn} onPress={handlePress} icon={<MaterialCommunityIcons name='text-search' color='black' size={24} />} />
            </View>
            <ScrollView>
                {!searchedMovies.length ?
                    movies.map((movie) => {
                        return (
                            <TouchableOpacity key={movie.id} onPress={() => {
                                navigation.navigate('Details', movie.id)
                            }}>
                                <Card containerStyle={styles.item}>
                                    <Card.Title style={styles.title}>{movie.title}</Card.Title>
                                    <Card.Image
                                        style={styles.img}
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}>
                                    </Card.Image>
                                    <View style={styles.viewVote}>
                                        <Text style={[styles.vote, { color: `${colorRate(movie.vote_average)}` }]}>{movie.vote_average}</Text>
                                        <Button onPress={() => { addFavorites(movie); }} buttonStyle={{ backgroundColor: '#383A6A' }} icon={<MaterialCommunityIcons style={{ marginTop: 10 }} name='star' color='yellow' size={20} />} />
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    }) : searchedMovies.map((movie) => {
                        return (
                            <TouchableOpacity key={movie.id} onPress={() => {
                                navigation.navigate('Details', movie.id)
                            }}>
                                <Card containerStyle={styles.item}>
                                    <Card.Title style={styles.title}>{movie.title}</Card.Title>
                                    <Card.Image
                                        style={styles.img}
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}>
                                    </Card.Image>
                                    <View style={styles.viewVote}>
                                        <Text style={[styles.vote, { color: `${colorRate(movie.vote_average)}` }]}>{movie.vote_average}</Text>
                                        <Button onPress={() => { addFavorites(movie); }} buttonStyle={{ backgroundColor: '#383A6A', paddingBottom:5 }} icon={<MaterialCommunityIcons style={{ marginTop: 10 }} name='star' color='yellow' size={20} />} />
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
            <View style={styles.viewButtons} >
                <Button buttonStyle={styles.buttonLeft} onPress={handleRemovePage} icon={<MaterialCommunityIcons style={{ marginTop: 10, marginBottom: 10 }} name='chevron-left-circle-outline' color='white' size={30} />} />
                <Button buttonStyle={styles.buttonRight} onPress={handleAddPage} icon={<MaterialCommunityIcons style={{ marginTop: 10, marginBottom: 10 }} name='chevron-right-circle-outline' color='white' size={30} />} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        backgroundColor: '#23244E',
        flex: 1
    },
    viewInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    textInput: {
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        height: 35, width: 150,
        borderRadius: 5
    },
    viewVote: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      

    },
    img: {
        height: 350,
        width: 250
    },

    item: {
        backgroundColor: '#383A6A',
        width: 250,
        borderColor: '#383A6A',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 80
    },
    vote: {
        marginTop: 10,
        fontSize:16,
        fontWeight: 'bold',
        marginLeft:120
    },
    title: {
        color: 'white',
        fontWeight: 'bold',

    },

    searchBtn: {
        backgroundColor: '#AED3EA',
        width: 50,
        padding: 0,
        height: 35
    },
    buttonLeft: {
        height: 40,
        width: 80,
        backgroundColor: '#383A6A',

    },
    buttonRight: {
        height: 40,
        width: 80,
        backgroundColor: '#383A6A',

    },
    viewButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
       
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#383A6A'

    }
});