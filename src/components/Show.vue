<template>
    <div v-if="info" class="card w-50 d-flex " v-on:click="episodes()">
            <h5 class="card-header">{{info.Title}}</h5>
            <div class="card-body">
                <h5 class="card-text">{{info.Plot}}</h5>
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
            'imdb': this.show.imdb,
            info: null,
            'apikey': process.env.VUE_APP_API_KEY
        }
    },
    methods:{
        episodes(){
            this.$router.push({ name: 'episodes', params: { id: this.show.imdb } })
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
