<template>
    <div class="col-md-4 d-flex">
        <div v-if="info" class="card flex-fill" v-on:click="episodes()">
            <h5 class="card-header">{{info.Title}}</h5>
            <div class="card-body">
                <img :src="info.Poster" class="rounded-circle z-depth-10 img-fluid " data-holder-rendered="true"  />
            </div>
        </div>
    </div>
</template>

<script>
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
            info: null,
            'apikey': process.env.VUE_APP_API_KEY
        }
    },
    methods:{
        episodes(){
            this.$router.push({ name: 'episodes', params: { id: this.show.imdbID } })
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
