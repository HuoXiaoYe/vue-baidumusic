<template>
  <div id="app">
		<!-- 路由展示区域 -->
		<transition>
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } 
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } 
h1, h2, h3, h4, h5, h6{ font-size:100%; } 
address, cite, dfn, em, var { font-style:normal; } 
code, kbd, pre, samp { font-family:couriernew, courier, monospace; } 
small{ font-size:12px; } 
ul, ol { list-style:none; } 
a { text-decoration:none; } 
a:hover { text-decoration:none; } 
sup { vertical-align:text-top; } 
sub{ vertical-align:text-bottom; } 
legend { color:#000; } 
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; } 
table { border-collapse:collapse; border-spacing:0; } 
.active{
	border-bottom: 3px solid red;
}
#app{
	overflow-x: hidden;
}

.v-enter{
	transform: translateX(100%);
	opacity: 0;
}
.v-leave-to{
	transform: translateX(-100%);
	opacity: 0;
	position: absolute;
}
.v-enter-active,v-leave-active{
	opacity: 1;
	transition: all 0.2s ease;
}
</style>
