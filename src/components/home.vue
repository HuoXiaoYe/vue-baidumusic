<template>
	<div class="home-container">
		<div class="header">
			<ul class='tabbar'>
				<router-link tag='li' to='/home/index'>首页</router-link>
				<router-link tag='li' to='/home/songlist'>歌单</router-link>
				<router-link tag='li' to='/home/singerlist'>歌手</router-link>
				<router-link tag='li' to='/home/bangdan'>榜单</router-link>
				<router-link tag='li' to='/home/my'>我的</router-link>
				<router-link tag='li' to='/home/search'>搜索</router-link>

			</ul>
		</div>
		<div class="container">
			<transition>
				<router-view></router-view>
			</transition>
		</div>

	</div>
</template>

<script>
	export default {
		directives: {

		}
	}
</script>

<style scoped="scoped">
	.home-container {
		background-color: #eee;
	}

	.home-container .header {
		width: 100%;
		height: 44px;
		background-color: #eee;
		color: #333;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		/* padding-top: 44px; */
	}

	.home-container .header .tabbar {
		padding: 0 5px;
		display: flex;
		justify-content: space-between;
	}

	.home-container .header .tabbar li {
		line-height: 44px;
		font-size: 17px;
		padding: 0 3px;
	}

	.home-container .header .tabbar li:hover,
	.home-container .header .tabbar li:active {
		border-bottom: 3px solid red;
	}

	.active {
		border-bottom: 3px solid red;
	}

	.home-container .container {
		margin-top: 54px;
	}

	.el-carousel__item {
		position: absolute;
		width: 100%;
	}

	.el-carousel__item img {
		width: 400px !important;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
		width: 100%;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
