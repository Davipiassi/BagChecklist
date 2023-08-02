// FUNCTIONS --------------------

function createElement(item){
    // function that adds a item to the items list
    const newItem = document.createElement('li')
    newItem.classList.add("item")

    const container = document.createElement('div')
    container.classList.add("item__container")
    newItem.appendChild(container)

    const newItemNumber = document.createElement('strong')
    newItemNumber.innerHTML = item.itemNumber
    newItemNumber.dataset.id = item.id
    container.appendChild(newItemNumber)

    container.innerHTML += item.itemName

    newItem.appendChild(deleteButton(item.id))

    list.appendChild(newItem)
}

function updateElement(item){
    // function that updates a item if it already exists
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.itemNumber
}

function deleteButton(id){
    // function that creates the delete button and its funtionality
    const buttonElement = document.createElement("button")
    buttonElement.classList.add("item__delete-button")
    buttonElement.innerText = "X"

    buttonElement.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return buttonElement
}

function deleteElement(tag, id){
    // function that removes a item 
    tag.remove()

    items.splice(items.findIndex(element => element.id === id), 1)

    localStorage.setItem("items", JSON.stringify(items))
}

// MAIN CODE --------------------

// HTML tag <form>; HTML tag <ul>; array with registered items
const form = document.getElementById("novoItem")
const list = document.getElementById("list")
const items = JSON.parse(localStorage.getItem("items")) || []

// rendering the elements with loaded information from localStorage
items.forEach((element) => {
    createElement(element)
})

// event for form submit
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = event.target.elements['nome']
    const number = event.target.elements['quantidade']
    
    // adding a item
    itemName = name.value
    itemNumber = number.value
    const currentItem = {
        "itemName": itemName,
        "itemNumber": itemNumber
    }

    // creating or updating a element
    const alreadyExists = items.find(element => element.itemName === name.value)
    if (alreadyExists) {
        currentItem.id = alreadyExists.id

        updateElement(currentItem)

        items[items.findIndex(element => element.id === alreadyExists.id)] = currentItem
    } else {
        currentItem.id = items[items.length - 1] ? (items[items.length - 1]).id + 1 : 0;

        createElement(currentItem)
        items.push(currentItem)
    }

    localStorage.setItem("items", JSON.stringify(items))

    //cleaning inputs
    name.value = ""
    number.value = ""
})

/* 
- COMANDOS INTERESSANTES DE LOCAL STORAGE -----

localStorage. 
    smcid - id do seu localStorage
    setItem('key', 'value') - cria um item no dicionário do localStorge associando o valor à chave
    <keyName> - retorna ou valor associado àquela chave
    getItem(<keyName>) - retorna o valor associado àquela chave
    removeItem(<keyName>) - remove o item do dicionário (chave e valor)
    clear() - limpar as informações do localStorage

- ANOTAÇÕES IMPORTANTES DE LOCAL STORAGE -----

. o localStorage só permite o armazenamento de informações em forma de string. O método JSON.stringfy(<information>) pode ser útil para esse fim.
. o JS não entende strings como variáveis ou listas, por exemplo. O método JSON.parse(<information>) pode ser útil para esse fim. 
. os dados armazenados no localStorage não devem ser considerados sensíveis pela LGPD. Dados desse tipo devem ser armazenados nos Cookies.

- OUTRAS OPÇÕES DE ARMAZENAMENTO DE DADOS -----

LocalStorage
    - guarda dados de forma persistente no navegador
    - em média 5MB de armazenamento padrão
    - dados salvos apenas como String

Cookies
    - guarda dados de forma persistente no navegador
    - até 4KB de armazenamento por Cookie*
    - armazena informações consideradas sensíveis, por isso geralmente há PopUps de autorização

SessionStorage
    - dados não são salvos de forma persistente
    - utilizado quando queremos utilizar os dados apenas enquanto o navegador estiver aberto

    * Cookie é como se fosse um arquivo que guarda as informações do usuário ou de sua navegação na página

*/