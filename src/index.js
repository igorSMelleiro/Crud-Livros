
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);

let id = 2;

let livros = [{
        id: 1,
        titulo: "O Principe",
        descricao: "mta coisa",
        edicao: "1°",
        autor: "Maquiavel",
        isbn: "8137289123"
    },
    {
        id: 2,
        titulo: "Dança dos Dragões",
        descricao: "Game of Thrones",
        edicao: "3°",
        autor: "J.R.R Martin",
        isbn: "8137289124"
    }
];

let livros2 = [];

app.post("/livros", (req, res, next) => {
    const livro = {
        id: id += 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor,
        isbn: req.body.isbn
    }
    livros.push(livro)
    res.status(201).json(livro);
});

app.get("/livros", (req, res, next) => {
    res.status(200).json(livros);
})

app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            livro.descricao = req.body.descricao;
            livro.titulo = req.body.titulo;
            livro.edicao = req.body.edicao;
            livro.autor = req.body.autor;
            livro.isbn = req.body.isbn;
        }
    })
    res.status(204).end();
});

app.delete("/livros/:id", (req, res, next) => {
    const idLivroDel = req.params.id
    livros.forEach((livro, index) => {
        if (livro.id == req.body.id) {
            livros.splice(index, 1)
        }
    })
    res.status(200).json(livros);
});

app.delete("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            const index = livros.indexOf(livro, 0)
            livros.splice(index, 1)
        }
    })
    livros = livros2;
    res.status(204).json(livros).end();
});