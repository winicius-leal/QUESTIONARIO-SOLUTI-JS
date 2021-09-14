var buttonNumberSolicitation = document.querySelector("#button-solicitation");

buttonNumberSolicitation.addEventListener("click", function(){
    var inputNumberSolicitation = document.querySelector("#input-solicitation");
    var NumSolicitation = inputNumberSolicitation.value;
    if (NumSolicitation == "" || NumSolicitation.length < 4) {
        alert("Número da solicitação inválida");
        return;
    }
    var typeCertificate = document.querySelector("#type-certificate");
    typeCertificate.classList.remove("invisivel");
    document.querySelector("#button-solicitation").disabled = true;
    document.querySelector("#input-solicitation").disabled = true;
});

var buttonTypeCertificate = document.querySelector("#button-certificate");

buttonTypeCertificate.addEventListener("click", function(event){
    event.preventDefault();
    var selectForm = document.querySelector("#select-form");
    var selectForm = selectForm.value;
    console.log(selectForm);
    switch (selectForm) {
        case 'SELECIONE...':
            alert("Selecione o tipo de certificado!");
        break;
        case '1':
            var table = document.querySelector("#table");
            table.classList.remove("invisivel");
            createTableFromPhysicalPerson();
            document.querySelector("#button-certificate").disabled = true;
          break;
        case '2':
            var table = document.querySelector("#table");
            table.classList.remove("invisivel");
            createTableForLegalEntity();
            document.querySelector("#button-certificate").disabled = true;
        break;
    }
});

function createTableFromPhysicalPerson (){
    let PhysicalPerson = 0;
    var questionRandomic = shuffleArray(perguntasParaPessoaFisicaObrigatorias);
    var questionRandomicN = shuffleArray(perguntasParaPessoaFisicaNaoObrigatorias);
    questionRandomic.push(questionRandomicN[0]);
    questionRandomic = shuffleArray(questionRandomic);
    for(i=0; i < questionRandomic.length; i++){
        var table = document.querySelector("#tbody");
        table.appendChild(Tr(questionRandomic[i]));   
    }
    AddEscutadorDeEvento(PhysicalPerson);
}

function createTableForLegalEntity (){
    let legalEntity = 1;
    var questionRandomic2 = shuffleArray(perguntasParaPessoaJuridicaObrigatorias);
    var questionRandomicN2 = shuffleArray(perguntasParaPessoaJuridicaNaoObrigatorias);
    questionRandomic2.push(questionRandomicN2[0]);
    questionRandomic2 = shuffleArray(questionRandomic2);
    for(i=0; i < questionRandomic2.length; i++){
        var table = document.querySelector("#tbody");
        table.appendChild(Tr(questionRandomic2[i]));   
    }
    AddEscutadorDeEvento(legalEntity);
}

function AddEscutadorDeEvento(opcao){
    let buttonCheck = document.querySelectorAll(".style-check");
    let buttonFalse = document.querySelectorAll(".style-close");
    
    /*ESCUTADOR DE EVENTOS PARA CADA CHECK VERDADEIRO*/
    for(let iteracao = 0; iteracao < buttonCheck.length; iteracao++){
        buttonCheck[iteracao].addEventListener("click", function(){
            let tablePai = buttonCheck[iteracao].parentNode.parentNode.parentNode;
            let rowSelected = buttonCheck[iteracao].parentNode.parentNode;
            rowSelected.classList.add("fadeOut");
            setTimeout(function(){
                tablePai.removeChild(rowSelected);
            }, 1000);
            AddEscutadorDeEvento(opcao);
            let fim = document.querySelectorAll(".question");
            if(fim.length == 1){
                console.log("QUESTIONARIO FINALIZADO, RECARREGANDO... ");
                document.location.reload(true);
            }

        });        
    }
    
    /*ESCUTADOR DE EVENTOS PARA CADA CHECK FALSO*/
    for(let iteracao2 = 0; iteracao2 < buttonFalse.length; iteracao2++){
        buttonFalse[iteracao2].addEventListener("click", function(){
            let tablePai2 = buttonFalse[iteracao2].parentNode.parentNode.parentNode;
            let rowSelected2 = buttonFalse[iteracao2].parentNode.parentNode;
            rowSelected2.classList.add("fadeOut");
            setTimeout(function(){
                tablePai2.removeChild(rowSelected2);               
                if(opcao === 0){ 
                    let y = shuffleArray(perguntasParaPessoaFisicaNaoObrigatorias);
                    tablePai2.appendChild(Tr(y[1]));
                    tablePai2.appendChild(Tr(y[0]));
                }else{ 
                    let z = shuffleArray(perguntasParaPessoaJuridicaNaoObrigatorias);
                    tablePai2.appendChild(Tr(z[1]));
                    tablePai2.appendChild(Tr(z[0]));
                }
                AddEscutadorDeEvento(opcao);
            }, 1000);              
        });        
    }
}

