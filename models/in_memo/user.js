const users=[]
class User {
  constructor(username,password) {
    this.username =username
    this.password =password
    User.id+=1
    this.id =User.id
  }
  getName() { return this.username}

  static insert({username,password}) {
    const user =new User(username,password)
    users.push(user)
    return  user

  }

  static getUserByName(username) {
    return users.find(i=>i.username === username)
  }
  static getUserById(id) {
    console.log(users)
    return users.find(i=>{
      return i.id === id
    })
  }

  static get['users'](){
    return users
  }
}
User.id=0

module.exports = User