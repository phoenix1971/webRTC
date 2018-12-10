var udp = require('dgram');
var buffer = require('buffer');

// creating a cloud socket
var cloud = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('siddheshrane');

cloud.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

  //sending msg
    cloud.send(msg,info.port,'localhost',function(error){
      if(error){
        cloud.close();
      }else{
        console.log('Data sent !!!');
      }
    });

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
