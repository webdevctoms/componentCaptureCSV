function CaptureComponents(commaSplitArr,componentIdentifier,kitIdentifier){
	this.kitArrayData = commaSplitArr;
	this.originalData;
	this.originalItemCodeIndex;
	this.itemCodeData;
	this.itemCodeDataKits;
	this.componentsIndex = this.getIndex(this.kitArrayData,componentIdentifier);
	this.kitIndex = this.getIndex(this.kitArrayData,kitIdentifier)
;	console.log(this.componentsIndex);
}

CaptureComponents.prototype.setData = function(data,itemCodeIdentifier) {
	this.originalData = data;
	this.originalItemCodeIndex = this.getIndex(this.originalData,itemCodeIdentifier);
};

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
			let itemCode = matrixComponentArray[0].replace(",","").trim();
			if(!itemCodeData[itemCode]){
				itemCodeData[itemCode] = itemCode;
			}		
		}
		//non matrix case
		else{
			let itemCode = this.kitArrayData[i][this.componentsIndex].replace(",","").trim();
			itemCodeData[itemCode] = itemCode;
		}		
	}
	console.log("item codes: ",itemCodeData,Object.keys(itemCodeData).length);
	this.itemCodeData = itemCodeData;
	return itemCodeData;
};

CaptureComponents.prototype.captureItemCodesKits = function(){
	let itemCodeData = {};

	for(let i = 1; i < this.kitArrayData.length;i++){
		let itemCode = this.kitArrayData[i][this.kitIndex].replace(",","").trim();
		if(!itemCodeData[itemCode]){
			itemCodeData[itemCode] = itemCode;
		}
	}
	console.log("item codes kits: ",itemCodeData,Object.keys(itemCodeData).length);
	this.itemCodeDataKits = itemCodeData;
	return itemCodeData;
};

CaptureComponents.prototype.getComponentData = function(itemCodeData) {
	let componentData = [];
	componentData.push(this.originalData[0]);
	let parentItemCode = "";
	for(let i = 1;i < this.originalData.length;i++){
		let itemCode = this.originalData[i][this.originalItemCodeIndex].replace(",","").trim();

		//new Item
		if(itemCodeData[itemCode] && !itemCode.includes(parentItemCode)){
			parentItemCode = itemCode;
			componentData.push(this.originalData[i]);
		}
		//child item
		else if(itemCodeData[parentItemCode] && itemCode.includes(parentItemCode)){
			componentData.push(this.originalData[i]);
		}
		else if(itemCodeData[itemCode]){
			parentItemCode = itemCode;
			componentData.push(this.originalData[i]);
		}
	}

	return componentData;
};