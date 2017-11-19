var problema = {};
var xmlhttp;

function esconder(idElemento) {
    document.getElementById(idElemento).style.display = "none";
}

function exibir(idElemento) {
    document.getElementById(idElemento).style.display = "block";
}

function inserirHTML(idElemento, conteudo) {
    document.getElementById(idElemento).innerHTML = conteudo;
}

function pegarValor(idElemento) {
    return document.getElementById(idElemento).value;
}

function montarCabecalhoTabela(qtColunas) {
    var cabecalho = "<thead>";

    cabecalho += "<th>INGREDIENTES/PRODUTOS</th>";

    for (var j = 1; j <= qtColunas; j++) {
        cabecalho += "<th>";
        cabecalho += "<input id=\"nomeProd-" + j + "\" class=\"form-control\" type=\"text\" placeholder=\"Produto " + j + "\">";
        cabecalho += "</th>";
    }

    cabecalho += "<th>TOTAL DISPONIVEL</th>";

    cabecalho += "</thead>";

    return cabecalho;
}

function montarLinhaLucro(qtColunas) {
    var linha = "<tr>";
    linha += "<th>LUCRO POR PRODUTO EM REAIS</th>";

    for (var j = 1; j <= qtColunas; j++) {
        linha += "<td>";
        linha += "<input id=\"luc-" + j + "\" class=\"form-control\" type=\"number\" placeholder=\"Lucro " + j + "\">";
        linha += "</td>";
    }

    linha += "</tr>";

    return linha;
}

function montarCorpoTabela(qtLinhas, qtColunas) {
    var corpo = "<tbody>";

    corpo += montarLinhaLucro(qtColunas);

    for (var i = 1; i <= qtLinhas; i++) {
        corpo += "<tr>";
        corpo += "<th scope=\"row\">"
        corpo += "<input id=\"nomeIng-" + i + "\" class=\"form-control\" type=\"text\" placeholder=\"Ingrediente " + i + "\">";
        corpo += "</th>";

        for (var j = 1; j <= qtColunas; j++) {
            corpo += "<td>";
            corpo += "<input id=\"val-" + i + "-" + j + "\" class=\"form-control\" type=\"number\" placeholder=\"Gasto\" min=\"0\">";
            corpo += " </td>";
        }

        corpo += "<td>";
        corpo += "<input id=\"tot-" + i + "\" class=\"form-control\" type=\"number\" placeholder=\"Disponibilidade\" min=\"0\">";
        corpo += " </td>";

        corpo += "</tr>";
    }
    corpo += "</tbody>";

    return corpo;
}

function montarTabela(qtLinhas, qtColunas) {
    var tabela = "<table class=\"table\" width=\"100%\">";
    var cabecalho = montarCabecalhoTabela(qtColunas);
    var corpo = montarCorpoTabela(qtLinhas, qtColunas);

    tabela += cabecalho + corpo + "</table>";

    return tabela;
}

function montarIngredientes(qtIngredientes, produtoAtual) {
    var ingredientes = [];
    var ingrediente;

    for (var i = 1; i <= qtIngredientes; i++) {
        ingrediente = {};
        ingrediente.nome = pegarValor("nomeIng-" + i);
        ingrediente.gasto = parseFloat(pegarValor("val-" + i + "-" + produtoAtual));
        ingrediente.disponibilidade = parseFloat(pegarValor("tot-" + i));

        ingredientes.push(ingrediente);
    }

    return ingredientes;
}

function montarProdutos(qtProdutos) {
    var produtos = [];
    var produto;

    for (var p = 1; p <= qtProdutos; p++) {
        produto = {};
        produto.nome = pegarValor("nomeProd-" + p);
        produto.lucro = parseFloat(pegarValor("luc-" + p));
        produto.ingredientes = montarIngredientes(pegarValor("inputIngredientes"), p);

        produtos.push(produto);
    }

    return produtos;
}

function segundoPasso() {
    inserirHTML("nomeProblema", pegarValor("inputProblema"));

    esconder("divPasso1");
    exibir("divPasso2");
    exibir("nomeProblema");

    var tabela = montarTabela(pegarValor("inputIngredientes"), pegarValor("inputProdutos"));

    inserirHTML("divTabela", tabela);
}

function httpPost(dados) {
    xmlhttp = new XMLHttpRequest();

    var link = "http://otimizador.azurewebsites.net/solver";

    xmlhttp.open("POST", link, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = resultadoProblema;
    xmlhttp.send(dados);
}

function resolver() {
    esconder("divPasso2");
    exibir("divPasso3");

    problema.nome = pegarValor("inputProblema");
    problema.objetivo = "maximizar";
    problema.produtos = montarProdutos(pegarValor("inputProdutos"));

    console.log(JSON.stringify(problema));
    httpPost(JSON.stringify(problema));
}

function resultadoProblema(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        esconder("carregamento");
        inserirHTML("divSolucao", xmlhttp.responseText);
    }
}
