// javaScript Document
const express = require("express");
const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.get("/",(request, response)=>{
    response.sendFile("./index.html");
});
app.post("/",(request, response)=>{
    let par = request.params;
    let body = request.body;
    let Query = request.params;
    console.log(par,body,Query);

    let bodys = ``;
    Object.keys(body).forEach(key=>{
        bodys += `<p>${key}: ${body[key]}</p>`
    });
    response.send(`<h1>Hellow !</h1>
    <p>you get Query</p>
    ${bodys}`);
});
app.get("/page/:name",(request, response)=>{
    let par = request.params;
    let Query = request.query;
    console.log(par,Query);

    let querys = ``;
    Object.keys(Query).forEach(key=>{
        querys += `<p>${key}: ${Query[key]}</p>`
    });
    response.send(`<h1>Hellow ${par} !</h1>
    <p>you get Query</p>
    ${querys}`);
});

app.post("/admin",(request, response)=>{
    let par = request.params;
    let body = request.body;
    let Query = request.params;
    console.log(par,body,Query);

    let bodys = ``;
    Object.keys(body).forEach(key=>{
        bodys += `<p>${key}: ${body[key]}</p>`
    });
    response.send(`<h1>Hellow !</h1>
    <p>you get Query</p>
    ${bodys}`);
});

const port=process.env.port || 3000;
app.listen(port);