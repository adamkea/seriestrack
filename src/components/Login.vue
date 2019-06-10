<template>
<div class="container mt-20 w-50 sm:w-full md:w-full">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <p class="font-serif font-bold text-gray-800 text-lg">Sign In</p>
    <div class="mb-4">
      <input type="email" id="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  placeholder="Username">
    </div>
    <div class="mb-6">
      <input type="password" id="password" v-model="password"  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password">
    </div>
    <div class="flex items-center justify-between">
      <button v-on:click="login" class="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase/app'
export default{
    name:'login',
    data: function(){
        return {
            email: '',
            password: ''
        }
    },
    methods:{
        login: function(e){
            firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(user => {
                    alert('Logged in');
                    this.$router.go({ path: this.$router.home });
                },
                err => {
                    alert(err.message);
                });
            e.preventDefault();
        }
    }
}
</script>