<template>
    <div class="flex-center">
        <div>
            <show v-for="show in shows" :key="show.id" :show="show"/>
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
     data () {
        return {
            shows: [
                {
                    id: 1,
                    imdb:'tt0944947'
                },
                {
                    id: 2,
                    imdb:'tt0903747'
                },
                {
                    id: 3,
                    imdb:'tt0141842'
                },
                {
                    id: 4,
                    imdb:'tt2861424'
                },
                {
                    id: 5,
                    imdb:'tt2356777'
                },
                {
                    id: 6,
                    imdb:'tt0472954'
                }
            ]
        }
    }
}
</script>

<style>

</style>
