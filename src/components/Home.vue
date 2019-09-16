<template>
    <div class="my-4 lg:px-20">
        <div class="flex flex-wrap">
            <show v-for="show in myShows" :key="show.showId" :id="show.id" :show="show"/>
        </div> 
        <div v-if="!myShows.length" class="text-center mt-10">You currently have no shows. Search for shows to start building your dashboard.</div>
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
