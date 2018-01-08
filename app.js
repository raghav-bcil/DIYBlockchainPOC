var express = require("express");  
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(8080);

app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
})

var Web3 = require("web3");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));	

//to be read from Database Layer
var contractObject = web3.eth.contract([{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getVendorByIndex","outputs":[{"name":"vendorId","type":"bytes32"},{"name":"vendorName","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getVendorCount","outputs":[{"name":"number","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vendorId","type":"bytes32"}],"name":"getVendorById","outputs":[{"name":"vendorName","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vendorId","type":"bytes32"},{"name":"vendorName","type":"bytes32"}],"name":"addVendor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"vendorId","type":"bytes32"},{"indexed":false,"name":"vendorName","type":"bytes32"}],"name":"vendorAddedStatus","type":"event"}]);
var contractInstance = contractObject.at("0xf0aab87d559472deb75c0353225ee9e71b9c2abb");

app.post("/submit", function(req, res){
	var formData = req.body.formData;
	contractInstance.addRecord.sendTransaction(formData[0],formData[1],formData[2],formData[3],formData[4],{
		from: web3.eth.accounts[0],
	}, function(error, transactionHash){
		if (!error)
		{
			res.send(transactionHash);
		}
		else
		{
			res.send("Error");
		}
	})
})

app.get("/getRecordData", function(req, res){
	
	var recordId = req.query.recordId;

	var data = contractInstance.getRecordData.call(recordId);
	res.send(data);
})

contractInstance.recordAddedStatus().watch(function(error, result){
	if(!error)
	{
		if(result.args.status == true)
		{
			io.send(result);
		}
	}
})