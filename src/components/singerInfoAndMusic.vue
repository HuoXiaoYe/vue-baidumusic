<template>
	<div class="singer-container">
		<div class="header">
			<div class="img">
				<img :src="musicList.artistinfo.avatar_big" alt="">
			</div>
			<p class="singer">{{musicList.artistinfo.name}}</p>
		</div>
		<vue-data-loading>
			<ul v-loading='loading'>
				<router-link tag='li' :to="'/play/'+item.song_id" v-for='(item,index) in musicList.songlist' :key='index'>
					{{item.album_title}}
					<i class="fa fa-play" aria-hidden="true"></i>
				</router-link>
			</ul>
		</vue-data-loading>


	</div>
</template>

<script>
	import VueDataLoading from 'vue-data-loading'
	export default {
		data() {
			return {
				loading: true,
				completed: false,
				singId: this.$route.params.singerid,
				musicList: [],
				limit: 20,
				page : 1
			}
		},
		methods: {
			fetchData() {
				console.log(1)
				this.loading = true
				const url = this.HOST + '/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=' + this.singId +
					'&limits=' + this.limit + '&use_cluster=1&order=2'
				this.$axios.get(url).then(res => {
					/* console.log(res.data) */
					/* this.musicList = this.musicList.concat(res.data); */
					this.musicList = res.data;
					/* this.loading = false; */
					this.limit += 20
					/* this.fullscreenLoading = false; */
					/* console.log(this.limit) */
				})
			},
			pullDown() {
				this.fetchData();
				this.page ++
			},
		},
		created() {
			this.fetchData()
		},
		components: {
			VueDataLoading
		}
	}
</script>

<style scoped="scoped">
	.singer-container {}

	.singer-container .header {
		text-align: center;
		background-image: linear-gradient(to right, #999, #ccc, #999);
	}

	.singer-container .header img {
		text-align: center;
		width: 120px;
		border-radius: 50%;
		margin-top: 20px;
	}

	.singer-container .header .singer {
		line-height: 40px;
		font-size: 18px;
		color: #333;
	}

	.singer-container ul {}

	.singer-container ul li {
		width: 80%;
		margin: 0 auto;
		border-bottom: 1px solid #ccc;
		line-height: 55px;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.singer-container ul li i {
		color: #ccc;
	}
</style>
