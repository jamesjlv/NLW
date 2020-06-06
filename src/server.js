const express = require("express")
const server = express()

//Conectar ao banco de dados
const db = require("./database/db.js")

//Configurar pasta publica
server.use(express.static("public"))

//Habilita o uso do req body
server.use(express.urlencoded({
  extended: true
}))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})


//Configurar caminhos da minha aplicação
//página inicial
//req: requisição 
//res: resposta
//rota index
server.get("/", (req, res) => {
  return res.render("index.html", {
    title: "Seu marketplace de coleta de resíduos"
  })
})
//rota create point
server.get("/create-point", (req, res) => {

  // req.query: pega os dados passados pela URL
  // req.query

  return res.render("create-point.html", {
    problem: false
  })
})

server.post("/save-point", (req, res) => {
  //req.body = traz os dados do formulário

  // Inserir dados no banco de dados
  // Inserir dados na tabela
  const query = `INSERT INTO places (
        image,
        name,
        adress,
        adress2,
        state,
        city,
        items
        ) VALUES (?,?,?,?,?,?,?);`
  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.itens
  ]

  function afterInsertData(err) {

    if (err) {
      console.log(err)
      return res.render("create-point.html", {
        problem: true,
      })
    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    //Vai renderizar a página novamente só que com um aviso de que foi criado a página.
    return res.render("create-point.html", {
      saved: true
    })
  }


  db.run(query, values, afterInsertData)


})



//Rota search
server.get("/search", (req, res) => {

  const search = req.query.search
  if (search == "") {
    //pesquisa vazia
    return res.render("search-results.html", {
      total: 0
    })
  }

  //pegar os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE'%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    const total = rows.length

    // renderiza a página html e envia junto os dados do banco de dados
    return res.render("search-results.html", {
      places: rows,
      total: total
    })
  })


})


// Ligar o servidor
server.listen(3000) //agora está escutando a porta 3000 que receberá as solicitações