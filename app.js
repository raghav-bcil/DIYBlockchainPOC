var express = require("express");  
var bodyParser = require('body-parser')

var app = express();  

var server = require("http").createServer(app);

var io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


server.listen(8080, function() {

    console.log('ready to go!');

});



app.use(express.static("public"));



app.get("/", function(req, res){

	res.sendFile(__dirname + "/public/html/index.html");

})

app.get("/index.html", function(req, res){

	res.sendFile(__dirname + "/public/html/index.html");

})

app.get("/template1.html", function(req, res){

	res.sendFile(__dirname + "/public/html/template1.html");

})



app.get("/template2.html", function(req, res){

	res.sendFile(__dirname + "/public/html/template2.html");

})





var Web3 = require("web3");



web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));	



console.log(web3.isConnected());

//to be read from Database Layer

var contractObject = web3.eth.contract([ { "constant": true, "inputs": [ { "name": "recordId", "type": "bytes32" } ], "name": "getRecordData", "outputs": [ { "name": "", "type": "bytes32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "recordData", "type": "bytes32[5]" } ], "name": "createRecord", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "recordId", "type": "bytes32" }, { "indexed": false, "name": "entry1", "type": "bytes32" }, { "indexed": false, "name": "entry2", "type": "bytes32" }, { "indexed": false, "name": "entry3", "type": "bytes32" }, { "indexed": false, "name": "entry4", "type": "bytes32" }, { "indexed": false, "name": "status", "type": "bool" } ], "name": "recordAddedStatus", "type": "event" } ]);

var contractInstance = contractObject.at("0xdd6c0fcacdf61a1bb49da759e8586f43b182b3a8");



app.post("/addRecord", function(req, res){


	console.log(req.body.formData);
	var formDataArray= JSON.parse(req.body.formData);
	console.log(formDataArray);
	for( var i =0 ; i< formDataArray.length; ++i){

		formDataArray[i] = web3.fromAscii(formDataArray[i]);

	}

	contractInstance.createRecord.sendTransaction(formDataArray,{

		from: web3.eth.accounts[0], gas : 4985667,

	}, function(error, transactionHash){

		if (!error)

		{

			res.send(transactionHash);

		}

		else

		{
			console.log(error);

			res.send("Error");

		}

	})

})



app.get("/getRecordData", function(req, res){

	
	console.log(req.query.recordId);
	var recordId = web3.fromAscii(req.query.recordId);



	var data = contractInstance.getRecordData.call(recordId);
	console.log(data);
	for(i=0;i<data.length;++i){
		data[i] = web3.toAscii(data[i]);
	}
	res.send(data);

})



contractInstance.recordAddedStatus().watch(function(error, result){

	if(!error)

	{

		if(result.args.status == true)

		{

			console.log(web3.toAscii(result.args.entry1));
			io.send(result);

		}

	}

})