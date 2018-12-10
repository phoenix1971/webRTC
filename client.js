var udp = require('dgram');
var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

function createClientHello1()
{
   var buffer = new Buffer(231615);

   var buffer_flight_data = new Buffer([1]);
   var buffer1_protocol_version = new Buffer([2,2]);
   var buffer2_session_id = new Buffer(2);
   var buffer3_legacy_cookie = new Buffer(2);
   var buffer4_cipher_suites = new Buffer(6);
   var buffer5_legacy_compression = new Buffer(2);
   var buffer6_extensions = new Buffer(65490);

   buffer = Buffer.concat([buffer_flight_data, buffer1_protocol_version, buffer2_session_id, buffer3_legacy_cookie, buffer4_cipher_suites, buffer5_legacy_compression, buffer6_extensions]);

   console.log(buffer.length);
   return buffer;
}


function createClientHello2()
{
   var buffer = new Buffer(13);

   var buffer_flight_data = new Buffer([3]);
   var buffer1_protocol_version = new Buffer([1,1]);
   var buffer2_session_id = new Buffer(1);
   var buffer3_legacy_cookie = new Buffer(1);
   var buffer4_cipher_suites = new Buffer(1);
   var buffer5_legacy_compression = new Buffer(1);
   var buffer6_extensions = new Buffer(1);

   buffer = Buffer.concat([buffer_flight_data, buffer1_protocol_version, buffer2_session_id, buffer3_legacy_cookie, buffer4_cipher_suites, buffer5_legacy_compression, buffer6_extensions]);

   return buffer;
}

function createFlight5()
{
   var buffer = new Buffer(33685507);

   var buffer_flight_data = new Buffer([5]);
   var buffer1_client_hello = new Buffer(1);
   var buffer2_client_certificate = new Buffer(1);
   var buffer3_client_key_exchange = new Buffer(1);
   var buffer4_certificate_verify = new Buffer(1);
   var buffer5_cipher_spec = new Buffer([1]);
   var buffer6_finished = new Buffer([1]);


   buffer = Buffer.concat([buffer_flight_data, buffer1_client_hello, buffer2_client_certificate, buffer3_client_key_exchange, buffer4_certificate_verify, buffer5_cipher_spec, buffer6_finished]);

   return buffer;
}


//buffer msg
var data   = Buffer.from([0]);
var flight1 = Buffer.from([1]);
var flight2 = Buffer.from([2]);
var flight3 = Buffer.from([3]);
var flight4 = Buffer.from([4]);
var flight5 = Buffer.from([5]);
var flight6 = Buffer.from([6]);

function retrieve_flightNo(buffer)
{
	var buff = buffer.slice(0,1);
	return buff;
}




data=createClientHello1();
console.log(retrieve_flightNo(data));
//sending msg
client.send(data,2222,'localhost',function(error){
  if(error){
    console.log('!Data sent !!!');
    console.log(retrieve_flightNo(data));
    client.close();
  }else{
    console.log('Data sent !!!');
    console.log(retrieve_flightNo(data));
  }
});

client.on('message',function(msg,info){
  var flight = retrieve_flightNo(msg) ;
  console.log('Data received from server : ');
  console.log(flight);
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

  if(flight.equals(flight2)){
    data=createClientHello2();
    client.send(data,2222,'localhost',function(error){
      if(error){
        console.log('!Data sent !!!');
        client.close();
      }else{
        console.log('Data sent !!!');
        console.log(retrieve_flightNo(data));
      }
    });
  }
  if(flight.equals(flight4)){
    data=createFlight5();
    client.send(data,2222,'localhost',function(error){
      if(error){
        console.log('!Data sent !!!');
        client.close();
      }else{
        console.log('Data sent !!!');
      }
    });
  }
  if(flight.equals(flight6)){
    console.log('hello done ');
    client.close();
  }

});

/*
var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');

//sending multiple msg
client.send([data1,data2],2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});
*/
