var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "IMXLeadAvgsQ12019.xml", true);
xhttp.send();


var vetDom, vetVel, vetPrem, vetAdv, chiroDom, chiroVel, chiroPrem, chir, optoDom, optoVel, optoPrem, optoAdv, visitLim, acqLim;


function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    vetDom = xmlDoc.getElementsByTagName("dom")[0].childNodes[0].nodeValue;
    vetVel = xmlDoc.getElementsByTagName("vel")[0].childNodes[0].nodeValue;
    vetPrem = xmlDoc.getElementsByTagName("prem")[0].childNodes[0].nodeValue;
    vetAdv = xmlDoc.getElementsByTagName("adv")[0].childNodes[0].nodeValue;

    chiroDom = xmlDoc.getElementsByTagName("dom")[1].childNodes[0].nodeValue;
    chiroVel = xmlDoc.getElementsByTagName("vel")[1].childNodes[0].nodeValue;
    chiroPrem = xmlDoc.getElementsByTagName("prem")[1].childNodes[0].nodeValue;
    chiroAdv = xmlDoc.getElementsByTagName("adv")[1].childNodes[0].nodeValue;

    optoDom = xmlDoc.getElementsByTagName("dom")[2].childNodes[0].nodeValue;
    optoVel = xmlDoc.getElementsByTagName("vel")[2].childNodes[0].nodeValue;
    optoPrem = xmlDoc.getElementsByTagName("prem")[2].childNodes[0].nodeValue;
    optoAdv = xmlDoc.getElementsByTagName("adv")[2].childNodes[0].nodeValue;

    visitLim = xmlDoc.getElementsByTagName("visitLim")[0].childNodes[0].nodeValue;
    acqLim = xmlDoc.getElementsByTagName("acqLim")[0].childNodes[0].nodeValue;
}



function calc() {
    //Create Variables
    var valOne = Number(document.getElementById('valOne').value);
    var acqPer = document.getElementById('acqPer').value;
    var serviceQual = document.getElementById('serviceQual').value;
    var vertical = document.getElementById('vertical').value;
    var visitAvg = Number(document.getElementById('visitAvg').value);

    // extract % sign
    if (acqPer.indexOf('%') > -1) {
        cleanNum = acqPer.replace(/\%$/, '');
        acqPer = cleanNum;
    }

    //Create limit on entered percentage
    if ((acqPer > 1 && acqPer > acqLim) || acqPer >= 100) {
        alert("Conversion Rates Are Too High");
        acqPer = 0;
    } else if (acqPer < 1 && acqPer > (acqLim / 100)) {
        alert("Conversion Rates Are Too High");
        acqPer = 0;
    } else {
        acqPer = acqPer;
    }

    //format conversion from % to decimal
    if (acqPer < 1) {
        acqPerFinal = (acqPer);
    } else {
        acqPerFinal = (acqPer / 100);
    }

    //Auto set visit amount to 1 if no entry
    if (visitAvg < 1) {
        visitAvgTot = 1;
    } else {
        visitAvgTot = visitAvg;
    }


    //Create limit on number of visits
    if (visitAvg > visitLim) {
        alert("Number of Average Visits Are Limited");
        visitAvgTot = 0;
    } else {
        visitAvgTot = visitAvg;
    }

    //Set Metrics for Vet Lead Averages
    if (vertical == "vet" && serviceQual == "dom") {
        serviceQualVal = vetDom;
    } else if (vertical == "vet" && serviceQual == "vel") {
        serviceQualVal = vetVel;
    } else if (vertical == "vet" && serviceQual == "prem") {
        serviceQualVal = vetPrem;
    } else if (vertical == "vet" && serviceQual == "adv") {
        serviceQualVal = vetAdv;
    }

    //Set Metrics for Chiro Lead Averages
    else if (vertical == "chiro" && serviceQual == "dom") {
        serviceQualVal = chiroDom;
    } else if (vertical == "chiro" && serviceQual == "vel") {
        serviceQualVal = chiroVel;
    } else if (vertical == "chiro" && serviceQual == "prem") {
        serviceQualVal = chiroPrem;
    } else if (vertical == "chiro" && serviceQual == "adv") {
        serviceQualVal = chiroAdv;
    }

    //Set Metrics for Opto Lead Averages
    else if (vertical == "opto" && serviceQual == "dom") {
        serviceQualVal = optoDom;
    } else if (vertical == "opto" && serviceQual == "vel") {
        serviceQualVal = optoVel;
    } else if (vertical == "opto" && serviceQual == "prem") {
        serviceQualVal = optoPrem;
    } else if (vertical == "opto" && serviceQual == "adv") {
        serviceQualVal = optoAdv;
    } else {
        alert("One Or More Items Was Not Entered");
    }

    //Auto set visit amount to 1 if no entry
    if (visitAvg < 1) {
        visitAvgTot = 1;
    } else {
        visitAvgTot = visitAvg;
    }



    //Create Variables and Create Algorithm for monthly and yearly Calculations
    var totalM_rev = (serviceQualVal * acqPerFinal) * (valOne * visitAvgTot);
    var totalY_rev = ((serviceQualVal * acqPerFinal) * (valOne * visitAvgTot) * 12);
    var visitAvgRes = (Number(document.getElementById('visitAvg').value) * acqPerFinal);

    //Create Results for Monthly & Yearly Expected Rev Values & Average Patient Leads
    document.getElementById("totalM").innerHTML = "$" + Number(totalM_rev).toLocaleString('en');
    document.getElementById("totalY").innerHTML = "$" + Number(totalY_rev).toLocaleString('en');
    document.getElementById("serviceQualVal").innerHTML = (Number(serviceQualVal) * acqPerFinal).toFixed(0);
}