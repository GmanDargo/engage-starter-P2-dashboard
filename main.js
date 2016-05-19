

var tableElement = document.getElementById('dashboard-list');  //finds element in html file with this id - dashboard-list

var tableList = [
    {rank: '1', name: 'LoL', type: 'MOBA', cost: 'free',  year: '2010'},
    {rank: '2', name: 'Half-life', type: 'FPS', cost: '$19',  year: '2005'},
    {rank: '3', name: 'Starcraft', type: 'RTS', cost: '$19',  year: '2008'}
];

for (var i=0; i < tableList.length; i++) {
    var tr = document.createElement('TR'); 
    for (var key in tableList[i]) {
        if (tableList[i].hasOwnProperty(key)) {
            var element = tableList[i][key];
            var td = document.createElement('td')
            var tdText = document.createTextNode(element);
            td.appendChild(tdText);
            tr.appendChild(td);
        }
    }
    tableElement.appendChild(tr);
}