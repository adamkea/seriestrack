<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    <body class="antialiased font-serif font-bold text-lg bg-white h-12">
      <header class="lg:px-16 px-6 bg-white flex flex-wrap items-center ">
        <div class="flex-1 flex justify-between items-center py-4">
          <div class="text-green-600 lg:ml-6 cursor-pointer" v-on:click="home()"><v-icon name="tv"></v-icon> Series Tracker</div>
        </div>
        <label for="menu-toggle" class="pointer-cursor lg:hidden block" v-if="isLoggedIn"><svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
        <input class="hidden" type="checkbox" id="menu-toggle" />
        <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
          <nav>
            <ul class="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
              <li class="mr-6"><router-link v-if="isLoggedIn" :to="{name: 'home'}" class="text-gray-600 hover:text-green-600 hover:no-underline" exact>Home</router-link></li>
              <li class="mr-6"><router-link v-if="isLoggedIn" :to="{name: 'search'}" class="text-gray-600 hover:text-green-600 hover:no-underline" exact>Search</router-link></li>
              <li class="mr-6"><a class="text-gray-600 hover:text-green-600 hover:no-underline" href="#" v-if="isLoggedIn" v-on:click="logout()">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <hr class="border-b border-gray-600 opacity-25 my-0 py-0" />
      <router-view></router-view>
    </body>
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
      },
      home(){
        this.$router.push({name: 'home'})
      }
    }
}
</script>

<style src="../css/main.css"/>



