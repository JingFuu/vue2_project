let http = require('http')
let fs = require('fs')
let url = require('url')
//获取轮播图 /sliders
//封装读取book.json函数
function read(cb) {
  fs.readFile('./book.json','utf8',(err,data) => {
    if (err || data.length == 0) {
      cb([])
    } else {
      cb(JSON.parse(data));
    }
  })
}
//封装写book.json文件函数
function write(data,cb) {
  fs.writeFile('./book.json',JSON.stringify(data),cb)
}
//read(books =>console.log(books)) 调用方法读出books
let sliders = require('./sliders')
let pageSize=5;//默认每页显示5条数据
http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.setHeader("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method === 'OPTIONS') return res.end();////让options尝试请求快速结束
  let {pathname,query} =url.parse(req.url,true)//true把query转化成对象
  if (pathname=== '/sliders'){
    res.setHeader('Content-type','application/json;charset=utf-8')
    setTimeout(()=>{
      return res.end(JSON.stringify(sliders))
    },1000)
  }
  if (pathname ==='/hot'){
      read(function (books) {
        let hot = books.reverse().slice(0,6)
        res.setHeader('Content-type','application/json;charset=utf-8')
        return res.end(JSON.stringify(hot))
      })
  }
  if (pathname === '/page'){
    let offset = parseInt(query.offset)||0;//拿到请求查询参数
    read(function (books) {
      //每次偏移量，在偏移的基础上增加5条
      let result=books.reverse().slice(offset,offset+pageSize);
      let hasMore = true;//默认显示更多
      if (books.length<=offset+pageSize) {//已经显示的数目 大于了总共条数
        hasMore = false;
      }
      res.setHeader('Content-type','application/json;charset=utf-8')
      res.end(JSON.stringify({hasMore,books:result}))
    })
    return
  }
  if(pathname === '/book') {//对书的增删该查
    let id =parseInt(query.id);//取出查询字符串
    switch (req.method) {
      case 'GET':
        if(id>=0){
          read(function (books) {
            let book = books.find(item => item.bookId===id);
            if (!book){
              book={}
            }
            res.setHeader('Content-type','application/json;charset=utf-8');
              return res.end(JSON.stringify(book))
          })
        }else{//获取所有图书
          read(function (books) {
            res.setHeader('Content-type','application/json;charset=utf-8');
             return res.end(JSON.stringify(books.reverse()))
          })
        }
        break;
      case 'POST':
        let str='';
        req.on('data',chunk =>{
          str+=chunk;
        });
        req.on('end', ()=> {
          let book =JSON.parse(str);
          read(function (books) {//添加id
            book.bookId=books.length?books[books.length-1].bookId+1:1;
            books.push(book);//将数据放到books中，book在内存中
            write(books,function () {
              res.end(JSON.stringify(book));
            })
          })
        })
        break;
      case 'PUT':
        if(id){//获取当前要修改的id
          let str ='';
          req.on('data', chunk=> {
            str += chunk;
          });
          req.on('data', ()=> {
            let book =JSON.parse(str);
            read(function (books) {
              books = books.map(item=>{
                if(item.bookId === id){//通过id找到后修改成传递过来的数据
                  return book
                }
                return item;//其它正常返回即可
              });
              write(books,function () {//将数据写会book.json中
                res.end(JSON.stringify(book))
              })
            })
          })

        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id)
          write(books,function () {
            res.end(JSON.stringify({}))//删除返回空对象
          })
        })
        break;
    }
    return
  }
}).listen(3000)


