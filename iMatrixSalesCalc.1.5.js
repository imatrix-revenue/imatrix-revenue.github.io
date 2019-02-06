function calc() {
    //Create Variables
    var valOne = Number(document.getElementById('valOne').value);
    var acqPer = document.getElementById('acqPer').value;
    var serviceQual = document.getElementById('serviceQual').value;
    var vertical = document.getElementById('vertical').value;
	
	// extract % sign
	if (acqPer.indexOf('%') > -1) {
		cleanNum = acqPer.replace(/\%$/, '');
		acqPer = cleanNum;
	}
		
	// format conversion from % to decimal
	acqPerCvrt = parseInt(acqPer) / 100.0;
	acqPer = acqPerCvrt ;
	
	// quick reality check on entered percentage
	if (acqPer > .53) {
		 document.write("Fruit is not available");
	} else {
		acqPer = acqPer;
	}
        //Set Metrics for Vet Lead Averages
        if(vertical == "vet" && serviceQual == "dom"){
            serviceQualVal = 82;
        }
        else if(vertical == "vet" && serviceQual == "vel"){
            serviceQualVal = 29;
        }
        else if(vertical == "vet" && serviceQual == "prem"){
            serviceQualVal = 58;
        }
        //Set Metrics for Chiro Lead Averages
        else if(vertical == "chiro" && serviceQual == "dom"){
            serviceQualVal = 61;
        }
        else if(vertical == "chiro" && serviceQual == "vel"){
            serviceQualVal = 10;
        }
        else if(vertical == "chiro" && serviceQual == "prem"){
            serviceQualVal = 44;
        }
        //Set Metrics for Opto Lead Averages
        else if(vertical == "opto" && serviceQual == "dom"){
            serviceQualVal = 76;
        }
        else if(vertical == "opto" && serviceQual == "vel"){
            serviceQualVal = 15;
        }
        else if(vertical == "opto" && serviceQual == "prem"){
            serviceQualVal = 58;
        }
        else{
            document.write("Fruit is not available");
        }      
    //Create Variables and Create Algorithm for monthly and yearly Calculations
    var totalM_rev = (serviceQualVal * acqPer) * valOne;
    var totalY_rev = ((serviceQualVal * acqPer) * valOne) * 12;

    //Create Results for Monthly & Yearly Expected Rev Values
    document.getElementById("totalM").innerHTML= "$" + Number(totalM_rev).toFixed(2);  
    document.getElementById("totalY").innerHTML= "$" + Number(totalY_rev).toFixed(2);       
}

