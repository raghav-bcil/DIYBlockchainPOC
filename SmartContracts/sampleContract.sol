pragma solidity ^0.4.12;

contract SampleContract {

//structure to hold data fields
struct Record{
    
    bytes32 recordId;
    bytes32 entry1;
    bytes32 entry2;
    bytes32 entry3;
    bytes32 entry4;
   
  } 
    
event recordAddedStatus(

    bytes32 recordId,
    bytes32 entry1,
    bytes32 entry2,
    bytes32 entry3,
    bytes32 entry4,
    bytes32 status
    
  );
    
     
  bytes32[] RecordIdsList; 
  mapping (bytes32 => Data) RecordsList;
    

function createRecord(bytes32 id,bytes32 entry1,bytes32 entry2, bytes32 entry3,
     bytes32 entry4){
    
    RecordsList[recordId] = Record( recordId, entry1, entry2, entry3, entry4);
    RecordIdsList.push(recordId);
    recordAddedStatus(recordId,entry1,entry2,entry3,entry4,true);
      
    }
    

function getRecordData(bytes32 recordId) returns(
    bytes32 entry1,
    bytes32 entry2,
    bytes32 entry3,
    bytes32 entry4){

    entry1 = RecordsList[recordId].entry1;
    entry2 = RecordsList[recordId].entry2;
    entry3 = RecordsList[recordId].entry3;
    entry4 = RecordsList[recordId].entry4;
 } 
    

