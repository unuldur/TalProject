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

// Variables list
var gateau = false;
var nbSpeakGour = 0;
var bouteille = false;

var glutonyCake = false;
var visiteColereFirst = false;
var canSpeakToColere = false;
var knowJalousie = false;
var knowColere = false;
var havePills = false;
var gourmandiseEnd = false;

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

function print(name, val) {

    var chatbox = document.getElementById("chatbox");
    chatbox.value += name + " > " + val + "\n";
}

function func_giveCakeGourmandise(){
    if(gateau){
        gateau = false;
        glutonyCake = true;
        print("Gourmandise", "Merci! MniamMniamMniam....... Mais ce n'est pas mon gâteau...*Il se met à pleurer et à crier*");
        return true;
    }
    print("Gourmandise", "Mechant, t'as pas mon gateau !")
    return false
}

function get_cake(){
    print("Jalousie", "Tiens je te le donne je vois pas ce que tu peux en faire mais bon.");
    print("Tom", "Vous avez obtenue le special-cake");
    gateau = true;
}

function givePillGourmandise(){
	if(havePills && glutonyCake){
		havePills = false;
		print("Tom", "Tiens c'est pour toi, ça calmera ta faim");
		print("Gourmandise", "Merci, *snif* *gloup*");
		print("", "Gourmandise s'endormie doucement...Vous allez voir Jalousie");
		var chat = document.getElementById("litetalkchatbox");
		chat.value = "jalousie";
		BOT_chatboxOnSend('litetalkchatbox');
		chat.value = "";
		gourmandiseEnd = true;
		if(jalousieEnd){
			win();
		}
		return;
	}
	if(!havePills && glutonyCake){
		print("", "Vous n'avez pas de pillule");
		return;
	}
	if(havePills){
		print("", "Gourmandise regarde la pillule pas intérressé.");
	}
}

var gourmandiseTopic = [
    [["KEY", "_class"],						["VAL", "bot"], ["BOT","gourmandiseBot"]],
    [["KEY", "_reference"],					["VAL", ["g","gourmandise"]]],
    [["KEY", "_htmlprefix"],				["VAL", "gourmandise"]], //prefix of HTML elements
    [["KEY", "_read"],						["VAL", ["userTopic","jalousieTopic", "colereTopic", "counterTopic"]]],
    [["KEY", "_write"],						["VAL", ["userTopic","counterTopic"]]],
    [["KEY", "_exec"],						["VAL", ["userTopic","counterTopic"]]],
    [["KEY", "nom"],						["VAL", "Gourmandise"],
        ["ONASK", "Je m'appele Gourmandise, et j'ai faim"],
        ["WHY","Parce que j'ai toujours très faim."]
    ],
    [["KEY", ["faim", "manger"]],
        ["VAL", "Manger"],
        ["ONASK",function (){
			knowJalousie = true;
			return "C'est Jalousie elle m'a pris mon gâteau, et du coup j'ai faim, et du coup je pleure, et du coup je me fait gronder.";
		}]],
	[["KEY", "gateau"], ["ONASK", "Mon gateau à moi disparue !!!!"]],
	[["KEY", ["gronder", "pleurer", "pleur"]],
		["ONASK",function (){
			knowColere = true;
			return "Oui, Colere il aime pas quand je pleure et me crie dessus mais du coup je pleure encore plus...";
		}]],
	[["KEY", "donnerpillule"], ["CAT", "ACT"], ["VAL", "givePillGourmandise"]],
    [["KEY", "age"],						["VAL", 42], ["TYPE","INT"],
                                            ["ONASK", "J'ai 42 ans !!!"]],
    [["KEY", ["donnergateau", "donnerspecialcake"]],        ["CAT", "ACT"], ["VAL", "func_giveCakeGourmandise"]],
	[["KEY", "donnerbouteille"], ["CAT", "ACT"], ["VAL", "donnerBouteilleGourmandise"]],
	[["KEY", ["nourriture", "bouffe"]], ["ONASK", "C'est génial la nourriture ! Elle me rend heureux, mais quand j'en ai plus c'est pas bien, il m'en faut encore !!!"]],
	// RELATIONS
    [["KEY", "jalousie"],			["VAL", "jalousieTopic"],["CAT","REL"]],
    [["KEY", "colere"],			["VAL", "colereTopic"],["CAT","REL"]],
    // FEELINGS
    [["KEY", "happiness"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]], // 7 standard feelings iniitated
    [["KEY", "confidence"],		["VAL", -0.8], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "irritability"],	["VAL", -1], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "satisfaction"],	["VAL", -1], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "respect"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "force"],			["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "excitement"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    // PREFS
    [["KEY", "preference"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printPreferenceList]],
    [["KEY", "distaste"],		["VAL", []],  ["CAT","VAR"],["ONASK",BOT_printDistasteList]],
    [["KEY", "suggestion"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printSuggestionList]],
    [["KEY", "intention"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printIntentionList]],
];

