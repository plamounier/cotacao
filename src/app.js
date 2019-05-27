// Conteúdo node
const path = require('path');

// Conteúdo NPM
const express = require('express');

// Conteúdo HBS
const hbs = require('hbs');

// Conteúdo Cotações
const cotacoes = require('./util/cotacao');


// Como boa prática importar primeiro os pacotes do node e depois os do npm

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index',{
        titulo: 'Bem vindo ao sistema de cotações',
        autor: 'Patricia'
    })
})

app.get('/help/*',(req, res) => {
    //res.send('404 do help')
    const errorMessage = 'Não existe página depois de /help';
    res.render('404', errorMessage)
})

app.get('/help/*',(req, res) =>{
    res.render('404',{
        titulo: 'Página não encontrada',
        autor: 'Patricia',
        errorMessage: 'Página não encontrada'
        
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        titulo: 'Sobre o sistema de cotações',
        autor: 'Patricia'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        titulo: 'Ajuda do sistema de cotações',
        autor: 'Patricia'
    })
})

app.get('/cotacao',(req, res) =>{
    if(!req.query.ativo){
      return res.status(400).json({error: {
        message: 'O ativo deve ser informado',
        code: 400
    }});
    }

    const symbol = req.query.ativo.toUpperCase();

    cotacoes(symbol, (err, body) => {
        if(err){
            return res.status(err.code).json({error: {
                message: err.message,
                code: err.code
            }});
        }
        res.status(200).json(body);
    })

    console.log()
    
});

app.get('*',(req, res) => {
    res.render('404', {
        errorMessage : 'Página não encontrada',
        titulo: 'Página não encontrada',
        autor: 'Patricia'
        })
})

// Se a porta já estiver configurada por variavel de ambiente como no caso do heroku
// ele pega da variavel de ambiente caso contrário pega da porta 3000
const port = process.env.PORT || 3000;



// Aqui é definido o servidor cuja porta default do node é 3000.
app.listen(3000, () => {
    console.log('Server is running o port 3000.');
});