var udp = require('dgram');

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('siddheshrane2');


// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});



function createHelloVerifyRequest()
{
	var buffer = new Buffer(258);

	var buffer_flight_data = new Buffer([2]);
	var buffer1_protocol_version = new Buffer([254,253]);
	var buffer2_legacy_cookie = new Buffer(256);

	buffer = Buffer.concat([buffer_flight_data, buffer1_protocol_version, buffer2_legacy_cookie]);

	return buffer;
}



function createFlight4()
{
   var buffer = new Buffer(17);

   var buffer_flight_data = new Buffer([4]);
   var buffer1_server_hello = new Buffer(1);
   var buffer2_server_certificate = new Buffer(1);
   var buffer3_server_key_exchange = new Buffer(1);
   var buffer4_client_certificate_request = new Buffer(1);
   var buffer5_hello_done = new Buffer([1]);


   buffer = Buffer.concat([buffer_flight_data, buffer1_server_hello, buffer2_server_certificate, buffer3_server_key_exchange, buffer4_client_certificate_request, buffer5_hello_done]);

   return buffer;
}

/*
clienthello
client certificate
client key exchange
certificate verify
change cipher specifications
finished


change cipher specifications
finished


*/




function createFlight6()
{
   var buffer = new Buffer(2);

   var buffer_flight_data = new Buffer([6]);
   var buffer1_cipher_spec = new Buffer([1]);
   var buffer2_finished = new Buffer([1]);


   buffer = Buffer.concat([buffer_flight_data, buffer1_cipher_spec, buffer2_finished]);

   return buffer;
}



function retrieve_flightNo(buffer)
{
	var buff = buffer.slice(0,1);
	return buff;
}

//buffer msg
var data  = Buffer.from('nothing');
var flight1 = Buffer.from([1]);
var flight2 = Buffer.from([2]);
var flight3 = Buffer.from([3]);
var flight4 = Buffer.from([4]);
var flight5 = Buffer.from([5]);
var flight6 = Buffer.from([6]);
var cloud = Buffer.from([7]);
var clientPort ;
// emits on new datagram msg
server.on('message',function(msg,info){
  var flight = retrieve_flightNo(msg) ;
  console.log(' Data received from client : ');
  console.log(flight);
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
//sending msg
  if(flight.equals(flight1)){
    data=createHelloVerifyRequest();
    server.send(data,info.port,'localhost',function(error){
      if(error){
        console.log('!Data sent !!!');
        console.log(retrieve_flightNo(data));
        server.close();
      }else{
        console.log('Data sent !!!');
        console.log(retrieve_flightNo(data));
      }
    });
  }
  if(flight.equals(flight3)){
    data=createFlight4();
    server.send(data,info.port,'localhost',function(error){
      if(error){
        console.log('!Data sent !!!');
        console.log(retrieve_flightNo(data));
        server.close();
      }else{
        console.log('Data sent to client!!!');
        console.log(retrieve_flightNo(data));
      }
    });
    server.send(data,2223,'localhost',function(error){
      if(error){
        console.log('!Data sent !!!');
        console.log(retrieve_flightNo(data));
        server.close();
      }else{
        console.log('Data sent to cloud!!!');
        console.log(retrieve_flightNo(data));
      }
    });
  }
  if(flight.equals(flight5)){
    data=flight5;
    clientPort=info.port;
    server.send(data,2223,'localhost',function(error){
      if(error){
        console.log('!Data sent !!!');
        console.log(data);
        server.close();
      }else{
        console.log('Data sent !!!');
        console.log(data);
      }
    });
  }
  if(flight.equals(cloud)){
    data=createFlight6();
    server.send(data,clientPort,'localhost',function(error){
      if(error){
        console.log('!Data sent !!!');
        console.log(retrieve_flightNo(data));
        server.close();
      }else{
        console.log('Data sent !!!');
        console.log(retrieve_flightNo(data));
      }
    });
  }

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(2222);

setTimeout(function(){
  //server.close();
},8000);
