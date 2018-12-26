// *************************************************************************************************************
// *************************************************************************************************************
//           Jean-Paul Sansonnet Specific code of application: FIFI   V0.2  january 31, 2012
// *************************************************************************************************************
// *************************************************************************************************************


/* ------------------------------------------------

MAIN TAGS:
	KEY		reference to the attribute	mandatory
	VAL		content of the attribute	mandatory
	CAT		category of attribute		default = INFO
	TYPE	type of data in VAL			default = STR

CATS:
	INFO	static information -- default
	VAR		dynamic information
	ACT		static action 
	PRO		static process  -- nyi TODO
	REL	    dynamic pointer to another topic

TYPES:		javascript types of tag VAL
	STR		string or array of strings -- default
	INT		integer or array of integer
	BOOL	boolean
	EXPR	code wrapped into a string

SPECIFIC TAGS:	WHY, EFFECT, REVERSE, UNDO

------------------------------------------------ */




// ====================================================================
//                       MODEL TOPICS DESCRIPTION
// ====================================================================


// ======================  TOPIC CYRIL  ======================
var fifiTopic = [
	// INFO
	[["KEY", "_class"],						["VAL", "bot"], ["BOT","fifiBot"]],
	[["KEY", "_reference"],					["VAL", ["f","fifi","dog"]]],
	[["KEY", "_htmlprefix"],				["VAL", "fifi"]], //prefix of HTML elements  
	[["KEY", "_read"],						["VAL", ["userTopic","daisiTopic","counterTopic"]]],
	[["KEY", "_write"],						["VAL", ["userTopic","counterTopic"]]],
	[["KEY", "_exec"],						["VAL", ["userTopic","counterTopic"]]], // try
	[["KEY", "type"],						["VAL", ["animal","dog"]]],
	[["KEY", "name"],						["VAL", "Fifi"],   				
											["WHY","My master gave it to me. Actually, I am very happy about it"]
											],
	[["KEY", "age"],						["VAL", 3], ["TYPE","INT"],
											["ONASK", "I am three year old"], 
											["WHY","I was born three years ago"]
											],
	[["KEY", "toto"], 						["ONASK", function() {alert("coucou");}]],
	[["KEY", "titi"], 						["ONASK", function() {elem = document.getElementById('test'); elem.innerHTML = "<img src='http://placehold.it/350x150'/>";}]],
	[["KEY", "gender"],						["VAL", "male"],
											["ONASK", function(s) { return ((s == "male") ? "I am proud to be a male!" : "Just a female") }]
											],
	[["KEY", ["job"]],			          	["VAL", "I am a pet"]],
	[["KEY", ["home","location"]],		    ["VAL", "I live in Orsay"]],
	[["KEY", "usage"],						["VAL", "_UN_, I can control the counter for you"]],
	[["KEY", "date"],						["VAL", function(){return new Date()}],
											["WHY","Because I asked JavaScript to calculate it for me"]
											],
	// REL
	[["KEY", "relative"],		["VAL", ["pal"]], // acquaintances with BEINGS(bots): mother,father,son,daughter,brother,sister,pal,boss,pet,...
								["ONASK", BOT_printRelativeList],
								], 
	[["KEY", "pal"],			["VAL", "daisieTopic"],["CAT","REL"]],
	[["KEY", "tool"],			["VAL", "counterTopic"],["CAT","REL"]],
	// FEELINGS
	[["KEY", "happiness"],		["VAL", 0.8], ["CAT","VAR"], ["TYPE","INT"]], // 7 standard feelings iniitated
	[["KEY", "confidence"],		["VAL", -0.8], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "irritability"],	["VAL", 0.8], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "satisfaction"],	["VAL", -0.8], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "respect"],		["VAL", -0.8], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "force"],			["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "excitement"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	// PREFS
	[["KEY", "preference"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printPreferenceList]],  
	[["KEY", "distaste"],		["VAL", []],  ["CAT","VAR"],["ONASK",BOT_printDistasteList]], 
	[["KEY", "suggestion"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printSuggestionList]], 
	[["KEY", "intention"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printIntentionList]],  
	// FUNC
	[["KEY", "action"],			["VAL", ["compute"]]],
	[["KEY", "compute"],		["VAL", "func_compute"], ["CAT","ACT"],
								["HOW","You must type a valid javascript expression"],
								["EFFECT","compute the expression"]
								]
];


 


