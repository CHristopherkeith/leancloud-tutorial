<template>
  <div>
    <p>{{msg}}</p>
    <input v-model="title" placeholder="title">
    <input v-model="content" placeholder="content">
    <button @click="setTodo">Set Todo</button>
    <span></span><div>ID: {{todoId}}</div>
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
export default {
  name: 'home',
  data () {
    return {
      msg: 'Leancloud Tutorial',
      title: '',
      content: '',
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
