<template>
	<div class="index-contaier">
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- slides -->
			<swiper-slide><img src="../lib/images/b1.jpg"></swiper-slide>
			<swiper-slide><img src="../lib/images/b2.jpg"></swiper-slide>
			<swiper-slide><img src="../lib/images/b3.jpg"></swiper-slide>
			<swiper-slide><img src="../lib/images/b4.jpg"></swiper-slide>
			<!-- Optional controls -->
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-scrollbar" slot="scrollbar"></div>
		</swiper>
		<div class="today-commend">
			<div class="header">
				<h3>今日推荐</h3>
				<div class="more">更多</div>
			</div>
			<ul>
				<router-link tag='li' :to="'/play/'+item.album_id" v-for="item in listData1" :key='item.album_id'>
					<img :src="item.pic_small" alt="">
					<div class="info">
						<div class="title">{{item.album_title}}</div>
						<div class="author">{{item.author}}</div>
					</div>
				</router-link>
			</ul>
		</div>

		<div class="today-commend">
			<div class="header">
				<h3>热门歌手</h3>
				<div class="more">更多</div>
			</div>
			<ul>
				<router-link tag='li' :to="'/home/singerinfo/'+item.ting_uid" v-for="item in artistInfo" :key='item.album_id'>
					<img :src="item.avatar_big" alt="">
					<div class="info">
						<div class="title">{{item.album_title}}</div>
						<div class="author">{{item.name}}</div>
					</div>
				</router-link>
			</ul>
		</div>

		<div class="today-commend">
			<div class="header">
				<h3>新歌速递</h3>
				<div class="more">更多</div>
			</div>
			<ul>
				<router-link tag='li' :to="'/play/'+item.song_id" v-for="item in listData3" :info='item' :key='item.album_id'>
					<img :src="item.pic_small" alt="">
					<div class="info">
						<div class="title">{{item.album_title}}</div>
						<div class="author">{{item.author}}</div>
					</div>
				</router-link>
			</ul>
		</div>


		<!-- 音乐榜单 -->
		<div class="music-list">
			<div class="header">
				<h3>音乐榜单</h3>
				<div class="more">更多</div>
			</div>
			<ul ref='nav' class="nav">
				<li class="navli" @click="change(1)" style="color:red;">新歌榜</li>
				<li class="navli" @click="change(11)">摇滚榜</li>
				<li class="navli" @click="change(21)">欧美金曲榜</li>
			</ul>



			<ul class="mui-table-view">
				<router-link :to="'/play/'+item.album_id" :info='item' v-for="(item,index) in musicList" :key='index' tag='li'
				 class="mui-table-view-cell mui-media">
					<img class="mui-media-object mui-pull-left" :src='item.pic_big'>
					<div class="mui-media-body">
						<p class="title">{{item.album_title}}</p>
						<p class="author">{{item.artist_name}}</p>
					</div>
				</router-link>
			</ul>
			<router-link tag='div' to='/home/bangdan' class='lookMore'>查看该榜单&nbsp;&nbsp;&nbsp;&nbsp;></router-link>

		</div>


	</div>
</template>

<script>
	export default {
		methods: {
			change(id) {
				this.musicType = id;
				this.getMusicList();
				this.changeColor();
			},
			changeColor() {
				const liArr = document.getElementsByClassName('navli');
				for (var i = 0; liArr[i]; i++) {
					for (var j = 0; liArr[j]; j++) {
						liArr[j].style.color = '#999'
					}
					liArr[i].onclick = function() {
						this.style.color = "red"
					}
				}
			},
			getMusicList() {
				const listUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=" + this.musicType +
					"&size=8&offset=10";
				this.$axios.get(listUrl).then(res => {
					/* console.log(res.data.song_list) */
					this.musicList = res.data.song_list;
				})
			},
			getArtistInfo() {
				for (var i = 0; this.artistArr[i]; i++) {
					const url = this.HOST + '/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=' + this.artistArr[i]
					this.$axios.get(url).then(res => {
						/* console.log(res.data) */
						this.artistInfo.push(res.data)
					})
				}

			}
		},
		data() {
			return {
				listAllData: [],
				listData1: [],
				listData2: [],
				listData3: [],
				musicType: 1,
				musicList: [],
				artistArr: ['1067', '2517', '7898', '1091', '1029', '1490'],
				artistInfo: [],
				swiperOption: {
					/* direction: 'vertical', */
					observer: true, //修改swiper自己或子元素时，自动初始化swiper 
					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
					loop: true,
					autoplay: {
						delay: 2000,
						disableOnInteraction: false
					}
				}
			}
		},
		created() {
			const url = this.HOST + '/v1/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id=245850298&num=15';
			this.$axios.get(url).then(res => {
				this.listAllData = res.data.result;
				this.listData1 = this.listAllData.list.slice(0, 6)
				this.listData2 = this.listAllData.list.slice(6, 9)
				this.listData3 = this.listAllData.list.slice(9)
			})
			this.getMusicList()
			this.changeColor();
			this.getArtistInfo()
		}

	}
</script>

<style>
	.index-contaier .music-list {
		background-color: #fff;
		width: 100%;
		padding: 10px 10px 0 10px;
	}

	.index-contaier .music-list .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.index-contaier {
		width: 100%;
	}

	.index-contaier .today-commend {
		padding: 10px 10px 0 10px;
		background-color: #fff;
		margin-bottom: 10px;
	}

	.index-contaier .today-commend:nth-last-child(1) {
		margin-bottom: 0;
	}

	.index-contaier .today-commend .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}



	.index-contaier .today-commend .header h3,
	.index-contaier .music-list .header h3 {
		color: #333;
		font-size: 20px;
	}

	.index-contaier .today-commend .header .more,
	.index-contaier .music-list .header .more {
		font-size: 12px;
	}

	.index-contaier .today-commend ul {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.index-contaier .today-commend ul li {
		width: 30%;
		padding-bottom: 10px;
	}

	.index-contaier .today-commend ul img {
		width: 100%;
	}

	.index-contaier .today-commend ul .info,
	.index-contaier .music-list .title {
		display: block;
		/*内联对象需加 */
		/* width: 31em; */
		word-break: keep-all;
		/* 不换行 */
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
		/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow: ellipsis;
		/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
		font-size: 12px;
	}


	.index-contaier .today-commend ul .info .title {}

	.index-contaier .today-commend ul .info .author {
		color: #999;
	}

	.index-contaier .music-list .nav {
		margin: 10px 5px;
		padding: 10px 5px 3px 5px;
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		color: #999;
		/* border-bottom: 1px solid #ccc; */
	}

	.index-contaier .music-list .nav li {
		padding: 0 20px;
		border-right: 1px solid #ccc;
	}

	.index-contaier .music-list .nav li:nth-child(3) {
		border-right: none;
	}

	.index-contaier .music-list .lookMore {
		font-size: 14px;
		text-align: center;
		line-height: 50px;
		color: #999;
	}

	.index-contaier .music-list .title {
		font-size: 14px;
		color: #000;
		line-height: 25px;
	}

	.mint-swipe-item {
		position: absolute;
	}

	.swiper-slide {
		z-index: 99;
	}

	.swiper-slide img {
		width: 100%;
	}
</style>
