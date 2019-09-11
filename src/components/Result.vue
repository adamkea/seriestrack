<template>  
    <div class="px-2 pb-2 w-1/2 lg:w-1/4 flex">
        <div class="overflow-hidden rounded-lg shadow-lg">
            <img v-bind:src="getImg()"/>
            <header class="items-center justify-between leading-tight p-2 md:p-4">
                <div class="text-center">
                    <h1 class="text-black text-lg">{{show.name}}</h1>
                    <button v-if="!hasSeen && !added" class="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" v-on:click="addShow()">Add Show</button>
                </div>
            </header>
        </div>
    </div>
</template>

<script>
import firebase, { functions } from 'firebase/app'
import axios from 'axios';
export default{
    name: 'result',
    props: {
        show: {
            type: Object,
            required: true,
        }
    },
    created(){
        this.$store.dispatch('getShows')
    },
    computed:{
        myShows: function(){
            return this.$store.getters.myShows
        },
        hasSeen: function(){
            //check if this show is already in your list of shows
            return (this.myShows.filter(e => e.showId === this.id).length > 0)
        },
        noImage () {
            return require('../assets/no_image.png')
        }
    },
    data () {
        return {
            'id': this.show.id,
            'imdb': this.show.imdbID,
            info: '',
            'added': false,
            'apikey': process.env.VUE_APP_API_KEY,
            userId: firebase.auth().currentUser.uid
        }
    },
    methods:{
        getImg(){
            return this.show.backdrop_path  ? 'https://image.tmdb.org/t/p/w500/' + this.show.backdrop_path : this.noImage
        },
        addShow(){
            this.$store.dispatch('addShow',{
                showId: this.show.id,
            })
            this.added = true; 
        }
    }
}
</script>