<template>
        <div class="container mt-4">
            <div class="row">
                <show v-for="show in myShows" :key="show.id" :show="show"/>
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
