const express = require('express') //express를 사용하겠다.
const app = express()

app.listen(8080, ()=>{ //port란?
    console.log('http://localhost:8080 에서 서버 실행중')
})

app.get('/', (요청, 응답) =>{
    응답.send('hi')
})