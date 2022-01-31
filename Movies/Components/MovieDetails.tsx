import React, { useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import { Image, Linking } from 'react-native'
import { IMovie } from '../types';

export default function MovieDetails({ route }: any) {
    const API_KEY = '9d8e0a3d2d0e5e53b1d557a9d2c4a646';

    const id = route.params


    const [movieDetail, setMovieDetail] = useState<IMovie>();

    const getMovieDetail = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setMovieDetail(data)
            })
    }

    useEffect(() => {
        getMovieDetail();
    }, [])

    // function formatter(input:any){
    //     let fixedResult = input.toString();
    //     if (fixedResult.length > 6) {
    //         return fixedResult.slice(0, 3) + " million";
    //     }
    //     else if(fixedResult.length > 9){
    //         return fixedResult.slice(0, 3) + " billion";
    //     }
    //     else
    //     return fixedResult;
    // }
    // console.log(movieDetail?.budget.toString().length)

    return (
        <ScrollView>
            <View style={styles.view}>
                <Text style={styles.title}>{movieDetail?.original_title}</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(`${movieDetail?.homepage}`)}>{movieDetail?.homepage}</Text>

                <Image
                    style={styles.img}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}` }}
                />
                <Text style={styles.releaseDate} >Released on {movieDetail?.release_date}</Text>
                <Text></Text>
                <Text style={styles.overview} >{movieDetail?.overview}</Text>

                <Text style={styles.genreTitle}>Genre </Text>
                <View style={styles.viewGenre} >
                    {movieDetail?.genres.map((i) => {
                        return (
                            <Text style={styles.genre} key={i.id}>{i.name}</Text>
                        )
                    })
                    }
                </View>

                <Text style={styles.languageTitle}>Spoken Languages</Text>
                <View style={styles.viewLanguage} >
                    {movieDetail?.spoken_languages.map((i) => {
                        return (
                            <Text style={styles.language} key={i.name}>{i.name}</Text>
                        )
                    })

                    }
                </View>
                <View style={styles.viewPopularity} >
                    <Text style={styles.popularityTitle}>Popularity</Text>
                    <Text style={styles.popularity}>{movieDetail?.popularity}</Text>
                </View>

                <View style={styles.viewRuntime} >
                    <Text style={styles.runtimeTitle}>Runtime</Text>
                    <Text style={styles.runtime}>{movieDetail?.runtime} min</Text>
                </View>

                <View style={styles.viewBudget}  >
                    <Text style={styles.budgetTitle} >Budget</Text>
                    <Text style={styles.budget} >${movieDetail?.budget}</Text>
                </View>
                
                <Text style={styles.productionTitle}> Production Companies</Text>
                {movieDetail?.production_companies.map((i) => {
                    return (
                        <Text key={i.id} style={styles.production}>{i.name}</Text>
                    )
                })
                }
                <Text style={styles.countryTitle}>Production Countries</Text>
                {movieDetail?.production_countries.map((i) => {
                    return (
                        <Text style={styles.country} key={i.name}>{i.name}</Text>
                    )
                })
                }

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    viewGenre: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15
    },
    viewLanguage: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 15
    },
    viewPopularity: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginRight: 15
    },
    viewRuntime: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginRight: 15
    },
    viewBudget: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginRight: 15
    },

    view: {
        textAlign: 'center',
        backgroundColor: '#23244E',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    link: {
        textAlign: 'center',
        color: 'grey'
    },
    img: {
        height: 400,
        width: 300,
        borderRadius: 30,
        marginLeft: 60
    },
    releaseDate: {
        color: 'grey',
        textAlign: 'center'
    },
    overview: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 5,
        marginRight: 5
    },
    genreTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 20,
        marginLeft: 15,
    },

    genre: {
        color: 'white',
        marginBottom: 10,
        fontSize: 16,
    },

    languageTitle: {
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 18,
        marginLeft: 15,
    },
    language: {
        color: 'white',
        fontSize: 16,

    },
    popularityTitle: {
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 18,
        marginLeft: 15,
    },
    popularity: {
        color: 'white',
        fontSize: 16,
    },

    runtimeTitle: {
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 18,
        marginLeft: 15,
    },
    runtime: {
        color: 'white',
        fontSize: 16,
    },
    countryTitle: {
        marginTop: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 20,
        textAlign: 'center'
    },
    country: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    productionTitle: {
        marginTop: 50,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 20,
        textAlign: 'center'
    },
    production: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    budgetTitle: {
        fontWeight: 'bold',
        color: '#AED3EA',
        fontSize: 18,
        marginLeft: 15,
    },
    budget: {
        color: 'white',
        fontSize: 16,
    }

});