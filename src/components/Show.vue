<template>  
    <div class="px-2 lg:my-4 lg:px-4 lg:w-1/4 flex" v-on:click="episodes()">
        <div class="overflow-hidden rounded-lg shadow-lg">
            <img class="block w-full" :src="info.Poster"/>
            <header class="items-center justify-between leading-tight p-2 md:p-4">
                <div class="text-center">
                    <h1 class="text-black text-lg">{{info.Title}}</h1>
                    <p>Episodes: {{show.totalEps}}</p>
                    <p>Seen: {{show.epsSeen}} </p>
                    <!-- <div class="bg-green-600 text-sm py-1 text-center text-white" style="width: 65%">65%</div> -->
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
            'apikey': process.env.VUE_APP_API_KEY,
            userId: firebase.auth().currentUser.uid
        }
    },
    methods:{
        episodes(){
            this.$router.push({ name: 'seasons', params: { id: this.show.id, imdbID: this.show.imdbID} })
        }
    },
    mounted () {
        axios
        .get('http://www.omdbapi.com/?i=' + this.imdb + '&apikey=' + this.apikey)
        .then(response => (this.info = response.data))
    }
}
</script>

<style>

</style>
