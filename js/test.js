Tests = {
	checkLength,
	checkFilteredData
};

function checkLength(arr,arrLength){
	console.log("checking length");
	let incorrectIndexes = [];
	for(let i = 0;i < arr.length;i++){
		try{
			if(arr[i].length !== arrLength){
				incorrectIndexes.push(i);
				console.log("error at: ",i);
			}
		}
		catch(error){
			console.log(i);
			console.log(error);
		}
		
	}

	if(incorrectIndexes.length === 0){
		console.log("Length test passed");
	}
	else{
		console.log("Length test failed", incorrectIndexes);
	}
}

function checkFilteredData(arr,itemCodeObject,itemCodeIndex){
	let incorrectIndexes = [];
	console.log("Filter check test");
	
	for(let i = 1;i < arr.length;i++){
		let itemCodeFound = false;
		for(let itemCodeKey in itemCodeObject){
			if(arr[i][itemCodeIndex].includes(itemCodeKey)){
				itemCodeFound = true;
				break;
			}
		}
		if(itemCodeFound === false){
			incorrectIndexes.push(i);
		}
	}

	if(incorrectIndexes.length === 0){
		console.log("Filter check test passed");
	}
	else{
		console.log("Filter check test failed",incorrectIndexes);
	}
}