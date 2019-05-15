import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        shows: [
        ]
    },
    getters: {
        myShows(state){
            return state.shows
        }
    },
    mutations:{
        getShows(state, shows){
            state.shows = shows
        }
    },
    actions:{
        getShows(context){
            db.collection('shows').get()
                .then(querySnapshot => {
                    let tempShows = []
                    querySnapshot.forEach(doc => {
                        const data = {
                            id: doc.id,
                            imdbID: doc.data().imdbID
                        }
                        tempShows.push(data)
                    })
                    context.commit('getShows', tempShows)
                })
        }
    }
})

