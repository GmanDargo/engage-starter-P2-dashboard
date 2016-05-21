
var tableElement = document.getElementById('dashboard-list');
var personsAreaElement = document.getElementById('persons-area');

var persons = [
    {name: 'Fire Fly', info: 'I like my ship', img: 'just-keep-flying-detail-9281.jpg'},
    {name: 'Moss', info: 'There\'s a fire Roy', img: 'imgres.jpg'}
]

/*var tableList = [
    {rank: '1', name: 'LoL', type: 'MOBA', cost: 'free',  year: '2010'},
    {rank: '2', name: 'Half-Life', type: 'FPS', cost: '$19',  year: '2005'},
    {rank: '3', name: 'StarCraft', type: 'RTS', cost: '$19',  year: '2008'}
];
*/

dashboard = {};

dashboard.buildTable = function buildTable(value, tableList) {
    if (value) value = value.toLowerCase()
    if(!tableList) tableList = [];
    tableElement.innerHTML = '';
    for (var i=0; i < tableList.length; i++) {
        var tr = document.createElement('TR');
        var contentExists = false;
        for (var key in tableList[i]) {
            if (tableList[i].hasOwnProperty(key)) {
                var element = tableList[i][key];
                var td = document.createElement('td');
                if (element.toLowerCase().indexOf(value) > -1) {
                    contentExists = true;
                }
                var tdText = document.createTextNode(element);
                td.appendChild(tdText);
                tr.appendChild(td);
            }
        }
        if (contentExists) tableElement.appendChild(tr);
    }   
};


dashboard.buildPersonsArea = function buildPersonsArea(value) {
    personsAreaElement.innerHTML = '';
    for (var i = 0; i < persons.length; i++) {
        var element = persons[i];
        if (element.name.toLowerCase().indexOf(value.toLowerCase())) { 
            personsAreaElement.innerHTML += 
                '<div class="col-xs-6 col-sm-3 placeholder">'+
                    '<img src="'+element.img+'" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">' +
                    '<h4>'+element.name+'</h4>' +
                    '<span class="text-muted">'+element.info+'</span>' +
                '</div>'
        }           
    }    
};

dashboard.search = function search(value) {
    // if (value.length > 2) {
    dashboard.buildTable(value);  
    dashboard.buildPersonsArea(value) 
    // }
};

dashboard.addTableElement = function addTableElement() {
  var name = document.getElementById('name-input').value;
  firebase.database().ref('table-elements').push({
    rank: '1' + Math.random() * 100, 
    name: name, 
    type: 'MOBA', 
    cost: 'free',  
    year: '2010'
  });
};

dashboard.buildPersonsArea('');

firebase.database().ref('table-elements').on('child_added', function(data) {
  dashboard.buildTable('', [data.val()]);
});