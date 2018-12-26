// ********************************************************************************************************************
// ********************************************************************************************************************
//                         Jean-Paul Sansonnet  LiteTalk VERSION 1.1   February 1, 2012 - December 2015
//
// ********************************************************************************************************************
//
// COPYRIGHT: Jean-Paul Sansonnet & LIMSI-CNRS, 2012
// This source code can be downloaded and used freely to develop applications dealing with Teaching and Research only
// No commercial exploitation of this source code, even modified, is authorized. (for commercial use, contact author)
// No technical support is provided by Jean-Paul Sansonnet or LIMSI-CNRS 2012 (see documentation and code) 
//***
// ********************************************************************************************************************
// ********************************************************************************************************************


// *************************************************************************************************************
// *************************************************************************************************************
//                                             GLOBAL VARIABLES
// *************************************************************************************************************
// *************************************************************************************************************


// ====================================================================
//                         HTML PAGE DEPENDENT
// ====================================================================

var BOT_litetalkVersion	= "1.1";			// Current version of the code
var BOT_theNavigator	= BOT_setNavigator() ;  	// set to "NN" or "IE"
var BOT_theInterface	= "STANDARD"; 			// interfaces = "STANDARD", "DEVELOPER", "DIVALITE" 




// ====================================================================
//                              SESSION
// ====================================================================

var BOT_reqSuccess;	    // contains the result evaluation of request on model
var BOT_reqEmote;	    // contains the emote string
var BOT_reqAnswerShort;	// contains the short mode answer string
var BOT_reqAnswerLong;	// contains the long mode answer string
var BOT_reqFilled;	    // true when BOT_reqSuccess, BOT_reqEmote, BOT_reqAnswerShort/Long filled
	
var BOT_sessionActiveFlag  = true		// this flag is set to false when user quits
var BOT_sessionCounter     = 0;			// counts input number
var BOT_sessionTable       = [];		// logs the session
var BOT_traceString		   = "";		// trace for debug
var BOT_traceFlag		   = false;		// trace  mode on
var BOT_statusFlag		   = false;		// status mode on

var BOT_theReqPerformative;
var BOT_theReqTopic;
var BOT_theReqAttribute;
var BOT_theReqRelation;
var BOT_theReqAction;
var BOT_theReqActionTopic;
var BOT_theReqValue;
var BOT_theReqStresser;
var BOT_theReqText; 
var BOT_theReqEqual;
var BOT_theReqFeeling;
var BOT_theReqJudegment;
var BOT_theReqReplyValue	= null;		
var BOT_theReqReplyIndex	= null;		
var BOT_theReqReplyFunc		= null;			
var BOT_theReqJavascript 	= "";
var BOT_theLastPerformative	= "a";				// last performative
var BOT_theLastTopic		= null; 			//  
var BOT_theLastAttribute	= "name";			// last asked attribute key
var BOT_theLastRelation	   	= null;				// last expressed relation
var BOT_theLastAction	   	= null;				// last executed action
var BOT_theLastActionTopic	= null;				// topic of last executed action
var BOT_theLastValue	  	= null;	   			// value before the last set action (to undo)
var BOT_theLastStresser	   	= null;	   			// last stresser - not used
var BOT_theLastText		   	= null;	   			// last text - not used 
var BOT_theLastAnswerShort	= "";	   			// last short answer
var BOT_theLastAnswerLong	= "";	   			// last long answer

var BOT_theHintText         = "";				// optional hint text appended to the status text
var BOT_theStatusText		= "";	   			// string containing information about the session status

// ====================================================================
//                           LEMMATIZATION
// ====================================================================


var BOT_lemString 	    = "";		// the lemmatized string
var BOT_lemWordList	    = [];		// list of words of BOT_lemString
var BOT_lemTagList	    = [];		// list of tagged words of BOT_lemWordList
var BOT_maxExtractedWords   = 7;		// max number of extracted words in a sentence


var BOT_commandList		= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; 
var BOT_botPronounList		= ["chatbot","bot","y","you","your"];								// pronouns for topic of current bot
var BOT_topicPronounList	= ["it","its","his","her","him"];									// pronouns for current topic 
var BOT_stresserList		= [ "_harsh","_surprise","_begging","_apology","_counterstatement",	// strong stressers
				    "_strong","_interrogation","_please","_sorry","_irony" ];		// light stressers


// SYNTAX: [positivefeelingsymbol,attribute, pole]
// pole: + - 
var BOT_feelingList		= [
	// mind states
	["happy","happiness","+"],
	["sad","happiness","-"],
	["confident","confidence","+"], 		// includes for dominance
	["hesitant","confidence","-"],
	["angry","irritability","+"],
	["amiable","irritability","-"],
	["satisfied","satisfaction","+"], 		// by things
	["disappointed","satisfaction","-"],
	["proud","respect","+"], 			    // of me
	["guilty","respect","-"],
	// body states
	["strong","force","+"],
	["weak","force","-"],
	["calm","excitement","+"],
	["excited","excitement","-"]
	];
	
// for hints
var BOT_feelingText = "happy/sad, confident/hesitant, angry/amiable, satisfied/disappointed, proud/guilty, strong/weak, calm/excited";

// SYNTAX: [positivejudgementsymbol, negativejudgementsymbol ,attribute, pole]
// pole: + - =
var BOT_judgementList		= [
	// general
	["good","bad","evaluation","+"],
	["bad","good","evaluation","-"], 
	["average","average","evaluation","="],  // special pole -- not used
	// qualities
	["perfect","imperfect","quality","+"],
	["imperfect","perfect","quality","-"],
	["useful","useless","usability","+"],
	["useless","useful","usability","-"], 
	["competent","incompetent","competence","+"],
	["incompetent","competent","competence","-"], 
	["important","insignificant","importance","+"],
	["insignificant","important","importance","-"],
	// physical
	["strong","feeble","intensity","+"],
	["feeble","strong","intensity","-"], 
	["long","brief","duration","+"],
	["brief","long","duration","-"], 
	["fast","slow","speed","+"], 
	["slow","fast","speed","-"],
	["large","small","size","+"],
	["small","large","size","-"],
	//likes & dislikes
	["likeable","detestable","favorite","+"],
	["detestable","likeable","favorite","-"],
	// social
	["expensive","cheap","worth","+"],
	["cheap","expensive","worth","-"],
	["nice","ugly","beauty","+"],
	["ugly","nice","beauty","-"], 
	["interesting","boring","interest","+"],
	["boring","interesting","interest","-"], 
	["decent","depraved","decency","+"],
	["depraved","decent","decency","-"],
	];

// for hints
var BOT_judgementText = "good/bad, perfect/imperfect, useful/useless, competent/incompetent, important.insignificant, etc."; // to complete
	
	
// words with >3 letters with singular s
var BOT_pluralExceptionList = ["his","as","this","its","us","business","yes","process","themselves","always","_class","class","perhaps","less","miss","press","towards","others","success","analysis","loss","across","access","glass","seems","thus","sometimes","address","cross","express","dress","gas","various","focus","basis","news","series","stress","pass","mass","crisis","serious","bus","previous","congress","unless","progress","follows","remains","plus","status","grass","obvious","provides","kiss","witness","guess","becomes","appears","politics","clothes","awareness","nevertheless","illness","darkness","includes","suggests","religious","famous","thanks","whereas","paris","princess","dangerous","happens","emphasis","requires","consciousness","dismiss","gross","mess","depends","contains","afterwards","jones","ourselves","weakness","curious","yours","enormous","allows","involves","hypothesis","continues","overseas","stimulus","lewis","diagnosis","virus","happiness","excess","occurs","represents","numerous","fitness","brings","distress","bonus","earnings","exists","conscious","thesis","bass","nervous","brass","anxious","tennis","economics","upstairs","canvas","applies","headquarters","consists","continuous","besides","writes","describes","hers","mistress","explains","minus","synthesis","actress","sickness","tends","generous","indicates","confess","argues","genius","toss","reflects","census","chorus","impress","effectiveness","enables","louis","surplus","implies","suppress","mathematics","tremendous","colitis","refers","fuss","asks","downstairs","fails","ridiculous","backwards","marvellous","morris","bypass","consensus","precious","arises","ours","bless","bias","upwards","moss","nucleus","madness","nowadays","circus","duchess","reveals","chaos","endless","sadness","odds","electronics","relates","ambitious","goodness","thickness","operates","proceeds","regardless","syllabus","unconscious","kindness","suspicious","creates","summons","bitterness","onwards","wilderness","expects","harness","speaks","swiss","useless","admits","nonetheless","receives","hiss","mysterious","varies","compass","radius","furious","goddess","sits","mattress","encompass","reduces","belongs","binoculars","anonymous","carers","considers","willingness","readiness","surroundings","loneliness","homeless","disastrous","illustrates","cautious","collins","piss","delicious","apparatus","pylorus","fortress","glorious","gloss","intends","autonomous","texas","axis","extends","versus","wireless","spontaneous","theirs","bourgeois","owns","emerges","sideways","iris","oesophagus","vigorous","constitutes","develops","genus","assumes","indigenous","insists","jealous","notorious","maintains","agrees","comprises","decides","deserves","fungus","lass","lotus","vicious","demonstrates","doubtless","ensures","arrives","scissors","concludes","accepts","hopeless","differs","enters","suffers","caress","denies","encourages","enjoys","reckons","ambiguous","helpless","reasonableness","hostess","stillness","brightness","conspicuous","corpus","countess","debris","remembers","richness","arthritis","forgiveness","spends","linguistics","loses","redress","retains","rogers","meaningless","prestigious","downwards","dubious","reminds","fairness","diabetes","prevents","harmless","impetus","lens","trespass","understands","chess","waitress","confirms","cyprus","determines","dickens","proposes","prosperous","examines","fabulous","restless","rigorous","hazardous","hepatitis","spacious","terminus","threatens","corresponds","warns","exceeds","ruthless","indoors","manages","careless","oasis","countless","pointless","glamorous","headmistress","blindness","closeness","defines","empress","relies","genesis","hardness","bliss","nervousness","campus","underclass","chooses","outrageous","owes","competitiveness","whereabouts","yourselves","derives","embarrass","emptiness","recognises","recess","arrears","fibrosis","gorgeous","sends","seriousness","simultaneous","highness","identifies","softness","incorporates","introduces","survives","likeness","sweetness","contributes","psychoanalysis","burgess","acknowledges","bates","compress","contentious","recommends","adventurous","infectious","luxurious","unanimous","usefulness","outwards","penis","powerless","replaces","sharpness","harass","hears","amiss","ignores","analogous","tedious","modulus","breathless","openness","depress","prefers","reckless","resembles","generates","siemens","homogeneous","athletics","attracts","jess","learns","avoids","treacherous","tuberculosis","sykes","oblivious","tallis","carboniferous","courageous","heiress","carcass","undress","eagerness","eats","intravenous","inverness","ludicrous","occupies","observes","worthless","disappears","recognizes","advantageous","relentless","governess","slowness","knickers","succeeds","marquess","metropolis","blackness","monies","ubiquitous","ominous","weariness","pious","dominates","rees","selfishness","hideous","humorous","imposes","ingenious","locus","tenderness","motionless","buttress","nightdress","cannabis","paralysis","pelvis","wickedness","antithesis","performs","photosynthesis","declares","poisonous","predicts","prepares","precarious","profess","promotes","distinguishes","protects","duress","ethos","excludes","exodus","responds","fondness","gracious","grassroots","semantics","hants","hercules","holiness","improves","stiffness","surpass","lightness","synonymous","realises","unwillingness","heterogeneous","tiredness","meticulous","coincides","devious","reassess","jobless","abyss","outdoors","pancreatitis","weighs","emphasizes","achieves","hilarious","specialises","inwards","directs","discovers","adopts","advises","greatness","grievous","malicious","miraculous","mischievous","momentous","neurosis","chassis","pompous","prognosis","earns","evokes","expands","explores","sings","homelessness","specifies","infamous","strenuous","subconscious","lends","syphilis","luminous","marquis","timeless","bogus","monstrous","bros","announces","anomalous","truss","unambiguous","unfairness","unhappiness","obtains","celebrates","ups","orcs","victorious","cleanliness","confines","conscientious","contiguous","conveys","persists","courteous","cypress","delivers","docklands","prospectus","prowess","enhances","establishes","regress","reinforces","faeces","rendezvous","repress","ferocious","asbestos","satisfies","gastritis","genetics","asserts","harmonious","horrendous","atlas","attractiveness","spurious","stainless","lifeless","depicts","speechless","isolates","qualifies","absorbs","facilitates","selects","summarises","prettiness","reacts","floss","foolishness","rudeness","sclerosis","strangeness","acquires","defends","precedes","pretentious","publishes","eaves","engross","envious","erroneous","redness","expires","retires","revolves","robbins","goggles","aerobics","hopelessness","impervious","incomers","incredulous","joyous","justifies","affords","sumptuous","tenuous","deafness","descends","preparedness","presupposes","priceless","priestess","alleges","dis","droppings","psychosis","recklessness","remoteness","alters","firmness","foetus","amass","forgets","friendliness","sensuous","amends","hapless","headdress","amis","sleepless","illustrious","amorphous","induces","stewardess","stokes","judicious","keywords","landless","superfluous","limitless","synopsis","logistics","manageress","pons","porous","deixis","denotes","destroys","appendicitis","prevails","appoints","appropriateness","prodigious","distinctiveness","protestors","drunkenness","effortless","embodies","encompasses","endogenous","arduous","rebellious","envisages","aristos","expressionless","eyewitness","fearless","resellers","resides","responsiveness","fictitious","restricts","righteousness","righteous","freshness","frivolous","fruitless","fulfils","fullness","scandalous","gentleness","governs","assertiveness","senseless","separateness","harshness","shyness","helplessness","signifies","sims","homologous","slows","hypnosis","idleness","spaciousness","attends","incongruous","informs","inhibits","innocuous","insidious","instantaneous","investigates","stimulates","jus","laborious","sunglass","superstitious","cactus","mucus","octopus"]


