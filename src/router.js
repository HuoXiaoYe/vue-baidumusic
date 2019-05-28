import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from './components/home.vue';
import musicPlay from './components/musicPlay.vue';
import index from './components/index.vue';
import songlist from './components/songList.vue';
import singerlist from './components/singerLIst.vue';
import bangdan from './components/bangDan.vue';
import my from './components/my.vue';
import search from './components/search.vue';
import singerinfo from './components/singerInfoAndMusic.vue'

var router = new VueRouter({
	routes: [{
			path: '/',
			redirect: '/home'
		}, {
			path: '/home',
			component: home,
			redirect : '/home/index',
			children : [
				{path : 'index',component : index},
				{path : 'songlist',component : songlist},
				{path : 'singerlist',component : singerlist},
				{path : 'bangdan',component : bangdan},
				{path : 'my',component : my},
				{path : 'search',component : search},
				{path : 'singerinfo/:singerid',component : singerinfo}
			]
		},
		{
			path: '/play/:id',
			component: musicPlay
		}
	],
	linkActiveClass : 'active'
});

export default router
