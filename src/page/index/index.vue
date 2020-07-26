<template>
    <div>
        <h1>这里是首页</h1>
        <Header :name="str"
                :list="userList"></Header>
    </div>
</template>

<script>
    //引入头部
    import Header from './component/header.vue'
    export default{
        name:"Index",
        components:{
            Header
        },
        data: function(){
            return{
                str:"xxxxxxx",
                userList:[
                    {id:1,name:"尼古拉斯"},
                    {id:2,name:"亚洲舞王"},
                    {id:3,name:"赵四"}
                ]
            }
        }
    }
</script>

<style>
</style>