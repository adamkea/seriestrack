<template>  
    <div class="px-2 lg:my-4 lg:px-4 lg:w-1/4 flex">
        <div class="overflow-hidden rounded-lg shadow-lg">
            <img class="block w-full" :src="info.Poster"/>
            <header class="items-center justify-between leading-tight p-2 md:p-4">
                <div class="text-center">
                    <h1 class="text-black text-lg">{{info.Title}}</h1>
                    <p>Seasons:{{info.totalSeasons}}</p>
                    <button v-if="!hasSeen && !added" class="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" v-on:click="addShow()">Add Show</button>
                </div>
            </header>
        </div>
    </div>
</template>

<script>
import firebase, { functions } from 'firebase/app'
import axios from 'axios';
export default{
    name: 'result',
    props: {
        show: {
            type: Object,
            required: true,
        }
    },
    created(){
        this.$store.dispatch('getShows')
    },
    computed:{
        myShows: function(){
            return this.$store.getters.myShows
        },
        hasSeen: function(){
            //check if this show is already in your list of shows
            return (this.myShows.filter(e => e.imdbID === this.show.imdbID).length > 0)
        }
    },
    data () {
        return {
            'id': this.show.id,
            'imdb': this.show.imdbID,
            info: '',
            'added': false,
            'apikey': process.env.VUE_APP_API_KEY,
            userId: firebase.auth().currentUser.uid
        }
    },
    mounted () {
        axios
        .get('http://www.omdbapi.com/?i=' + this.imdb + '&apikey=' + this.apikey)
        .then(response => (this.info = response.data))
    },
    methods:{
        addShow(){
            var seasons = parseInt(this.info.totalSeasons)
            var promises = [];
            var eps = 0;

            //get the data for each season of the show
            for(var i = 0; i<seasons;i++){
                promises.push(axios.get('http://www.omdbapi.com/?i=' + this.info.imdbID + '&Season=' + (i + 1) + '&apikey=' + this.apikey))
            }

            //get the results from the promises
            axios.all(promises).then((results) => {
                results.forEach(function(response){
                    eps = eps + response.data.Episodes.length
                })
                this.$store.dispatch('addShow',{
                    imdbID: this.show.imdbID,
                    totalEps: eps
                })
                this.added = true;
            });


            
        },
        // getEpisodes(){
        //     var seasons = parseInt(this.info.totalSeasons);
        //     var eps = countEps(this.info, this.apikey);
        //     function countEps(info, apikey){
        //         for(var i=0; i<seasons; i++){
        //             axios
        //             .get('http://www.omdbapi.com/?i=' + info.imdbID + '&Season=' + (i + 1) + '&apikey=' + apikey)
        //             .then(function(a){
        //                 debugger;
        //                 eps += a.data.Episodes.length
        //             })
        //         }
        //         debugger;
        //         return eps;
        //     }
        //     return eps;
        // }
    }
}
</script>