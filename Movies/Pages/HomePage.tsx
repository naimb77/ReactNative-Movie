import { Video, AVPlaybackStatus } from 'expo-av';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native'
import { IMovies } from '../types';

export default function HomePage() {

    const API_KEY = '9d8e0a3d2d0e5e53b1d557a9d2c4a646';

    const video = React.useRef(null);
    const [popularMovies, setPopularMovies] = useState<IMovies[]>([]);

    const getPopulairMovies = async () => {
        await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => {
                setPopularMovies(data.results)
            })
    }
    function Carousel() {
        return (
            <FlatList
                data={popularMovies}
                style={{ flex: 1 }}
                renderItem={({ item }) => {
                    return <Slide data={item} />;
                }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        );
    }

    function Slide({ data }: any) {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10
                }}
            >
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
                    style={{ width: 320, height: 450 }}
                ></Image>

                <Text style={styles.textMovie}>Rating: {data.vote_average}</Text>
            </View>
        );
    }

    useEffect(() => {
        getPopulairMovies()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.titleHome}>Populair Movies 2022</Text>
            <View>
                {
                    Carousel()
                }
            </View>
            
            <Text style={styles.titleHome}>Trailer Upcoming Movies 2022</Text>
            <Video
                ref={video}
                style={styles.video}
                source={
                    require('../assets/trailerMovie.mp4')
                }
                useNativeControls
                resizeMode="contain"
                isLooping
            />

        </ScrollView>

    )
}

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
    container: {
        backgroundColor: '#23244E',

    },
    video: {
        alignSelf: 'center',
        width: 400,
        height: 250,
        margin: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#383A6A',
        width: 250,
        borderColor: '#383A6A',
        marginLeft: 75
    },
    vote: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',

    },
    textMovie: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    titleHome: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 18,
        marginLeft: 15,
        marginBottom:15,
       
    },
});
