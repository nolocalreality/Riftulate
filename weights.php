<?php 

// base stats
$dex = 39439;
$str = 27250;
$AP = 45219;
$CP = 7863;
$PC = 34682;
$WDPS = 4420.8;

//multipliers
$dexMult = 0;
$strMult = 0;
$APMult = 0;
$WDPSMult = 0;
$dexBuff = 0;
$strBuff = 0;
$APBuff = 0;
$WDPSBuff = 0;

// additives
$CPRatingAdd = 0;
$PCRatingAdd = 0;
$dexAdd = 0;
$strAdd = 0;
$APAdd = 0;
$CPPercentAdd = 0;
$PCPercentAdd = 0;
$baseAP = 0;

?>


<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" type="text/css" href="riftulate.css" />
<script src="scripts/stats.js"></script>
<script src="scripts/weights.js"></script>
<script src="scripts/selectsouls.js"></script>
<title>Stat Weights</title>
</head>
    
<div class="headerdiv">RIFT Stat Weight Calculator
</div>

<div class="weightdiv">
    Calling:
<select id="callingselect" name="callingselect" onchange="selectCalling(this.value)"> 
    <option value="Cleric">Cleric</option>
    <option value="Mage">Mage</option>
    <option value="Primalist">Primalist</option>
    <option value="Rogue" selected>Rogue</option>
    <option value="Warrior">Warrior</option>
    </select><br /><br />
    
    
<label class="biglabel">Stats</label> <br /><br />
    <table>
        <tr><td><label class="MS">Main Stat</label></td><td><input type="text" id="dex" name="dex" value="<?php echo $dex; ?>" /></td> </tr>
        <tr><td><label class="OS">Off Stat</label></td><td><input type="text" id="str" name="str" value="<?php echo $str; ?>" /> </td></tr>
        <tr><td><label class="AP">AP/SP</label></td><td><input type="text" id="AP" name="AP" value="<?php echo $AP; ?>" /></td> </tr>
        <tr><td><label>Crit Power (rating)</label></td><td><input type="text" id="CP" name="CP" value="<?php echo $CP; ?>" /></td> </tr>
        <tr><td><label class="PC">Phys/Spell Crit (rating)</label></td><td><input type="text" id="PC" name="PC" value="<?php echo $PC; ?>" /></td> </tr>
        <tr id="WDPSrow"><td><label>Weapon DPS</label></td><td><input type="text" id="WDPS" name="WDPS" value="<?php echo $WDPS; ?>" /> 
        <input type="radio" name="WDPSradio" id="WDPS1h" value="1.3">1h 
        <input type="radio" name="WDPSradio" id="WDPS2h" value="1">2h 
            </td></tr> 
</table><br />
<button id="calc" onclick="doWeights()">Calculate</button> <br /><br />
</div>

<div class="specdiv"> 
Spec: 
<select id="specselect" name="specselect" onchange="selectSouls(this.value)"></select>
    <br /><br />
    <label id="specdesc">0/0/0</label>
<br /><br />
    <label class="biglabel">Passive Bonuses</label> <br />
    <table>
        <tr><td><label class="MS">Main Stat</label> Bonus</td><td><input type="text" id="dexmult" name="dexmult" value="<?php echo $dexMult; ?>" />% </td> </tr>
        <tr><td><label class="OS">Off Stat</label> Bonus</td><td><input type="text" id="strmult" name="strmult" value="<?php echo $strMult; ?>" />%</td> </tr>
        <tr><td><label class="AP">AP/SP</label> Bonus</td><td><input type="text" id="APmult" name="APmult" value="<?php echo $APMult; ?>" />% </td> </tr>
        <tr><td><label>Weapon DPS Bonus </label></td><td><input type="text" id="WDPSmult" name="WPDSmult" value="<?php echo $WDPSMult; ?>" />% </td> </tr>
        <tr><td>Base <label class="AP">AP/SP </label></td><td><input type="text" id="baseAP" name="baseAP" value="<?php echo $baseAP; ?>" /> </td> </tr>
        <tr><td>&nbsp; <br /> </td> </tr>
        <tr><td><label class="biglabel">Buffs</label> <br /> </td> </tr>
        <tr><td><label class="MS">Main Stat</label> Buff </td><td><input type="text" id="dexbuff" name="dexbuff" value="<?php echo $dexBuff; ?>" />% </td> </tr>
        <tr><td><label class="OS">Off Stat</label> Buff </td><td><input type="text" id="strbuff" name="strbuff" value="<?php echo $strBuff; ?>" />% </td> </tr>
        <tr><td><label class="AP">AP/SP</label> Buff </td><td><input type="text" id="APbuff" name="APbuff" value="<?php echo $APBuff; ?>" />% </td> </tr>
        <tr><td><label>WDPS Buff </label></td><td><input type="text" id="WDPSbuff" name="WDPSbuff" value="<?php echo $WDPSBuff; ?>" />% </td> </tr>
        <tr><td>&nbsp; <br /> </td> </tr>
        <tr><td><label class="biglabel">Both</label> <br /> </td> </tr>
        <tr><td><label>Crit Power </label></td><td><input type="text" id="CPpercentadd" name="CPpercentadd" value="<?php echo $CPPercentAdd; ?>" />% </td> </tr>
        <tr><td><label>Crit Chance </label></td><td><input type="text" id="PCpercentadd" name="PCpercentadd" value="<?php echo $PCPercentAdd; ?>" />% </td> </tr>
        </table>
        <br />