function win(){
	print("", "Vous sortez de Mania en ayant reussi à calmer le patient, et quand vous sortez vous voyez le patient vous attendre patiemment avec un regard que vous reconnaissez imédiatemment, 'Il est temps de tenir votre promesssse' dit-il.");
	print("", "Bravo vous avez trouvez la bonne fin, il y a 3 autres fins a trouvez saurez-vous y parvenir ?");
	print("", "Pour recommencez recharger la page...");
	var form = document.getElementById("form");
	form.hidden = true;
}

function doEchange(){
	prommesse = true;
	print("Jalousie", "Deal ! *Elle vous regarde d'un air vicelard...*");
}

var jalousieEnd = false;
function donnerBouteille(){
	if(bouteille){
		print("Jalousie", "Ahhh merci...Je vais faire atttention avec ces bouteilles maintenant, je t'attendrait aprés la scéance quand tu seras sortie de là...");
		jalousieEnd = true;
		if(gourmandiseEnd){
			win();
		}
		return;
	}
	print("Jalousie", "Tu n'as pas mes bouteilles voyons..");
}

function avoirmedicaments(){
	if(havePills){
		print("Jalousie","Mais du as déjà mes pillules");
	}else{
		print("Jalousie", "Oui, j'ai ce qu'il faut, tiens voici une pillule spécial");
		print("", "Vous avez obtenue 'Pillule ???'");
	}
}