var BOT_basicSynonymList	=  [
	// deleted
	["",		["the","that"]],
	
	// keys
	["name",		["name","surname","nickname","appellation"]], 
	["action",		["action","operation","function"]],
	["type",		["type","kind"]],
	["value",		["value","val"]],
	["location",	["address","adress","loc"]],
	
	// actions
	["_a", 		["ask","what is","what are","tell me","say"]],
	["_b", 		["bravo","congratulations","well done"]],
	["_c", 		["criticize"]],
	["_d", 		["dislike"]],
	["_e", 		["effect","consequence","result","outcome","what if","what happen if","what would happen if"]],
	["_f", 		["feel","i am"]],
	["_g", 		["greet","hi","hello","welcome","hey","hey","ping","are you here","where are you"]],
	["_h", 		["how"]],
	["_i", 		["intent"]],
	["_j", 		["judge","you are"]],
	["_k", 		["know"]],
	["_l", 		["like"]],
	["_m", 		["more","repeat","redo","do again","again"]],
	["_n", 		["no","nope","i disagree"]],
	["_o", 		["object","forbid"]],
	["_p", 		["can i","can you","can","possible","possibility","available","availability","authorized","authorised","authorization","authorisation"]],
	["_q", 		["quit","bye bye","bye"]],
	["_r", 		["reply","the answer is","it is","the value is","this is"]],
	["_s", 		["suggest"]],
	["_t", 		["tell","inform","i think","i believe"]], // TO DO
	["_u", 		["undo","revert","rev"]],
	["_v", 		["verify","check","is it true"]],
	["_w", 		["why","explain","cause","reason"]],
	["_x", 		["do","execute","perform"]],
	["_y", 		["yes","ok","i agree","agreed"]], 
	["_z", 		["extra"]], 
	
	// mind and body states
	["satisfied", 	["content","pleased"]],
	["confident", 	["definite","sure","certain"]],
	["hesitant", 	["fearful"]],
	["angry", 	["annoyed","irritated"]],
	["amiable", 	["peaceful","agreeable","cool"]],
	["disappointed",["dissatisfied","frustrated"]],
	
	// separators
	["eq", 		["is","are","was","were","equal"]], 
	["with", 	["to"]],
	
	// judgements
	["judgement", 	["judgment","opinion"]],			// attribute: list of judgements
	["favorite", 	["favourite"]],                     // judgement concept for likeable/detestable
	// preferences
	["preference", 	["pref","favorite","favourite","liking"]], 			// attribute: list of preferences
	["distaste", 	["dispref","dispreference","aversion","distaste"]], // attribute: list of dispreferences
	// suggestions
	["suggestion", 	["advice","recommendation","guidance"]], 		// attribute: list of suggested actions
	["objection", 	["interdiction","veto","opposition"]],   		 // attribute: list of disprefernces
	// intentions
	["intention", 	["intent","determination","promise"]], 	 // attribute: list of intented actions
	// 
	["average", 	["medium","normal"]] 
	
	];



// ====================================================================
//           CREATED AT STARTUP FROM APPLICATION FILE
// ====================================================================

var BOT_botObjectList	= [];		// built automatically
var BOT_topicObjectList = [];		// built automatically
var BOT_botIdList	= [];   	// built automatically
var BOT_botNameList	= [];   	// built automatically
var BOT_topicIdList 	= [];		// built automatically

var BOT_theBotId	= "";		// must be set at end on topic defs
var BOT_theTopicId	= "";		// must be set at end on topic defs -- not used
var BOT_theUserTopicId	= "";		// must be set at end on topic defs

var BOT_keyList 	= [];		// built automatically at creation
var BOT_actionList      = [];		// built automatically at creation
var BOT_relationList    = [];		// built automatically at creation




// ====================================================================
//                              INTERNAL
// ====================================================================

var BOT_getTopicAttributeIndex         = -1; // used by BOT_getTopicAttribute 
var BOT_getTopicAttributeTagValueIndex = -1; // used by BOT_getTopicAttributeTagValue 




// ====================================================================
//                      INSPECTOR IN DEVELOPER PAGE
// ====================================================================


// list of all the names of litetalk global variables
var BOT_theGlobalVarList = [
"BOT_litetalkVersion","BOT_theNavigator","BOT_theInterface",
"BOT_statusFlag","BOT_theStatusText","BOT_theHintText",
"BOT_traceFlag","BOT_traceString",
"BOT_reqSuccess","BOT_reqEmote","BOT_reqAnswerShort","BOT_reqAnswerLong","BOT_reqFilled", 
"BOT_sessionActiveFlag","BOT_sessionCounter",
"BOT_theReqPerformative","BOT_theReqTopic","BOT_theReqAttribute","BOT_theReqRelation",
"BOT_theReqAction","BOT_theReqActionTopic","BOT_theReqValue","BOT_theReqStresser","BOT_theReqText", "BOT_theReqEqual","BOT_theReqFeeling","BOT_theReqReplyValue","BOT_theReqReplyIndex",	"BOT_theReqReplyFunc","BOT_theReqJavascript",
"BOT_theLastPerformative","BOT_theLastTopic", "BOT_theLastAttribute","BOT_theLastRelation","BOT_theLastAction",
"BOT_theLastActionTopic","BOT_theLastValue","BOT_theLastStresser","BOT_theLastText",
"BOT_theLastAnswerShort", "BOT_theLastAnswerLong",
"BOT_lemString","BOT_lemWordList","BOT_lemTagList","BOT_maxExtractedWords",
"BOT_commandList", "BOT_botPronounList","BOT_topicPronounList","BOT_stresserList","BOT_pluralExceptionList","BOT_basicSynonymList","BOT_feelingList","BOT_judgementList",
"BOT_botObjectList","BOT_topicObjectList","BOT_botIdList","BOT_botNameList","BOT_topicIdList",
"BOT_theBotId","BOT_theTopicId","BOT_theUserTopicId",
"BOT_keyList","BOT_actionList","BOT_relationList",
"BOT_getTopicAttributeIndex","BOT_getTopicAttributeTagValueIndex",
"BOT_sessionTable"
];



// *************************************************************************************************************
// *************************************************************************************************************
//                                 HTML PAGE TEXTUAL INPUT/OUTPUT PROCESSING
// *************************************************************************************************************
// *************************************************************************************************************


// ====================================================================
//                    CHATBOX INPUT FOR ALL INTERFACES
// ====================================================================

// these functions require specific objects in the HTML main page
// read a string from the chatbox in mode SEND BUTTON
function BOT_chatboxOnSend(chatboxid) {
		var elem = document.getElementById(chatboxid);
		var s = elem.value;
		BOT_chatboxMainProcess(s);
		BOT_agentSpeech();
}

// read a string from the chatbox in mode CARRIAGE RETURN
function BOT_chatboxOnKeypress(obj,evt) {
		if(BOT_theNavigator == null) return;
		var s = obj.value; 
		if(BOT_theNavigator == "IE" && evt.keyCode == 13) {
			evt.keyCode = null;
			BOT_chatboxMainProcess(s);
			BOT_agentSpeech(); 
			}
		if(BOT_theNavigator == "NN" && evt.which == 13)  {
			BOT_chatboxMainProcess(s);
			BOT_agentSpeech(); 
			}
}


// There are 3 main interfaces:
// 1. STANDARD	  -- see fifi & daisie
// 2. DEVELOPER   -- see develper page
// 3. DIVALITE	  -- see DIVALITE example

function BOT_agentSpeech() {
	switch (BOT_theInterface) {
 		case "STANDARD":	BOT_printStandardChar(); break;
 		case "DEVELOPER":	BOT_printDevelopperChar(); break;
 		case "DIVALITE":	BOT_printDivaliteChar(BOT_reqEmote, BOT_reqAnswerLong); break;
		default: 			BOT_printStandardChar();
	}
}


// Prints HTML string BOT_theStatusText into html page object DIV with TEXT "litetalkstatustext"
function BOT_statusPrint() {
	if(BOT_statusFlag)  {
		var e = document.getElementById("litetalkstatustext");
	 	if(e && BOT_theStatusText != "" ) e.innerHTML = BOT_theStatusText;
	}
}


// Builds the HTML string of currentstatus
// can be used with both interfaces DIVALITE & DEVELOPPER
function BOT_buildStatusText() {
	var s   = "";
	var bot = eval(BOT_theBotId);
	var bn  = BOT_topicToName(bot.topicId);  
	// BOT
	if(bn != undefined) s = s + "<span style='color:green'><strong>" + "&rarr; "+ bn +"</strong></span>";
	// TOPICS
	s  = s + "&nbsp;&nbsp;&nbsp;TOPICS:&nbsp;";
	for ( var i in BOT_topicIdList)  {
		var tid = BOT_topicIdList[i];
		var tn  = BOT_get(tid,"name", "VAL")
		var tc  = BOT_get(tid,"_class","VAL")
		if(tn != undefined)  {
			if(BOT_theTopicId == tid) {
				s = s + "<span style='color:red'><strong>";
				if(tc == "bot")  s = s + "<u>";
				s = s + tn;
				if(tc == "bot")  s = s + "</u>"; 
				s = s + "</strong></span>";
			}
			else {
				if(tc == "bot")  s = s + "<span><u>";
				s = s + tn;
				if(tc == "bot")  s = s + "</u></span>";
			}
		}
		var tr = BOT_get(tid,"_reference","VAL")
		if(tr != undefined && typeof(tr) == "object")  s = s + "(" + tr[0]+") "; // short name
	}
	// CURRENT ARGUMENT
	s = s + "&nbsp;&nbsp;&nbsp;";
	if(BOT_theLastAttribute || BOT_theLastAction|| BOT_theLastRelation) s = s + "MEMO ";
	if(BOT_theLastAttribute) s = s + BOT_theLastAttribute+ " ";
	if(BOT_theLastAction)    s = s + BOT_theLastAction+ " ";
	if(BOT_theLastRelation)  s = s + BOT_theLastRelation;
	// HINTS
	if(BOT_theHintText != "") s = s +
	 	"<textarea  cols='100' rows='3' spellcheck='false'; style='visibility:visible; font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #360; border:none'>"
	 	+ BOT_theHintText +
	 	"</textarea>";
	
	BOT_theStatusText = s;
}





// ====================================================================
//                         1. INTERFACE STANDARD
// ====================================================================

// standard bots are embodied on screen by a static picture <img>
// the HTML prefix ('fifi') must be placed in the attribute _htmlprefix of the bot
// They have a standard HTML balloon called _htmlprefix+"balloon"

var BOT_standardFontNormal  = "'Segoe Print'";
var BOT_standardFontSlanted = "'Segoe Script'"; // used to alternate when two outputs are the same


// frame the pict of a standard bot with 
// - border data = "0px" | "4px solid yellow"
// - balloon visibility : "visible" | "invisible"
// the HTML pict id must be placed in the attribute _pictid of the bot
function BOT_standardFrameBot(botid,balloonvisibility,borderdata) {
	var botobject  = eval(botid);
	var bottopicid = botobject.topicId;
	var prefix = BOT_get(bottopicid,"_htmlprefix","VAL"); // HTML prefix == 'fifi'
	if(prefix) {
		var elem = document.getElementById(prefix+"pict");
		if(elem) { elem.style.border = borderdata}
		elem = document.getElementById(prefix+"balloon");
		if(elem) elem.style.visibility = balloonvisibility;	
	}
}


// called when one clicks upon the pict of a standard bot
// clicking a bot  == "greet botname"
function BOT_standardSwitchToChar(newbotid) {
	var newbotobject  = eval(newbotid);
	var newbottopicid = newbotobject.topicId;
	var name = BOT_get(newbottopicid,"name","VAL");
	if(name) {
		BOT_chatboxMainProcess("greet "+name);
		BOT_agentSpeech(); 
	}
}

// print "BOT_reqEmote: BOT_reqAnswerLong" into the bot's balloon
function BOT_printStandardChar() {
	var botobject  = eval(BOT_theBotId);
	var bottopicid = botobject.topicId;
	var prefix = BOT_get(bottopicid,"_htmlprefix","VAL"); // HTML prefix == 'fifi'
	if(prefix) {
		var elem = document.getElementById(prefix+"balloon");
		if(elem) {
			if(BOT_reqAnswerLong  == BOT_theLastAnswerLong) {
				if(elem.style.fontFamily == BOT_standardFontNormal) elem.style.fontFamily = BOT_standardFontSlanted;
				else elem.style.fontFamily = BOT_standardFontNormal;
			}
			else {
				elem.style.fontFamily = BOT_standardFontNormal;
				elem.value = BOT_reqEmote+": "+ BOT_reqAnswerLong;
			}
		}
	}
}
  


// ====================================================================
//                         2. INTERFACE DEVELOPER
// ====================================================================

// Prints the speech of agent into html page object fields BOT_elementEmoteId and BOT_elementBallonId
// this function must ne changed when the interface changes 
function BOT_printDevelopperChar() {
	var e = document.getElementById("litetalkbot");
	if(e) e.value = BOT_theBotId;
	var e = document.getElementById("litetalktopic");
	if(e) e.value = BOT_theTopicId;
	var e = document.getElementById("litetalkemote");
	if(e) e.value = BOT_reqEmote;
	var e = document.getElementById("litetalkballoonshort");
	if(e) e.value = (BOT_reqAnswerShort == BOT_theLastAnswerShort) ? "- "+BOT_reqAnswerShort : BOT_reqAnswerShort;
	var e = document.getElementById("litetalkballoonlong");
	if(e) e.value = (BOT_reqAnswerLong  == BOT_theLastAnswerLong) ? "- "+BOT_reqAnswerLong : BOT_reqAnswerLong;
}



// Prints the trace of last string processing into html page object area "litetalktracebox"
function BOT_printBotName() {
	var elem = document.getElementById("litetalktracebox");
	if(elem) elem.value = BOT_traceString;
}
// Prints the trace of last string processing into html page object area "litetalktracebox"
function BOT_printTraceBox() {
	var elem = document.getElementById("litetalktracebox");
	if(elem) elem.value = BOT_traceString;
}

// Special print of BOT_lemTags table
function BOT_lemTagsToString (t) {
	var s = "[ ";
	var x = "";
	for(var i in t) {
		if( typeof(t[i][1]) == "string") x = t[i][1]
		else x = "["+ t[i][1].toString() +"]";
		s = s + "[" + t[i][0]+","+x+"] "
	}
	return s+"]"
}

// Prints most global variables in BOT_elementTraceboxId
function BOT_printModelVariables() {
	var s = "";
	s = s + "THEBOTID          " + BOT_theBotId;
	s = s + "\nTHETOPICID      " + BOT_theTopicId;
	s = s + "\nTHEUSERTOPICID  " + BOT_theUserTopicId;
	s = s + "\n-------------------------";
	s = s + "\nBOTID      LIST " + BOT_botIdList;
	s = s + "\nBOTNAME    LIST " + BOT_botNameList;
	s = s + "\n\nTOPICID  LIST " + BOT_topicIdList;
	s = s + "\n\nRELATION LIST " + BOT_relationList;
	s = s + "\n\nACTIONS  LIST " + BOT_actionList;
	s = s + "\n\nKEYS     LIST " + BOT_keyList;
	var elem = document.getElementById("litetalktracebox");
	if(elem) elem.value = s;
}


// Evaluates expression in field javascriptinput and display result in area javascriptoutput
function BOT_javaScriptEval() {
	var e1 = document.getElementById("javascriptinput");
	var e2 = document.getElementById("javascriptoutput");
	if(e1 && e2) e2.value = eval(e1.value)
}

