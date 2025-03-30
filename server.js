const express = require('express') //express를 사용하겠다.
const app = express()

app.use(express.static(__dirname + '/public')) //public폴더의 파일을 사용한다.

app.listen(8080, ()=>{ //port란? 다른 컴퓨터에서 내 컴퓨터로 접속하게 하는 기능, 위 문법은 내컴퓨터에 port하나를 오픈하는 문법
    console.log('http://localhost:8080 에서 서버 실행중')
})

const {MongoClient} = require('mongodb');

let db;
const url = 'mongodb+srv://hwp537244:dnjsvy5450!@cluster0.g2p8i81.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
new MongoClient(url).connect().then((clinet)=>{
    console.log('DB connected')
    db = clinet.db('forum');

    app.get('/', (요청, 응답) =>{
        응답.sendFile(__dirname + '/index.html') //__dirnmae = server.js담긴 폴더의 절대 경로
    })
    //위와 같은 app.get코드도 위의 url연결 코드 안에 넣는게 좋다.
}).catch((err)=>{
    console.log(err)
})
//mongodb연결 코드


app.get('/news', (요청, 응답) =>{
    db.collection('post').insertOne({title : 'good'})
    응답.send('cloudy')
})

app.get('/list', async (요청, 응답) =>{
    let result = await db.collection('post').find().toArray()
    console.log(result[0].content)
    응답.send('this is db page')
})
//doc에 있는 데이터 값을 /list에 들어가면 터미널에서 출력한다.
//다음줄을 기다린다. 처리가 오래걸리는 코드는 처리완료 기다리지 않고 바로 다음줄 실행
//await은 정해진 곳에서만 쓰여진다.
app.get('/shop', (요청, 응답) =>{ //function() == () =>, 콜백함수 다른함수안에 함수가 들어가는 함수
    응답.send('shopping page')
})

app.get('/about', (요청, 응답) =>{
    응답.sendFile(__dirname + '/introuduce.html')
})