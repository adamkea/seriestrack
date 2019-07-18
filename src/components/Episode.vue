<template>
    <div>
        <h5 class="card-header">{{episode.Episode}}: {{episode.Title}}</h5>
        <div class="card-body">
            <h5 class="card-text">{{episode}}</h5>
            <h4 v-if="seen">SEEN</h4>
            <button v-if="!seen" v-on:click="addEpisode()" class="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Seen</button>
        </div>     
    </div>
</template>

<script>
export default {
    name: 'episode',
    props: {
        episode: {
            type: Object,
            required: true,
        },
        showID:{
            type: String,
            required: true,
        },
        seen:{
            type: Boolean,
            required: true,
        }
    },
    created(){
        this.imdbID = this.episode.imdbID;
        this.id = this.showID;
        this.seen = this.seen;
        this.$store.dispatch('getEpisodes', this.id)
    },
    methods: {
        addEpisode(){
            this.$store.dispatch('addEpisode', {id: this.id, episode: this.episode.imdbID})
            this.seen = true;
        }
    }
}
</script>