var jalousieTopic = [
    [["KEY", "_class"],						["VAL", "bot"], ["BOT","jalousieBot"]],
    [["KEY", "_reference"],					["VAL", ["j","jalousie"]]],
    [["KEY", "_htmlprefix"],				["VAL", "jalousie"]], //prefix of HTML elements
    [["KEY", "_read"],						["VAL", ["userTopic","colereTopic", "gourmandiseTopic", "counterTopic"]]],
    [["KEY", "_write"],						["VAL", ["userTopic","counterTopic"]]],
    [["KEY", "_exec"],						["VAL", ["userTopic","counterTopic"]]],
    [["KEY", "nom"],						["VAL", "Jalousie"],
        ["ONASK", "Je/Nous sommes Jalousssie, j'ai plein de 'medicaments' pour le corps et l'esprit..."],
        ["WHY","Je t'ai déjà dit que tu m'appartient...."]
    ],
	[["KEY", ["medicament", "medicaments"]], ["ONASK", "Il y en a qui calme, d'autre au effets psychotrope puissant, d'autre de puissant aphrodysiaque... Il y en a un qui meriterait de prendre un bon cocktail de tous ce que j'ai..."]],
	[["KEY", ["merite", "meriterait", "cocktail"]], ["ONASK", function(){
		knowColere = true;
		return "Oui, Colere, il est toujours à cran celui là impossible à gérer!!!";
	}]],
	[["KEY", "bouteille"], ["ONASK", "Ce sont des bouteilles d'un contenue trés spécial me permettant d'attirer les gens autour de moi."]],
	[["KEY", ["avoirmedicaments", "avoirmedicament"]], ["CAT", "ACT"], ["VAL", "avoirmedicaments"]],
    [["KEY", ["psychotrope", "aphrodysiaque"]], ["ONASK", "Oups.... J'en ai plus...."]],
	[["KEY", "age"],						["VAL", 42], ["TYPE","INT"],
        ["ONASK", "On ne demande pas ssson âge à une dame."]],
    [["KEY", "gateau"], ["ONASK", "Oui, j'ai bien récupéré le gâteau mais je ne le rendrai pas il fait grosssir, et me/nous rend moins attractif"]],
    [["KEY", "attractif"], ["ONASK", "C'est mon petit atout que je sssublime le plus posssible."],
        ["WHY", "Pour attirer le plusss de gens posssible voyons..."]],
    [["KEY", "grossir"], ["ONASK", "Tu sssais bien ce que c'est de grosssir regarde toi.."],
        ["WHY", "Oui ce gateau contient 90% de crème si seulement il mangeai mon special cake"]],
    [["KEY", "specialcake"], ["ONASK", function (){
		gateau = true;
		return "Le meilleur gâteau qui soit composer de ssseulement 2% de matière grasse ! Tiens je te le passe j'en ai pas besoin.";
	}]],
	[["KEY", "matieregrasse"], ["ONASK", "C'est ce que tu as dans ton ventre."]],
	[["KEY", ["calmer", "calmergourmandise", "medicamentcalme", "calme"]], ["ONASK", function (){
		havePills = true;
		return "Oui, j'ai ce qu'il faut, tiens voici une pillule spécial \n Vous avez obtenue 'Pillule ???'";
	}]],
    [["KEY", "avoirspecialcake"], ["CAT", "ACT"], ["VAL", "get_cake"]],
	[["KEY", "promesse"], ["ONASK", "Quoi il veut que je lui promette de faire ça, mais jamais de la vie comment pourrait je sublimer mon corps sans ça, et attirer les hommes et femmes sexy"],
		["WHY", "Parce que je peux pas attirer les gens avec le corps que j'ai, il ressemble à rien donc je fais autrement !"]],
	[["KEY", ["homme", "hommesexy", "femme", "femmesexy", "corp", "changer"]], ["ONASK", "Oui c'est un peu l'objectif de ce que je suis...Tu ne penses pas ? D'ailleur tu es un homme sexy toi Tom..."]],
	[["KEY", "sexy"], ["ONASK", "C'est ce que ce fichu corps ne permet pas alors je fait des echande avec les gens et les entube..."],
		["WHY", "Car c'est le seul moyen"]],
	[["KEY", ["tom", "moi"]], ["ONASK", "Oui toi... On peut peut-ếtre s'arranger tous les deux, je t'échange la promesse pour Colére contre Toi..."]],
	[["KEY", ["deal", "echange", "faireechange"]], ["CAT","ACT"], ["VAL", "doEchange"]],
	[["KEY", ["donnerbouteille"]], ["CAT","ACT"], ["VAL", "donnerBouteille"]],
    // FEELINGS
    [["KEY", "happiness"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]], // 7 standard feelings iniitated
    [["KEY", "confidence"],		["VAL", 0.5], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "irritability"],	["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "satisfaction"],	["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "respect"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "force"],			["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "excitement"],		["VAL", 0.5], ["CAT","VAR"], ["TYPE","INT"]],
    // RELATIONS
    [["KEY", "gourmandise"],			["VAL", "gourmandiseTopic"],["CAT","REL"]],
    [["KEY", "colere"],			["VAL", "colereTopic"],["CAT","REL"]],
    // PREFS
    [["KEY", "preference"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printPreferenceList]],
    [["KEY", "distaste"],		["VAL", []],  ["CAT","VAR"],["ONASK",BOT_printDistasteList]],
    [["KEY", "suggestion"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printSuggestionList]],
    [["KEY", "intention"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printIntentionList]],
];

var prommesse = false;
var bouteille = false;
function fairePromesse(){
	if(prommesse){
		bouteille = true;
		print("Colere", "Okay, je te te passe tes bouteilles, mais attention au moindre faux pas...");
		print("", "Vous obtenez l'objet: 'bouteille'");
		return;
	}
	print("Colere", "Okay, je te te passe tes bouteilles, mais attention au moindre faux pas...");
	print("", "Vous obtenez l'objet: bouteille et allez voir Jalousie pour lui rendre...");
	print("Jalousie", "Merccci !!!");
	print("", "Vous voyez Jalousie s'enduire du contenue de la bouteille... Quelque instant après vous entendez un grondement sourd que vous identifiez à Colère:\n 'Tu n'as pas tenu t'as promesse !!!'. Le temps de réagir vous voyez Colère foncer sur Jalousie et le déchirer en deux, vous avez juste le temps de sortir de là mais à votre retour dans le monde réel vous voyez votre patient rugir et foncez sur vous avec un couteau de 30cm dans les mains, et vous évicerez. \n GAME OVER !!! \n Rechargez la page pour tenter une autre fois...\n");
	var form = document.getElementById("form");
	form.hidden = true;
}

function donnerPillsColere(){
	if(havePills){
		print("Colère", "Qu'est ce que ceci ? La fameuse promesse de Jalousie hein ? *Il avale la pillule et s'endort*");
		print("Jalousie", "Maintenant que Colère dort je vais pouvoir prendre le controle !!! *Elle vous fait sortir du corp*");
		print("", "En sortant du corp vous voyez votre patient debout, il vous remercie et sans va.");
		print("", "Quelque jour plus tard... Vous voyez que votre patient est monté à la tête d'un patie dictatorial.");
		print("", "Quelque année plus tard... Vous mourrez à cause du régime que votre patient à créé .");
		print("", "GAME OVER !!!");
		print("", "Rechargez la page pour tenter une seconde fois...");
		var form = document.getElementById("form");
		form.hidden = true;
	}
	print("", "Vous n'avez pas de pillule...")
}

function donnerBouteilleGourmandise(){
	if(bouteille){
		print("Gourmandise", "Qu'est ce c'est... à BOIRE !!! *Il vous arrache la bouteille des mains*");
		print("", "Vous observez Gourmandise boire entièrement la bouteille et d'un coup partir en vrille.");
		print("", "Gourmandise courut jusqu'à Jalousie et le mangea entièrement et fit de même avec Colère !");
		print("", "Vous sortez vite fait du logiciel... Pour observez votre patient en train de mangez le mobilier de la pièce, et vous regardez avec gourmandise.");
		print("", "Vous n'avez pas le temps de vous enfuire qu'il à dejà sautez sur vous et commencez à vous mangez vivant.");
		print("", "GAME OVER !!!");
		print("", "Rechargez la page pour tenter une seconde fois...");
		var form = document.getElementById("form");
		form.hidden = true;
	}
	print("", "Vous n'avez pas de bouteille...")
}


var colereTopic = [
    [["KEY", "_class"],						["VAL", "bot"], ["BOT","colereBot"]],
    [["KEY", "_reference"],					["VAL", ["c","colere"]]],
    [["KEY", "_htmlprefix"],				["VAL", "colere"]], //prefix of HTML elements
    [["KEY", "_read"],						["VAL", ["userTopic","jalousieTopic", "gourmandiseTopic", "counterTopic"]]],
    [["KEY", "_write"],						["VAL", ["userTopic","counterTopic"]]],
    [["KEY", "_exec"],						["VAL", ["userTopic","counterTopic"]]],
    [["KEY", "nom"],						["VAL", "Colère"],
        ["ONASK", "Colère , ça ce voit non ?!"],
        ["WHY","C'est comme ça !"]
    ],
    [["KEY", "age"],						["VAL", 42], ["TYPE","INT"],
        ["ONASK", "Qu'est ce que ça te fait mon âge !"]],
	[["KEY", "bouteille"], ["ONASK", "Quoi tu les veux, je te les passerai jamais et encore moins à jalousie, ces bouteilles attire tout le monde et qu'est ce que ça me met en rogne les gens ###, je veux bien faire une exeception si j'ai la prommesse de jalousie de ne pas utiliser ces bouteilles autant qu'elle le fait d'habitude."]],
	[["KEY", "promesse"], ["ONASK", "Oui j'attends que Jalousie la fasse si elle veux ces bouteilles"]],
	[["KEY", "fairepromesse"], ["CAT", "ACT"], ["VAL", "fairePromesse"]],
	[["KEY", "donnerpillule"], ["CAT", "ACT"], ["VAL", "donnerPillsColere"]],
    // RELATIONS
    [["KEY", "gourmandise"],			["VAL", "gourmandiseTopic"],["CAT","REL"]],
    [["KEY", "jalousie"],			["VAL", "jalousieTopic"],["CAT","REL"]],
    // FEELINGS
    [["KEY", "happiness"],		["VAL", -1], ["CAT","VAR"], ["TYPE","INT"]], // 7 standard feelings iniitated
    [["KEY", "confidence"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "irritability"],	["VAL", 1], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "satisfaction"],	["VAL", -1], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "respect"],		["VAL", -0.5], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "force"],			["VAL", 1], ["CAT","VAR"], ["TYPE","INT"]],
    [["KEY", "excitement"],		["VAL", 0], ["CAT","VAR"], ["TYPE","INT"]],
    // PREFS
    [["KEY", "preference"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printPreferenceList]],
    [["KEY", "distaste"],		["VAL", []],  ["CAT","VAR"],["ONASK",BOT_printDistasteList]],
    [["KEY", "suggestion"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printSuggestionList]],
    [["KEY", "intention"],		["VAL", []], ["CAT","VAR"], ["ONASK",BOT_printIntentionList]],
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
var gourmandiseBot  = new BOT_makeBot("gourmandiseBot","gourmandiseTopic");
var jalousieBot  = new BOT_makeBot("jalousieBot","jalousieTopic");
var colereBot  = new BOT_makeBot("colereBot","colereTopic");

