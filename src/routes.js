import Home from './components/Home'
import Season from './components/Season'
import Account from './components/Account'
import Search from './components/Search'
import Login from './components/Login'
import Register from './components/Register'
import firebase from 'firebase/app'
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        { 
            path: '/',
            name: 'home', 
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login', 
            component: Login,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/register',
            name: 'register', 
            component: Register,
            meta: {
                requiresGuest: true
            }
        },
        { 
            path: '/account',
            name: 'account', 
            component: Account,
            meta: {
                requiresAuth: true
            }
        },
        { 
            path: '/search',
            name: 'search', 
            component: Search ,
            meta: {
                requiresAuth: true
            }
        },
        { 
            path: '/seasons/:id/:showId', 
            name: 'seasons',
            component: Season,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

// //Navigation guards
router.beforeEach((to, from, next) => {
    //check for requiredAuth guard
    if(to.matched.some(record => record.meta.requiresAuth)){
        //check if not logged in
        if(!firebase.auth().currentUser){
            //go to login
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            //proceed to route
            next();
        }
    } else if(to.matched.some(record => record.meta.requiresGuest)){
        //check if logged in
        if(firebase.auth().currentUser){
            //go to login
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            //proceed to route
            next();
        }
    } else {
        next();
    }
})

export default router;