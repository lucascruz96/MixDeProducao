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

    cabecalho += "<th>INGREDIENTES / PRODUTOS</th>";

    for (var j = 1; j <= qtColunas; j++) {
        cabecalho += "<th>";
        cabecalho += "<input id=\"nomeProd-" + j + "\" class=\"form-control\" type=\"text\" ";
        cabecalho += "oninput=\"inserirHTML('tdprod-" + j + "', this.value)\" placeholder=\"Produto " + j + "\">";
        cabecalho += "</th>";
    }

    cabecalho += "<th></th>";
    cabecalho += "<th>TOTAL DISPONIVEL / GASTO MINIMO</th>";

    cabecalho += "</thead>";

    return cabecalho;
}

function montarLinhaLucro(qtColunas) {
    var linha = "<tr>";

    var objetivo;

    if (pegarValor("selectObjetivo") == "maximizar")
        objetivo = "Lucro";
    else
        objetivo = "Custo";

    linha += "<th>" + objetivo.toUpperCase() + " POR PRODUTO EM REAIS</th>";

    for (var j = 1; j <= qtColunas; j++) {
        linha += "<td>";
        linha += "<input id=\"luc-" + j + "\" class=\"form-control\" type=\"number\" placeholder=\"" + objetivo + " " + j + "\">";
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
        corpo += "<select id=\"lBound-" + i + "\"><option value=\"menorIgual\"><=</option>";
        corpo += "<option value=\"igual\">=</option><option value=\"maiorIgual\">>=</option></select>";
        corpo += " </td>";
        corpo += "<td>";
        corpo += "<input id=\"tot-" + i + "\" class=\"form-control\" type=\"number\" placeholder=\"Disponivel / Minimo\" min=\"0\">";
        corpo += " </td>";

        corpo += "</tr>";
    }

    corpo += montarRestricoesProdutos(qtColunas);

    corpo += "</tbody>";

    return corpo;
}

function montarRestricoesProdutos(qtProdutos) {
    var linhas = "<th>Restrições de Produtos</th>";

    for (var i = 1; i <= qtProdutos; i++) {
        linhas += "<tr><td id=\"tdprod-" + i + "\">Produto " + i + "</td>";
        linhas += "<td><select id=\"cBound-" + i + "\">";
        linhas += "<option value=\"maiorIgual\">>=</option>";
        linhas += "<option value=\"igual\">=</option>";
        linhas += "<option value=\"menorIgual\"><=</option></td>";
        linhas += "<td><input id=\"cBoundValue-" + i + "\" value=\"0\" type=\"number\" min=\"0\" class=\"form-control\">";
        linhas += "</td></tr>"
    }

    return linhas;
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
        ingrediente.tipoRestricao = pegarValor("lBound-" + i);
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
        produto.tipoRestricao = pegarValor("cBound-" + p);
        produto.valorRestricao = pegarValor("cBoundValue-" + p);
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
    esconder("infos");
    exibir("divPasso3");

    problema.nome = pegarValor("inputProblema");
    problema.objetivo = pegarValor("selectObjetivo");
    problema.produtos = montarProdutos(pegarValor("inputProdutos"));

    console.log(JSON.stringify(problema));
    httpPost(JSON.stringify(problema));
}

function resultadoProblema() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        esconder("carregamento");
        exibir("divNovoProblema");
        inserirHTML("divSolucao", xmlhttp.responseText);
    }
}
