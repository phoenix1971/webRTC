var udp = require('dgram');
var buffer = require('buffer');

// creating a cloud socket
var cloud = udp.createSocket('udp4');

function retrieve_flightNo(buffer)
{
	var buff = buffer.slice(0,1);
	return buff;
}
var fs = require("fs");

function writeToFile(msg)
{

   console.log("Going to write into file");
   console.log("Asynchronous read: " );
   console.log(msg);
   fs.writeFile('input.txt',msg, function(err) {
     if (err) {
        return console.error(err);
     }
     console.log("Data written successfully!");
   });
   console.log("Let's read newly written data");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Asynchronous read: " );
      console.log(data);
      return data ;
   });
}
function readToFile(){


}
//buffer msg
var data = Buffer.from('...');
var flight4 = Buffer.from([4]);
var flight5 = Buffer.from([5]);
var certificate = Buffer.from('...');
cloud.on('message',function(msg,info){
  var flight = retrieve_flightNo(msg) ;
  console.log('Data received from server : ');
  console.log(flight);
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

  if(flight.equals(flight4)){
      certificate=msg ;
      writeToFile(msg);
      console.log("certificate stored in cloud");
  }
  if(flight.equals(flight5)){
    var buffer_flight_data = new Buffer([7]);
    console.log("Let's read newly written data");
    fs.readFile('input.txt', function (err, data) {
         if (err) {
            return console.error(err);
         }
         console.log("Asynchronous read: " );
         console.log(data);

        certificate= Buffer.concat([buffer_flight_data,data]);
        cloud.send(certificate,info.port,'localhost',function(error){
          if(error){
            console.log('!Data sent !!!');
            console.log('certificate');
            server.close();
          }else{
            console.log('Data sent !!!');
            console.log('certificate');
          }
        });
    });
  }
});

//emits when socket is ready and listening for datagram msgs
cloud.on('listening',function(){
  var address = cloud.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('cloud is listening at port' + port);
  console.log('cloud ip :' + ipaddr);
  console.log('cloud is IP4/IP6 : ' + family);
});


//sending msg
/*cloud.send(data,2222,'localhost',function(error){
  if(error){
    cloud.close();
  }else{
    console.log('Data sent !!!');
  }
});

var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');

//sending multiple msg
cloud.send([data1,data2],2222,'localhost',function(error){
  if(error){
    cloud.close();
  }else{
    console.log('Data sent !!!');
  }
});*/

cloud.bind(2223);
