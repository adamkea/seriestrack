<template>
    <div class="container my-2">
        <div class="flex flex-wrap">
            <show v-for="show in myShows" :key="show.showId" :id="show.id" :show="show"/>
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
