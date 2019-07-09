<template>
    <div id="app">
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
      <!-- <div class="flex bg-gray-800">
          <nav class="flex items-center justify-between flex-wrap bg-teal">
            <div class="flex items-center flex-no-shrink text-white">
                <div class="text-sm sm:flex-grow"><router-link v-if="isLoggedIn" :to="{name: 'home'}" class="hover:text-white">Home</router-link></div>
                <div class="text-sm sm:flex-grow"><router-link v-if="isLoggedIn" :to="{name: 'search'}" class="hover:text-white">Search</router-link></div>      
              <li><router-link v-if="isLoggedIn" :to="{name: 'search'}">Find Shows</router-link></li>
              <li><router-link v-if="!isLoggedIn" :to="{name: 'login'}">Login</router-link></li>
              <li><router-link v-if="!isLoggedIn" :to="{name: 'register'}">Register</router-link></li>
              <li><button type="button" class="btn btn-primary" v-if="isLoggedIn" v-on:click="logout">Logout</button></li> 
            </div>
          </nav>
      </div> -->
      <nav class="flex content-center flex-wrap font-serif font-bold text-lg bg-white h-12 shadow-md">
        <div class="justify-start ml-6 mr-6 text-green-600">SeriesTrack</div>
        <div class="w-full block flex-grow justify-center lg:flex lg:items-center lg:w-auto">
          <div class="mr-6">
            <router-link v-if="isLoggedIn" :to="{name: 'home'}" class="text-gray-600 hover:text-gray-600 hover:no-underline" exact>Home</router-link>
          </div>
          <div class="mr-6">
            <router-link v-if="isLoggedIn" :to="{name: 'search'}" class="text-gray-600 hover:text-gray-600 hover:no-underline" exact>Search</router-link>
          </div>
          <div class="mr-6">
            <router-link v-if="isLoggedIn" :to="{name: 'account'}" class="text-gray-600 hover:text-gray-600 hover:no-underline" exact>Account</router-link>
          </div>
        </div>
        <div class="mr-6" v-if="isLoggedIn" v-on:click="logout">
          <a class="text-gray-600 hover:text-green-600 hover:no-underline" href="#">Logout</a>
        </div>
      </nav>
      <div class="w-full text-black">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
    name: 'master',
    data(){
      return{
        isLoggedIn: false,
        currentUser: false,
        userId: firebase.auth().currentUser.uid
      }
    },
    created(){
      if(firebase.auth().currentUser){
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    },
    methods:{
      logout: function(){
        firebase.auth().signOut().then(() =>  {
          this.$router.go({ path: this.$router.path });
        });
      }
    }
}
</script>

<style src="../css/main.css"/>



