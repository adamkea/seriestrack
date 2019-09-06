<template>
    <div class="container my-4 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap">
            <show v-for="show in myShows" :key="show.showId" :id="show.id" :show="show" class="overflow-hidden rounded-lg shadow-lg"/>
        </div> 
        <div v-if="!myShows.length">You have no shows</div>
    </div>
</template>

<script>
import Show from './Show'

export default {
    name: 'home',
    components: {
        Show,
    },
    created(){
        this.$store.dispatch('getShows')
    },
    computed:{
        myShows(){
            return this.$store.getters.myShows
        }
    }
}
</script>

<style>
</style>
