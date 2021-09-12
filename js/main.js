var buttonSolicitation = document.querySelector("#button-solicitation");

buttonSolicitation.addEventListener("click", function(){
    console.log("evento click acionado");
    var inputSolicitation = document.querySelector("#input-solicitation");
    var NumSolicitation = inputSolicitation.value;

    if (NumSolicitation == "") {
        alert("Número da solicitação inválida");
        return false;
    }

    var typeCertificate = document.querySelector("#type-certificate");

    typeCertificate.classList.remove("invisivel");
   

});



var buttonTypeCertificate = document.querySelector("#button-certificate");

buttonTypeCertificate.addEventListener("click", function(event){
    event.preventDefault();
    console.log("click do botao tipo de certificado acionado");

    var selectForm = document.querySelector("#select-form");
    var selectForm = selectForm.value;

    console.log(selectForm);

    switch (selectForm) {
        case 'Selecione...':
            alert("Selecione o tipo de certificado!");
        break;
        case '1':
            console.log("Perguntas para pessoa fisica");
            var table = document.querySelector("#table");
            table.classList.remove("invisivel");
            criarTabelaParaPessoaFisica();
          break;
        case '2':
            console.log("Perguntas para pessoa juridica");
            var table = document.querySelector("#table");
            table.classList.remove("invisivel");
            criarTabelaParaPessoaJuridica();
        break;
        
    }
      

});

function criarTabelaParaPessoaFisica (){
    let fisico = 0;
    var aleatorio = EmbaralharArray(perguntasParaPessoaFisicaObrigatorias);
    var aleatorioN = EmbaralharArray(perguntasParaPessoaFisicaNaoObrigatorias);
    aleatorio.push(aleatorioN[0]);
    aleatorio = EmbaralharArray(aleatorio);
    for(i=0; i < aleatorio.length; i++){
        var table = document.querySelector("#tbody");
        table.appendChild(Tr(aleatorio[i]));   
    }
    console.log("PRE EVENTOS", table);
    AddEscutadorDeEvento(fisico);
}

function criarTabelaParaPessoaJuridica (){
    let juridico = 1;
    var aleatorio2 = EmbaralharArray(perguntasParaPessoaJuridicaObrigatorias);
    var aleatorioN2 = EmbaralharArray(perguntasParaPessoaJuridicaNaoObrigatorias);
    aleatorio2.push(aleatorioN2[0]);
    aleatorio2 = EmbaralharArray(aleatorio2);
    for(i=0; i < aleatorio2.length; i++){
        var table = document.querySelector("#tbody");
        table.appendChild(Tr(aleatorio2[i]));   
    }
    console.log("PRE EVENTOS", table);
    AddEscutadorDeEvento(juridico);
}

function AddEscutadorDeEvento(opcao){
    console.log(opcao);
    if(opcao == 1){
        console.log("SOU DO TIPO JURIDICO");
    }else{
        console.log("SOU DO TIPO FISICO");
    }

    let buttonCheck = document.querySelectorAll(".style-check");
    let buttonBan = document.querySelectorAll(".style-close");
    
    console.log(buttonCheck);
    /*ESCUTADOR DE EVENTOS PARA CADA CHECK*/
    for(let iteracao = 0; iteracao < buttonCheck.length; iteracao++){
        buttonCheck[iteracao].addEventListener("click", function(){
            console.log("Quantidade de iterações: ",iteracao);
            console.log("Botao Selecionado: ", buttonCheck[iteracao]);
            console.log("Td do botao selecionado: ", buttonCheck[iteracao].parentNode);
            let varTablePai = buttonCheck[iteracao].parentNode.parentNode.parentNode;
            console.log("variavel da tabela pai de todos os TR: ", varTablePai);
            let varTrSelecionada = buttonCheck[iteracao].parentNode.parentNode;
            console.log("variavel da TR selecionada: ", varTrSelecionada);
            varTrSelecionada.classList.add("fadeOut");
            console.log("adiciona classe para esmaecer: ");
            setTimeout(function(){
                varTablePai.removeChild(varTrSelecionada);
            }, 1000);
            console.log("TR removida: ",varTrSelecionada);
            console.log("tabela atualizada: ", varTablePai);
            console.log(buttonCheck);
            console.log("FIM DE UM EVENTO");

            AddEscutadorDeEvento(opcao);
            let fim = document.querySelectorAll(".question");

            if(fim.length == 1){
                console.log("QUESTIONARIO FINALIZADO, RECARREGANDO... ");
                document.location.reload(true);
            }

        });        
    }
    
    /*ESCUTADOR DE EVENTOS PARA CADA BAN*/
    for(let iteracao2 = 0; iteracao2 < buttonBan.length; iteracao2++){
        buttonBan[iteracao2].addEventListener("click", function(){
            console.log("Quantidade de iterações: ",iteracao2);
            console.log("Botao Selecionado: ", buttonCheck[iteracao2]);
            console.log("Td do botao selecionado: ", buttonCheck[iteracao2].parentNode);
            let varTablePai2 = buttonBan[iteracao2].parentNode.parentNode.parentNode;
            console.log("variavel da tabela pai de todos os TR: ", varTablePai2);
            let varTrSelecionada2 = buttonBan[iteracao2].parentNode.parentNode;
            console.log("variavel da TR selecionada: ", varTrSelecionada2);
            varTrSelecionada2.classList.add("fadeOut");
            console.log("adiciona classe para esmaecer: ");
            setTimeout(function(){
                console.log("depois de 2 segundos remove a TR... ");
                console.log("tabela pai antes de remover: ", varTablePai2);
                varTablePai2.removeChild(varTrSelecionada2);
                console.log("tabela pai depois de remover: ", varTablePai2);
                console.log("adiciona mais duas TR na tabela... ");
                
                if(opcao === 1){ 
                    let y = EmbaralharArray(perguntasParaPessoaFisicaNaoObrigatorias);
                    varTablePai2.appendChild(Tr(y[1]));
                    varTablePai2.appendChild(Tr(y[0]));
                }else{ 
                    let z = EmbaralharArray(perguntasParaPessoaJuridicaNaoObrigatorias);
                    varTablePai2.appendChild(Tr(z[1]));
                    varTablePai2.appendChild(Tr(z[0]));
                }
        
                console.log("tabela pai atualizada depois de adicionar 2 TR: ", varTablePai2);
                console.log(buttonBan);
                AddEscutadorDeEvento(opcao);
            }, 2000);
                      
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
    td.appendChild(iban());
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

function iban(value){
    let iban = document.createElement('i');
    iban.classList.add("fas");
    iban.classList.add("fa-thumbs-down");
    iban.classList.add("style-close");
    iban.textContent = value;
    return iban;
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


function EmbaralharArray(array) {
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