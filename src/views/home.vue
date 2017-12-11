<template>
  <div>
    <p>{{msg}}</p>
    <input v-model="title" placeholder="title">
    <input v-model="content" placeholder="content">
    <button @click="setTodo">Set Todo</button>
    <div>ID: {{todoId}}</div>
    <input v-model="name" placeholder="name">
    <input v-model="priority" placeholder="priority">
    <button @click="setTodoFolder">Set TodoFolder</button>

  </div>
</template>

<script>
const AV = require('leanengine')
const config = {
  appId: 'mEfRYHgOBA3vCYGM78DgXPjG-gzGzoHsz',
  appKey: 'ej3leyQwYwQjpGvMFSnWgsnA'
}
AV.init(config)
// 声明一个 Todo 类型
var Todo = AV.Object.extend('Todo')
// 新建一个 Todo 对象
var todo = new Todo()
var TodoFolder = AV.Object.extend('TodoFolder')
// 新建对象
var todoFolder = new TodoFolder()
export default {
  name: 'home',
  data () {
    return {
      msg: 'Leancloud Tutorial',
      title: '',
      content: '',
      name: '',
      priority: '',
      todoId: 'this is a id'
    }
  },
  methods: {
    setTodo () {
      todo.set('title', this.title)
      todo.set('content', this.content)
      todo.save().then(function (todo) {
        console.log('New object created with objectId: ' + todo.id)
        this.todoId = todo.id
      }.bind(this), function (error) {
        console.error('Failed to create new object, with error message: ' + error.message)
      })
    },
    setTodoFolder () {
      // // 设置名称
      // todoFolder.set('name', this.name)
      // // 设置优先级
      // todoFolder.set('priority', this.priority)
      // todoFolder.save().then(function (todo) {
      //   console.log('objectId is ' + todo.id)
      // }, function (error) {
      //   console.error(error)
      // })
       AV.Query.doCloudQuery('insert into TodoFolder(name, priority) values("工作", "1")').then(function (data) {
        // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
        var results = data.results;
        console.log(data)
      }, function (error) {
        //查询失败，查看 error
        console.error(error);
      })
    }
  },
  created () {
    // console.log('3333')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