// ======================  TOPIC ELSI  ======================
var daisieTopic = [
	// INFO
	[["KEY", "_class"],						["VAL", "bot"], ["BOT","daisieBot"]],
	[["KEY", "_reference"],					["VAL", ["d","daisie","flower"]]],
	[["KEY", "_htmlprefix"],				["VAL", "daisie"]], //prefix of HTML elements  
	[["KEY", "_read"],						["VAL", ["daisieTopic","userTopic"]]],
	[["KEY", "_write"],						["VAL", []]],
	[["KEY", "_exec"],						["VAL", ["userTopic","counterTopic"]]],
	[["KEY", "type"],						["VAL", ["vegetal","flower"]]],
	[["KEY", "name"],						["VAL", "Daisie"],
											["WHY","My gardener gave it to me"]
											],
	[["KEY", "age"],						["VAL", 1],["TYPE","INT"],
											["ONASK","I am one year old"], ["WHY","I was born one years ago"]
											],
	[["KEY", "gender"],						["VAL", "female"],
											["ONASK", function(s) { return ((s == "male") ? "I am proud to be a male!" : "Just a female") }]
											],
	[["KEY", ["job"]],			          	["VAL", "I am a basic component of a bouquet"]],
	[["KEY", ["home","location"]],		    ["VAL", "I live in Paris"]],
	[["KEY", "usage"],						["VAL", "_UN_, I can do mothing"]],
	[["KEY", "date"],						["VAL", "To ask for a date with me type: suggest meeting"],
											["WHY","Because asking is about information not action"]
											],
	// REL
	[["KEY", "relative"],					["VAL", ["pal"]],
											["ONASK", BOT_printRelativeList],
											], 
	[["KEY", "pal"],					["VAL", "fifiTopic"],["CAT","REL"]],
	// FEELINGS
	[["KEY", "happiness"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]], // 7 standard feelings
	[["KEY", "confidence"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "irritability"],	["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "satisfaction"],	["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "respect"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "force"],			["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "excitement"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	// FUNC
	[["KEY", "action"],						["VAL", ["meeting"]]],
	[["KEY", "meeting"],					["VAL", ""], ["CAT","ACT"],
											["EFFECT","fix a meeting with me"]
											]
];


// =======================  TOPIC USER  ========================
var userTopic = [
	// INFO 
	[["KEY", "_class"],			["VAL", "user"]],
	[["KEY", "_reference"],		["VAL", ["me","my","user"]]],
	[["KEY", "type"],			["VAL", ["person"]]],
	// VAR 
	[["KEY", "name"],			["VAL", "User"], ["CAT","VAR"],
								["WHY", "because I don't know it yet"]
								],
	[["KEY", "age"],			["VAL", "unknown"],	["CAT","VAR"]],
	[["KEY", "gender"],			["VAL", "unknown"],	["CAT","VAR"]],
	[["KEY", "job"],			["VAL", "unknown"],	["CAT","VAR"]],
	// OPINIONS
	[["KEY", "judgement"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printJudgementList]], // 6 standard opinions 
	[["KEY", "preference"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printPreferenceList]], 
	[["KEY", "distaste"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printDistasteList]], 
	[["KEY", "suggestion"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printSuggestionList]],  
	[["KEY", "objection"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printObjectionList]],  
	[["KEY", "intention"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printIntentionList]],  
	// FEELINGS
	[["KEY", "happiness"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]], // 7 standard feelings
	[["KEY", "confidence"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "irritability"],	["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "satisfaction"],	["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "respect"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "force"],			["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "excitement"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
	// REL
	[["KEY", "relative"],		["VAL", []]] // none
];


	
// ======================  TOPIC COUNTER  ======================

var counterTopic = [
	// INFO 
	[["KEY", "_class"],		["VAL", "component"]],
	[["KEY", "_reference"],	["VAL", ["c","cpt","counter","counting"]]],
	[["KEY", "type"],		["VAL", "counter"]],
	[["KEY", "name"],		["VAL", "Counter"]],
	[["KEY", "gender"],		["VAL", ""],
							["ONASK","I have no gender"],
							["WHY","Because I am not a human nor an animal!"]
							],
	[["KEY", "usage"],		["VAL", "_UN_, a counter can be useful for counting things"]],
	// REL
	[["KEY", "relative"],	["VAL", "operator"]], // viewed as boss
	[["KEY", "operator"],	["VAL", "fifiTopic"],	["CAT","REL"]],
	// VAR 
	[["KEY", "status"],		["VAL", "off"],  		["CAT","VAR"], ["TYPE","STR"]], 	// on|off is running ["TYPE","STR"] is default
	[["KEY", "direction"],	["VAL", "up"],  		["CAT","VAR"], ["TYPE","STR"]],		// up|down is is increasing|decresing
	[["KEY", "value"],		["VAL", 0], ["OLD",0], 	["CAT","VAR"], ["TYPE","INT"]],		// initial value of the counter	 
	[["KEY", "step"],		["VAL", 1],    			["CAT","VAR"], ["TYPE","INT"]],
	[["KEY", "speed"],		["VAL", 1000], 			["CAT","VAR"], ["TYPE","INT"]],		// tempo of the loop coco_loop()
	[["KEY", "alert"],		["VAL", 'alert(1+1)'],	["CAT","VAR"], ["TYPE","EXPR"]],	// expression in string to be evaluated
	// FUNC
	[["KEY", "action"],		["VAL", ["start","stop","faster","slower","set","reset","count"]],
							["ONASK",BOT_printActionList],
							],
	[["KEY", "start"],		["VAL", "func_start"], ["CAT","ACT"],
							["REVERSE","stop"],
							["HOW","a"],
							["EFFECT","starts  _TN_"]
							],  
	[["KEY", "stop"],		["VAL", "func_stop"], ["CAT","ACT"],
							["REVERSE","start"],
							["HOW","b"],
							["EFFECT","stops _TN_"]
							],  
	[["KEY", "faster"],		["VAL", "func_faster"], ["CAT","ACT"],
							["REVERSE","slower"],
							["HOW","c"],
							["EFFECT","increases the speed of _TN_"]
							],  
	[["KEY", "slower"],		["VAL", "func_slower"], ["CAT","ACT"],
							["REVERSE","faster"],
							["HOW","d"],
							["EFFECT","decreases the speed of _TN_"]
							], 
	[["KEY", "set"],		["VAL", "func_setvalue"], ["CAT","ACT"], 
							["UNDO","_unset"],
							["HOW","e"],
							["EFFECT","sets the value of _TN_ with a given number"]
							], 
	[["KEY", "reset"],		["VAL", ["func_setvalue",0]], ["CAT","ACT"],
							["UNDO","_unset"],
							["HOW","f"],
							["EFFECT","sets the value of _TN_ to 0"]
							],
	[["KEY", "_unset"],		["VAL", "func_unsetvalue"], ["CAT","ACT"],
							["UNDO","_unset"],
							["HOW","g"]
							],
	// PROCESS STEP
	[["KEY", "count"],		["VAL", "func_countStep"], ["CAT","ACT"] ]
];



// =========  Initialization of bots and declaration of topics  ==========
var fifiBot    = new BOT_makeBot("fifiBot","fifiTopic");
var daisieBot  = new BOT_makeBot("daisieBot","daisieTopic");
BOT_declareTopics(["userTopic","counterTopic"]);

BOT_theBotId		= "fifiBot";		// sets current bot id 
BOT_theTopicId		= "fifiTopic";		// sets current topic id
BOT_theUserTopicId	= "userTopic";		// sets topic of current user id

 
 
 
 
 
// *************************************************************************************************************
// *************************************************************************************************************
//                                        SPECIFIC APPLICATION FUNCTIONS
// *************************************************************************************************************
// *************************************************************************************************************



// ====================================================================
//                  INTERNAL FUNCTIONS OF MODEL
// ====================================================================

// launched at end of main.htm page
var FIFI_TIMEOUT = null;
function FIFI_counterLoop() {
	clearTimeout(FIFI_TIMEOUT);
	BOT_exec("counterTopic","count")
	var speed = BOT_get("counterTopic","speed","VAL");
	if(typeof(speed) == "number") FIFI_TIMEOUT = setTimeout("FIFI_counterLoop()", speed);
}


function FIFI_print(val) {
	var e = document.getElementById("countertextfield");
	if(e) { e.firstChild.nodeValue = val; }
}


function func_countStep() {
	var status		= BOT_get("counterTopic","status","VAL");
	var direction   = BOT_get("counterTopic","direction","VAL");
	var oldval		= BOT_get("counterTopic","value","VAL");
	var step   		= BOT_get("counterTopic","step","VAL");
	var newval;
	if(direction != undefined && step != undefined && oldval != undefined) {
		if(status == "on") {
			if(direction == "up") newval = oldval + step; 
			else newval = oldval - step; 
			BOT_set("counterTopic","value","OLD",oldval);
			BOT_set("counterTopic","value","VAL",newval);
			FIFI_print(newval);
		}
	}
}


function func_start(topic) { // topic is topic object
	BOT_set(topic,"status","VAL","on");
}

function func_stop(topic) { 
	BOT_set(topic,"status","VAL","off");
}

function func_slower(topic) { 
	var speed = BOT_get(topic,"speed","VAL");
	speed = speed + 100;
	BOT_set(topic,"speed","VAL",speed);
}

function func_faster(topic) {
	var speed = BOT_get(topic,"speed","VAL");
	speed = speed - 100;
	if(speed < 0) speed = 0;
	BOT_set(topic,"speed","VAL",speed);
}

function func_setvalue(topic,val) { 
	var old = BOT_get(topic,"value","VAL");
	BOT_set(topic,"value","OLD",old);
	BOT_set(topic,"value","VAL",val);
}

function func_unsetvalue(topic) { 
	var old = BOT_get(topic,"value","VAL");
	var val = BOT_get(topic,"value","OLD");
	BOT_set(topic,"value","OLD",old);
	BOT_set(topic,"value","VAL",val);
}

function func_compute(topic,val) {
	var x = "" + eval(BOT_theReqJavascript);
	if(x != "") return x;
	else return "empty"
}

 

// ====================================================================
//        EVENTS  HANDLERS & REQUESTS SPECIFIC POSTPROCESSING 
// ====================================================================


function BOT_reqApplicationPostProcessing() {
	if(!BOT_sessionActiveFlag) func_stop(counterTopic); //stops counter at session end
	return;
}


function BOT_onSwitchBot(oldbotid,newbotid) {
	BOT_standardFrameBot(oldbotid, "hidden", "0px");
	BOT_standardFrameBot(newbotid, "visible","4px solid yellow");
}





// *************************************************************************************************************
// *************************************************************************************************************
//                                                END OF THE CODE
// *************************************************************************************************************
// *************************************************************************************************************
 
 
 
 
 
 
 
 
 
 











