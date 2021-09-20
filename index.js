// let url = 'ws://localhost:3000' 
let url = 'ws://aqueous-river-42785.herokuapp.com';

 

let client = new WebSocket(url); 

client.addEventListener("open", () => {
  console.log(`[websockets] Connected to ${url}`);
});
client.addEventListener("message", (data) => {
  
      var _data = JSON.parse(data.data)
      console.log(_data);
      if (_data.event === 'connect') {
        saveID(_data.id)
      }
      if (_data.event === 'result_getClients') {
        if (_data.data !== null || _data.data !== undefined) {
          updateList(_data.data)
        }
      }
});




//save ID
const saveID = (id)=>{
  localStorage.setItem('ID',id)
}
const getID = ()=>{
 return localStorage.getItem('ID')
}

//send unique ID
const sendUniqueID = ()=>{
  var value = document.getElementById('txt_ID').value
  var message = {
    event: 'setUniqueID',
    data : value,
    id:getID()
  }
  client.send(JSON.stringify(message))
}


//send travel
const sendMessage=()=>{
    var txt_data = document.getElementById('txt_data').value
    var txt_cliendID = document.getElementById('txt_cliendID').value
    var _data = {
        event: 'sendToMessageToParticularClient',
        client:txt_cliendID,
        data: {
           ruta: txt_data ?? '---',
           time:'15:00',
        }
    }
    client.send(JSON.stringify(_data))
}

const getConnections=()=>{
  var txt_cliendID = document.getElementById('txt_cliendID').value
  var _data = {
      event: 'getClients',
      client:txt_cliendID, 
  }
  client.send(JSON.stringify(_data))
}


const updateList = (data)=>{
  var ul = document.getElementById('list_connections') ;
  ul.innerHTML=''
  data.forEach((value)=>{
    ul.innerHTML += '<li>'+ value.uniqueID+'</li>'
  })
  

}

client.addEventListener("close", () => {
  console.log(`[websockets] Disconnected from ${url}`);
  client = null;
});
