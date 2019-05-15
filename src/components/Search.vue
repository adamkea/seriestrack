<template>
    <div class="container mt-4">
        <h2 class="text-center">Find Shows</h2>
        <input class="form-control mb-4" type="text" placeholder="Search" aria-label="Search" v-model="search" v-on:keyup.enter="searchShow(search)">
        <div v-if="results" class="row">
            <div v-for="result in results" :key="result.imdbID" :result="result">
                <div class="col-md-4 d-flex">
                    <div class="card flex-fill">
                        <h5 class="card-header">{{result.Title}}</h5>
                        <div class="card-body">
                            <h5 class="card-text">Test</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            results:[],
            search:"",
            'apikey': process.env.VUE_APP_API_KEY
        }
    },
    methods:{
        searchShow(query){
            axios
                .get('http://www.omdbapi.com/?s=' + query + '&apikey=' + this.apikey + '&type=series')
                .then(response => this.results = response.data.Search)
        }
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