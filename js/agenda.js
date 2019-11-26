app.initialize();

// Cria um bando de dados
var db = window.openDatabase("Database", "1.0", "Agenda", 2000);
db.transaction(createDB, errorDB, successDB);
// Quando o objeto documento "escuta" que est� pronto executa a fun��o onDeviceReady
document.addEventListener("deviceready", onDeviceReady, false);

// Cria a tabela no banco de dados
function onDeviceReady(){
    db.transaction(createDB, errorDB, successDB);
}

// Trata erro de criacao do BD
function errorDB(err){
    alert("Erro: " + err);
}

// Executa se criou o BD com sucesso
function successDB(){}

// Cria a tabela no BD
function createDB(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS Agenda (id INTEGER PRIMARY KEY, nome VARCHAR(50), tel NUM(15) )');
}

// Prepara para incluir registro no tabela Agenda
function agenda_insert(){
    db.transaction(agenda_insert_db, errorDB, successDB);
}

// Inclui registro na tabela Insert
function agenda_insert_db(tx){
    var nome = $('#agenda_nome').val();
    var tel = $('#agenda_telefone').val();

    tx.executeSql('INSERT INTO Agenda (nome, tel) VALUES ("'+ nome + '", "' + tel +'")');
    agenda_view();
}

// Prepara para exibir os registros da tabela Agenda
function agenda_view(){
    db.transaction(agenda_view_db, errorDB, successDB);
}


function agenda_view_db(tx){
    tx.executeSql('SELECT * FROM Agenda', [], agenda_view_data, errorDB);
}


function agenda_view_data(tx, results){
    $('#agenda_listagem').empty();
    var len = results.rows.length;

    for(var i = 0; i < len; i++){
        $('#agenda_listagem').append("<tr class='agenda_item_lista'>" + 
            "<td><h3>" + results.rows.item(i).nome + "</h3></td>" + 
            "<td><h3>" + results.rows.item(i).tel + "</h3></td>" +
        "</tr>");
    }
}