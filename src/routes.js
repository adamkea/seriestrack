import Home from './components/Home'
import Episode from './components/Episode'
import Account from './components/Account'
import Search from './components/Search'
import Login from './components/Login'
import Register from './components/Register'

const routes = [
    { 
        path: '/',
        name: 'home', 
        component: Home 
    },
    {
        path: '/login',
        name: 'login', 
        component: Login 
    },
    {
        path: '/register',
        name: 'register', 
        component: Register 
    },
    { 
        path: '/account',
        name: 'account', 
        component: Account 
    },
    { 
        path: '/search',
        name: 'search', 
        component: Search 
    },
    { 
        path: '/episodes/:id', 
        name: 'episodes',
        component: Episode,
    }
]
export default routes
