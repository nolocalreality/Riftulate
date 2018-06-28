function selectSouls(soulIndex){
	document.getElementById("dexmult").value = builds.souls[soulIndex].DexBonus;
	document.getElementById("strmult").value = builds.souls[soulIndex].StrBonus;
	document.getElementById("APmult").value = builds.souls[soulIndex].APBonus;
	document.getElementById("WDPSmult").value = builds.souls[soulIndex].WDPSBonus;
	document.getElementById("baseAP").value = builds.souls[soulIndex].BaseAP;
	document.getElementById("dexbuff").value = builds.souls[soulIndex].DexBuff;
	document.getElementById("strbuff").value = builds.souls[soulIndex].StrBuff;
	document.getElementById("APbuff").value = builds.souls[soulIndex].APBuff;
	document.getElementById("WDPSbuff").value = builds.souls[soulIndex].WDPSBuff;
	document.getElementById("CPpercentadd").value = builds.souls[soulIndex].CPBonusPercent;
	document.getElementById("PCpercentadd").value = builds.souls[soulIndex].PCBonusPercent;
	document.getElementById("specdesc").innerHTML = builds.souls[soulIndex].Description;
    
}

function selectCalling(callingID){

    var MS = "Dexterity";
    var OS = "Strength";
    var AP = "AP";
    var PC = "Phys Crit";
    
    
    if (callingID == "Warrior") {
        MS = "Strength";
        OS = "Dexterity";
        AP = "AP";
        PC = "Phys Crit";
        document.getElementById("WDPSrow").style.display = "";
    }
    else if (callingID == "Mage") {
        MS = "Intelligence";
        OS = "Wisdom";
        AP = "SP";
        PC = "Spell Crit";
        document.getElementById("WDPSrow").style.display = "none";
    }
    else if (callingID == "Cleric") {
        OS = "Intelligence";
        MS = "Wisdom";
        AP = "SP";
        PC = "Spell Crit";
        document.getElementById("WDPSrow").style.display = "none";
    }
    else if (callingID == "Rogue") {
        MS = "Dexterity";
        OS = "Strength";
        AP = "AP";
        PC = "Phys Crit";        
        document.getElementById("WDPS1h").checked = true;    
        document.getElementById("WDPSrow").style.display = "";
    }
    else if (callingID == "Primalist") {
        MS = "Dexterity";
        OS = "Strength";
        AP = "AP";
        PC = "Phys Crit";        
        document.getElementById("WDPS2h").checked = true;
        document.getElementById("WDPSrow").style.display = "";
    }
    
    

    
    var repLabels = document.getElementsByClassName("MS");
    for (i = 0; i < repLabels.length; i++)
    {
        repLabels[i].innerHTML = MS;
    }
    
    repLabels = document.getElementsByClassName("OS");
    for (i = 0; i < repLabels.length; i++)
    {
        repLabels[i].innerHTML = OS;
    }

    repLabels = document.getElementsByClassName("AP");
    for (i = 0; i < repLabels.length; i++)
    {
        repLabels[i].innerHTML = AP;
    }
    
    setSpecOptionsByCalling(callingID)
    
}

function setSpecOptionsByCalling(callingID)
{
    var soulOption;
    var soulSelect = document.getElementById("specselect");
    
    removeOptions(soulSelect);
    
    for (var i = 0; i < builds.souls.length; i++) {
        if ((builds.souls[i].Calling == callingID) || (builds.souls[i].Calling == "Any")) {
            soulOption = document.createElement("option");
            soulOption.text = builds.souls[i].Name;
            soulOption.value = i;
            soulSelect.add(soulOption, i);
        }
    }    
    
    
}


// copied from stack overflow
function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}


