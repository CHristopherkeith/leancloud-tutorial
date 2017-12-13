<template>
  <div>
    <p>{{msg}}</p>
    <div>
      <input v-model="title" placeholder="title">
      <input v-model="content" placeholder="content">
      <button @click="setTodo">Set Todo</button>
    </div>
    <div>
      <input v-model="name" placeholder="name">
      <input v-model="priority" placeholder="priority">
      <button @click="setTodoFolder">Set TodoFolder</button>
    </div>
    <div>
      <button @click="uploadFile">upload file</button>
    </div>
    <div>
      <input type="file" id="photoFileUpload"/><button @click="uploadLocalFile">upload local file</button>
    </div>
    
    <!-- <div>ID: {{todoId}}</div> -->
    

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
      todoFolder.set('name', this.name)
      // 设置优先级
      todoFolder.set('priority', this.priority)
      todoFolder.save().then(function (todo) {
        console.log('objectId is ' + todo.id)
      }, function (error) {
        console.error(error)
      })
      //  AV.Query.doCloudQuery('insert into TodoFolder(name, priority) values("工作", "1")').then(function (data) {
      //   // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
      //   var results = data.results;
      //   console.log(data)
      // }, function (error) {
      //   //查询失败，查看 error
      //   console.error(error);
      // })
    },
    uploadFile () {
      // 数据流
      var data = { base64: '6K+077yM5L2g5Li65LuA5LmI6KaB56C06Kej5oiR77yf' }
      var file = new AV.File('resume.txt', data)
      file.save().then(function (file) {
        console.log('3333')
        console.log(file)
      }, function (error) {
        console.error(error)
      })
      // var bytes = [0xBE, 0xEF, 0xCA, 0xFE]
      // var byteArrayFile = new AV.File('myfile.txt', bytes)
      // byteArrayFile.save()
    },
    uploadLocalFile () {
      var fileUploadControl = document.getElementById('photoFileUpload')
      if (fileUploadControl.files.length > 0) {
        var localFile = fileUploadControl.files[0]
        var name = '傻狗狗.jpg'
        var file = new AV.File(name, localFile)
        file.save().then(function (file) {
          // 文件保存成功
          console.log(file)
          console.log(file.url())
        }, function (error) {
          // 异常处理
          console.error(error)
        })
      }
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
div {
  margin-top: 5px;
}
</style>
