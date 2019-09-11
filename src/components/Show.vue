<template>  
    <div class="px-2 pb-2 w-1/2 lg:w-1/4 flex" v-if="isActive">
        <div class="overflow-hidden rounded-lg shadow-lg">
            <img v-bind:src="getImg()" v-on:click="episodes()"/>
            <header class="items-center justify-between leading-tight p-2 md:p-4">
                <div class="text-center">
                    <h1 class="text-black text-lg">{{info.name}}</h1>
                    <progress-bar type="circle" ref="line" :options="options"></progress-bar>
                    <v-icon class="float-right m-2 text-red-600" @click.native="unfollowShow()" name="trash-alt"></v-icon>
                </div>
            </header>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
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
            'showId': this.show.showId,
            'id': this.show.id,
            info: '',
            isActive: true,
            'apikey': process.env.VUE_APP_API_KEY,
            userId: firebase.auth().currentUser.uid,
            options: {
                color: '#38A169',
                strokeWidth: 3,
                svgStyle: {
                    padding: '8px',
                    display: 'block',
                    margin: 'auto',
                    width: '40%'
                },
                text:{
                    autoStyle: true
                },
            }
        }
    },
    computed:{
        noImage () {
            return require('../assets/no_image.png')
        }
    },
    methods:{
        getImg(){
            return this.info.poster_path  ? 'https://image.tmdb.org/t/p/w500/' + this.info.backdrop_path : this.noImage
        },
        episodes(){
            this.$router.push({ name: 'seasons', params: { id: this.id, showId: this.showId.toString()}})
        },
        getPercentage(){
            var perc = Math.round(parseInt(this.show.epsSeen * 100)/this.info.number_of_episodes);
            return perc;
        },
        unfollowShow(){
            debugger;
            this.$store.dispatch('removeShow',this.id)
            this.isActive = false;
        }
    },
    mounted(){
        //get the show data
        axios
        .get('https://api.themoviedb.org/3/tv/' + this.showId + '?api_key=' + this.apikey + '&language=en-US')
        .then(response => (this.info = response.data))
    },
    beforeUpdate(){
        //animate the progress bar
        this.$refs.line.animate((this.show.epsSeen * 100)/this.info.number_of_episodes/100),
        this.$refs.line.setText(this.getPercentage() + "%") 
    }
}
</script>

<style>

</style>

