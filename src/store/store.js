import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import firebase from 'firebase/app'
import axios from 'axios'
import { ESPIPE } from 'constants';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        shows: [
        ],
        episodes:[
        ]
    },
    getters: {
        myShows(state){
            return state.shows
        },
        myEpisodes(state){
            return state.episodes
        }
    },
    mutations:{
        getShows(state, shows){
            state.shows = shows
        },
        getEpisodes(state, episodes){
            state.episodes = episodes
        }
    },
    actions:{
        //get the shows for the current user
        getShows(context){
            var userId = firebase.auth().currentUser.uid;
            var docRef = db.collection('users').doc(userId).collection('shows');
            docRef.get()
                .then(querySnapshot => {    
                    let tempShows = []
                    querySnapshot.forEach(doc => {
                        const data = {
                            id: doc.id,
                            imdbID: doc.data().imdbID,
                            totalEps: doc.data().totalEps,
                        }
                        tempShows.push(data)
                    })
                    context.commit('getShows', tempShows)
                })
        },
        addShow(context, show){
            var userId = firebase.auth().currentUser.uid;
            var docRef = db.collection('users').doc(userId).collection('shows');
            docRef.add({
                imdbID: show.imdbID,
                totalEps: show.totalEps
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },
        getEpisodes(context, show){
            var userId = firebase.auth().currentUser.uid;
            var docRef = db.collection('users').doc(userId).collection('shows').doc(show).collection('episodes');
            docRef.get()
                .then(querySnapshot => {    
                    let tempEpisodes = []
                    querySnapshot.forEach(doc => {
                        const data = {
                            id: doc.id,
                            imdbID: doc.data().imdbID
                        }
                        tempEpisodes.push(data)
                    })
                    context.commit('getEpisodes', tempEpisodes)
                })
        },
        addEpisode(context, show){
            var userId = firebase.auth().currentUser.uid;
            var docRef = db.collection('users').doc(userId).collection('shows').doc(show.id).collection('episodes');
            docRef.add({
                imdbID: show.episode,
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
    }
})

