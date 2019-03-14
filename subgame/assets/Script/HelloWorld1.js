require("./DataMgr");

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello_World!'
    },

    // use this for initialization
    onLoad: function() {
        window.gameMgr.subgame = "subgame";
        if ("undefined" != typeof(window.gameMgr.subgame)){
            this.label.string = window.gameMgr.hall;
        }
    },

    // called every frame
    update: function(dt) {

    },
    on_back: function() {
        cc.log("btn_back clicked!!!!");
        var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'ALLGame/' + "subgame");
        require(storagePath + "/src/dating.js");
    },
});