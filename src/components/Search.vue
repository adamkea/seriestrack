<template>
    <div class="container my-4 mx-auto px-4 md:px-12">
        <h2 class="text-center">Find Shows</h2>
        <input class="form-control mb-4" type="text" placeholder="Search" aria-label="Search" v-model="search" v-on:keyup.enter="searchShow(search)"/>
        <div v-if="results" class="row">
            <result v-for="show in results" :key="show.id" :show="show" class="overflow-hidden rounded-lg shadow-lg"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Result from './Result'
export default{
    components:{
        Result,
    },
    data(){
        return{
            results:[],
            search:"",
            'apikey': process.env.VUE_APP_API_KEY
        }
    },
    methods:{
        searchShow(query){
            this.results = [];
            axios
                .get('http://www.omdbapi.com/?s=' + query + '&apikey=' + this.apikey + '&type=series')
                .then(response => this.results = response.data.Search)
        }
    }
}
</script>
