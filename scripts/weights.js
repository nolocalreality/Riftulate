
/* 65 values
var CPSoftCap = 3123;
var CPRatingToPercent = 0.0128;
var CPHardCap = 7028;

var PCSoftCap = 13140;
var PCRatingToPercent = 0.00342;
var PCHardCap = 21930;
*/

// 70 values
var CPSoftCap = 9074;
var CPRatingToPercent = 0.004408274;
var CPHardCap = 20416;

var PCSoftCap = 42244;
var PCRatingToPercent = 0.0010652463;
var PCHardCap = 112650;

function convCPRatingToPercent(CPRating)  {
	
	var CPPercent = 0;
	
    if (CPRating < CPSoftCap)
    {
    	CPPercent = CPRating * CPRatingToPercent;
    }
    else if (CPRating < CPHardCap)
    {
    	CPPercent = 40 + (CPRating - CPSoftCap) * CPRatingToPercent * 0.2;
    }
    else
    {
    	CPPercent = 50;
    }
    
    return CPPercent;
    
}

function convPCRatingToPercent(PCRating)  {
	
	var PCPercent = 0;
	
    if (PCRating < PCSoftCap)
    {
    	PCPercent = PCRating * PCRatingToPercent;
    }
    else if (PCRating < PCHardCap)
    {
    	PCPercent = 45 + (PCRating - PCSoftCap) * PCRatingToPercent * 0.2;
    }
    else
    {
    	PCPercent = 60;
    }
    
    return PCPercent;
    
}


function doWeights() {

	
	var stat = new Stats();
		
	stat.Dex = parseInt(document.getElementById("dex").value, 10) || 0;
	stat.Str = parseInt(document.getElementById("str").value, 10) || 0;
	stat.AP = parseInt(document.getElementById("AP").value, 10) || 0;
	stat.CP = parseInt(document.getElementById("CP").value, 10) || 0;
	stat.PC = parseInt(document.getElementById("PC").value, 10) || 0;
	stat.WDPS = parseFloat(document.getElementById("WDPS").value) || 0;
	stat.APBonus = 1 + parseInt(document.getElementById("APmult").value, 10)/100 || 1;
	stat.DexBonus = 1 + parseInt(document.getElementById("dexmult").value, 10)/100 || 1;
	stat.WDPSBonus = 1 + parseInt(document.getElementById("WDPSmult").value, 10)/100 || 1;
	stat.CPBonusPercent = parseInt(document.getElementById("CPpercentadd").value, 10) || 0;
	stat.PCBonusPercent =  parseInt(document.getElementById("PCpercentadd").value, 10) || 0;
	stat.BaseAP = parseInt(document.getElementById("baseAP").value, 10) || 0;
	stat.APBuff = parseInt(document.getElementById("APbuff").value, 10) || 0;
	stat.WDPSBuff = parseInt(document.getElementById("WDPSbuff").value, 10) || 0;
	stat.DexBuff = parseInt(document.getElementById("dexbuff").value, 10) || 0;
	stat.StrBuff = parseInt(document.getElementById("strbuff").value, 10) || 0;
	
    // check weapon DPS stuff
    if ((document.getElementById("callingselect").value == "Mage") || (document.getElementById("callingselect").value == "Cleric")) {
        stat.WDPSMult = 0;   
    }
    else if (document.getElementById("WDPS1h").checked) {
        stat.WDPSMult = 6.5;   
    }
    else {
        stat.WDPSMult = 5;   
    }
    
	stat.doWeights();
	

	
	// update results
	document.getElementById("dexweight").innerHTML = stat.DexWeight.toFixed(2);
	document.getElementById("strweight").innerHTML = stat.StrWeight.toFixed(2);
	document.getElementById("pcweight").innerHTML = stat.PCWeight.toFixed(2);
	document.getElementById("cpweight").innerHTML = stat.CPWeight.toFixed(2);
	document.getElementById("WDPSweight").innerHTML = stat.WDPSWeight.toFixed(2);
	
	document.getElementById("effAP").innerHTML = stat.EffAP.toFixed(0);
    document.getElementById("totalAP").innerHTML = stat.TotalAP.toFixed(0);
	document.getElementById("effPC").innerHTML = stat.EffPC.toFixed(0).toString() + " (" + (stat.PCPercent + stat.PCBonusPercent).toFixed(2).toString() + "%)";
	document.getElementById("effCP").innerHTML = stat.EffCP.toFixed(0).toString()+ " (" + stat.CPPercent.toFixed(2).toString() + "%)";
	
	document.getElementById("dexAP").innerHTML = (1/stat.DexWeight).toFixed(2);
	document.getElementById("strAP").innerHTML = (1/stat.StrWeight).toFixed(2);
	document.getElementById("pcAP").innerHTML = (1/stat.PCWeight).toFixed(2);
	document.getElementById("cpAP").innerHTML = (1/stat.CPWeight).toFixed(2);
	document.getElementById("WDPSAP").innerHTML = (1/stat.WDPSWeight).toFixed(2);
	
	stat.RaidBuff();
	stat.doWeights();
	
	document.getElementById("raiddexweight").innerHTML = stat.DexWeight.toFixed(2);
	document.getElementById("raidstrweight").innerHTML = stat.StrWeight.toFixed(2);
	document.getElementById("raidpcweight").innerHTML = stat.PCWeight.toFixed(2);
	document.getElementById("raidcpweight").innerHTML = stat.CPWeight.toFixed(2);
	document.getElementById("raidWDPSweight").innerHTML = stat.WDPSWeight.toFixed(2);
	
	document.getElementById("raideffAP").innerHTML = stat.EffAP.toFixed(0);
    document.getElementById("raidtotalAP").innerHTML = stat.TotalAP.toFixed(0);
	document.getElementById("raideffPC").innerHTML = stat.EffPC.toFixed(0).toString() + " (" + (stat.PCPercent + stat.PCBonusPercent).toFixed(2).toString() + "%)";
	document.getElementById("raideffCP").innerHTML =  stat.EffCP.toFixed(0).toString()+ " (" + stat.CPPercent.toFixed(2).toString() + "%)";
	
	document.getElementById("raiddexAP").innerHTML = (1/stat.DexWeight).toFixed(2);
	document.getElementById("raidstrAP").innerHTML = (1/stat.StrWeight).toFixed(2);
	document.getElementById("raidpcAP").innerHTML = (1/stat.PCWeight).toFixed(2);
	document.getElementById("raidcpAP").innerHTML = (1/stat.CPWeight).toFixed(2);
	document.getElementById("raidWDPSAP").innerHTML = (1/stat.WDPSWeight).toFixed(2);
	
	
}


