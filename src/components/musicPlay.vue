<template>
	<div class="play-container">
		<div class="header">
			<router-link to='/' tag='i' class="fa fa-home"></router-link>
			<div class="info">
				<div class="title">{{musicInfo.songinfo.album_title}}</div>
				<!-- {{songId}} -->
				<div class="author">{{musicInfo.songinfo.author}}</div>
			</div>
			<router-link tag='i' class="fa fa-search" to='/home/search'></router-link>
		</div>
		<div class="img">
			<img :src="musicInfo.songinfo.pic_small">
		</div>
		<div class="icon-box">
			<i class="fa fa-heart-o"></i>
			<i class="fa fa-commenting"></i>
			<i class="fa fa-cloud-download"></i>
		</div>
		<div class="music">
			<audio :src="musicInfo.bitrate.file_link" controls="controls" autoplay="autoplay"></audio>
		</div>
		<div class="button-box">
			<button>高品质下载</button>
			<button>手机铃声设置</button>
		</div>
		<div class="commend">
			<div class="line">
				<h3>热门推荐</h3>
			</div>
			
			<hr>
			<ul class="mui-table-view">
				<router-link :to="'/play/'+item.album_id" :info='item' v-for="(item,index) in musicList" :key='index' tag='li' class="mui-table-view-cell mui-media">
					<img class="mui-media-object mui-pull-left" :src='item.pic_big'>
					<div class="mui-media-body">
						<p class="title">{{item.album_title}}</p>
						<p class="author">{{item.artist_name}}</p>
					</div>
				</router-link>
			</ul>
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				musicList : [],
				musicInfo : [],
				songId : this.$route.params.id
			}
		},
		methods:{
			getMusicInfo(){
				const infoUrl = this.HOST + '/v1/restserver/ting?method=baidu.ting.song.play&songid='+this.songId;
				this.$axios.get(infoUrl).then(res=>{
					/* console.log(res.data) */
					this.musicInfo = res.data
				})
			},
			getMusicList() {
				const listUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=8&offset=0";
				this.$axios.get(listUrl).then(res => {
					this.musicList = res.data.song_list;
				})
			}
		},
		created() {
			this.getMusicList();
			this.getMusicInfo()
		}
	}
</script>

<style>
	.active{
		border-bottom: none;
	}
	.play-container {
		padding: 10px;
		background-color: #f1f3f4;
	}

	.play-container .header {
		display: flex;
		justify-content: space-between;
		text-align: center;
	}

	.play-container .header .info .title {
		font-size: 20px;
		line-height: 30px;
		color: #333;
	}

	.play-container .header .info .author {
		font-size: 12px;
		line-height: 20px;
		color: #999;
	}

	.play-container .header .fa {
		font-size: 25px;
		color: #ccc;
	}
	.play-container .img{
		width: 60%;
		/* text-align: center; */
		margin: 30px auto;
		margin-bottom: 15px;
	}
	.play-container .img img{
		width: 100%;
		border-radius: 30px;
	}
	.play-container .icon-box{
		width: 50%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.play-container .icon-box .fa {
		font-size: 25px;
		color: #666;
	}
	.play-container .music{
		width: 90%;
		margin: 10px auto;
	}
	.play-container .music audio{
		width: 100%;
		/* background-color: #ccc; */
	}
	.play-container .button-box{
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.play-container .button-box button{
		width: 45%;
		height: 30px;
		border-radius: 20px;
		background-color: red;
		line-height: 30px;
		font-size: 16px;
		color: #fff;
	}
	.play-container .commend{
		/* margin-top: 20px; */
		padding: 20px 10px;
	}
	.play-container .commend h3{
		width: 75px;
		padding-bottom: 12px;
		font-size: 18px;
		font-weight: normal;
		border-bottom: 2px solid red;
	}
	.play-container .commend hr{
		background-color: #eee;
	}
	.play-container .commend .mui-table-view{
		background-color: inherit;
	}
	.play-container .music-list .title {
		font-size: 14px;
		color: #000;
		line-height: 25px;
	}
	.play-container .music-list .title {
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
</style>