// When button inspect is clicked displays current value of global variables in area javascriptoutput
function BOT_inspectGlobalVar() {
	var e = document.getElementById("javascriptoutput");
	var s = "";
	var v;
	for (var i in BOT_theGlobalVarList) {
		v = BOT_theGlobalVarList[i];
		s = s + v + " =     " + ((eval(v) == undefined) ? "undefined" : eval(v)) + "\n\n";
	}
	if(e) e.value = s;
}

// When button  of topicid is clicked displays current value of topic model  in area javascriptoutput
function BOT_inspectTopic(tid) {
	var e = document.getElementById("javascriptoutput");
	var t = eval(tid);
	var s = "ELEMENTS OF TOPIC "+tid+"\n\n:";
	var v;
	for (var i in t) {
		v = t[i];
		s = s + v + " =     " + ((eval(v) == undefined) ? "undefined" : eval(v)) + "\n\n";
	}
	if(e) e.value = s;
}


 
 

// ====================================================================
//                         3. INTERFACE DIVALITE
// ====================================================================

// This function can  be redefined into the specific code
// WARNING use of global variable THECHAR == the currently activated character
// emote:      internal sylbol "HAPPY", "SAD"
// sentence:   the text
// epilogfunc: a caalback function if needed else null or empty
function BOT_printDivaliteChar(emote, sentence, epilogfunction) {
	// reset character speech 
	THECHAR.setOption('speechBubbleFontColor','black');
	THECHAR.setOption('speechBubbleFontFamily','Comic Sans MS');
	THECHAR.setOption('speechBubbleFontSize','28px');
	
	// handling repetitions on BOT_reqAnswerLong
	if(BOT_reqAnswerLong  == BOT_theLastAnswerLong) sentence = "- "+sentence;
	
	// dispatch
	if( emote == "" && sentence == "") return;
	if( emote == "" && sentence != "") { THECHAR.doSpeech(sentence,3000); return }
	if( emote != "") { 
		var t, m, c, f, s; 
		t = BOT_translateEmoteDivalite(emote);
		m = t[0];
		c = t[1];
		f = t[2];
		s = t[3];
		if(c != "") THECHAR.setOption('speechBubbleFontColor',c);
		if(f != "") THECHAR.setOption('speechBubbleFontFamily',f);
		if(s != "") {THECHAR.setOption('speechBubbleFontSize',s);}
		if(sentence != "") THECHAR.doSpeech(sentence,3000);  
		else THECHAR.movementFactory.doMovement(
				{ action: m,  
				callback: function(){ 
					if(epilogfunction && epilogfunction != undefined) epilogfunction();  // call to a callback function 
					}
				}
			) // doMovement
	}
}


// translate a litetalk EMOTE symbol into an actual DIVALITE multimodal array =  [movie,textcolor]
// can be used into BOT_printBalloonChar
// LIST USED HERE:
// HELLO, BYE, HAPPY, SAD, SORRY, PUZZLED, WARNING, WORRIED, SURPRISED, CONFUSED, THINKING, ANGRY, FEAR, PROUD, THANKS, NONE
// not used : YES NO DANGER BRAVO APPLAUSE
//
// TODO BUG changing fonts and sizes change char position
// 
function BOT_translateEmoteDivalite(emote) {
	var m,c,f,s; // movie, textcolor, textfont textsize
	switch (emote){
 		case "HELLO":
                    {m = "hello"; 		c="Brown";			f ="";				s = ""; 		break;} // s = "20px";
 		case "BYE":
                    {m = "bye"; 		c="";				f ="";				s = ""; 		break;}
 		case "HAPPY":
                    {m = "happy"; 		c="";				f ="";				s = "";			break;}	
 		case "SAD":
                    {m = "sad"; 		c="DarkGreen";          	f ="Ravie";			s = "";			break;}
 		case "SORRY":
                    {m = "sorry"; 		c="DarkCyan";   		f ="Ravie";			s = "";			break;}
 		case "PUZZLED":
                    {m = "scratchhead";         c="";				f ="";				s = ""; 		break;}
 		case "WARNING":
                    {m = "warning";      	c="";				f ="";				s = ""; 		break;}
 		case "WORRIED":
                    {m = "warning"; 	        c="";				f ="";				s = ""; 		break;}
 		case "SURPRISED":
                    {m = "surprised";   	c="";				f ="";				s = ""; 		break;}
 		case "CONFUSED":
                    {m = "scratchhead";         c="";				f ="";				s = ""; 		break;}
 		case "THINKING":
                    {m = "warning"; 	        c="";				f ="";				s = ""; 		break;}
 		case "ANGRY":
                    {m = "angry"; 		c="";				f ="";				s = ""; 		break;}
 		case "FEAR":
                    {m = "fear"; 		c="";				f ="";				s = ""; 		break;}
 		case "PROUD":
                    {m = "armsfolded";          c="";				f ="";				s = ""; 		break;}
		case "YES":
                    {m = "headyes"; 	        c="";				f ="";				s = ""; 		break;}
 		case "NO":
                    {m = "headno"; 	        c="";				f ="";				s = ""; 		break;}
 		case "THANKS":
                    {m = "headyes"; 	        c="";				f ="";				s = ""; 		break;}
 		case "DANGER":
                    {m = "danger"; 	        c="Crimson";		        f ="";				s = ""; 		break;}  //"Arial Black";
 		case "BRAVO":
                    {m = "bravo"; 		c="";				f ="";				s = "";	 		break;}
 		case "APPLAUSE":
                    {m = "applause";    	c="";				f ="";				s = ""; 		break;}
 		case "NONE":
                    {m = "armsbehind";          c="";				f ="";				s = ""; 		break;}
		default:
                    {m = "armsbehind";          c=""; 				f ="";				s = ""; } //default
	}
	return [m,c,f,s]
}


// standard switch of the visibility of the litetalk trace box with button +/-
// switch on/off the flag: BOT_traceFlag
// requires code in HTML page:
// <input type="button" value="+" onClick="BOT_switchTraceBox(this)"> 
// <p> <textarea id="litetalktracebox" cols="70" rows="20" spellcheck="false" style="visibility:hidden;">.</textarea>

function BOT_switchTraceBox(object) { // object is the +- control button
	var tb = document.getElementById("litetalktracebox");
	var v  = object.value;
	if(v == "+") {
		if(tb) {
			tb.style.visibility = "visible";
			tb.value = "TRACE IS ON. LiteTalk V "+BOT_litetalkVersion;
		}
		object.value = "-";
		BOT_traceFlag = true;
	}
	else {
		if(tb) {
			tb.style.visibility = "hidden";
			tb.value = ".";
		}
		object.value = "+";
		BOT_traceFlag = false;
	}
}








// *************************************************************************************************************
// *************************************************************************************************************
//                                            CHATBOX MAIN PROCESS
// *************************************************************************************************************
// *************************************************************************************************************

// main
function BOT_chatboxMainProcess(s) {
	
	// cleaning the current status
	BOT_theHintText   = "";
	BOT_theStatusText = ".";
	BOT_statusPrint();
	
	// session counting
 	BOT_sessionCounter++;
	BOT_traceString  = "COUNT        " + BOT_sessionCounter.toString() + "\n";
	BOT_traceString += "INPUT        \"" + s + "\"\n";

	// chunking and tagging
	BOT_inputStringProcessing(s);
	BOT_traceString += "LEMS        \""  + BOT_lemString   + "\"\n";
	BOT_traceString += "WORDS        [" + BOT_lemWordList + "]\n";
	BOT_tagWords(); 
	BOT_traceString += "TAGS         " + BOT_lemTagsToString(BOT_lemTagList)  + "\n"; // special format
	BOT_grepRequestComponents();
	BOT_traceString += "-------------------------------------------\n";
		
	// resolve request
	BOT_resolveRequest();
	
	// trace
	BOT_sessionTable = BOT_sessionTable.concat([[BOT_sessionCounter,s,BOT_reqAnswerLong]]); 
	if(BOT_traceFlag) BOT_printTraceBox(); 
	if(BOT_statusFlag) { BOT_buildStatusText(); BOT_statusPrint(); }
	return;
}



// ====================================================================
//                         GREP REQUEST COMPONENTS 
// ====================================================================

// greps main components of the current request from BOT_lemTagList
function BOT_grepRequestComponents() {
	var x,rel;
	
	BOT_theReqPerformative	= null;
	BOT_theReqTopic			= null;
	BOT_theReqAttribute		= null;
	BOT_theReqAction		= null;
	BOT_theReqValue			= null;
	BOT_theReqStresser		= null;
	BOT_theReqText			= null; 
	BOT_theReqFeeling		= null; 
	BOT_theReqJudgement		= null; 
	
	x = BOT_greplemTagElement("PER"); BOT_theReqPerformative = x;
	x = BOT_greplemTagElement("REF"); if(x) BOT_theReqTopic  = x;
	
	x = BOT_greplemTagElement("KEY"); 
	if(x) BOT_theReqAttribute = x; 
	else { x = BOT_greplemTagElement("KYS"); if(x) BOT_theReqAttribute = x } // list
	x = BOT_greplemTagElement("REL"); if(x) BOT_theReqRelation = x;
	x = BOT_greplemTagElement("ACT"); if(x) BOT_theReqAction = x; 
	x = BOT_greplemTagElement("VAL"); if(x) BOT_theReqValue = x; 
	x = BOT_greplemTagElement("STR"); if(x) BOT_theReqStresser = x; 
	x = BOT_greplemTagElement("TXT"); if(x) BOT_theReqText = x;  
	x = BOT_greplemTagElement("EQU"); if(x) BOT_theReqEqual = x;  
	x = BOT_greplemTagElement("FEE"); if(x) BOT_theReqFeeling = x;  
	x = BOT_greplemTagElement("JUD"); if(x) BOT_theReqJudgement = x;  

	if(!BOT_theReqPerformative)  BOT_theReqPerformative = BOT_theReqAction ? "x" : "g"; // always a performative

	if(BOT_theReqPerformative) 	BOT_traceString += "REQ  perf    " + BOT_theReqPerformative + "\n";
	if(BOT_theReqTopic) 		BOT_traceString += "REQ  topic   " + BOT_theReqTopic + "\n";
	if(BOT_theReqAttribute) 	BOT_traceString += "REQ  attr    " + BOT_theReqAttribute + "\n";
	if(BOT_theReqRelation) 		BOT_traceString += "REQ  rel     " + BOT_theReqRelation + "\n";
	if(BOT_theReqAction) 		BOT_traceString += "REQ  action  " + BOT_theReqAction + "\n";
	if(BOT_theReqValue) 		BOT_traceString += "REQ  value   " + BOT_theReqValue + "\n";
	if(BOT_theReqStresser)		BOT_traceString += "REQ  stress  " + BOT_theReqStresser + "\n";
	if(BOT_theReqText)			BOT_traceString += "REQ  text    " + BOT_theReqText + "\n"; 
	if(BOT_theReqEqual)			BOT_traceString += "REQ  Equal   " + BOT_theReqEqual + "\n"; 
	if(BOT_theReqFeeling)		BOT_traceString += "REQ  Feeling " + BOT_theReqFeeling + "\n"; 
	if(BOT_theReqJudgement)		BOT_traceString += "REQ  Judge   " + BOT_theReqJudgement + "\n"; 

	// current topic management
	if(!BOT_theReqTopic) {
		if(BOT_theReqPerformative == "f") {
			BOT_theReqTopic = BOT_theUserTopicId; 
			BOT_traceString += "FEEL topic   " + BOT_theReqTopic + "\n";
			}
		else if (BOT_theReqPerformative == "w") BOT_theReqTopic = BOT_theLastTopic; 
		else {
			var thebottopicid = (eval(BOT_theBotId)).topicId; // back to current bot 
			BOT_theReqTopic = thebottopicid;  // BOT_theLastTopic ? BOT_theLastTopic : BOT_theTopicId;
			BOT_traceString += "LAST topic   " + BOT_theReqTopic + "\n";
			// relation to another topic
			if(BOT_theReqRelation) {
				rel = BOT_get(BOT_theReqTopic, BOT_theReqRelation,"VAL");
				if(BOT_member(BOT_topicIdList,rel)) {
					BOT_theReqTopic = rel;
					BOT_traceString += "NEW  topic   " + BOT_theReqTopic + "\n";
				}
			 }
		}
	}
	else BOT_theTopicId = BOT_theReqTopic; // updates current topic

}

// returns expr associated vith tag in BOT_lemTagList else undefined
function BOT_greplemTagElement(tag) {
	var tagval;
	for (i in BOT_lemTagList) {
		tagval = BOT_lemTagList[i];
		if( tagval[0] == tag ) return (tagval[1])
	}
	return null; 
}
 
			
			

// ====================================================================
//                         RESOLVE REQUEST
// ====================================================================

// main dispatch
// the result of execution of performatives is r = [emote, answer] or undefined
function BOT_resolveRequest() {
	BOT_theLastAnswerShort = BOT_reqAnswerShort;
	BOT_theLastAnswerLong  = BOT_reqAnswerLong;
	
	BOT_reqSuccess      = true;		// contains the result of request on model
	BOT_reqEmote        = "";		// contains the emote string
	BOT_reqAnswerShort  = "";		// contains the answer string -- mode short
	BOT_reqAnswerLong   = "";		// contains the answer string -- mode long
	BOT_reqFilled       = false;	// true when BOT_reqSuccess, BOT_reqEmote,BOT_reqAnswerShort/long filled


	// ASSUMPTIONS: BOT_theReqPerformative and BOT_theReqTopic exist
	switch (BOT_theReqPerformative) { // there is always one (z)
 		case "a": BOT_onAsk(); break;
 		case "b": BOT_onBravo(); break;
 		case "c": BOT_onCriticize(); break;
 		case "d": BOT_onDislike(); break;
 		case "e": BOT_onEffect(); break;
 		case "f": BOT_onFeel(); break;
 		case "g": BOT_onGreet(); break;
 		case "h": BOT_onHow(); break;
 		case "i": BOT_onIntent(); break;
 		case "j": BOT_onJudge(); break;
 		case "k": BOT_onKnow(); break;
 		case "l": BOT_onLike(); break;
 		case "m": BOT_onMore(); break;
 		case "n": BOT_onNo(); break;
 		case "o": BOT_onObject(); break;
 		case "p": BOT_onPossible(); break;
 		case "q": BOT_onQuit(); break;
 		case "r": BOT_onReply(); break;
 		case "s": BOT_onSuggest(); break;
 		case "t": BOT_onTell(); break;
 		case "u": BOT_onUndo(); break;
 		case "v": BOT_onVerify(); break;
 		case "w": BOT_onWhy(); break;
 		case "x": BOT_onExecute(); break;
 		case "y": BOT_onYes(); break;
 		case "z": BOT_onZee(); break; // future extensions
 		default : break;
		};
	
	// ------------------------------  EPILOG  ----------------------------------- 
	
	
	BOT_reqApplicationPostProcessing(); 
	
	if(BOT_theReqPerformative != "z")	BOT_theLastPerformative  = BOT_theReqPerformative;
	if(BOT_theReqTopic) {
		BOT_theLastTopic = BOT_theReqTopic;
		BOT_theTopicId   = BOT_theReqTopic    // sets also the current topic id
	}

	if(BOT_theReqAttribute)		BOT_theLastAttribute    = BOT_theReqAttribute;
	if(BOT_theReqRelation)		BOT_theLastRelation     = BOT_theReqRelation;
	if(BOT_theReqValue)			BOT_theLastValue        = BOT_theReqValue;
	if(BOT_theReqStresser)		BOT_theLastStresser     = BOT_theReqStresser;
	if(BOT_theReqText)			BOT_theLastText         = BOT_theReqText;  

	BOT_reqAnswerShort    = BOT_fillMetaString(BOT_reqAnswerShort); 
	BOT_reqAnswerLong     = BOT_fillMetaString(BOT_reqAnswerLong); 
	
	BOT_traceString  += "SUCCESS      " + BOT_reqSuccess     + "\n";
	BOT_traceString  += "EMOTE        " + BOT_reqEmote       + "\n";
	BOT_traceString  += "SHORT ANSWER " + BOT_reqAnswerShort + "\n";
	BOT_traceString  += "LONG  ANSWER " + BOT_reqAnswerLong  + "\n";
}