</div>

<div class="resultcontainer">




<br />
<div class="resultdiv">
    <label class="biglabel">Solo Weights</label> <br /><br />
<label id="dexweight">0</label> <label class="MS">Main Stat</label> <br />
<label id="strweight">0</label> <label class="OS">Off Stat</label> <br />
<label id="cpweight">0</label> Crit Power Rating <br />
<label id="pcweight">0</label> Crit Chance Rating <br />
<label id="WDPSweight">0</label> Weapon DPS <br /><br /><br />
    <label class="biglabel">Raid Bufffed Weights</label> <br /><br />
<label id="raiddexweight">0</label> <label class="MS">Main Stat</label> <br />
<label id="raidstrweight">0</label> <label class="OS">Off Stat</label> <br />
<label id="raidcpweight">0</label> Crit Power Rating <br />
<label id="raidpcweight">0</label> Crit Chance Rating <br />
<label id="raidWDPSweight">0</label> Weapon DPS <br /><br />
</div>

<div class="resultdiv">
1 <label class="AP">AP</label> = <br />
<label id="dexAP">0</label> <label class="MS">Main Stat</label> <br />
<label id="strAP">0</label> <label class="OS">Off Stat</label> <br />
<label id="cpAP">0</label> Crit Power Rating <br />
<label id="pcAP">0</label> Crit Chance Rating <br />
<label id="WDPSAP">0</label> Weapon DPS <br /><br />
1 <label class="AP">AP</label> = <br />
<label id="raiddexAP">0</label> <label class="MS">Main Stat</label> <br />
<label id="raidstrAP">0</label> <label class="OS">Off Stat</label> <br />
<label id="raidcpAP">0</label> Crit Power Rating <br />
<label id="raidpcAP">0</label> Crit Chance Rating <br />
<label id="raidWDPSAP">0</label> Weapon DPS <br /><br />
</div>

<div class="effdiv">
    <label id="effAP">0</label> &nbsp; <label class="AP"> AP/SP</label> &nbsp; <label id="raideffAP">0</label><br /> 
    <label id="totalAP">0</label> &nbsp; Effective <label class="AP"> AP/SP</label> &nbsp; <label id="raidtotalAP">0</label><br />
    <label id="effCP">0</label> &nbsp; CP &nbsp; <label id="raideffCP">0</label><br />
    <label id="effPC">0</label> &nbsp; Crit Chance &nbsp; <label id="raideffPC">0</label><br /><br />
</div>
    
</div>

<div class="geardiv">
    Gear Comparison
    <table>
        <tr><td><input type="text" id="geardex" name="geardex" value="0" /></td><td> Main Stat </td><td><input type="text" id="geardex2" name="geardex2" value="0" /> </td> </tr>
        <tr><td><input type="text" id="gearstr" name="gearstr" value="0" /></td><td> Off Stat </td><td><input type="text" id="gearstr2" name="gearstr2" value="0" /></td> </tr>
        <tr><td><input type="text" id="gearAP" name="gearAP" value="0" /></td><td> AP/SP </td><td><input type="text" id="gearAP2" name="gearAP2" value="0" /> </td> </tr>
        <tr><td><input type="text" id="gearcp" name="gearcp" value="0" /></td><td> Crit Power Rating </td><td><input type="text" id="gearcp2" name="gearcp2" value="0" /></td> </tr>
        <tr><td><input type="text" id="gearpc" name="gearpc" value="0" /></td><td> Crit Chance Rating </td><td><input type="text" id="gearpc2" name="gearpc2" value="0" /></td> </tr>
        <tr><td><input type="text" id="gearWDPS" name="gearWDPS" value="0" /></td><td> Weapon DPS </td><td><input type="text" id="gearWDPS2" name="gearWDPS2" value="0" /></td> </tr>
        <tr><td><button id="gearcalc" onclick="doGearWeight()">Calculate</button></td> </tr>
        <tr><td>&nbsp;</td> </tr>
        <tr><td><label id="gearweight">0</label></td><td> Solo Rating </td><td><label id="gearweight2">0</label> </td> </tr>
        <tr><td><label id="raidgearweight">0</label></td><td> Raid Rating </td><td><label id="raidgearweight2">0</label></td> </tr>
    </table>
        <br /><br /> 

</div>

<script>
var buildsJSON = `<?php include 'scripts/souls.json'; ?>`;
var soulOption;
var soulSelect = document.getElementById("specselect");

builds = JSON.parse(buildsJSON);


selectCalling("Rogue")
selectSouls(0);

</script>


</html>