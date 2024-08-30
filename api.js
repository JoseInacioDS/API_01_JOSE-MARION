
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const mysql_config = require('./inc/mysql_config');
const functions = require('./inc/functions');

const API_AVAILABILITY = true;
const AP_VERSION = '1.0.0';


const app = express();
app.listen(3000, ()=>{
    console.log("Server Open!");
})




app.use((req, res, next)=>{
    if(API_AVAILABILITY)
    {
        next();
    }
    else
    {
        res.json(functions.response('atenção', 'API está em manutenção, Sinto muito', 0,null))
    }
})


const connection = mysql.createConnection(mysql_config);

app.use(cors());

app.get('/', (req, res) =>{
    res.json(functions.response('sucesso', 'API está rodando',0, null))
})

app.get('/tasks',(req,res)=>{
    connection.query('SELECT * FROM tasks',(err, rows));
})

app.use((req,res)=>{
    res.json(functions.response('atenção', 'Rota não encontrada', 0, null))
})