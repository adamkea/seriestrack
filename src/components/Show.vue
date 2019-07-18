<template>  
    <div class="px-2 lg:my-4 lg:px-4 lg:w-1/4 flex" v-if="isActive">
        <div class="overflow-hidden rounded-lg shadow-lg">
            <img class="block w-full" :src="info.Poster" v-on:click="episodes()"/>
            <header class="items-center justify-between leading-tight p-2 md:p-4">
                <div class="text-center">
                    <h1 class="text-black text-lg">{{info.Title}}</h1>
                    <!-- <p>Episodes: {{show.totalEps}}</p>
                    <p>Seen: {{show.epsSeen}} </p> -->
                    <p>% {{getPercentage()}}</p>
                    <button v-on:click="unfollowShow()" class="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Unfollow</button>
                </div>
            </header>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios';
export default{
    name: 'show',
    props: {
        show: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            'id': this.show.id,
            'imdb': this.show.imdbID,
            info: '',
            isActive: true,
            'apikey': process.env.VUE_APP_API_KEY,
            userId: firebase.auth().currentUser.uid
        }
    },
    methods:{
        episodes(){
            this.$router.push({ name: 'seasons', params: { id: this.show.id, imdbID: this.show.imdbID} })
        },
        getPercentage(){
            var perc = Math.round(parseInt(this.show.epsSeen * 100)/parseInt(this.show.totalEps));
            return perc;
        },
        unfollowShow(){
            this.$store.dispatch('removeShow',this.show.id)
            this.isActive = false;
        }
    },
    mounted () {
        axios
        .get('http://www.omdbapi.com/?i=' + this.imdb + '&apikey=' + this.apikey)
        .then(response => (this.info = response.data))
    }
}
</script>
