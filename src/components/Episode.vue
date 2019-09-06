<template>
    <div class="max-w-sm w-full max-w-full flex mb-2">
        <img v-bind:src="getImg()"/>
        <div class="border border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal w-full">
            <div class="text-gray-900 font-bold text-xl mb-2">{{episode.episode_number}}: {{episode.name}}</div>
            <svg xmlns="http://www.w3.org/2000/svg" v-on:click="addEpisode()" v-bind:fill="seen ? 'green' : 'grey'"  class="ml-auto" width="50" height="50" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
            <div class="flex items-center">
                <p class="text-sm">Air Date: {{episode.air_date}}</p>
            </div>
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
        showId:{
            type: String,
            required: true,
        },
        seen:{
            type: Boolean,
            required: true,
        }
    },
    created(){
        this.id = this.showId;
        this.seen = this.seen;
    },
    methods: {
        addEpisode(){
            if(!this.seen){
                this.$store.dispatch('addEpisode', {id: this.$route.params.id, episode: this.episode.id})
                this.seen = true;
            }
        },
        getImg(){
            return 'https://image.tmdb.org/t/p/w300/' + this.episode.still_path;
        }
    }
}
</script>
