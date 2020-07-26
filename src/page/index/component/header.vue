<template>
    <div>
        <h1>这里是头部文件{{name}}</h1>
        <p v-for="user in list" :key="user.id">
            {{user.name}}
        </p>
    </div>
</template>

<script>
    export default{
        name: "Header",
        props:{
            name:String,
            list:Array
        }
    }
</script>

<style>
</style>