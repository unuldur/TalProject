


function sendMessageFifi(){
    BOT_chatboxOnSend('litetalkchatbox');
    var fifiballon = document.getElementById("fifiballoon");
    var chat = document.getElementById("litetalkchatbox");
    var chatbox = document.getElementById("chatbox");
    chatbox.value += "Tom > " + chat.value + "\n";
    chatbox.value += "Fifi > " + fifiballon.value + "\n";
    chatbox.scrollTop = chatbox.scrollHeight;
}

function keyPressed(event){
    if (event.keyCode === 13) {
        document.getElementById("sendButton").click();
    }
}

function readOnlyKeypressHandler (event) {
    // The user has just pressed a key, but we don't want the text to change
    // so we prevent the default action
    event.preventDefault();
}