function doGearWeight() {

	var gearWeight = 0;
	var gearWeightRaid = 0;
	var gearWeight2 = 0;
	var gearWeightRaid2 = 0;
	
	gearWeight += parseInt(document.getElementById("gearAP").value, 10) || 0;
	gearWeight += (parseInt(document.getElementById("geardex").value, 10) * parseFloat(document.getElementById("dexweight").innerHTML, 10)) || 0;
	gearWeight += (parseInt(document.getElementById("gearstr").value, 10) * parseFloat(document.getElementById("strweight").innerHTML, 10)) || 0;
	gearWeight += (parseInt(document.getElementById("gearcp").value, 10) * parseFloat(document.getElementById("cpweight").innerHTML, 10)) || 0;
	gearWeight += (parseInt(document.getElementById("gearpc").value, 10) * parseFloat(document.getElementById("pcweight").innerHTML, 10)) || 0;
	gearWeight += (parseInt(document.getElementById("gearWDPS").value, 10) * parseFloat(document.getElementById("WDPSweight").innerHTML, 10)) || 0;
	
	gearWeight2 += parseInt(document.getElementById("gearAP2").value, 10) || 0;
	gearWeight2 += (parseInt(document.getElementById("geardex2").value, 10) * parseFloat(document.getElementById("dexweight").innerHTML, 10)) || 0;
	gearWeight2 += (parseInt(document.getElementById("gearstr2").value, 10) * parseFloat(document.getElementById("strweight").innerHTML, 10)) || 0;
	gearWeight2 += (parseInt(document.getElementById("gearcp2").value, 10) * parseFloat(document.getElementById("cpweight").innerHTML, 10)) || 0;
	gearWeight2 += (parseInt(document.getElementById("gearpc2").value, 10) * parseFloat(document.getElementById("pcweight").innerHTML, 10)) || 0;
	gearWeight2 += (parseInt(document.getElementById("gearWDPS2").value, 10) * parseFloat(document.getElementById("WDPSweight").innerHTML, 10)) || 0;
	
	document.getElementById("gearweight").innerHTML = gearWeight.toFixed(2);
	document.getElementById("gearweight2").innerHTML = gearWeight2.toFixed(2);
	
	
	gearWeightRaid += parseInt(document.getElementById("gearAP").value, 10) || 0;
	gearWeightRaid += (parseInt(document.getElementById("geardex").value, 10) * parseFloat(document.getElementById("raiddexweight").innerHTML, 10)) || 0;
	gearWeightRaid += (parseInt(document.getElementById("gearstr").value, 10) * parseFloat(document.getElementById("raidstrweight").innerHTML, 10)) || 0;
	gearWeightRaid += (parseInt(document.getElementById("gearcp").value, 10) * parseFloat(document.getElementById("raidcpweight").innerHTML, 10)) || 0;
	gearWeightRaid += (parseInt(document.getElementById("gearpc").value, 10) * parseFloat(document.getElementById("raidpcweight").innerHTML, 10)) || 0;
	gearWeightRaid += (parseInt(document.getElementById("gearWDPS").value, 10) * parseFloat(document.getElementById("raidWDPSweight").innerHTML, 10)) || 0;
	
	gearWeightRaid2 += parseInt(document.getElementById("gearAP2").value, 10) || 0;
	gearWeightRaid2 += (parseInt(document.getElementById("geardex2").value, 10) * parseFloat(document.getElementById("raiddexweight").innerHTML, 10)) || 0;
	gearWeightRaid2 += (parseInt(document.getElementById("gearstr2").value, 10) * parseFloat(document.getElementById("raidstrweight").innerHTML, 10)) || 0;
	gearWeightRaid2 += (parseInt(document.getElementById("gearcp2").value, 10) * parseFloat(document.getElementById("raidcpweight").innerHTML, 10)) || 0;
	gearWeightRaid2 += (parseInt(document.getElementById("gearpc2").value, 10) * parseFloat(document.getElementById("raidpcweight").innerHTML, 10)) || 0;
	gearWeightRaid2 += (parseInt(document.getElementById("gearWDPS2").value, 10) * parseFloat(document.getElementById("raidWDPSweight").innerHTML, 10)) || 0;
	
	document.getElementById("raidgearweight").innerHTML = gearWeightRaid.toFixed(2);
	document.getElementById("raidgearweight2").innerHTML = gearWeightRaid2.toFixed(2);
	
}