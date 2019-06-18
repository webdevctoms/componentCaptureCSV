function App(dropZoneID,downloadID,testButtonID,filterDropZoneID,filterButtonID) {
	this.csvDropZone = document.getElementById(dropZoneID);
	this.downloadLink = document.getElementById(downloadID);
	this.testButton = document.getElementById(testButtonID);
	this.filterDropZone = document.getElementById(filterDropZoneID);
	this.filterButton = document.getElementById(filterButtonID);

	this.commaSplitData;
	this.captureComponents;
	this.captureCSV = new CaptureCSV();
	
}

App.prototype.initApp = function() {
	this.csvDropZone.addEventListener("drop",function(e){
		e.preventDefault();
		this.fileDropped(e);
	}.bind(this),false);

	//need this to prevent default downloading of file
	this.csvDropZone.addEventListener("dragover",function(e){
		e.preventDefault();
	}.bind(this),false);

	this.testButton.addEventListener("click",function(e){
		e.preventDefault();
		this.runTests();
	}.bind(this),false);
	
	this.filterButton.addEventListener("click",function(e){
		e.preventDefault();
		this.filterClicked();
	}.bind(this),false);

	this.filterDropZone.addEventListener("drop",function(e){
		e.preventDefault();
		this.filterFileDropped(e);
	}.bind(this),false);

	//need this to prevent default downloading of file
	this.filterDropZone.addEventListener("dragover",function(e){
		e.preventDefault();
	}.bind(this),false);
	
};

App.prototype.runTests = function(){
	console.log("run tests");
	try{
		Tests.checkLength(this.commaSplitData,this.commaSplitData[0].length);
	}
	catch(err){
		console.log("error testing ",err);
	}
};

App.prototype.createBlob = function(arr){
	let lineArray = [];

	arr.forEach(function(rowArr,index){
		let row = rowArr.join("");
		lineArray.push(row);	
	});
	let csvContent = lineArray.join("\n");
	let csvData = new Blob([csvContent],{type:'text/csv'});
	let csvURL = URL.createObjectURL(csvData);
	return csvURL;
};

App.prototype.createDownload = function(csvData,downloadLink){
	downloadLink.classList.remove("hide");
	downloadLink.setAttribute("href","");
	downloadLink.setAttribute("href",csvData);
	downloadLink.setAttribute("download", "new_data.csv");
};

App.prototype.filterFileDropped = function(event){
	let csvFile = event.dataTransfer.items[0].getAsFile();
	this.captureCSV.readFile(csvFile)

	.then(filterSplitData => {
		try{		
			this.captureComponents = new CaptureComponents(filterSplitData,"Components");
			this.captureComponents.setData(this.commaSplitData,"name");
			this.captureComponents.captureItemCodes();
			let componentData = this.captureComponents.getComponentData();
			console.log(componentData);
		}
		catch(err){
			console.log("error setting data in filter",err);
		}	

	})

	.catch(err => {
		console.log("error reading file", err);
	});
	//console.log(this.commaSplitData);
};

App.prototype.fileDropped = function(event){
	let csvFile = event.dataTransfer.items[0].getAsFile();
	this.captureCSV.readFile(csvFile)

	.then(commaSplitData => {
		this.commaSplitData = commaSplitData;
		console.log(this.commaSplitData);
		try{
			this.captureComponents.setData(this.commaSplitData,"name");
		}
		catch(err){
			console.log("error setting data in master",err);
		}
		
		//let csvData = this.createBlob(this.commaSplitData);
		//this.createDownload(csvData,this.downloadLink);
	})

	.catch(err => {
		console.log("error reading file", err);
	});
	//console.log(this.commaSplitData);
};

let app = new App("drop_zone","downloadLink","testData","drop_zone_filter","filterData");
window.onload = app.initApp();