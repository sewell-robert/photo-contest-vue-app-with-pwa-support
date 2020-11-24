import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/HomePage'
import PolicyPage from '@/components/PolicyPage'
import WeeklyWinners from '@/components/WeeklyWinners'
import VoterBox from '@/components/VoterBox'
import UploadPhoto from '@/components/UploadPhoto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/PolicyPage',
    name: 'PolicyPage',
    component: PolicyPage
  },
  {
    path: '/WeeklyWinners',
    name: 'WeeklyWinners',
    component: WeeklyWinners
  },
  {
    path: '/VoterBox',
    name: 'VoterBox',
    component: VoterBox
  },
  {
    path: '/UploadPhoto',
    name: 'UploadPhoto',
    component: UploadPhoto
  }
]

const router = new VueRouter({
  routes
})

export default router
