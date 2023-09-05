const users=[]
class User {
  constructor(name,age) {
    this.name =name
    this.age =age
    User.id+=1
    this.id =User.id
  }
  getName() { return this.name}

  static insert({name,age}) {
    const user =new User(name,age)
    users.push(user)
    return  user

  }

  static getUserByName(name) {
    return users.find(i=>i.name === name)
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