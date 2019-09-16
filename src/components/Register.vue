<template>
  <div class="container pt-10">
   <form class="bg-white border border-green-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <p class="font-serif font-bold text-gray-800 text-lg">Sign Up</p>
    <div class="mb-4">
      <input type="email" id="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  placeholder="Username">
    </div>
    <div class="mb-6">
      <input type="password" id="password" v-model="password"  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password">
    </div>
    <div class="flex items-center justify-between">
      <button v-on:click="register" class="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign Up
      </button>
    </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default{
    name:'register',
    data: function(){
        return {
            email: '',
            password: ''
        }
    },
    methods:{
        register: function(e){
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                .then(user => {
                    alert('Account created');
                    this.$router.go({ path: this.$router.path });
                },
                err => {
                    alert(err.message);
                });
            e.preventDefault();
        }
    }
}
</script>