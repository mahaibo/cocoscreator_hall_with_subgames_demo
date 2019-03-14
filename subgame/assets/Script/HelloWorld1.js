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
        this.label.string = this.text;
        window.gameMgr.helloworld = "hello world!!!";
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