// ====================================================================
//     PERFORMATIVES POST PROCESSING AND EVENTS SENT TO APPLICATION
// ====================================================================

// pass control to application specific treatments -- called by EPILOG of BOT_resolveRequest
function BOT_reqApplicationPostProcessing () {
	return;
}

// functions controlling events sent to the application -- called by BOT_onGreet
// they must be redefined if required 
function BOT_onSwitchBot(oldbotid,newbotid) {
	return;
}


// fills meta characters contained into a string
// _TN_	is the name of the current topic
// _BN_	is the name of the current bot
// _UN_	is the name of the current user
function BOT_fillMetaString(s) {
	if(!s) return "";
	var res = s;
	var r = BOT_topicToName(BOT_theTopicId);
	if (r != undefined) res = res.replace(/\_TN\_/g, r);
	var r = BOT_topicToName(BOT_theBotId);
	if (r != undefined) res = res.replace(/\_BN\_/g, r);
	var r = BOT_topicToName(BOT_theUserTopicId); 
	if (r != undefined) res = res.replace(/\_UN\_/g, r);
	return (res)
}





// *************************************************************************************************************
// *************************************************************************************************************
//                                                     TAGGING WORDS
// *************************************************************************************************************
// *************************************************************************************************************


// SYNTAX BOT_tagWords =  [ ["COM",  "word"], ["REF","topicid"],["KYS",["key1", "key2"]], ..]
// Types:
// "TXT"	plain text (not in the language)
// "PER"	Performative
// "SEP"	separator
// "STR"	stresser
// "REF"	reference to a topic
// "ACT"	action key
// "REL"	relation key
// "KEY"	single key  
// "KYS"	composed key 

// builds the BOT_lemTagList from BOT_lemWordList
function BOT_tagWords() {
	BOT_lemTagList = [];
	var w,t;
	for(var i in BOT_lemWordList) {
		w   = BOT_lemWordList[i];	
		t   = "TXT";							// default
		res = w;  								// default
		if(w == "_possibility")      t = "POS";
		else if(BOT_wordIsPer(w,i))  t = "PER";	// i = position in sentence
		else if(BOT_wordIsSep(w))    t = "SEP";
		else if(BOT_wordIsPss(w))    t = "PSS";
		else if(BOT_wordIsEqu(w))    t = "EQU";
		else if(BOT_wordIsFee(w))    t = "FEE";
		else if(BOT_wordIsJud(w))    t = "JUD";
		else if(BOT_wordIsStr(w))    t = "STR";	// stresser
		else if(BOT_wordIsVal(w,i))  t = "VAL";	// supersede the rest
		else if(BOT_wordIsAct(w))    t = "ACT";
		else if(BOT_wordIsRel(w))    t = "REL";
		else if(BOT_wordIsRef(w))  { t = "REF"; res = BOT_wordIsRef(w) }
		else if(BOT_wordIsKey(w) ) {
			t = "KEY";
			if(i>0) { // if no performative 
				// Composed keys
				var pred = BOT_lemTagList[i-1];
				if(i != 0 && pred[0] == "KEY") {	   // two keys
					t = "KYS";
					res = [pred[1],w];
					BOT_lemTagList[i-1] = "_$_";	   // used locally
				}
				else if(pred[0] == "KYS") {			   // more than two keys
					t = "KYS";
					res = pred[1].concat([w]);
					BOT_lemTagList[i-1] = "_$_";	   // used locally
				}
			}
		}
		BOT_lemTagList = BOT_lemTagList.concat([[t,res]]);
	}
	// delete first of composed keys
	BOT_lemTagList = BOT_delete(BOT_lemTagList,"_$_");
}


// ====================================================================
//                      WORD TAGGING PREDICATES
// ====================================================================

// word is a performative
function BOT_wordIsPer(word,i) {
	if(i == 0 && BOT_member(BOT_commandList,word)) return(true) 
	return (false)
}

// word is a separator of arguments
function BOT_wordIsSep(word) {
	if(word == "with" || word == "and") return(true) 
}

// word is a possessive 
function BOT_wordIsPss(word) {
	if(word == "of") return(true) 
}

// word is an equality
function BOT_wordIsEqu(word) {
	if(word == "eq") return(true) 
}


// word is a stresser
function BOT_wordIsStr(word) {
	if(BOT_member(BOT_stresserList,word)) return(true)
	return (false)
}

// word is a value 
function BOT_wordIsVal(word,i) {
	if(i != 0) {
		var e = BOT_lemTagList[i-1][1];
		if (e == "eq" || e == "with") return(true) 	// it is ANYTHING after eq or with
	}
	if(word.search(/(\d+)/g) != -1) return(true) 	// it is an integer anywhere
	return (false)
}

// word is an action 
function BOT_wordIsAct(word) {
	if(BOT_member(BOT_actionList,word))	return(true) 
	else return (false)
}

// word is a relation
function BOT_wordIsRel(word) {
	if(BOT_member(BOT_relationList,word)) return(true) 
	else return (false)
}


// word is a feeling
function BOT_wordIsFee(word) {
	for (var i in BOT_feelingList) {
		if( word == BOT_feelingList[i][0] )  return(true) 
	}
	return (false)
}

// word is a judgement
function BOT_wordIsJud(word) {
	for (var i in BOT_judgementList) {
		if( word == BOT_judgementList[i][0] )  return(true) 
	}
	return (false)
}

// word is a reference to a topic
function BOT_wordIsRef(word) {
	// BOT_resList = [BOT_theTopicId,word]; // default
	// indexicals
	if(BOT_member(BOT_botPronounList,word))    return(eval(BOT_theBotId).topicId)   // change to bot topic
	if(BOT_member(BOT_topicPronounList,word))  return(BOT_theTopicId)               // topic unchanged
	// refs
	var tid,ta,lref;
	for (var i in BOT_topicIdList) {
		tid = BOT_topicIdList[i];
		ta = BOT_getTopicAttribute(tid,"_reference");
		if(ta) {
			lref = BOT_getTopicAttributeTagValue(ta,"VAL");
			if(BOT_member(lref,word)) return (tid) 
		}
	}
	return false
}

// word is a key 
function BOT_wordIsKey(word) {
	if(BOT_member(BOT_keyList,word))  return(true) 
	else return (false)
}






// *************************************************************************************************************
// *************************************************************************************************************
//                                INPUT STRING PROCESSING: from raw text to words
// *************************************************************************************************************
// *************************************************************************************************************

// from raw text to words 
function BOT_inputStringProcessing(s) {
	var lemstring = (s == "") ? "ping" : s;  // empty output + CR means ping
	lemstring       = BOT_rawStringExtraction(lemstring);
	BOT_traceString += "RAW EXTRACT  \"" + lemstring + "\"\n";
	lemstring       = BOT_englishStringLemmatization(lemstring);
	BOT_traceString += "ENGLISH      \"" + lemstring + "\"\n";
	BOT_lemString   = BOT_mapLemSynonyms(lemstring);
	BOT_traceString += "SYNONYMS     \"" + lemstring + "\"\n";
	BOT_lemWordList = BOT_extractWords();
}


// ====================================================================
//                          RAW STRING EXTRACTION
// ====================================================================

// It is possible to modalize the performatives with some extra stressers 
// stressers must be at the end of input (possibly followed by whitespaces)
// one can give only one stresser by input
// "please" can be anywhere

//	!	makes the performative stronger
//	?	puts and interrogative form to the request
//	*	stands for 'please' meaning politeness or moral demand, ...
//	@	stand for 'apologize' or 'sorry' politely
//	&	puts an accent of irony to the request just like -:)
 
//	these symbols can be doubled for more force :
//	!!	strong order, strong bravo, strong disagree
//	??	= surprise
//	**	=  beg
//	@@	= strong apology, excuse, regrets
//	&&	= counterstatement: j P && == j \[Not]P

function BOT_rawStringExtraction(s) {
	var res = s ;
	res = res.replace(/ +$/g, ""); // deletewhitespaces at end
	
	// javascript expression following words compute|calculate|evaluate|comp|calc and placed AT END
	BOT_theReqJavascript = res;  
	res = res.replace(/(.*) (compute|calculate|evaluate|comp|calc) (.*)/g, "$1 compute");
	BOT_theReqJavascript = BOT_theReqJavascript.replace(/(.*) (compute|calculate|evaluate|comp|calc) (.*)/g, "$3");

	// strong stressers double at end
	res = res.replace(/(.*)\!\!$/g, "$1 _harsh");
	res = res.replace(/(.*)\?\?$/g, "$1 _surprise");
	res = res.replace(/(.*)\*\*$/g, "$1 _begging");
	res = res.replace(/(.*)\@\@$/g, "$1 _apology");
	res = res.replace(/(.*)\&\&$/g, "$1 _counterstatement");
	
	// light stressers single at end
	res = res.replace(/(.*)\!$/g, "$1 _strong");
	res = res.replace(/(.*)\?$/g, "$1 _interrogation");
	res = res.replace(/(.*)\*$/g, "$1  please"); // _please below
	res = res.replace(/(.*)\@$/g, "$1 _sorry");
	res = res.replace(/(.*)\&$/g, "$1 _irony");
	
	res = " "+res+" "; ;
	
	// please
	res = res.replace(/(.*)please(.*)/g, "$1 $2 _please");
	
	// possibility     -- TO DO: impossible unavailable
	/*
	var t = ["can i","is it possible to","is it authorized to","is it authorised to","possible","possibility", 
			"available","availability","authorized","authorised","authorization","authorisation"];

	var rex;
	for (var i in t) {
			rex = new RegExp(eval("/(.*) " + t[i] + " (.*)/g"));
			res = res.replace(rex, "$1 $2 _possibility");
		}
	res = res.replace(/^ [\?p] ?(\w) (.*)/g, "$1 $2 _possibility"); // pa | p a  | ?a  | ? a  at begin 
	
	// is|are   at begin
	res = res.replace(/^( is | are )(.*)/g, " v $2");
	*/
	return res
}



// ====================================================================
//                        ENGLISH LEMMATIZATION
// ====================================================================

