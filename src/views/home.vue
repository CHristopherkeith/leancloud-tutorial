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
    <div>
      <button @click="BuildFileFromUrl">BuildFileFromUrl</button>
    </div>
    <div>
      <input type="text" v-model="phoneNumber" placeholder="手机号码" />
      <button @click="requestSmsCode">发送验证码</button @click="smsCodeSignUp">
      <input type="text" v-model="smsCode" placeholder="验证码" />
      <button @click="smsCodeSignUp">注册</button>
    </div>
    <div>
      <input type="text" v-model="userName" placeholder="用户名" />
      <input type="password" v-model="psw" placeholder="密码" />
      <input type="text" v-model="email" placeholder="邮箱" />
      <button @click="signUp">注册</button>
    </div>
    <div>
      <input type="text" v-model="loginedName" placeholder="用户名" />
      <input type="password" v-model="loginedPsw" placeholder="密码" />
      <button @click="login">登录</button>
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
      todoId: 'this is a id',
      phoneNumber: '',
      smsCode: '',
      userName: '',
      psw: '',
      email: '',
      loginedName: '',
      loginedPsw: ''
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
        console.log(localFile, 'localFile')
        var name = '傻狗狗.jpg'
        var file = new AV.File(name, localFile)
        console.log(file.metaData(), 'file.metaData')
        file.save({
          onprogress: function (e) {
            console.log(e)
            // { loaded: 1234, total: 2468, percent: 50 }
          }
        }).then(function (file) {
          // 文件保存成功
          // console.log(file)
          // console.log(file.url())
        }, function (error) {
          // 异常处理
          console.error(error)
        })
      }
    },
    // 从网络构建文件
    BuildFileFromUrl () {
      var file = AV.File.withURL('Satomi_Ishihara.gif', 'http://ww3.sinaimg.cn/bmiddle/596b0666gw1ed70eavm5tg20bq06m7wi.gif')
      file.save().then(function (file) {
        // 文件保存成功
        console.log(file.url())
      }, function (error) {
        // 异常处理
        console.error(error)
      })
    },
    // 发送验证码
    requestSmsCode () {
      AV.Cloud.requestSmsCode(this.phoneNumber).then(function (success) {
        console.log(success, 'success')
      }, function (error) {
        console.log(error, 'error')
      })
    },
    // 验证码注册
    smsCodeSignUp () {
      AV.User.signUpOrlogInWithMobilePhone(this.phoneNumber, this.smsCode).then(function (success) {
        // 成功
        console.log(success, 'success')
      }, function (error) {
        // 失败
        console.log(error, 'error')
      })
    },
    // 普通注册
    signUp () {
      // 新建 AVUser 对象实例
      var user = new AV.User()
      // 设置用户名
      user.setUsername(this.userName)
      // 设置密码
      user.setPassword(this.psw)
      // 设置邮箱
      user.setEmail(this.email)
      user.signUp().then(function (loginedUser) {
        console.log(loginedUser, 'loginedUser')
      }, function (error) {
        console.log(error, 'error')
      })
    },
    // 普通登录
    login () {
      AV.User.logIn(this.loginedName, this.loginedPsw).then(function (loginedUser) {
        console.log(loginedUser, 'loginedUser')
      }, function (error) {
        console.log(error, 'error')
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
div {
  margin-top: 5px;
}
</style>
