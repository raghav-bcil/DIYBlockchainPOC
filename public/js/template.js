
function addRecord()
{
	var formData = [];
	for( var i=1; i<=5; ++i )
	{
		divName = "entry" + i;
		if(document.getElementById(divName)){
			formData.push(document.getElementById(divName).value);
		}
		else{
			break;
		}		
	}
	var formDataTemp = JSON.stringify(formData);

	$.post("/addRecord",{ formData : formDataTemp },function(data){
		if(data == "Error")
		{
			$("#message").text("An error occured.");
		}
		else
		{
			$("#message").html("Transaction hash: " + data);
		}
	});

}


function getRecordData()
{
	var recordId = document.getElementById("entry1").value;

	$.get("/getRecordData?recordId=" + recordId , function(data){
		if(data == "")
		{
			$("#message").text("No Record found for this record Id");
		}
		else
		{
			$("#message").html("Record Info: " + data);
		}
	});

}



var socket = io("http://localhost:8080");

socket.on("connect", function () {
	socket.on("message", function (msg) {
		if($("#events_list").text() == "No Transaction Found")
		{
			$("#events_list").html("<li>Txn Hash: " + msg.transactionHash + "\nRecord Id: " + msg.args.entry1 + "</li>");
		}
		else 
		{
			$("#events_list").prepend("<li>Txn Hash: " + msg.transactionHash + "\nRecord Id: " + msg.args.entry1 + "</li>");
		}
    });
});