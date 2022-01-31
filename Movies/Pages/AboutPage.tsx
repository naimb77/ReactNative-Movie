import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'

export default function AboutPage() {
    return (
        <View style={styles.view}>
            <Text style={styles.title}>About us</Text>
            <View style={styles.container}>
                <Image
                   style={styles.img}
                    source={require('../assets/logo.png')}/>
             </View>
            
            <Text style={styles.alinea}>
                In this project we offer our users to get the best of our movie app.
                We use The Movie Database API, from which we get our data about all movies.
            </Text>
            <Text style={styles.alinea}>
                Our API contains data about the title, genre(s), popularity, an overview and much more.
                As a target group, we focus on users who are interested in films and who would like to find more information about them. 
            </Text>
            <Text style={styles.alinea}>
                The details in how far we will expand is not clear. We don't want to look like an existing app, we will use our creativity.
                There are many possible options and we will do our best. We have an eye for a user-friendly UI. It is also important to have a clean backend.
            </Text>
             <Text style={styles.credit}>
                The Movie App by Naim Baysal
             </Text>
             <Text  style={styles.link}>
                The Movie DB: https://www.themoviedb.org/
             </Text>
            
        </View>
   
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
    view:{
        backgroundColor: '#23244E',
      
    },
    container: {
        alignItems: 'center', 
        backgroundColor: '#23244E',
    },
    img:{
        height: 150, 
        width: 150,
        marginBottom:50,
        borderRadius:20,
        
    },
    alinea:{
        color: 'white', 
        marginTop: 20, 
        textAlign: 'center', 
        fontWeight: 'bold',
        marginLeft:15,
        marginRight:15

    },
    credit:{
        color: 'white', 
        marginTop: 60, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontStyle: 'italic'
    },
    link:{
     color: 'white', 
     textAlign: 'center', 
     fontWeight: 'bold', 
     fontStyle: 'italic', 
     marginBottom: 50

}
    
});
