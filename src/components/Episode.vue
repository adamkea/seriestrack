<template>
    <div class="container my-4 mx-auto px-4 md:px-12">
        <div v-if="info" class="btn-group" role="group">
            <button v-for="index in seasons" :key="index" type="button" class="btn btn-info" v-on:click="getSeason(index)">{{index}}</button>
        </div>
        <div v-if="episodes">
            <div v-for="episode in episodes" :key="episode.Episode" class="card">
                <h5 class="card-header">{{episode.Episode}}: {{episode.Title}}</h5>
                <div class="card-body">
                    <h5 class="card-text">{{episode}}</h5>
                    <h4 v-if="hasSeen(episode.imdbID)">SEEN</h4>
                    <button v-if="!hasSeen(episode.imdbID)" v-on:click="addEpisode(episode.imdbID)" class="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Seen</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'episode',
    data(){
        return{
            info:null,
            episodes: null,
            'apikey': process.env.VUE_APP_API_KEY
        }
    },
    created(){
        this.imdbID = this.$route.params.imdbID;
        this.id = this.$route.params.id;
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
        }
    },
    methods:{
        getSeason(index){
            axios
                .get('http://www.omdbapi.com/?i=' + this.imdbID + '&Season=' + index + '&apikey=' + this.apikey)
                .then(response => (this.episodes = response.data.Episodes))
        },
        addEpisode(imdbID){
            this.$store.dispatch('addEpisode', {id: this.id, episode: imdbID})
        },
        hasSeen(imdbID){
            return this.myEpisodes.filter(e => e.imdbID === imdbID).length > 0;
        }
    }
}
</script>