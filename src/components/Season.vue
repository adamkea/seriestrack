<template>
    <div class="container my-4 mx-auto px-4 md:px-12">
        <!-- <div class="btn-group" role="group">
            <button v-for="index in seasons" :key="index" type="button" class="btn btn-info" v-on:click="getSeason(index)">{{index}}</button>
        </div> -->
        <ul class="flex list-reset border overflow-x-auto border-grey-light rounded w-auto font-sans mb-2">
            <li v-for="index in seasons" :key="index" v-on:click="getSeason(index)"><a class="block hover:text-green-400 text-green-600 border-r border-grey-light px-10 py-2 active:text-blue-600" href="#">{{index}}</a></li>
        </ul>
        <episode v-for="episode in episodes" :key="episode.id" :episode="episode" :showId="showId" :seen="hasSeen(episode.id)"/>
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
            seasons: null,
            episodes: null,
            showId: null,
            isActive: true,
            activeSeason: 1,
            'id': null,
            'apikey': process.env.VUE_APP_API_KEY
        }
    },
    created(){
        this.id = this.$route.params.id,
        this.showId = this.$route.params.showId,
        this.seen = true;
        this.episodes = axios
                .get('https://api.themoviedb.org/3/tv/' + this.showId + '/season/1?api_key=' + this.apikey + '&language=en-US')
                .then(response => (this.episodes = response.data.episodes));
        this.$store.dispatch('getEpisodes', this.id)
    },
    mounted(){
        axios
            .get('https://api.themoviedb.org/3/tv/' + this.showId + '?api_key=' + this.apikey + '&language=en-US')
            .then(response => this.seasons = response.data.number_of_seasons)
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
                .get('https://api.themoviedb.org/3/tv/' + this.showId + '/season/' + index + '?api_key=' + this.apikey + '&language=en-US')
                .then(response => (this.episodes = response.data.episodes))
            this.activeSeason = index;
        },
        hasSeen(episode){
            //check to see if this episode is in your seen episodes collection
            return this.myEpisodes.filter(e => e.episodeId === episode).length > 0;
        }
    }
}
</script>