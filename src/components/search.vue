<template>
	<div class="search-container">
		<div class="header">
			<i @click="search" @keydown.enter="search" class="fa fa-search" aria-hidden="true"></i>
			<input ref='input' type="text" v-model="searchKey">
			<p class="line">|</p>
			<p ref='cancel' class="cancel">取消</p>
		</div>
		
		<ul>
			<router-link tag='li' :to="'/play/'+item.albumid" v-for='(item,index) in searchList' :key='index'>
				{{item.albumname}}
				<i class="fa fa-play" aria-hidden="true"></i>
			</router-link>
		</ul>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: '',
				searchList: [
					{}
				]
			}
		},
		methods: {
			search() {
				const key = this.searchKey.trim();
				if (!key) return;
				const url = this.HOST + '/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=' + key;
				this.$axios.get(url).then(res => {
					console.log(res.data)
					this.searchList = res.data.album;
					console.log(this.searchList)
				})
			}
		},
		watch: {
			/* 'searchKey':function(newval){
				console.log(newval)
				if(newval){
					this.searchKey = this.searchKey.trim();
					 if(newval.length>0){
						 this.$refs.cancel.innerText = '搜索'
					 }else {
						 this.$refs.cancel.innerText = '取消'
					 }
					console.log(newval.length)
					console.log(this.$refs.input.value)
					
				}
			} */
		}
	}
</script>

<style scoped="scoped">
	.search-container {
		position: relative;
	}

	.search-container .header i,
	.search-container p {
		position: absolute;
		font-size: 28px;
	}

	.search-container input {
		padding: 0 40px;
	}

	.search-container .header i {
		top: 6px;
		left: 8px;
	}

	.search-container p.line {
		right: 50px;
		top: 8px;
	}

	.search-container p.cancel {
		font-size: 18px;
		right: 8px;
		top: 12px;
	}
	
	.search-container ul li{
		height: 40px;
		width: 80%;
		margin: 0 auto;
		border-bottom: 1px solid #ccc;
		line-height: 55px;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.search-container ul li i{
		color: #ccc;
	}
</style>