function Tr(value) {
    let tr = document.createElement('tr');
    tr.classList.add("question");
    tr.appendChild(Tdi());
    tr.appendChild(Td(value));
    return tr;
}
function Tdi(){
    let td = document.createElement('td');
    td.appendChild(icheck());
    td.appendChild(ifalse());
    return td;
}
function Td(value){
    let td = document.createElement('td');
    td.textContent = value;
    return td;
}

function icheck(value){
    let icheck = document.createElement('i');
    icheck.classList.add("fas");
    icheck.classList.add("fa-thumbs-up");
    icheck.classList.add("style-check");
    icheck.textContent = value;
    return icheck;
}

function ifalse(value){
    let ifalse = document.createElement('i');
    ifalse.classList.add("fas");
    ifalse.classList.add("fa-thumbs-down");
    ifalse.classList.add("style-close");
    ifalse.textContent = value;
    return ifalse;
}

function shuffleArray(array) {
    // Loop em todos os elementos
for (let i = array.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [array[i], array[j]] = [array[j], array[i]];
}
// Retornando array com aleatoriedade
return array;
}


var perguntasParaPessoaFisicaObrigatorias = [
    "Qual o número do seu CPF?", 
    "Qual seu nome completo?", 
    "Qual a data do seu nascimento?"
];

var perguntasParaPessoaJuridicaObrigatorias = [
    "Qual o número do seu CPF?", 
    "Qual seu nome completo?", 
    "Qual a data do seu nascimento?",
    "Qual a atividade da sua empresa?"
];


var perguntasParaPessoaFisicaNaoObrigatorias = [
    "Qual o nome completo da sua mãe?", 
    "Qual o último sobrenome da sua mãe?", 
    "Qual o primeiro nome da sua mãe?",
    "Quais são os três últimos dígitos do seu CPF?",
    "Qual o ano do seu nascimento?",
    "Qual o mês do seu nascimento?",
    "Qual o mês e ano do seu nascimento?",
    "Quais são os três primeiros dígitos do seu CPF?",
    "Quais são os dois últimos dígitos do seu CPF?",
    "Quais são os quatro últimos dígitos do seu CPF?",
    "Qual o e-mail cadastrado no agendamento?",
    "Qual a data de nascimento da sua mãe?",
    "Qual o primeiro nome da sua mãe?",
    "Qual o mês de nascimento da sua mãe?",
    "Qual o ano de nascimento da sua mãe?",
    "Qual o mês e ano do nascimento da sua mãe?",
    "Qual o dia do aniversário da sua mãe?"
];

var perguntasParaPessoaJuridicaNaoObrigatorias = [
    "Qual o número do CNPJ?", 
    "Qual o endereço da empresa?", 
    "Qual a natureza jurídica da empresa?",
    "Qual a razão social da empresa?",
    "Qual o nome fantasia da empresa?",
    "Qual a cidade da empresa?",
    "Qual o estado da empresa?",
    "Em que bairro a empresa está situada?",
    "O nome completo da sua mãe?",
    "Qual o último sobrenome da sua mãe?",
    "Qual o primeiro nome da sua mãe?",
    "Quais são os três últimos dígitos do seu CPF?",
    "Qual o ano do seu nascimento?",
    "Qual o mês do seu nascimento?",
    "Quais são os três primeiros dígitos do seu CPF?",
    "Quais são os dois últimos dígitos do seu CPF?",
    "Qual foi o ano de abertura da empresa?"
];


