




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
    if(botID == "colereBot") {
        ballon = "colereballoon";
        name = "Colere";
        namemin = "colere";
    }
    var chat = document.getElementById("litetalkchatbox");
    var newval = chat.value.split(' ');
    var oldval = chat.value;
    chat.value = newval[0] + ' ' + newval.slice(1).join('');
    var chatbox = document.getElementById("chatbox");
    var oldvalchat = chatbox.value;
    BOT_chatboxOnSend('litetalkchatbox');
    var fifiballon = document.getElementById(ballon);
    var change = oldvalchat == chatbox.value
    if(change){
        chatbox.value += "Tom > " + oldval + "\n";
    }
    if(chat.value.includes("jalousie") || chat.value.includes("colere") || chat.value.includes("gourmandise")){
        onSwitchBot(namemin, chat.value);
        chat.value = "";
        chatbox.scrollTop = chatbox.scrollHeight;
        return;
    }
    if(change) {
        chat.value = "";
        chatbox.value += name + " > " + fifiballon.value + "\n";
    }
    chatbox.scrollTop = chatbox.scrollHeight;
}

function keyPressed(event){
    if (event.keyCode === 13) {
        document.getElementById("sendButton").click();
    }
}


