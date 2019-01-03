




function sendMessage(botID) {
    var ballon = "";
    var name = " ";
    var namemin = "";
    if(botID == "gourmandiseBot"){
     ballon = "gourmandiseballoon";
     name = "Gourmandise" ;
     namemin = "gourmandise";
    }
    if(botID == "jalousieBot"){
        ballon = "jalousieballoon";
        name = "Jalousie" ;
        namemin = "jalousie";
    }
    if(botID == "colereBot"){
        ballon = "colereballoon";
        name = "Colere" ;
        namemin = "colere";
    }
    BOT_chatboxOnSend('litetalkchatbox');
    var fifiballon = document.getElementById(ballon);
    var chat = document.getElementById("litetalkchatbox");
    var chatbox = document.getElementById("chatbox");
    chatbox.value += "Tom > " + chat.value + "\n";
    if(chat.value == "jalousie" || chat.value == "colere" || chat.value == "gourmandise"){
        BOT_onSwitchBot(namemin, chat.value);
        return;
    }
    chatbox.value += name + " > " + fifiballon.value + "\n";
    chatbox.scrollTop = chatbox.scrollHeight;
}

function keyPressed(event){
    if (event.keyCode === 13) {
        document.getElementById("sendButton").click();
    }
}


