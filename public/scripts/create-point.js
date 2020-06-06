function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
      return res.json()
    })
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUfs()

function getCities(event) {
  const citiesSelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes`

  citiesSelect.innerHTML = ""
  citiesSelect.disabled = true
  fetch(urlCity)
    .then((res) => {
      return res.json()
    })
    .then(cities => {
      for (const city of cities) {
        citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citiesSelect.disabled = false

    })

}


document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

//Itens de coleta

// Todos os li's

const itemsToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")
let selectedItens = []

function handleSelectedItem(event) {
  const itemLi = event.target

  //adiciona ou remove uma classe com javascript
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id

  //Verificar se existe itens selecionados e se sim pegar os itens selecionados.
  const alreadySelected = selectedItens.findIndex(item => {
    const itemFound = item == itemId //true ou false se já preencheu.
    return itemFound
  })
  //Se já estiver selecionado, tirar da seleção.
  if (alreadySelected >= 0) {
    //Tirar da seleção
    const filteredItems = selectedItens.filter(item => {
      const itemIsDifferent = item != itemId //false
      return itemIsDifferent
    })

    selectedItens = filteredItems
  } else {
    //se não estiver selecionado
    //Adicionar a seleção

    selectedItens.push(itemId)
  }
  collectedItens.value = selectedItens
}