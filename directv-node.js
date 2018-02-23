var https = require('http');
//TODO
var uri = "http://ip_or_name:port"; // the external IP address or public hostname, including port number
//               remember you will need to port forward to your directv receiver's port 8080
var default_zone = "living room";
// define the zones you need, specifying client mac address (for Genie Mini clients) without hyphens and in ALL CAPS
// the master Genie DVR unit does not need to have the mac address specified
var zone_info = {
    "living room": {
        mac_addr: ""
    },
    "bed room": {
        mac_addr: ""
    }
};

//EVERYTHING BELOW THIS LINE NEEDS NO CHANGES TO WORK
var assemble = "";
var endpoint = "";
var channel = "";
var command = "";
var path = "";
exports.handler = (event, context) => {
    try {
        assemble = "";
        endpoint = "";
        channel = "";
        command = "";
        path = "";
        if (event.session.new) {
            // New Session
            console.log("NEW SESSION");
        }
        switch (event.request.type) {
        case "LaunchRequest":
            // Launch Request
            console.log(`LAUNCH REQUEST`);
            context.succeed(generateResponse(buildSpeechletResponse("Ask me to do something with your tv, such as changing the channel, record a show, power on or off, or choose a network to watch.", true), {}));
            break;
        case "IntentRequest":
            if (event.request.intent.slots.zoneId) detectZone(event.request.intent.slots.zoneId.value);
            if (event.request.intent.slots.ChannelNumber) channel = event.request.intent.slots.ChannelNumber.value;
            if (event.request.intent.slots.command) command = event.request.intent.slots.command.value;

            // Intent Request
            console.log(`INTENT REQUEST`);
            switch (event.request.intent.name) {
            case "GetCommand":
                switch (command) {
                case "play":
                case "resume":
                    path = '/remote/processKey?key=play';
                    break;
                case "pause":
                case "freeze":
                    path = '/remote/processKey?key=pause';
                    break;
                case "guide":
                    path = '/remote/processKey?key=guide';
                    break;
                case "power":
                case "turn on":
                case "turn off":
                case "power on":
                case "power off":
                    path = '/remote/processKey?key=power';
                    break;
                case "format":
                    path = '/remote/processKey?key=format';
                    break;
                case "rewind":
                    path = '/remote/processKey?key=rew';
                    break;
                case "replay":
                    path = '/remote/processKey?key=replay';
                    break;
                case "stop":
                    path = '/remote/processKey?key=stop';
                    break;
                case "advance":
                    path = '/remote/processKey?key=advance';
                    break;
                case "fast forward":
                    path = '/remote/processKey?key=ffwd';
                    break;
                case "record":
                case "save":
                    path = '/remote/processKey?key=record';
                    break;
                case "active":
                    path = '/remote/processKey?key=active';
                    break;
                case "list":
                case "recorded shows":
                case "DVR":
                    path = '/remote/processKey?key=list';
                    break;
                case "exit":
                case "end":
                case "leave":
                    path = '/remote/processKey?key=exit';
                    break;
                case "back":
                    path = '/remote/processKey?key=back';
                    break;
                case "menu":
                    path = '/remote/processKey?key=menu';
                    break;
                case "delete":
                    path = '/remote/processKey?key=red';
                    break;
                case "info":
                    path = '/remote/processKey?key=info';
                    break;
                case "up":
                    path = '/remote/processKey?key=up';
                    break;
                case "down":
                    path = '/remote/processKey?key=down';
                    break;
                case "left":
                    path = '/remote/processKey?key=left';
                    break;
                case "right":
                    path = '/remote/processKey?key=right';
                    break;
                case "select":
                case "enter":
                    path = '/remote/processKey?key=select';
                    break;
                case "channel up":
                case "page up":
                    path = '/remote/processKey?key=chanup';
                    break;
                case "channel down":
                case "page down":
                    path = '/remote/processKey?key=chandown';
                    break;
                case "previous":
                    path = '/remote/processKey?key=prev';
                    break;
                case "show":
                case "channel":
                    path = '/tv/getTuned';
                    break;
                case "AMC":
                    path = '/tv/tune?major=254';
                    break;
                case "A&E":
                    path = '/tv/tune?major=265';
                    break;
                case "animal planet":
                    path = '/tv/tune?major=282';
                    break;
                case "audience":
                    path = '/tv/tune?major=239';
                    break;
                case "BBC america":
                    path = '/tv/tune?major=264';
                    break;
                case "BBC world news":
                    path = '/tv/tune?major=346';
                    break;
                case "BET":
                    path = '/tv/tune?major=329';
                    break;
                case "Bloomberg":
                    path = '/tv/tune?major=353';
                    break;
                case "bravo":
                    path = '/tv/tune?major=237';
                    break;
                case "CBS Sports Network":
                    path = '/tv/tune?major=221';
                    break;
                case "CMT":
                    path = '/tv/tune?major=327';
                    break;
                case "CNBC":
                    path = '/tv/tune?major=355';
                    break;
                case "CNN":
                    path = '/tv/tune?major=202';
                    break;
                case "comedy central":
                    path = '/tv/tune?major=249';
                    break;
                case "C span":
                    path = '/tv/tune?major=350';
                    break;
                case "C span 2":
                    path = '/tv/tune?major=351';
                    break;
                case "cartoon network":
                    path = '/tv/tune?major=296';
                    break;
                case "cartoon network west":
                    path = '/tv/tune?major=297';
                    break;
                case "cooking channel":
                    path = '/tv/tune?major=232';
                    break;
                case "DIY network":
                    path = '/tv/tune?major=230';
                    break;
                case "discovery":
                    path = '/tv/tune?major=278';
                    break;
                case "Disney channel":
                    path = '/tv/tune?major=290';
                    break;
                case "Disney channel west":
                    path = '/tv/tune?major=291';
                    break;
                case "Disney junior":
                    path = '/tv/tune?major=289';
                    break;
                case "Disney XD":
                    path = '/tv/tune?major=292';
                    break;
                case "ESPN":
                    path = '/tv/tune?major=206';
                    break;
                case "ESPN 2":
                    path = '/tv/tune?major=209';
                    break;
                case "ESPN news":
                    path = '/tv/tune?major=207';
                    break;
                case "ESPN U":
                    path = '/tv/tune?major=208';
                    break;
                case "EWTN":
                    path = '/tv/tune?major=370';
                    break;
                case "Fox sports 1":
                    path = '/tv/tune?major=219';
                    break;
                case "Fox sports 2":
                    path = '/tv/tune?major=618';
                    break;
                case "food network":
                    path = '/tv/tune?major=231';
                    break;
                case "FX":
                    path = '/tv/tune?major=248';
                    break;
                case "FXM":
                    path = '/tv/tune?major=258';
                    break;
                case "FXX":
                    path = '/tv/tune?major=259';
                    break;
                case "Fox business":
                    path = '/tv/tune?major=359';
                    break;
                case "Fox news":
                    path = '/tv/tune?major=360';
                    break;
                case "free form":
                    path = '/tv/tune?major=311';
                    break;
                case "golf channel":
                    path = '/tv/tune?major=218';
                    break;
                case "great american country":
                    path = '/tv/tune?major=326';
                    break;
                case "HGTV":
                    path = '/tv/tune?major=229';
                    break;
                case "hallmark channel":
                    path = '/tv/tune?major=312';
                    break;
                case "headline news":
                    path = '/tv/tune?major=204';
                    break;
                case "history channel":
                    path = '/tv/tune?major=269';
                    break;
                case "ion":
                    path = '/tv/tune?major=305';
                    break;
                case "ion west":
                    path = '/tv/tune?major=306';
                    break;
                case "fox":
                case "KTVU":
                    path = '/tv/tune?major=2';
                    break;
                case "KRON":
                    path = '/tv/tune?major=4';
                    break;
                case "CBS":
                case "KPIX":
                    path = '/tv/tune?major=5';
                    break;
                case "ABC":
                case "KGO":
                    path = '/tv/tune?major=7';
                    break;
                case "NBC":
                case "KNTV":
                    path = '/tv/tune?major=11';
                    break;
                case "KOFY":
                    path = '/tv/tune?major=20';
                    break;
                case "KTSF":
                    path = '/tv/tune?major=26';
                    break;
                case "KTVU plus":
                case "KICU":
                    path = '/tv/tune?major=36';
                    break;
                case "the CW":
                case "KBCW":
                    path = '/tv/tune?major=44';
                    break;
                case "PBS":
                case "KQED":
                    path = '/tv/tune?major=9';
                    break;
                case "KRCB":
                    path = '/tv/tune?major=22';
                    break;
                case "KQEH":
                    path = '/tv/tune?major=54';
                    break;
                case "ion local":
                case "KKPX":
                    path = '/tv/tune?major=65';
                    break;
                case "lifetime":
                    path = '/tv/tune?major=252';
                    break;
                case "lifetime movie network":
                    path = '/tv/tune?major=253';
                    break;
                case "MSNBC":
                    path = '/tv/tune?major=356';
                    break;
                case "MLB network":
                    path = '/tv/tune?major=213';
                    break;
                case "MTV":
                    path = '/tv/tune?major=331';
                    break;
                case "MTV classic":
                    path = '/tv/tune?major=336';
                    break;
                case "MTV2":
                    path = '/tv/tune?major=333';
                    break;
                case "national geographic":
                    path = '/tv/tune?major=276';
                    break;
                case "NBA TV":
                    path = '/tv/tune?major=216';
                    break;
                case "NBC sports network":
                    path = '/tv/tune?major=220';
                    break;
                case "NBC sports california":
                    path = '/tv/tune?major=698';
                    break;
                case "NBC sports bay area":
                    path = '/tv/tune?major=696';
                    break;
                case "NFL network":
                    path = '/tv/tune?major=212';
                    break;
                case "NHL network":
                    path = '/tv/tune?major=215';
                    break;
                case "nat geo wild":
                    path = '/tv/tune?major=283';
                    break;
                case "national geographic":
                    path = '/tv/tune?major=276';
                    break;
                case "nick junior":
                    path = '/tv/tune?major=301';
                    break;
                case "nickelodeon":
                    path = '/tv/tune?major=299';
                    break;
                case "nickelodeon west":
                    path = '/tv/tune?major=300';
                    break;
                case "nick toons":
                    path = '/tv/tune?major=302';
                    break;
                case "teen nick":
                    path = '/tv/tune?major=303';
                    break;
                case "own":
                    path = '/tv/tune?major=279';
                    break;
                case "olympic channel":
                    path = '/tv/tune?major=624';
                    break;
                case "oxygen":
                    path = '/tv/tune?major=251';
                    break;
                case "pop":
                    path = '/tv/tune?major=273';
                    break;
                case "SEC network":
                    path = '/tv/tune?major=611';
                    break;
                case "spike":
                    path = '/tv/tune?major=241';
                    break;
                case "syfy":
                    path = '/tv/tune?major=244';
                    break;
                case "TBS":
                    path = '/tv/tune?major=247';
                    break;
                case "TCM":
                    path = '/tv/tune?major=256';
                    break;
                case "TLC":
                    path = '/tv/tune?major=280';
                    break;
                case "TNT":
                    path = '/tv/tune?major=245';
                    break;
                case "TV land":
                    path = '/tv/tune?major=304';
                    break;
                case "tennis channel":
                    path = '/tv/tune?major=217';
                    break;
                case "the weather channel":
                    path = '/tv/tune?major=362';
                    break;
                case "travel channel":
                    path = '/tv/tune?major=277';
                    break;
                case "true TV":
                    path = '/tv/tune?major=246';
                    break;
                case "USA":
                    path = '/tv/tune?major=242';
                    break;
                case "VH1":
                    path = '/tv/tune?major=335';
                    break;
                case "WGN":
                    path = '/tv/tune?major=307';
                    break;
                }
                if (path == "/tv/getTuned") {
                    endpoint = uri + path;

                    if (assemble) endpoint = uri + path + "?" + assemble;
                    console.log(endpoint);
                    var body = "";
                    https.get(endpoint, (response) => {
                        response.on('data', (chunk) => {
                            body += chunk;
                        });
                        response.on('end', () => {
                            var data = JSON.parse(body);
                            var title = data.title;
                            var channel = data.major;
                            context.succeed(generateResponse(

                                buildSpeechletResponse(`You are watching ${title} on channel ${channel}`, true), {}));
                        });
                    });
                } else if (path.match(/remote/)) {
                    endpoint = uri + path;

                    if (assemble) endpoint = uri + path + "&" + assemble;
                    console.log(endpoint);
                    var body = "";
                    https.get(endpoint, (response) => {
                        response.on('data', (chunk) => {
                            body += chunk;
                        });
                        response.on('end', () => {
                            var data = JSON.parse(body);
                            var title = data.title;
                            var channel = data.major;
                            context.succeed(generateResponse(buildSpeechletResponse(`Okay, ${command}`, true), {}));
                        });
                    });
                } else if (path.match(/tune/)) {
                    endpoint = uri + path;
                    if (assemble) endpoint = uri + path + "&" + assemble;
                    console.log(endpoint);
                    var body = "";
                    https.get(endpoint, (response) => {
                        response.on('data', (chunk) => {
                            body += chunk;
                        });
                        response.on('end', () => {
                            var data = JSON.parse(body);
                            context.succeed(generateResponse(buildSpeechletResponse(`Okay, here is ${command}`, true), {}));
                        });
                    });
                } else {
                    console.log("no cases matched");
                    context.succeed(generateResponse(buildSpeechletResponse(`Sorry, I didn't understand`, true), {}));
                }
                break;
            case "GetChannelDirect":
                var channel = event.request.intent.slots.ChannelNumber.value;
                console.log(1);
                var body = "";

                endpoint = uri + "/tv/tune?major=" + channel;
                if (assemble) endpoint = uri + "/tv/tune?major=" + channel + "&" + assemble;
                console.log(endpoint);
                var body = "";
                https.get(endpoint, (response) => {
                    response.on('data', (chunk) => {
                        body += chunk;
                    });
                    response.on('end', () => {
                        var data = JSON.parse(body);
                        context.succeed(generateResponse(buildSpeechletResponse(`Okay, here is channel ${channel}`, true), {}));
                    });
                });
                break;
            default:
                throw "Invalid intent";
            }
            break;
        case "SessionEndedRequest":
            // Session Ended Request
            console.log(`SESSION ENDED REQUEST`);
            break;
        default:
            context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);
        }
    } catch (error) {
        context.fail(`Exception: ${error}`);
    }
};




// Helpers
function buildSpeechletResponse(outputText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    };
}

function generateResponse(speechletResponse, sessionAttributes) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function detectZone(zone) {
    if (zone == undefined || zone == null) {
        zone = default_zone;
    }
    var msg = "Zone: " + zone;

    if (zone_info[zone].mac_addr && zone_info[zone].mac_addr != null) {
        assemble = "clientAddr=" + zone_info[zone].mac_addr;
        msg += "\tclientAddr: " + zone_info[zone].mac_addr;
    } else {
        assemble = undefined;
    }

    console.log(msg);
    return;
}