BOT_declareTopics(["userTopic","counterTopic"]);

BOT_theBotId		= "gourmandiseBot";		// sets current bot id
BOT_theTopicId		= "gourmandiseTopic";		// sets current topic id
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


function onSwitchBot(oldbotid, newbotid) {
    var chatbox = document.getElementById("chatbox");
    if(newbotid.includes("gourmandise") && gourmandiseEnd){
    	chatbox.value += "Vous voyer gourmandise endormi vous retourner voir " + oldbotid + ".\n";
		var chat = document.getElementById("litetalkchatbox");
		chat.value = oldbotid;
		BOT_chatboxOnSend('litetalkchatbox');
		chat.value = "";
    	return
	}
    if(newbotid.includes("gourmandise")){
        chatbox.value += "Un homme massif avec un corps de bébé et la tếte de votre patient apparait \n";
    }
    if(newbotid.includes("jalousie") && !knowJalousie){
		chatbox.value += "Vous ne connessez personne de ce nom là.\n";
		var chat = document.getElementById("litetalkchatbox");
		chat.value = oldbotid;
		BOT_chatboxOnSend('litetalkchatbox');
		chat.value = "";
		return;
	}
	if(newbotid.includes("colere") && !knowColere){
		chatbox.value += "Vous ne connessez personne de ce nom là.\n";
		var chat = document.getElementById("litetalkchatbox");
		chat.value = oldbotid;
		BOT_chatboxOnSend('litetalkchatbox');
		chat.value = "";
		return;
	}
    if(newbotid.includes("jalousie") && !visiteColereFirst){
		chatbox.value += "Un serpent sort de derrière votre dos et vous sussure: 'Ssssalut...'\n";
	}
    if(newbotid.includes("jalousie") && visiteColereFirst){
        chatbox.value += "Jalousie apparait en vous reniflant et vous dit:'Je connais cette odeur c'est celle de ma bouteille, et attend je reconnais aussi celle de Colère ! C'est donc lui qui m'a volé mes précieuse bouteille ! Tiens met ça et tu pourras lui parler. Vas lui dire de me rendre tout ce qu'il m'as pris !' \n";
        visiteColereFirst = false;
        canSpeakToColere = true;
    }

    if(newbotid.includes("colere") && !canSpeakToColere){
        chatbox.value += "Un être enragée et géant vous lance plein de bouteille dès que vous approchez, vous préférez retournez voir " + oldbotid + ".\n";
        visiteColereFirst = true;
		var chat = document.getElementById("litetalkchatbox");
		chat.value = oldbotid;
		BOT_chatboxOnSend('litetalkchatbox');
		chat.value = "";
		onSwitchBot("colere", oldbotid);
		return;
	}
    if(newbotid .includes("colere") && canSpeakToColere){
        chatbox.value += "Vous pouvez maintenant approchez Colère, en vous voyant il grogne : 'BONJOUR'. Vous faites un pas en arrière mais vous restez sur place.\n";
    }
}




// *************************************************************************************************************
// *************************************************************************************************************
//                                                END OF THE CODE
// *************************************************************************************************************
// *************************************************************************************************************
 
 
 
 
 
 
 
 
 
 











