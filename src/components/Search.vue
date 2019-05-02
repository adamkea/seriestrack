<template>
    <div class="flex-center">
        <div>
            <h2 class="text-center">Find Shows</h2>
            <input class="form-control" type="text" placeholder="Search" aria-label="Search" v-model="search" v-on:keyup.enter="searchShow(search)">
            <div v-if="results">
                <div v-for="result in results" :key="result.imdbID">
                    <div class="card-body">
                        <h5 class="card-text">{{result.Title}}</h5>
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
