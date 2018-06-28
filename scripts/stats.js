// Stats object
function Stats() {
	//constants
	/* 65 values
    this.CPSoftCap = 3123;
	this.CPRatingToPercent = 0.0128;
	this.CPHardCap = 7028;
	this.PCSoftCap = 13140;
	this.PCRatingToPercent = 0.00342;
	this.PCHardCap = 21930;
    */
    // 70 values
    this.CPSoftCap = 9140;
	this.CPRatingToPercent = 0.0043764;
	this.CPHardCap = 20565;
	this.PCSoftCap = 42252;
	this.PCRatingToPercent = 0.001065;
	this.PCHardCap = 112671;
	// stat sheet values
	this.Dex = 0;
	this.Str = 0;
	this.AP = 0;
	this.CP = 0;
	this.PC = 0;
	this.WDPS = 0;
    this.WDPSMult = 5; // 1h = 6.5, 2h = 5, casters = 0
	// spec values -- PASSIVES
	this.APBonus = 1;
	this.DexBonus = 1;
	this.StrBonus = 1;
	this.WDPSBonus = 1;
	this.BaseAP = 0;
	// buffs
	this.APBuff = 0;
	this.WDPSBuff = 0;
	this.DexBuff = 0;
	this.StrBuff = 0;
	this.CPBuff = 0;
	// percent changes - passive OR buff (total)
	this.CPBonusPercent = 0;	
	this.PCBonusPercent = 0;
	// weights are set by weight function
	this.CPWeight = 0;
	this.PCWeight = 0;
	this.StrWeight = 0;
	this.DexWeight = 0;
	this.WDPSWeight = 0;
	this.EffAP = 0;
	this.EffDex = 0;
	this.EffStr = 0;
	this.EffCP = 0;
	this.EffPC = 0;
	this.IsRaidBuffed = false;
	this.IsSelfBuffed = false;
    this.TotalAP = 0;
	

	
	this.doCP = function(tempCP) {
		
	    if (tempCP < this.CPSoftCap)
	    {
	    	return tempCP * this.CPRatingToPercent;
	    }
	    else if (tempCP < this.CPHardCap)
	    {
	    	return 40 + (tempCP - this.CPSoftCap) * this.CPRatingToPercent * 0.2;
	    }
	    else
	    {
	    	return 50;
	    }
	}
	
	this.doPC = function(tempPC) { 
		
	    if (tempPC < this.PCSoftCap)
	    {
	    	return tempPC * this.PCRatingToPercent;
	    }
	    else if (tempPC < this.PCHardCap)
	    {
	    	return 45 + (tempPC - this.PCSoftCap) * this.PCRatingToPercent * 0.2;
	    }
	    else
	    {
	    	return 60;
	    }		
		
	}
	
	Object.defineProperties(this, { "CPPercent":  { "get": function(){ return this.doCP(this.EffCP);}}});
	
	Object.defineProperties(this, { "PCPercent":  { "get": function () { return this.doPC(this.EffPC)}}});
	
	
	
	
	this.doWeights = function() {
		
		var tCP = 0;
		var tPC = 0;
		var tAP = 0;
		var tWDPS = 0;
		
		if (!this.IsSelfBuffed) {
			this.SelfBuff();
		}
		
		tCP = this.CPPercent + this.CPBonusPercent;
		tCP = tCP / 100 + 0.5; // to decimal, with 50% base CP 
		
		tPC = this.PCPercent + this.PCBonusPercent;
		tPC = tPC / 100;  // to decimal
		
		tAP = this.BaseAP + this.EffAP;
		tWDPS = this.WDPS * this.WDPSMult * this.WDPSBonus * (1 + this.WDPSBuff); //wdps is not changed by buff functions, only here
		tAP +=tWDPS;
        
        this.TotalAP = tAP;
		
		this.CPWeight = (tAP * tPC) / (1 + tCP * tPC);
		this.CPWeight = this.CPWeight / (this.APBonus * (1 + this.APBuff));
		this.CPWeight = this.CPWeight * this.CPRatingToPercent * 0.01 ; // to decimal
		if (this.EffCP < this.CPSoftCap)
		{
			
		}
		else if (this.EffCP < this.CPHardCap)
		{
			this.CPWeight = this.CPWeight * 0.2;
		}
		else
		{
			this.CPWeight = 0;
		}
		

		this.PCWeight = (tAP * tCP) / (1 + tCP * tPC);
		this.PCWeight = this.PCWeight / (this.APBonus * (1 + this.APBuff));
		this.PCWeight = this.PCWeight * this.PCRatingToPercent * 0.01 ; // to decimal
		if (this.EffPC < this.PCSoftCap)
		{
			
		}
		else if (this.EffPC < PCHardCap)
		{
			this.PCWeight = this.PCWeight * 0.2;
		}
		else
		{
			this.PCWeight = 0;
		}
		
		
		this.DexWeight = (0.75 + 0.5 * this.PCWeight) * this.DexBonus * (1 + this.DexBuff);
		this.StrWeight = (0.25 + 0.5 * this.PCWeight) * this.StrBonus * (1 + this.StrBuff);
		this.WDPSWeight = this.WDPSMult * this.WDPSBonus * (1 + this.WDPSBuff) / (this.APBonus* (1 + this.APBuff));
	};
	
	this.SelfBuff = function() {

		if (this.IsSelfBuffed) {
			return;
		}
		
		var APAdd = 0; 
		var DexAdd = 0;
		var StrAdd = 0; 
		var CPAdd = 0;
		var PCAdd = 0;
		var DexPercent = 0;
		var StrPercent = 0;
		var APPercent = 0;
		

		DexAdd += this.Dex * this.DexBuff;
		StrAdd += this.Str * this.StrBuff;
		APAdd += this.AP * this.APBuff + 0.75 * DexAdd + 0.25 * StrAdd;
		PCAdd += 0.5 * DexAdd + 0.5 * StrAdd;
		
		
		this.EffAP =this.AP + APAdd;
		this.EffDex = this.Dex + DexAdd;
		this.EffStr = this.Str + StrAdd;
		this.EffCP = this.CP + CPAdd; 
		this.EffPC = this.PC + PCAdd;
		
		
		this.IsSelfBuffed = true;
	}
	
	
	this.RaidBuff = function() {
		
		if (this.IsRaidBuffed) {
			return;
		}
		
		var APAdd = 0; 
		var DexAdd = 0;
		var StrAdd = 0; 
		var CPAdd = 0;
		var PCAdd = 0;
		var DexPercent = 0;
		var StrPercent = 0;
		var APPercent = 0;
		var CPPercent = 0;
		
		// consumables
		APAdd += 2000; // stones
		DexAdd += 1400; // pot
		StrAdd += 1400;
		APAdd += 900 ; // feast
		CPAdd += 300;
		
		// permanent buffs
		
		this.DexBuff += 0.05; // resonance/vital insp
		DexPercent += 0.05;
		this.StrBuff += 0.05;
		StrPercent += 0.05;
		
		DexAdd += 1000;  //fanfare of power/boon of resurgence
		StrAdd += 1000;
		
		this.CPBuff += 0.03; // sigils
		CPPercent += 0.03;
		this.APBuff += 0.02;
		APPercent += 0.02;
		
		APAdd += 2500; //motif of bravery/insp of battle
		this.PCBonuspercent += 1;
		
		this.PCBonusPercent += 5; // lethal
		
		//earthen barrage 
		this.PCBonusPercent += 7;
		
		//vitality of stone
		DexAdd += 70;
		StrAdd += 70;
		
		
		// limited duration buffs
		
		// flaring power
		// enrage
		
		
		//add it all up -- use local variables to avoid readding passives bonuses /  spec bonuses
		DexAdd += this.Dex * DexPercent;
		StrAdd += this.Str * StrPercent;
		APAdd += (this.AP * APPercent + 0.75 * DexAdd + 0.25 * StrAdd) * (1 + APPercent);
		PCAdd += 0.5 * DexAdd + 0.5 * StrAdd;
		CPAdd += this.CP * CPPercent;
		
		
		this.EffAP += APAdd;
		this.EffDex += DexAdd;
		this.EffStr += StrAdd;
		this.EffCP += CPAdd; 
		this.EffPC += PCAdd;
		
		this.IsRaidBuffed = true;
		
	}
		
};
// end Stats object
