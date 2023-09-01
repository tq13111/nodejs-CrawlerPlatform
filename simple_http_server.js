const http = require('http')
const qs = require('path')

const server = http.createServer()
server.listen(8808)
server.on('request',(req, res)=>{
  const url = req.url;
  const method = req.method;
  const path = url.substr(0, url.indexOf('?'));
  const queryString = url.substr(url.indexOf('?') + 1, url.length);
  const query = qs.parse(queryString);
  let inputString=''
  req.on('data', (data)=>{
    inputString+=data.toString()
  })
  req.on('end', ()=>{
    res.statusCode = 200
    res.end(inputString)
  })
  switch (path) {
    case 'GET':
      if(method==='GET'){
        return ''
      }else{
        return ''
      }
  }

})