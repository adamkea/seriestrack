<template>
    <div class="container my-4 mx-auto px-4 md:px-12">
        <div v-if="info" class="btn-group" role="group">
            <button v-for="index in seasons" :key="index" type="button" class="btn btn-info" v-on:click="getSeason(index)">{{index}}</button>
        </div>
        <div v-if="episodes">
            <episode v-for="episode in episodes" :key="episode.id" :episode="episode" :showID="id" :seen="hasSeen(episode.imdbID)"/>
        </div>
    </div>
</template>

<script>
import Episode from './Episode'
import axios from 'axios';
export default {
    name: 'seasons',
    components: {
        Episode
    },
    data(){
        return{
            info:null,
            episodes: null,
            'id': null,
            'apikey': process.env.VUE_APP_API_KEY
        }
    },
    created(){
        this.imdbID = this.$route.params.imdbID;
        this.id = this.$route.params.id;
        this.seen = true;
        this.episodes = axios
                .get('http://www.omdbapi.com/?i=' + this.imdbID + '&Season=1&apikey=' + this.apikey)
                .then(response => (this.episodes = response.data.Episodes));
        this.$store.dispatch('getEpisodes', this.id)
    },
    mounted(){
        axios
            .get('http://www.omdbapi.com/?i=' + this.imdbID + '&apikey=' + this.apikey)
            .then(response => {this.info = response.data,
                            this.seasons = parseInt(response.data.totalSeasons)})
    },
    computed:{
        myEpisodes(){

            return this.$store.getters.myEpisodes
        },
    },
    methods:{
        getSeason(index){
            //get all the episodes for a specific season
            axios
                .get('http://www.omdbapi.com/?i=' + this.imdbID + '&Season=' + index + '&apikey=' + this.apikey)
                .then(response => (this.episodes = response.data.Episodes))
        },
        hasSeen(episode){
            //check to see if this episode is in your seen episodes collection
            return this.myEpisodes.filter(e => e.imdbID === episode).length > 0;
        }
    }
}
</script>