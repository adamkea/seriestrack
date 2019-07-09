<template>
    <div class="container my-4 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <show v-for="show in myShows" :key="show.id" :show="show" class="overflow-hidden rounded-lg shadow-lg"/>
        </div> 
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
