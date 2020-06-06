// comments
// document.write("Hello")

// VAriaveis
var myvar = "Hello"
const myconst = "How are ya?"

document.write(myvar + " " + myconst)

const pessoa = {
  altura: "1,80m",
  idade: 24,
  solteiro: true,
  correr() {
    document.write("<br> Run Forest")
  }
}

pessoa.correr()

// Array - Vetor

const colecaoDeBolinhas = ["blue", "green", "Red", 1, {
  name: "James Leal",
  idade: 24
}]
document.write("<br>")
document.write(colecaoDeBolinhas[4].name + colecaoDeBolinhas[4].idade)


// Registrar Função ^^
function sayMyName(name) {
  document.write(name)
}

// Puts Beyonce Say My Name
sayMyName("<br>")
sayMyName("Douglas")
sayMyName("<br>")
sayMyName("James")
sayMyName("<br>")
sayMyName("Leonan")
sayMyName("<br>")
sayMyName("Luciano")

// Condições

const notaFinal = 7

if (notaFinal >= 7) {
  document.write("Passou disgrama")
} else {
  document.write("Vish, vai ficar para a proxima")
}

// Loop repetidos

for (i = 0; i < 10; i++) {

  document.write(`<p>Hello, essa é a rodada: ${i}</p>`)
}