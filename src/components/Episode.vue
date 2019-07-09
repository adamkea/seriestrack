<template>
    <div class="container my-4 mx-auto px-4 md:px-12">
        <div v-if="info" class="btn-group self-center" role="group">
            <button v-for="index in seasons" :key="index" type="button" class="btn btn-info" v-on:click="getSeason(index)">{{index}}</button>
        </div>
        <div v-if="episodes">
            <div v-for="episode in episodes" :key="episode.Episode" class="card w-50 d-flex">
                <h5 class="card-header">{{episode.Episode}}: {{episode.Title}}</h5>
                <div class="card-body">
                    <h5 class="card-text">Test</h5>
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
        this.id = this.$route.params.id;
        this.episodes = axios
                .get('http://www.omdbapi.com/?i=' + this.id + '&Season=1&apikey=' + this.apikey)
                .then(response => (this.episodes = response.data.Episodes))
    },
    mounted(){
        axios
            .get('http://www.omdbapi.com/?i=' + this.id + '&apikey=' + this.apikey)
            .then(response => {this.info = response.data,
                            this.seasons = parseInt(response.data.totalSeasons)})
    },
    methods:{
        getSeason(index){
            axios
                .get('http://www.omdbapi.com/?i=' + this.id + '&Season=' + index + '&apikey=' + this.apikey)
                .then(response => (this.episodes = response.data.Episodes))
        }
    }
}
</script>

<style>
.btn-group{
    margin-bottom: 20px; /* Added */
}

.card {
    margin: 0 auto; /* Added */
    float: none; /* Added */
    margin-bottom: 10px; /* Added */
    cursor: pointer; 
}

.card-body:hover{
    background: lightblue;
}
</style>
