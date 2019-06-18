function CaptureComponents(commaSplitArr,componentIdentifier){
	this.kitArrayData = commaSplitArr;
	this.componentsIndex = this.getIndex(this.kitArrayData,componentIdentifier);
	console.log(this.componentsIndex);
}

CaptureComponents.prototype.getIndex = function(arr,identifier){
	//loop through the titles and find vendor
	for(let col = 0; col < arr[0].length; col++){	
		//console.log(arr[0][col].toLowerCase());
		if(arr[0][col].toLowerCase() === (identifier.toLowerCase() + ",")){
			return col;
		}
	}

	return null;
};

CaptureComponents.prototype.captureItemCodes = function(){
	let itemCodeData = {};

	for(let i = 1; i < this.kitArrayData.length;i++){
		//matrix case
		if(this.kitArrayData[i][this.componentsIndex].includes(":")){
			let matrixComponentArray = this.kitArrayData[i][this.componentsIndex].split(":");
			let itemCode = matrixComponentArray[0].trim();
			if(!itemCodeData[itemCode]){
				itemCodeData[itemCode] = itemCode;
			}		
		}
		//non matrix case
		else{
			let itemCode = this.kitArrayData[i][this.componentsIndex].trim();
			itemCodeData[itemCode] = itemCode;
		}		
	}
	console.log("item codes: ",itemCodeData,Object.keys(itemCodeData).length);
	return itemCodeData;
};

