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
    bool status
    
  );
    
     
  bytes32[] RecordIdsList; 
  mapping (bytes32 => Record) RecordsList;
    

function createRecord(bytes32[5] recordData){
    
    RecordsList[recordData[0]] = Record( recordData[0], recordData[1], recordData[2], recordData[3], recordData[4]);
    RecordIdsList.push(recordData[0]);
    recordAddedStatus(recordData[0],recordData[1],recordData[2],recordData[2],recordData[3],true);
      
    }
    

function getRecordData(bytes32 recordId) returns(
    bytes32[]){

    bytes32[] memory recordData =new bytes32[](4);

    recordData[0] = RecordsList[recordId].entry1;
    recordData[1] = RecordsList[recordId].entry2;
    recordData[2] = RecordsList[recordId].entry3;
    recordData[3] = RecordsList[recordId].entry4;
    return recordData;
 } 
}    

