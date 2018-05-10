const express = require('express');
const { get } = require('axios');
const User = require('./bd');

const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();
app
 .get(/hello/, r => r.res.end('Hello world!'))

/* .get(/users/, async r => {
   const { data: { users: items } } = await get(URL);
   r.res.render('list', { title: 'Список логинов', items }); */

 .use(/users/, require('./routes/users')(express))

 .get('/aprilusers', async r => {
    const  items = await User.find();
    r.res.render('list', { title: 'Список логинов', items });

})

.get('/aprilusers/:login', async r => {
   const  item = await User.findOne({"login": r.params.login});
    r.res.send('Пароль пользователя <b>' + r.params.login + '</b>:' + '<mark>' + item.password + '</mark>');
})

 .get('/', r => r.res.send('Добро пожаловать!'))
 .use(r => r.res.status(404).end('Still not here, sorry!'))
 .use((e,r,res,n) => res.status(500).end(`Error: ${e}`))
 .set('view engine', 'pug')
 .listen(process.env.PORT || PORT, () => console.log(process.pid));