// main english lemmatization
function BOT_englishStringLemmatization (s) {
	var res = s.toLowerCase();
	res = BOT_deleteStringAccents(res); 
	res = res.replace(/[\<\>]/g, " ");     // deleted chars < and >  
	res = "< "+res+" >";                   // add left and right borders of lemmatized form
	res = res.replace(/< +/,"< ");         // deletes multiple withespaces in front
	//alert("|"+res+"|");
	//res = res.replace(/[\-]/g, "_");     // char - is repaced by char _ for composed keys
	res = res.replace(/[\"]/g, "¤");     // char " is repaced by char ¤ = 164
	res = res.replace(/[\!\?\,\.\;\:\#\\§\=\%\*\+\'\(\)\{\}\[\]\@\&\$]/g, " "); // deleted chars
	res = res.replace(/ +/g, " ");        // shrink withespaces
	res = res.replace(/ +>/," >");        // deletes multiple withespaces at the end
	//alert("|"+res+"|");
	return res;
}

// delete accents
function BOT_deleteStringAccents (s) {
	var res = s;
	res = res.replace(/\ä/g, "a");
	res = res.replace(/\à/g, "a");
	res = res.replace(/\â/g, "a");
	res = res.replace(/\é/g, "e");
	res = res.replace(/\è/g, "e");
	res = res.replace(/\ê/g, "e");
	res = res.replace(/\ë/g, "e");
	res = res.replace(/\î/g, "i");
	res = res.replace(/\ï/g, "i");
	res = res.replace(/\ô/g, "o");
	res = res.replace(/\ù/g, "u");
	res = res.replace(/\ü/g, "u");
	res = res.replace(/\ç/g, "c");
	return res;
}

// lem synomyms mapping
// replace words by their synsonyms in BOT_basicSynonymList
// they must have a withespace before and after
// TODO delete mary's possive s
function BOT_mapLemSynonyms(lem) {
	var t   = BOT_basicSynonymList;
	var res = lem;
	var a,la,rex;
	// replaces synonyms
	for (var i in t) {
		a = t[i][0];
		la = t[i][1];
		for (var j in la) {
			rex = new RegExp(eval("/ " + la[j] + " /g"));
			res = res.replace(rex, " "+a+" ");
		}
	}
	// delete everything before a command _a                               // bug with "b like"
	t = BOT_commandList;
	for (var i in t) {
		rex = new RegExp(eval("/(.*) " + "_" + t[i] + " (.*)/g"));
		res = res.replace(rex, "< "+t[i]+" $2");
	}
	res = res.replace(/ +/g, " "); // shrink extra withespaces 
	return (res)
} 


// ====================================================================
//                       EXTRACT WORDS FROM LEMS
// ====================================================================

// Extract a list of words from BOT_lemString
// Number of words extracted is limited
// plurals are cut on words
function BOT_extractWords() {
	var word, matchlist;
	var lemstring = BOT_lemString;
	var worldlist = [];
	var rex       = new RegExp("< (\\w+) (.*)");
	for(var i=0; i<BOT_maxExtractedWords; i++) {  // Words extracted is limited
		if(lemstring.search(rex) != -1) {
			rex.lastIndex = 0;
			matchlist = rex.exec(lemstring);
			word = BOT_englishWordCutPlural(matchlist[1]);
			worldlist = worldlist.concat(word);
			lemstring = "< "+matchlist[2];
		}
	}
	return worldlist;
}


// cut plurals on words in BOT_extractWords
// cut s at the end of words >3 letters (his -> his) max plurals  = 10
// do not cut plurals in BOT_pluralExceptionList
function BOT_englishWordCutPlural(word) {
	if( BOT_member(BOT_pluralExceptionList, word) || word.length <= 3 ) return word;
	else return(word.replace(/(\w+)s$/, "$1"));
}










// *************************************************************************************************************
// *************************************************************************************************************
//                                                 SERVICE FUNCTIONS
// *************************************************************************************************************
// *************************************************************************************************************


// ====================================================================
//                              LISTS 
// ====================================================================

// returns true if the VALUE v is in the array t or false otherwise
function BOT_member(t,v) {
	if(t.length == 0) return false;
	else {
		var i = 0;
		while (i < t.length) {
			 if (t[i] == v) break;
 			 else i++;
		}
		if (i == t.length) return false;
		else return true;
	}
}

// appends value v to array t if v is not already in t
function BOT_appendFree(t,v) {
	if(BOT_member(t,v)) return (t);
	else return (t.concat([v]))
}

// appends elements of t2 to t1 that are not already in t1
function BOT_concatFree(t1,t2) {
	if(t2.length == 0) return t1;
	for(i in t2) { t1 = BOT_appendFree(t1,t2[i])}
	return t1;
}

// deletes an atom within a list -- atom is a Javascript object
function BOT_delete(list,atom) {
	var l = new Array();
	for(i in list) {
		if(list[i] != atom) l = l.concat([list[i]]);
	}
	return l;
}

// the argument list must be a JavaScript array
// first element of a list
function BOT_first(list) {
	if(list.length>0) return list[0]
	else return (undefined);
}
// rest of a list
function BOT_rest(list) {
	if(list.length>1) return list.slice(1,list.length)
	else return []
}
// last element of a list
function BOT_last(list) {
	if(list.length>0) return list[list.length-1]
	else return (undefined);
}



// checks if the object is an array
function BOT_isArray(x) {
	if( typeof(x) == "object") return (x.constructor.toString().indexOf("Array") != -1);
	else return false;
}
 
 
 
// ====================================================================
//                       WEB CONFIGURATION
// ====================================================================
// navigator detection
function BOT_setNavigator() {
	if (navigator.appName == "Netscape") return("NN")
	else if(navigator.appName.indexOf("Microsoft") !=-1)  return("IE")
	else return (null)
}






// *************************************************************************************************************
// *************************************************************************************************************
//                                         ACCESS FUNCTIONS TO THE MODEL
// *************************************************************************************************************
// *************************************************************************************************************


// ====================================================================
//                BUILDING MODELS OF BOTS AND TOPICS
// ====================================================================
// make new bot
function BOT_makeBot(botid,topicid) {
	this.botId			= botid;
	this.topicId		= topicid;
	this.character		= null;
	BOT_botIdList       = BOT_appendFree(BOT_botIdList,botid);
	BOT_botNameList     = BOT_appendFree(BOT_botNameList,BOT_get(topicid,"name","VAL"));
	BOT_botObjectList   = BOT_appendFree(BOT_botObjectList,this);
	BOT_declareTopics([topicid]);
	return(this)
}

// declare a list of topics
function BOT_declareTopics(topicIdList) {
	var tid;
	for(var i in topicIdList) { 
		tid = topicIdList[i];
		BOT_topicIdList 	= BOT_appendFree(BOT_topicIdList,tid);
		BOT_topicObjectList	= BOT_appendFree(BOT_topicObjectList,eval(tid));
		BOT_keyList 		= BOT_concatFree(BOT_keyList,		BOT_extractKeyNames(tid)); 
		BOT_actionList		= BOT_concatFree(BOT_actionList,	BOT_extractKeyNamesFromTagValue(tid,"CAT","ACT"));	
		BOT_relationList	= BOT_concatFree(BOT_relationList,	BOT_extractKeyNamesFromTagValue(tid,"CAT","REL"));	
	}
}

// returns the list of key names in toipicid
function BOT_extractKeyNames(topicid) {
	var t = eval(topicid);
	var lres = [];
	var res;
	for(var i in t) {
		res = BOT_getTopicAttributeTagValue(t[i],"KEY");
		if(res) lres = lres.concat(res)
	}
	return lres
}

// returns the list of key names in toipicid that are associated with tag
function BOT_extractKeyNamesFromTagValue(topicid,tag,value) {
	var t = eval(topicid);
	var lres = [];
	var ta,res;
	for(var i in t) {
		ta = t[i];
		for(var j in ta) {
			tagval = ta[j];
			if(tagval[0] == tag && tagval[1] == value) { 
				res = BOT_getTopicAttributeTagValue(ta,"KEY");
				if(res) lres = lres.concat(res);
				break;
			}
		}
	}
	return lres
}



// ====================================================================
//                      EXTRACT TOPIC INFO
// ====================================================================


// returns the topic attribute array associated with key else = undefined
// topic is a "topicid" or a topicobject 
// key is a  single "string" or array ["string1","string2", ..]
function BOT_getTopicAttribute(topic, key) {
	var t = (typeof(topic) == "string") ? eval(topic) : topic;
	BOT_getTopicAttributeIndex = -1; // to mark the index
	if(BOT_isArray(key) && key.length>0) return BOT_getTopicAttributeKeyList(t,key);
	else return BOT_getTopicAttributeKeySingle(t,key);
}


// key is a "string
function BOT_getTopicAttributeKeySingle(topicobject, key) {
	var ta		 = []; 		// array of attributes
	var tagval   = []; 		// couple ["tag", "value"] in ta
	var hit      = false;
	var res;
	for(var i in topicobject) {
		ta = topicobject[i];
		
		for(var j in ta) {
			tagval = ta[j];
			if(tagval[0] == "KEY" && BOT_matchKey(tagval[1],key)) { hit = true; BOT_getTopicAttributeIndex = parseInt(i); res = ta; break}
		};
		if(hit) break;
	}
	return res // attribute array or undefined
}

// key is an array ["string1","string2", ..]
// TODO compute ******** BOT_getTopicAttributeIndex *********
function BOT_getTopicAttributeKeyList(topicobject, keylist) {
	var ta		 = []; 				// array of attributes
	var tagval   = []; 				// couple ["tag", "value"] in ta
	var list1    = topicobject;		// all lines at beginning
	var list2    = [];	 
	var hit      = false;
	var key,res;
	for  (var x in keylist) {
		key   = keylist[x];
		list2 = [];
		for(var i in list1) {
			ta = list1[i];
			for(var j in ta) {
				tagval = ta[j];
				if(tagval[0] == "KEY" && BOT_matchKey(tagval[1],key)) list2 = list2.concat([ta]); 
			};
		}
		list1 = list2;
	}
	if(list2.length>0) return list2[0]
	else BOT_getTopicAttributeKeySingle(topicobject, keylist[0]) // default -> try with first key
}

// matches a single key with a "string" or an array["string1","string2", ..]
function BOT_matchKey(ref,key) {
	if(BOT_isArray(ref)) return (BOT_member(ref, key))
	else if(ref == key) return true
	else return false
}


// given a topic attribute array = [ ["tag",val],["tag",val], ..] returns value associated with "tag" 
// only first occurrence is returned else undefined
function BOT_getTopicAttributeTagValue(topicattribute,tag) {
	var ta  = topicattribute;
	var res = undefined;
	BOT_getTopicAttributeTagValueIndex = -1;
	for(var i in ta) { if(ta[i][0] == tag) { BOT_getTopicAttributeTagValueIndex = parseInt(i); res = ta[i][1]; break}};
	if(res == undefined && tag == "CAT")  res = "INFO";  // set default
	if(res == undefined && tag == "TYPE") res = "STR";   // set default
	return res;
}
 
// values in topic
function BOT_processTagValue(topic,attr,tag,val) {
	
}
	
	
	
// returns value of tag of attribute of topic
function BOT_get(topic,key,tag) {
	var ta = BOT_getTopicAttribute(topic, key);
	if(ta != undefined) return BOT_getTopicAttributeTagValue(ta,tag)
	else return;
}


// returns the name of a topic or its reference - first occurrence used
function BOT_topicToName(tid) {
	var res = BOT_get(tid,"name","VAL");
	if(!res) res = BOT_get(tid,"_reference","VAL");
	if(BOT_isArray(res)) { 
		if(res.length > 0) return res[0]
		else return "Unnamed" // no name nor reference founc
		}
	else return res
}

// set value of tag of attribute of topic -- only single key
// return true/false if fails/succeed
function BOT_set(topic,key,tag,value) {
	var t = (typeof(topic) == "string") ? eval(topic) : topic;
	var ta = BOT_getTopicAttribute(topic, key);
	if(ta == undefined) return false;
	var val = BOT_getTopicAttributeTagValue(ta,tag);
	if(val == undefined) return false;
	if(BOT_getTopicAttributeIndex == -1 || BOT_getTopicAttributeTagValueIndex == -1) return false;
	t[BOT_getTopicAttributeIndex][BOT_getTopicAttributeTagValueIndex][1] = value;
	return true
}


// append value x to tag of attribute of topic -- only single key
// return true/false if fails/succeed
// previous value of tag can be:
// a     -> [a,x]
// [null]-> [x]
// []    -> [x]
// [a,b] -> [a,b,x]
// a     -> [a,x]
// moreover if x = [1,2] -> [a,b,[1,2]]
function BOT_add(topic,key,tag,value) {
	var t = (typeof(topic) == "string") ? eval(topic) : topic;
	var ta = BOT_getTopicAttribute(topic, key);
	if(ta == undefined) return false;
	var val,res;
	val = BOT_getTopicAttributeTagValue(ta,tag);
		if(val == undefined) return false;
		else if(val == "none" || val == null) res = [value];
		else if(!BOT_isArray(val)) res = [val,value];
		else if(val[0] == undefined)  res = [value];
		else res = val.concat([value]);	
	if(BOT_getTopicAttributeIndex == -1 || BOT_getTopicAttributeTagValueIndex == -1) return false;
	t[BOT_getTopicAttributeIndex][BOT_getTopicAttributeTagValueIndex][1] = res;
	return true
}

// sumetric  to BOT_add
// delete element value into val of topic,key,tag 
// val is scalar: if equal   val <- null
// val is array of acalars:  dzlete value in it
// val is array of arrays and value is array: if subarray of ***LEVEL 1*** is equal then delete it
function BOT_del(topic,key,tag,value) {
	var t = (typeof(topic) == "string") ? eval(topic) : topic;
	var ta = BOT_getTopicAttribute(topic, key);
	if(ta == undefined) return false;
	var val,res,x,ok;
	val = BOT_getTopicAttributeTagValue(ta,tag);
	if(val == undefined) return false;
	res = [];
	if(!BOT_isArray(val) && val == value) res = null;
	else {
		for(var i in val){
			x = val[i];
			if(BOT_isArray(x)) {
				ok = true;
				for(var j in x) {
					if( value[j] == undefined || x[j] != value[j] ) ok = false;
					}
				if (!ok) res = res.concat([x]);
			}
			else if(x != value) res = res.concat(x);
		}
	}
	if(BOT_getTopicAttributeIndex == -1 || BOT_getTopicAttributeTagValueIndex == -1) return false;
	t[BOT_getTopicAttributeIndex][BOT_getTopicAttributeTagValueIndex][1] = res;
	return true
}

 
// appply func to value of tag of attribute of topic -- only single key
// return true/false if fails/succeed
function BOT_apply(topic,key,tag,func) {
	var t = (typeof(topic) == "string") ? eval(topic) : topic;
	var ta = BOT_getTopicAttribute(topic, key);
	if(ta == undefined) return false;
	var val = BOT_getTopicAttributeTagValue(ta,tag);
	if(val == undefined) return false;
	if(BOT_getTopicAttributeIndex == -1 || BOT_getTopicAttributeTagValueIndex == -1) return false;
	t[BOT_getTopicAttributeIndex][BOT_getTopicAttributeTagValueIndex][1] = func(val);
	return true
}


// execute action in model - TODO multiple arguments
// one arg in model max and one arg1 max
function BOT_exec(topic,action, arg1) {
	var t = (typeof(topic) == "string") ? eval(topic) : topic;
	var ta = BOT_getTopicAttribute(topic, action);
	if(ta == undefined) return false;
	var func = BOT_getTopicAttributeTagValue(ta,"VAL");
	if(func == undefined) return false;
	if (typeof(topic) == "string") { eval(func+"("+arg1+")"); return true}
	else if(BOT_isArray(func)) { eval(func[0]+"("+func[1]+","+arg1+")"); return true}
	else return false
}




// ====================================================================
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo WORK
// ====================================================================

/* --------------------------------------------------------------------
KNOWLEDGE
ask 	 a 	A  			asks I the value V of the attribute A in M(I)
verify 	 v 	P  			asks I if P standsb in M(I)
tell 	 t 	P  			states to I that P stands in M(L)
reply 	 r 	T A F V P 	reacts to I by answering an information from M(L)
know 	 k 	T A F  		asks I if an entity (T or A or F) is in M(I)c
why 	 w 	P  			asks I why P standsc in M(L)
possible p 	F  			asks I if F can be executed (availability, rights etc.)b
how 	 h 	O  			asks I how to achieve an operation O, in terms of Fi
effect 	 e 	F  			asks I about the usage/effects of executing F

ACTIONS
execute  x 	FXi 		requests I to execute function call F(Xi) (Xi can be empty)
more 	 m  			requests I to repeat the last executed performative 
undo 	 u  			requests I to undo the last execute performatived

OPINIONS
judge 	 j	P  			expresses to I his subjective opinion via P
feel 	 f 	P			expresses to I his subjective feeling via P (P over Mmind(L))
like 	 l 	T A F V P	expresses to I his subjective preference about an entity, resp. P
dislike  d 	T A F V P	expresses to I his subjective dis-preference about an entity, resp. P
bravo 	 b 	T A F P		congratulates I about an entity in M(I), resp. P
criticize c T A F P		criticizes/blames I about an entity in M(I), resp. P
suggest  s 	F FXi 		suggests/advises I to use F or execute F(Xi)
object 	 o 	F FXi 		objects/forbids I to use F or execute F(Xi)
intent 	 i 	F FXi 		informs I that L intents to use F or execute F(Xi) in near future

DIALOG
yes 	 y				replies yes to I e.g. after: verify, know, possible, ..
no 		 n				replies no to I
greet 	 g 	T			greets If (Args empty) or switch between interlocutors (T)
quit 	 q				quits the system
extra 	 z 	E			uses this meta-performative to enter extension modes
------------------------------------------------------------------------ */


 
var BOT_reqSayMode  = "LONG";	// "LONG"|"SHORT" modes for expressing textal answer
var BOT_reqHintMode = true;		// flag for expressing textual hints to the user after answers
// often but not always, we have:
// arg1 = topicobject, action
// arg2 = attribute
// arg3 = result/value
function BOT_reqSay (success,emote,reason,arg1,arg2,arg3) { 
	BOT_reqSuccess = success;
	BOT_reqEmote   = emote;
	var short = "";
	var long  = "";
	switch (reason) {  
 	case "ATTRIBUTENOTFOUND": 
		short += "Not found";
		long  += "I found no attribute "+arg2+" for "+BOT_expressTopic(arg1); 
		break;
	case "ACTIONNOTFOUND": 
		short += "Not found";
		long  += "I found no action "+arg2+" for "+BOT_expressTopic(arg1); 
		break;
 	case "TAGNOTFOUND":
		short += "Not found";
		long  += "I found nothing for "+arg2+" for "+BOT_expressTopic(arg1);
		break;
	 case "FEELINGNOTFOUND": 
		short += "Not found";
		long  += "I found no feeling "+arg2+" for "+BOT_expressTopic(arg1); 
		break;
	case "RELATIONFOUND": 
		short += "Not found";
		long  += "I found no relation "+arg2+" for "+BOT_expressTopic(arg1); 
		break;
	case "NEEDSATTTRIBUTE":
		short += "No attribute";
		long  += "Command '"+BOT_theReqPerformative + "' needs an attribute name";
		if(BOT_reqHintMode) BOT_buildHintText("ATTRIBUTELIST");
		break;
	case "NEEDSACTION":
		short += "No action";
		long  += "Command '"+BOT_theReqPerformative + "' needs an action name";
		if(BOT_reqHintMode) BOT_buildHintText("ACTIONLIST");
		break;
	case "BADATTTRIBUTE":
		short += "Bad attribute";
		long  += "May be " + arg1 + " is not an attribute name"; 
		if(BOT_reqHintMode) BOT_buildHintText("ATTRIBUTELIST");
		break;
	case "BADACTION":
		short += "Bad action";
		long  += "May be " + arg1 + " is not an action name"; 
		if(BOT_reqHintMode) BOT_buildHintText("ACTIONLIST");
		break;
	case "BADAGENT":
		short += "Bad agent";
		long  += "May be " + arg1 + " is not an agent name"; 
		if(BOT_reqHintMode) BOT_buildHintText("AGENTTLIST");
		break;
	 case "TELLRESULT": // managed by ask, how
		short += arg3;
		long  += arg3; 
		break;
	case "THANKYOU":
		short += "Thanks";
		long  += "Thank you very much";
		break;
	case "USERLIKEREMEMBER":
		short += "I learn your liking";
		long  += "Thank you very much! I will remember that you like "+BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "USERDISLIKEREMEMBER":
		short += "I learn your disliking";
		long  += "I will remember that you don't like "+BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "HEU":
		short += "Heu..";
		long  += "Heu, I am not sure about "+ arg1;
                break;
	case "GOODNEWS":
		short += "Fine";
		long  += "I am happy to hear that";
                break;
	case "BADNEWS":
		short += "Too bad";
		long  += "I am sad to hear that";
		break;
	case "MAKESMEHAPPY":
		short += "Makes me happy";
		long  += "Now, that makes me feel happy";
		break;
	case "MAKESMESAD":
		short += "Makes me sad";
		long  += "That makes me sad suddenly";
		break;
	case "YOUAREIRONIC":
		short += "Its ironic";
		long  += "I am a bit puzzled because I think that you are being ironic";
		break;
	case "PING":
		short += "Hi";
		long  += "Yes, I am here";
		break;
	case "HELLO":
		short += "Hi";
		long  += "Hello, I am here";
		break;
	case "HELLONAME":
		short += "Hi";
		long  += "Hello, I am "+arg1;
		break;
	case "TOPICCANTDOACTION":
		short += "Can't do it";
		long  += "It is not possible to perform action "+arg1+ " with "+BOT_expressTopic(arg2) ;
                break;
        case "DONE":
		short += "Done";
		long  += "Action "+arg1+ " has been successfully executed";
		break;
	case "DONEWITHREPLY": // when an action returns a string its is replied
		short += arg1;
		long  += "the answer is: "+arg1;
		break;
	case "DONTREMEMBERLASTACTION":
		short += "Don't know how";
		long  += "I don't remember last performed action";
		break;
	case "CANTUNDO":
		short += "Can't undo";
		long  += "I am confused with topic "+ BOT_topicToName(arg2) + ", so I can't undo action "+arg1;
		break;
	case "NEEDSEXECUTEBEFORE":
		short += "Previous command is not 'x'";
		long  += "Sorry, to do that previous command must be 'execute'";
		break;
	case "USERQUITS":
		short += "Bye";
		long  += "Now this session is terminated. Bye Bye ...";
		break;
	case "USERSAIDNO":
		short += "Ok no";
		long  += "Hem, you said no...";
		break;
	case "USERSAIDYES":
		short += "Ok yes";
		long  += "Hem, you said no...";
		break;
	case "CONFIRMYESNO":
		short += "Confirm by yes or no";
		long  += "Hem, are you sure about that? just say Yes or No";
		break;
	case "CONFUSEDINDIALOG":
		short += "I am lost";
		long  += "Hem, Somehow, I got confused in the dialog. Can we start again?";
		break;
	case "VALUENEEDED":
		short += "Value needed";
		long  += "Yous should have provide an information";
		break;
	case "NONREQUIREDVALUE":
		short += "Not required";
		long  += "You said "+arg1+" but I don't know what to do about it";
		break;
	case "TELLWHY":
		short += arg3;
		long  += "Here is my best educated guess: "+ arg3;
		break;
	case "DONTKNOWWHY":
		short += "Don't know why";
		long  += "I don't know the reason why "+BOT_expressTopicAttribute(arg1,arg2)+" is like that";
		break;
	case "CANTSAYWHY":
		short += "Can't say why";
		long  += "I m sorry, I really can't say why things are like that";
		break;
	case "DONTKNOWHOW":
		short += "Don't know how to do";
		long  += "I don't know how one can perform action "+arg1;
		break;
	case "CANTSAYHOW":
		short += "Can't say how";
		long  += "I m sorry, I really can't answer upon how things should be carried out";
		break;
	case "FACTSTORED":
		short += "Fact learned";
		long  += "Thank you, I will remember that the "+arg1+" is "+arg3;
		break;
	case "BADFACTFORMAT":
		short += "Bad fact format";
		long  += "This command needs a fact of the form: [topic] attribute is value";
		break;
	case "NOFACTSABOUTBOT":
		short += "I Don't care";
		long  += "That's no use telling facts about ME!";
		break;
	case "FACTVERIFIED":
		short += "True";
		long  += "This fact is true";
		break;
	case "FACTNOTVERIFIED":
		short += "False";
		long  += "This fact is false";
		break;
	case "NOEXTENSIONSYET":
		short += "No extensions";
		long  += "Sorry, language extensions are not yet available";
		break;
	case "KNOWTOPIC":
		short += "I know about it";
		long  += "I am happy to say that I know "+BOT_expressTopic(arg1);
		break;
	case "DONTKNOWTOPIC":
		short += "I dont know about it";
		long  += "I am happy to say that I know nothing about "+BOT_expressTopic(arg1);
		break;
	case "KNOWATTRIBUTE":
		short += "I know about it";
		long  += "I am happy to say that I know about "+ BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "DONTKNOWATTRIBUTE":
		short += "I don't know about it";
		long  += "I am sorry to say that I don't know about "+ BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "KNOWACTION":
		short += "I know it";
		long  +=  "I am happy to say that I know about action "+arg1+" for "+ BOT_expressTopic(arg2);
		break;
	case "DONTKNOWACTION":
		short += "I don't know about it";
		long  += "I am sorry to say that I don't know any action "+arg1+" for " +BOT_expressTopic(arg2);
		break;
	case "COMMANDNEEDSARGUMENT":
		short += "Needs more";
		long  += "I am sorry to say that command '"+arg1+"' needs more information. For example: "+arg2;
		break;
	case "BADFEELING":
		short += "Bad feeling";
		long  += "May be "+arg1+" is not a known feeling";
		if(BOT_reqHintMode) BOT_buildHintText("FEELINGLIST");
		break;
	case "NOFEELING":
		short += "No feeling";
		long  += "Sorry to say that command 'f' needs a feeling name";
		if(BOT_reqHintMode) BOT_buildHintText("FEELINGLIST");
		break;
	case "USERPOSITIVENEWS":
		short += "Good for you";
		long  += "I am such happy to hear that about you";
		break;
	case "USERNEGATIVENEWS":
		short += "Bad for you";
		long  += "I am very sorry to hear that about you";
		break;
	case "CONFIRM":
		short += "Yes";
		long  += "Yes! Certainly";
		break;
	case "CONTRADICT":
		short += "No";
		long  += "No! On the contrary";
		break;
	case "NOTPARTICULARLY":
		short += "Not really";
		long  += "Well yes but not particularly ...";
		break;
	case "BADJUDGEMENTWORD":
		short += "Bad judgement word";
		long  += "May be "+arg1+" is not a known judgement word";
		if(BOT_reqHintMode) BOT_buildHintText("JUDGEMENTLIST");
		break;
	case "NOJUDGEMENTWORD":
		short += "No judgement";
		long  += "You should provide a judgement word for command 'j'";
		if(BOT_reqHintMode) BOT_buildHintText("JUDGEMENTLIST");
		break;
	case "NOUSERJUDGEMENT":
		short += "Not handled";
		long  += "Sorry there is no support for handling user's judjements";
		break;
	case "USERREPEATJUDGEMENT":
		short += "Judgement repeated";
		long  += "You have just repeated the same judgement on "+ BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "USERCHANGEJUDGEMENT":
		short += "Judgement reversed";
		long  += "I note that you have changed your mind about " + BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "USERNEWPOSITIVEJUDGEMENT":
		short += "I learn your positive judgement";
		long  += "I am happy to hear and bear in mind your positive judgement on " + BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "USERNEWNEGATIVEJUDGEMENT":
		short += "I learn your negative judgement";
		long  += "I am sorry to hear and bear in mind your negative judgement on " + BOT_expressTopicAttribute(arg1,arg2);
		break;
	case "THANKSFORSUGGESTION":
		short += "Suggestion granted";
		long  += "I thank you for your suggestion to do action " + arg1 +", I will use this advice";
		break;
	case "TAKEOBJECTION":
		short += "Objection taken";
		long  += "I will take your objection not to do action " + arg1;
		break;
	case "TAKEINTENTION":
		short += "Intention taken";
		long  += "Ok I take notice of your intention to do action " + arg1;
		break;
	case "ACTIONPOSSIBLE":
		short += "It is possible";
		long  += "Yes, action "+arg2+" is possible with "+BOT_expressTopic(arg1);
		break;
	case "ACTIONIMPOSSIBLE":
		short += "Not possible";
		long  += "Sorry but action "+arg2+" is possible with "+BOT_expressTopic(arg1);
		break;
	case "NYI":
		short += "Not yet available";
		long  += "I am sorry to say that command '"+arg1+"' is not yet available";
		break;
	case "UNKNOWNERROR":
		short += "Error";
		long  += "I am confused because of some inside error...";
		break;
 	default: alert("ERROR: BOT_reqSay"); break;
	}
	BOT_reqFilled = true;
	BOT_reqAnswerShort = short;
	BOT_reqAnswerLong  = long;
	return success
}
 




function BOT_buildHintText(mode) {
	var s = "";
	switch (mode) {  
 	case "ATTRIBUTELIST": s = "ATTRIBUTE_HINTS:" + BOT_keyList; break;
 	case "ACTIONLIST":    s = "ACTION_HINTS:"    + BOT_actionList; break;
 	case "AGENTTLIST":    s = "AGENTS_HINTS:"    + BOT_botNameList;break; 
 	case "RELATIONLIST":  s = "RELATION_HINTS:"  + BOT_relationList;break;
 	case "FEELINGLIST":   s = "FEELING_HINTS:"   + BOT_feelingText;break;
 	case "JUDGEMENTLIST": s = "JUDGEMENT_HINTS:" + BOT_judgementText;break;
	};
	BOT_theHintText = s;
}

		
// retrieves and expresses value associated with tag in attribute of BOT_theReqTopic
// returns success == true/false == BOT_reqSuccess 
// if the retrieved information is a function then it is evaluated with 3 args:  BOT_theReqTopic, attribute, tag
function BOT_reqRetrieveAttribute(attribute,tag) {
	var ta,res,restype;
	ta = BOT_getTopicAttribute(BOT_theReqTopic, attribute);
	BOT_traceString  += "TOPIC LINE  " + ta + "\n";
	if(!ta) return (BOT_reqSay(false,"SORRY","ATTRIBUTENOTFOUND",attribute,BOT_theReqTopic)) 
	else {
		res     = BOT_getTopicAttributeTagValue(ta,tag);
		if(typeof(res ) == "function") res = res(BOT_theReqTopic,attribute,tag); // it is an internal function
		restype = BOT_getTopicAttributeTagValue(ta,"TYPE");
		BOT_traceString  += "VALUE       " + res + "\n";
		if(res != undefined) return (BOT_reqSay(true,"HAPPY","TELLRESULT",attribute,BOT_theReqTopic,res,restype)) 
		else return (BOT_reqSay(false,"SORRY","TAGNOTFOUND",attribute,BOT_theReqTopic)) 
		}
}

// checks existence of attribute of BOT_theReqTopic
// returns true/false
function BOT_reqExistAttribute(attribute) {
	var ta = BOT_getTopicAttribute(BOT_theReqTopic, attribute);
	BOT_traceString  += "TOPIC LINE  " + ta + "\n";
	if(!ta) return (BOT_reqSay(false,"SORRY","ATTRIBUTENOTFOUND",attribute,BOT_theReqTopic)) 
	else return true
}



// ====================================================================
//                            PERFORMATIVES
// ====================================================================



// TODO  ask REL name of sister of cyril
// TODO indexicals with RELs  I am a student ->  is a student
function BOT_onAsk() {
	if(!BOT_theReqAttribute && BOT_theReqFeeling)   { 
		BOT_traceString  += "GOTO command feel" + "\n"; // change performative
		BOT_onFeel(); 
		return;
		}  
	if(!BOT_theReqAttribute && BOT_theReqAction)    {
		BOT_traceString  += "GOTO command effect" + "\n"; // change performative
		BOT_onEffect();
		return
		}
	if(BOT_theReqAttribute) {
		// general ask handling
		var ta,res,restype,onaskfunc;
		ta = BOT_getTopicAttribute(BOT_theReqTopic, BOT_theReqAttribute);
		BOT_traceString  += "ASK LINE   " + ta + "\n";
		if(!ta) return (BOT_reqSay(false,"SORRY","ATTRIBUTENOTFOUND",BOT_theReqTopic, BOT_theReqAttribute)) 
		else {
			res = BOT_getTopicAttributeTagValue(ta,"VAL");
			if(typeof(res) == "function") res = res(BOT_theReqTopic,BOT_theReqAttribute,"VAL"); // it is an internal function
				
			// check for ONASK postprocessing operation
			// it can be a string or a javascript function : function(){} or functionName
			// 3 args are passed to function: VAL value, topic, attribute
			onaskfunc = BOT_getTopicAttributeTagValue(ta,"ONASK");
			if(onaskfunc) {
				if(typeof(onaskfunc) == "function")      res = onaskfunc(res,BOT_theReqTopic,BOT_theReqAttribute); 	// func in ONASK
				else if(typeof(onaskfunc) == "string")   res = onaskfunc; 		// string in ONASK
				else res = "It is: "+ res;
			}
			restype = BOT_getTopicAttributeTagValue(ta,"TYPE");
			BOT_traceString  += "VALUE       " + res + "\n";
			if(res != undefined) return (BOT_reqSay(true,"HAPPY","TELLRESULT",BOT_theReqAttribute,BOT_theReqTopic,res,restype)) 
			else return (BOT_reqSay(false,"SORRY","TAGNOTFOUND",BOT_theReqAttribute,BOT_theReqTopic))
		}
	}
	if(BOT_theReqText) { BOT_reqSay(false,"PUZZLED","BADATTTRIBUTE",BOT_theReqText); return }
	BOT_reqSay(false,"PUZZLED","NEEDSATTTRIBUTE");
}




function BOT_onEffect() {
	if(BOT_theReqAction) BOT_reqRetrieveAttribute(BOT_theReqAction,"EFFECT");
	if(BOT_reqFilled) return;
	if(BOT_theReqText)      { BOT_reqSay(false,"WARNING","BADACTION",BOT_theReqText); return }
	BOT_reqSay(false,"SORRY","NEEDSACTION");
}


 


// TODO update moods
function BOT_onBravo() {
	var delta = 1;
	if(BOT_theReqStresser) {
		switch (BOT_theReqStresser) { 
			case "_strong": delta += 2; break;
			case "_harsh":  delta += 5; break; 
			case "_irony":  delta += -2; break; 
			case "_counterstatement":  delta += -5; break; 
			default: break;
		}
	}
	BOT_apply(BOT_theTopicId,"happiness", "VAL",function(x) {return(x+delta)});  // BOT_theTopicId ----> BOT_theBotcId
	BOT_apply(BOT_theTopicId,"confidence","VAL",function(x) {return(x+delta)});  // BOT_theTopicId ----> BOT_theBotcId
	if(delta >0) BOT_reqSay(true,"HAPPY","MAKESMEHAPPY");
	else BOT_reqSay(true,"WORRIED","YOUAREIRONIC");
}


// TODO update moods
function BOT_onCriticize() {
	var delta = 1;
	if(BOT_theReqStresser) {
		switch (BOT_theReqStresser) { 
			case "_strong": delta += 2; break;
			case "_harsh":  delta += 5; break;
			case "_irony":  delta += -2; break; 
			case "_counterstatement":  delta += -5; break; 
			default: break;
		}
	}
	BOT_apply(BOT_theTopicId,"happiness", "VAL",function(x) {return(x-delta)});  // BOT_theTopicId ----> BOT_theBotcId
	BOT_apply(BOT_theTopicId,"confidence","VAL",function(x) {return(x-delta)});  // BOT_theTopicId ----> BOT_theBotcId
	if(delta >0) BOT_reqSay(true,"SAD","MAKESMESAD");
	else BOT_reqSay(true,"PUZZLED","YOUAREIRONIC");
	
}


// TODO update moods
function BOT_onGreet() {
	var thebotobject   = eval(BOT_theBotId);
	var thebottopicid  = thebotobject.topicId;
	var oldbotid,name,c;
	if(BOT_theReqTopic == thebottopicid)  BOT_reqSay(true,"HELLO","PING");
	else {
		c = BOT_get(BOT_theReqTopic,"_class","VAL");
		if(c && c != "bot") BOT_reqSay(false,"WARNING","BADAGENT",BOT_get(BOT_theReqTopic,"name","VAL"));
		else {
			// switch bot 
			var newbotid = BOT_get(BOT_theReqTopic,"_class","BOT");
			if(newbotid) {
				var newbotobject  = eval(newbotid);
				var newbottopicid = newbotobject.topicId;
				oldbotid       = BOT_theBotId;
				BOT_theBotId   = newbotid;
				BOT_theTopicId = newbottopicid;
				BOT_onSwitchBot(oldbotid,newbotid); // send event to application
				name = BOT_get(BOT_theReqTopic,"name","VAL");
				if(name) BOT_reqSay(true,"HELLO","HELLONAME",name);
				else  BOT_reqSay(true,"HELLO","HELLO");
			}
			else  BOT_reqSay(false,"CONFUSED","UNKNOWNERROR")
		}
	}
}


// TODO take more than 3 external topics
function BOT_onExecute() {
	if(!BOT_theReqAction && BOT_theLastAction) BOT_theReqAction = BOT_theLastAction;
	if(!BOT_theReqAction && BOT_theReqText) return(BOT_reqSay(false,"PUZZLED","BADACTION",BOT_theReqText));
	if(!BOT_theReqAction) return(BOT_reqSay(false,"PUZZLED","NEEDSACTION"));
	
	// Try into current topic
	if(BOT_theReqAction && BOT_get(BOT_theReqTopic,BOT_theReqAction,"VAL") != undefined) BOT_reqExecuteAction(BOT_theReqTopic,BOT_theReqAction); 
	if(BOT_reqFilled) return;
	
	// tries in external topics ocontrolled by the current bot -- attribute _exec
	var thebotobject   = eval(BOT_theBotId);
	var thebottopicid  = thebotobject.topicId;
	var execlist = BOT_get(thebottopicid,"_exec","VAL");
	// tries in turn the 3 first elements of the _exec list of current bot
	if(execlist && execlist.length>0) { if(BOT_get(execlist[0],BOT_theReqAction,"VAL")) BOT_reqExecuteAction(execlist[0],BOT_theReqAction); }
	if(BOT_reqFilled) return;
	// try in a second external topic
	if(execlist && execlist.length>1) { if(BOT_get(execlist[1],BOT_theReqAction,"VAL")) BOT_reqExecuteAction(execlist[1],BOT_theReqAction); }
	if(BOT_reqFilled) return;
	// try in a third external topic
	if(execlist && execlist.length>2) { if(BOT_get(execlist[2],BOT_theReqAction,"VAL")) BOT_reqExecuteAction(execlist[2],BOT_theReqAction); }
	if(BOT_reqFilled) return;
	
	BOT_reqSay(false,"PUZZLED","TOPICCANTDOACTION",BOT_theReqAction,BOT_theReqTopic);
}



// retrieves and expresses value associated with tag in attribute of BOT_theReqTopic
// returns success == true/false == BOT_reqSuccess 
// TODO take more tahn 1 argument in model call
function BOT_reqExecuteAction(topic,action) {
	var ta,func;
	var com = "";
	var arg = "";
	var res;;
	ta = BOT_getTopicAttribute(topic, action);
	BOT_traceString  += "TOPIC LINE  " + ta + "\n";
	if(!ta) return (BOT_reqSay(false,"SORRY","ACTIONNOTFOUND",topic,action)) 
	func = BOT_getTopicAttributeTagValue(ta,"VAL");
	BOT_traceString  += "FUNCTION     " + func + "\n";
	if(func == undefined) return (BOT_reqSay(false,"SORRY","TAGNOTFOUND",topic,action))
	arg = BOT_theReqValue ? BOT_theReqValue : undefined;
	if(typeof(func) == "string") com = func +'('+topic+','+arg+')';
	else if(BOT_isArray(f))      com = func[0]+'('+topic+','+func[1]+')'; // only two elements
	res = eval(com);
	BOT_theLastAction       = action;
	BOT_theLastActionTopic  = topic;
	// when results of actin is a string its is replyed
	if(res != undefined && typeof(res) == "string") BOT_reqSay(true,"PROUD","DONEWITHREPLY",res) 
	else BOT_reqSay(true,"PROUD","DONE",action)

}


// undo works only after "x" our "u"
function BOT_onUndo() {
	if(BOT_theLastPerformative != "x" && BOT_theLastPerformative != "u") {
		BOT_reqSay(false,"WARNING","NEEDSEXECUTEBEFORE"); 
		BOT_theReqPerformative = BOT_theLastPerformative; // so that "u" is forgotten
		return }
	if(!BOT_theLastAction || !BOT_theLastActionTopic) { BOT_reqSay(false,"SORRY","DONTREMEMBERLASTACTION");return}
	//undo last action
	var rev = BOT_get(BOT_theLastActionTopic,BOT_theLastAction,"REVERSE");
	if(rev) {BOT_reqExecuteAction(BOT_theLastActionTopic,rev); return}
	BOT_reqSay(false,"PUZZLED","CANTUNDO",BOT_theLastAction,BOT_theLastActionTopic); 
}

// TO DO handling of other Performatives  
function BOT_onMore() {
	if(BOT_theLastPerformative != "x" && BOT_theLastPerformative != "m") {
		BOT_reqSay(false,"WARNING","NEEDSEXECUTEBEFORE"); 
		BOT_theReqPerformative = BOT_theLastPerformative; // so that "m" is forgotten
		return }
	if(!BOT_theLastAction || !BOT_theLastActionTopic) { BOT_reqSay(false,"SORRY","DONTREMEMBERLASTACTION");return}
	//redo last action
	BOT_reqExecuteAction(BOT_theLastActionTopic,BOT_theLastAction);
} 


function BOT_onQuit() {
	BOT_reqSay(true,"PUZZLED","CONFIRMYESNO");
	BOT_theReqReplyIndex = BOT_sessionCounter;
	// callback function on reply
	BOT_theReqReplyFunc = function () {
		if(BOT_theReqReply == "YES") {
			BOT_sessionActiveFlag = false;
			BOT_reqSay(true,"BYE","USERQUITS");
		}
		else if(BOT_theReqReply == "NO") BOT_reqSay(true,"PUZZLED","USERSAIDNO");
		else BOT_reqSay(fale,"CONFUSED","CONFUSEDINDIALOG");
	};
}

function BOT_onNo() {
	BOT_theReqReply = "NO";
	if(BOT_theReqReplyFunc && BOT_theReqReplyIndex == BOT_sessionCounter-1 ) { BOT_theReqReplyIndex = null; BOT_theReqReplyFunc() }
	else BOT_reqSay(true,"PUZZLED","USERSAIDNO"); 
} 

function BOT_onYes() {
	BOT_theReqReply = "YES";
	if(BOT_theReqReplyFunc && BOT_theReqReplyIndex == BOT_sessionCounter-1 ) { BOT_theReqReplyIndex = null; BOT_theReqReplyFunc() }
	else BOT_reqSay(true,"PUZZLED","USERSAIDYES"); 
}  


// TODO reply a proposition == tell proposition
function BOT_onReply() {
	if(BOT_theReqValue){
		if(BOT_theReqReplyFunc && BOT_theReqReplyIndex == BOT_sessionCounter-1 ) { BOT_theReqReplyIndex = null; BOT_theReqReplyFunc() }
		else BOT_reqSay(true,"PUZZLED","NONREQUIREDVALUE",BOT_theReqValue); 
	}
	else BOT_reqSay(true,"WARNING","VALUENEEDED"); 
}

// when topic is ommitted it is BOT_theReqTopic <- BOT_LastTopic
function BOT_onWhy() {
	var why;
	if(BOT_theReqAttribute) {
		why = BOT_get(BOT_theReqTopic,BOT_theReqAttribute,"WHY");
		if (why) BOT_reqSay(true,"HAPPY","TELLWHY",BOT_theReqAttribute,BOT_theReqTopic,why);
		else BOT_reqSay(false,"SORRY","DONTKNOWWHY",BOT_theReqTopic,BOT_theReqAttribute); 
	}
	else if(BOT_theLastAttribute) { // often when ask is followed by why without args
		BOT_traceString  += "LAST TOPIC   "  + BOT_theReqTopic + "\n";
		BOT_traceString  += "LAST ATTRIB  " + BOT_theLastAttribute + "\n";
		why = BOT_get(BOT_theReqTopic,BOT_theLastAttribute,"WHY");
		if (why) BOT_reqSay(true,"HAPPY","TELLWHY",BOT_theReqTopic,BOT_theLastAttribute,why);
		else BOT_reqSay(false,"SORRY","DONTKNOWWHY",BOT_theReqTopic,BOT_theLastAttribute); 
	}
	else BOT_reqSay(false,"SORRY","CANTSAYWHY"); 
}



function BOT_onHow() {
	var how;
	if(BOT_theReqAction) {
		how = BOT_get(BOT_theReqTopic,BOT_theReqAction,"HOW");
		if (how) BOT_reqSay(true,"HAPPY","TELLRESULT",BOT_theReqAction,BOT_theReqTopic,how);
		else BOT_reqSay(false,"SORRY","DONTKNOWHOW",BOT_theReqAction); 
	}
	else if(BOT_theLastAction) {
		BOT_traceString  += "LAST ACTION  " + BOT_theLastAction + "\n";
		how = BOT_get(BOT_theReqTopic,BOT_theLastAction,"HOW");
		if (how) BOT_reqSay(true,"HAPPY","TELLRESULT",BOT_theLastAction,BOT_theReqTopic,how);
		else BOT_reqSay(false,"SORRY","DONTKNOWHOW",BOT_theLastAction); 
	}
	else BOT_reqSay(false,"SORRY","CANTSAYHOW"); 
}
 
 
// TODO check type of stored data
function BOT_onTell() {
	var thebotobject   = eval(BOT_theBotId);
	var thebottopicid  = thebotobject.topicId;
	if(BOT_theReqTopic == thebottopicid) { BOT_reqSay(false,"ANGRY","NOFACTSABOUTBOT"); return }
	if( !BOT_theReqEqual || !BOT_theReqAttribute || !BOT_theReqValue) { BOT_reqSay(false,"WARNING","BADFACTFORMAT"); return }
	// topic.attribute <- value
	if (!BOT_reqExistAttribute(BOT_theReqAttribute))  return;
	BOT_set(BOT_theReqTopic,BOT_theReqAttribute,"VAL",BOT_theReqValue);
	BOT_reqSay(true,"HAPPY","FACTSTORED",BOT_theReqAttribute,BOT_theReqTopic,BOT_theReqValue);
}



function BOT_onVerify() {
	if( !BOT_theReqEqual || !BOT_theReqAttribute || !BOT_theReqValue) { BOT_reqSay(false,"WARNING","BADFACTFORMAT"); return }
	// topic.attribute <- value
	if (!BOT_reqExistAttribute(BOT_theReqAttribute))  return;
	var res = BOT_get(BOT_theReqTopic,BOT_theReqAttribute,"VAL");
	if( BOT_isSimilar(res,BOT_theReqValue))  BOT_reqSay(true,"HAPPY","FACTVERIFIED");
	else BOT_reqSay(false,"SORRY","FACTNOTVERIFIED");
}

function BOT_isSimilar(x,y) {
	 var sx = x.toString();
	 var sy = y.toString();
	 sx = sx.toLowerCase();
	 sy = sy.toLowerCase();
	 return (sx == sy)
}



// checks if agent knows: topics, attributes or actions
// TODO check rights properly for topics
function BOT_onKnow() {
	var thebotobject   = eval(BOT_theBotId);
	var thebottopicid  = thebotobject.topicId;
	if(BOT_theReqTopic != thebottopicid) {
		BOT_traceString  += "NEW TOPIC   " + BOT_theReqTopic + "\n";
		if(!BOT_hasRight(thebottopicid,BOT_theReqTopic,"_read")) return (BOT_reqSay(true,"SORRY","DONTKNOWTOPIC",BOT_theReqTopic));
		else if(!BOT_theReqAttribute && !BOT_theReqAction) return (BOT_reqSay(true,"HAPPY","KNOWTOPIC",BOT_theReqTopic));
	}
	if(BOT_theReqAttribute) {
		var ta = BOT_getTopicAttribute(BOT_theReqTopic, BOT_theReqAttribute);
		BOT_traceString  += "TOPIC LINE  " + ta + "\n";
		if(ta)  return (BOT_reqSay(false,"HAPPY","KNOWATTRIBUTE",BOT_theReqTopic,BOT_theReqAttribute)) 
		else return (BOT_reqSay(false,"SORRY","DONTKNOWATTRIBUTE",BOT_theReqTopic,BOT_theReqAttribute)) 
	}
	if(BOT_reqFilled) return;
	if(BOT_theReqAction) {
		if(BOT_reqExistAction(BOT_theReqTopic,BOT_theReqAction)) return (BOT_reqSay(true,"HAPPY","KNOWACTION",BOT_theReqAction,BOT_theReqTopic))
		else return (BOT_reqSay(true,"HAPPY","DONTKNOWACTION",BOT_theReqAction,BOT_theReqTopic))
	}
	BOT_reqSay(false,"WARNING","COMMANDNEEDSARGUMENT",BOT_theReqPerformative,"a topic, an attribute or an action")
}


// checks existence of action of BOT_theReqTopic
// returns true/false
function BOT_reqExistAction(topic,action) {
	if(BOT_get(topic,action,"VAL")) return true;
	// try in first external topic
	var execlist = BOT_get(BOT_theTopicId,"_exec","VAL");
	if(execlist && execlist.length>0) { if(BOT_get(execlist[0],action,"VAL")) return true; }
	// try in a second external topic
	if(execlist && execlist.length>1) { if(BOT_get(execlist[1],action,"VAL")) return true; }
	return false
}



function BOT_onFeel() {
	if(!BOT_theReqFeeling && BOT_theReqJudgement) { 
		BOT_traceString  += "GOTO command judge" + "\n"; // change performative
		BOT_onJudge(); 
		return;
		}  
	if(!BOT_theReqFeeling && BOT_theReqText) { BOT_reqSay(false,"PUZZLED","BADFEELING",BOT_theReqText); return }
	if(!BOT_theReqFeeling ) { BOT_reqSay(false,"PUZZLED","NOFEELING"); return }
	var f,fa,pole = "";
	for (var i in BOT_feelingList) {
		f    = BOT_feelingList[i][0];
		fa   = BOT_feelingList[i][1];
		pole = BOT_feelingList[i][2];
		if( BOT_theReqFeeling == f) break;
	}
	if(BOT_theReqTopic == BOT_theUserTopicId) {
		// I FEEL SAD
		if(pole == "+") {
			BOT_set(BOT_theReqTopic,fa,"VAL",0.8);
			BOT_reqSay(true,"HAPPY","USERPOSITIVENEWS");
		}
		else if(pole == "-") {
			BOT_set(BOT_theReqTopic,fa,"VAL",-0.8);
			BOT_reqSay(true,"SORRY","USERNEGATIVENEWS");
		}
	}
	else {
		// DO TOPIC != USER FEEL SAD  ?
		var ta,res,restype;
		ta = BOT_getTopicAttribute(BOT_theReqTopic, fa);
		BOT_traceString  += "TOPIC LINE  " + ta + "\n";
		if(!ta) return (BOT_reqSay(false,"SORRY","FEELINGNOTFOUND",BOT_theReqTopic,fa)) 
		else {
			res = BOT_getTopicAttributeTagValue(ta,"VAL");
			     if(pole == "+" && res >= 0.5)   BOT_reqSay(true,"HAPPY","CONFIRM");
			else if(pole == "+" && res < 0)  	 BOT_reqSay(true,"WARNING","CONTRADICT");
			else if(pole == "+" )  				 BOT_reqSay(true,"THINKING","NOTPARTICULARLY");
			else if(pole == "-" && res <= -0.5)  BOT_reqSay(true,"SORRY","CONFIRM");
			else if(pole == "-" && res >= 0.5)   BOT_reqSay(true,"HAPPY","CONTRADICT");
			else if(pole == "-" )  				 BOT_reqSay(true,"THINKING","NOTPARTICULARLY");
		}
	}
}

function BOT_onJudge() {
	var res = [];
	var done = false;
	var jlist,t,a,v,tav;
	var ju,antoj,ja,pole = "";
	for (var i in BOT_judgementList) {
		ju    = BOT_judgementList[i][0];
		antoj = BOT_judgementList[i][1];
		ja    = BOT_judgementList[i][2];
		pole  = BOT_judgementList[i][3];
		if( BOT_theReqJudgement == ju) break;
	}
	if( !BOT_theReqAttribute) BOT_theReqAttribute = "_reference"; // judgemenst about topics
	
	if(!BOT_theReqJudgement && BOT_theReqValue) return(BOT_reqSay(false,"WARNING","BADJUDGEMENTWORD",BOT_theReqValue));
	if(!BOT_theReqJudgement && BOT_theReqText)  return(BOT_reqSay(false,"WARNING","BADJUDGEMENTWORD",BOT_theReqText));
	if(!BOT_theReqJudgement) return(BOT_reqSay(false,"WARNING","NOJUDGEMENTWORD"));
	
	var ta = BOT_getTopicAttribute(BOT_theUserTopicId, "judgement");	
	if(!ta) return (BOT_reqSay(false,"SORRY","NOUSERJUDGEMENT"));
	jlist = BOT_get(BOT_theUserTopicId,"judgement","VAL");
	
	for(var i in jlist) {
		t = jlist[i][0];
		a = jlist[i][1];
		v = jlist[i][2];
		if(t == BOT_theReqTopic && a == BOT_theReqAttribute && v == BOT_theReqJudgement) {
			tav  = [t,a,v];
			res  = res.concat([tav]);// recopy
			done = true;
			BOT_reqSay(true,"PUZZLED","USERREPEATJUDGEMENT",BOT_theReqTopic,BOT_theReqAttribute);
		}
		else if(t == BOT_theReqTopic && a == BOT_theReqAttribute && v == antoj) {
			tav  = [t,a,BOT_theReqJudgement];
			res  = res.concat([tav]);
			done = true;
			BOT_reqSay(true,"PUZZLED","USERCHANGEJUDGEMENT",BOT_theReqTopic,BOT_theReqAttribute);
		}
		else {
			tav = [t,a,v];
			res = res.concat([tav]); // recopy
		}
	}  // enfor
	
	if(!done) {
			tav = [BOT_theReqTopic,BOT_theReqAttribute,BOT_theReqJudgement]; // new fact added
			res = res.concat([tav]);
			if (!done && pole == "+")      BOT_reqSay(true,"HAPPY","USERNEWPOSITIVEJUDGEMENT",BOT_theReqTopic,BOT_theReqAttribute);
			else if (!done && pole == "-") BOT_reqSay(true,"SORRY","USERNEWNEGATIVEJUDGEMENT",BOT_theReqTopic,BOT_theReqAttribute);
	}
	BOT_set(BOT_theUserTopicId,"judgement","VAL",res);
}


// likes and dislikes are special cases of user's judgement + attributes preference & dislike
function BOT_onLike() {
	BOT_traceString    += "GOTO command judge" + "\n"; // change performative
	BOT_theReqJudgement = "likeable";
	BOT_onJudge(); 	
	if(BOT_reqSuccess) {
		var ta = [BOT_theReqTopic,BOT_theReqAttribute]; 
		BOT_del(BOT_theUserTopicId,"distaste","VAL",ta);
		BOT_add(BOT_theUserTopicId,"preference","VAL",ta);
	}
}  

	
function BOT_onDislike() {
	BOT_traceString    += "GOTO command judge" + "\n"; // change performative
	BOT_theReqJudgement = "detestable";
	BOT_onJudge(); 
	if(BOT_reqSuccess) {
		var ta = [BOT_theReqTopic,BOT_theReqAttribute]; 
		BOT_del(BOT_theUserTopicId,"preference","VAL",ta);
		BOT_add(BOT_theUserTopicId,"distaste","VAL",ta);
	}
}

	
function BOT_onSuggest() {
	if(!BOT_theReqAction) return(BOT_reqSay(false,"WARNING","NEEDACTION"));
	var ta = [BOT_theReqTopic,BOT_theReqAction]; 
	BOT_del(BOT_theUserTopicId,"objection","VAL",ta);
	BOT_add(BOT_theUserTopicId,"suggestion","VAL",ta);
	BOT_reqSay(true,"THANKS","THANKSFORSUGGESTION",BOT_theReqAction);
}


function BOT_onObject() {
	if(!BOT_theReqAction) return(BOT_reqSay(false,"WARNING","NEEDACTION"));
	var ta = [BOT_theReqTopic,BOT_theReqAction]; 
	BOT_del(BOT_theUserTopicId,"suggestion","VAL",ta);
	BOT_add(BOT_theUserTopicId,"objection","VAL",ta);
	BOT_reqSay(true,"FEAR","TAKEOBJECTION",BOT_theReqAction);
}


// tods goal = propositions
function BOT_onIntent() {
	if(!BOT_theReqAction) return(BOT_reqSay(false,"WARNING","NEEDACTION"));
	var ta = [BOT_theReqTopic,BOT_theReqAction]; 
	BOT_del(BOT_theUserTopicId,"intention","VAL",ta);
	BOT_add(BOT_theUserTopicId,"intention","VAL",ta);
	BOT_reqSay(true,"NONE","TAKEINTENTION",BOT_theReqAction);
}


function BOT_onZee()		{ 
	BOT_reqSay(false,"SORRY","NOEXTENSIONSYET")
} 

// TODO with args
function BOT_onPossible()	{ 
	// Try in bot
	if(BOT_theReqAction && BOT_get(BOT_theReqTopic,BOT_theReqAction,"VAL")) 
		return( BOT_reqSay(true,"HAPPY","ACTIONPOSSIBLE",BOT_theReqTopic,BOT_theReqAction) );
	// try in first external topic
	var execlist = BOT_get(BOT_theTopicId,"_exec","VAL");
	if(execlist && execlist.length>0) { if(BOT_get(execlist[0],BOT_theReqAction,"VAL")) 
		return( BOT_reqSay(true,"HAPPY","ACTIONPOSSIBLE",execlist[0],BOT_theReqAction) );
	}
	// try in a second external topic
	if(execlist && execlist.length>1) { if(BOT_get(execlist[1],BOT_theReqAction,"VAL")) 
		return( BOT_reqSay(true,"HAPPY","ACTIONPOSSIBLE",execlist[1],BOT_theReqAction) );
	}
	BOT_reqSay(false,"SORRY","ACTIONIMPOSSIBLE",BOT_theReqTopic,BOT_theReqAction);

}

// checks if topicid1 has right upon topicid2
// rights == "_read" "_write" "_exec"
// TODO 
function BOT_hasRight(topicid1,topicid1,right) {
	return true
}



 



 
 
 

// ====================================================================
//          EXPRESSION OF TOPICS & ATTRIBUTE WITH INDEXICALS
// ====================================================================

// l is a list of [t,a,v]
function BOT_printJudgementList(l) {
	var t,a,v;
	var s = "Judgements are: ";
	if(l.length ==0) return ("No judgements");
	for(var i in l) { 
		t = l[i][0]; a = l[i][1]; v = l[i][2];
		BOT_expressTopicAttribute(t,a) +" is "+v+"; ";
	}
	return s;
}

function BOT_printPreferenceList(l) { return(BOT_printCoupleList(l,"No preferences found","Preference are: ")) }
function BOT_printDistasteList(l)   { return(BOT_printCoupleList(l,"No distastes found","Distastes are: ")) }
function BOT_printSuggestionList(l) { return(BOT_printCoupleList(l,"No suggestions found","Suggestions are: ")) }
function BOT_printObjectionList(l)  { return(BOT_printCoupleList(l,"No objections found","Objections are: ")) }
function BOT_printIntentionList(l)  { return(BOT_printCoupleList(l,"No intentions found","Intentions are: ")) }
function BOT_printActionList(l)     { return(BOT_printSimpleList(l,"No actions found","Actions are: ")) }
function BOT_printRelativeList(l)   { return(BOT_printSimpleList(l,"No relatives found","Relatives are: ")) }



// l is list of [x1,y1], [x2,y2], ..
// were x is a topic and y is an attribute 
function BOT_printCoupleList(l,empty,prolog) {
	if(l.length == 0) return (empty); 
	var x,y;
	var s = prolog;
	for(var i in l) { 
		x = l[i][0]; y = l[i][1];
		s = s + BOT_expressTopicAttribute(x,y) + "; ";
	}
	return s;
}

// l is list of x,y,z, ..
// were elements are any symbols
function BOT_printSimpleList(l,empty,prolog) {
	if(l.length == 0) return (empty); 
	var s = prolog;
	for(var i in l) { s = s + l[i] + "; " }
	return s;
}


// Cyril | you | your (if possessive == true)
function BOT_expressTopic(tid,possessive) {
	var thebotobject   = eval(BOT_theBotId);
	var thebottopicid  = thebotobject.topicId;
	var c = BOT_get(tid,"_class","VAL");
	if(c == "user" && possessive == "POS") return("yours");
	else if(tid == thebottopicid && possessive == "POS") return("mine"); 
	else if(tid == thebottopicid) return("me"); 
	else if (c == "user") return("you");
	else return BOT_topicToName(tid);
}

// Cyril'sage | your age | you (if attr ==_reference)
function BOT_expressTopicAttribute(tid,attr) {
	var thebotobject   = eval(BOT_theBotId);
	var thebottopicid  = thebotobject.topicId;
	var c = BOT_get(tid,"_class","VAL");
	     if (c == "user" && attr == "_reference") return("you")
	else if (tid == thebottopicid && attr == "_reference") return("me"); 
	else if (tid == thebottopicid) return("my "+attr); 
	else if (attr == "_reference") return(BOT_topicToName(tid))
	else if (c == "user") return("your "+attr)
	else return(BOT_topicToName(tid)+"'s "+attr)
}





function BOT_test() { 
	alert("test");
 }


// *************************************************************************************************************
// *************************************************************************************************************
//                                                END OF THE CODE
// *************************************************************************************************************
// *************************************************************************************************************
