
var tableElement = document.getElementById('dashboard-list');
var personsAreaElement = document.getElementById('persons-area');

var persons = [
    {name: 'Fire Fly', info: 'I like my ship', img: 'just-keep-flying-detail-9281.jpg'},
    {name: 'Moss', info: 'There\'s a fire Roy', img: 'imgres.jpg'}
]

// var tableList = [];

var tableList = [
    {rank: '1', name: 'LoL', type: 'MOBA', cost: 'free',  year: '2010'},
    {rank: '2', name: 'Half-Life', type: 'FPS', cost: '$19',  year: '2005'},
    {rank: '3', name: 'StarCraft', type: 'RTS', cost: '$19',  year: '2008'}
];

dashboard = {};

dashboard.buildTable = function buildTable(value) {
    // if(!tableList) tableList = [];
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


dashboard.buildPersonsArea('');
dashboard.buildTable('');


dashboard.addTableElement = function addTableElement() {
  var gameName = document.getElementById('game-name').value;
  var gameType = document.getElementById('game-type').value;
  var gameCost = document.getElementById('game-cost').value;
  var pubYear = document.getElementById('game-year').value;
  var playerRank = Math.floor(Math.random() * 101);
//   var url = document.getElementById('game-url').value;
  // var image =  
  firebase.database().ref('table-elements').push({              // to send data to firebase database
    rank: playerRank, 
    name: gameName, 
    type: gameType, 
    cost: gameCost,  
    year: pubYear
  });
};




// from JAMES 
// firebase.database().ref('table-elements').on('child_added', function(data) {
//   dashboard.buildTable('', [data.val()]);
// });

firebase.database().ref('/table-elements').once('child_added').then(function (snapshot) {  
    // tableList[] = 
    // for (var i = 0; i < snapshot.length; i++) {
    //     var element = snapshot[index];
        
    // }
     
  var name = snapshot.val().name;
  var type = snapshot.val().type;
  var price = snapshot.val().cost;
//   var cost = parseFloat(price).toFixed(2);
  var year = snapshot.val().year;
  var score = snapshot.val().rank;
  var rank = parseInt(score);
  console.log(name + ', ' + type + ', ' + price + ', ' + year + ', ' + rank);
  
});






// listRef.once("value", function(allGamesSnapshot) {
//     allGamesSnapshot.forEach(function (gamesSnapshot) {
//         var key = gamesSnapshot.key();
//         var name = gamesSnapshot.child("name").val();
//         var rank = gamesSnapshot.child("rank").val();
//         var type = gamesSnapshot.child("type").val();
//         var cost = gamesSnapshot.child("cost").val();
//         var year = gamesSnapshot.child("year").val();
//         if (key) {
//             tableList
            
//         }
//     });
// });




/* Modal Javascript */

/* http://www.the-art-of-web.com/javascript/feedback-modal-window/
// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header. */

var checkForm = function(e)
{
  var form = (e.target) ? e.target : e.srcElement;
  if(form.name.value == "") {
    alert("Please enter your Name");
    form.name.focus();
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return;
  }
  if(form.email.value == "") {
    alert("Please enter a valid Email address");
    form.email.focus();
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return;
  }
  if(form.message.value == "") {
    alert("Please enter your comment or question in the Message box");
    form.message.focus();
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    return;
  }
};

var modal_init = function() {

  var modalWrapper = document.getElementById("modal_wrapper");
  var modalWindow  = document.getElementById("modal_window");

  var openModal = function(e)
  {
    modalWrapper.className = "overlay";
    var overflow = modalWindow.offsetHeight - document.documentElement.clientHeight;
    if(overflow > 0) {
      modalWindow.style.maxHeight = (parseInt(window.getComputedStyle(modalWindow).height) - overflow) + "px";
    }
    modalWindow.style.marginTop = (-modalWindow.offsetHeight)/2 + "px";
    modalWindow.style.marginLeft = (-modalWindow.offsetWidth)/2 + "px";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  };

  var closeModal = function(e)
  {
    modalWrapper.className = "";
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  };

  var clickHandler = function(e) {
    if(!e.target) e.target = e.srcElement;
    if(e.target.tagName == "DIV") {
      if(e.target.id != "modal_window") closeModal(e);
    }
  };

  var keyHandler = function(e) {
    if(e.keyCode == 27) closeModal(e);
  };

  if(document.addEventListener) {
    document.getElementById("modal_open").addEventListener("click", openModal, false);
    document.getElementById("modal_close").addEventListener("click", closeModal, false);
    document.addEventListener("click", clickHandler, false);
    document.addEventListener("keydown", keyHandler, false);
  } else {
    document.getElementById("modal_open").attachEvent("onclick", openModal);
    document.getElementById("modal_close").attachEvent("onclick", closeModal);
    document.attachEvent("onclick", clickHandler);
    document.attachEvent("onkeydown", keyHandler);
  }

};

if(document.addEventListener) {
  document.getElementById("modal_feedback").addEventListener("submit", checkForm, false);
  document.addEventListener("DOMContentLoaded", modal_init, false);
} else {
  document.getElementById("modal_feedback").attachEvent("onsubmit", checkForm);
  window.attachEvent("onload", modal_init);
}