
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/data/element/BaseELement.js",
	"bin-debug/data/element/GameElement.js",
	"bin-debug/data/element/LevelRequireElement.js",
	"bin-debug/data/GameData.js",
	"bin-debug/data/levelRequire.js",
	"bin-debug/data/levelGameDataParse.js",
	"bin-debug/data/linkLogic.js",
	"bin-debug/data/MapControl.js",
	"bin-debug/data/mapDataParse.js",
	"bin-debug/data/PorpLogic.js",
	"bin-debug/event/ElementViewManageEvent.js",
	"bin-debug/Main.js",
	"bin-debug/view/ElementView.js",
	"bin-debug/view/ElementViewManage.js",
	"bin-debug/view/GameBackGround.js",
	"bin-debug/view/LevelElementView.js",
	"bin-debug/view/propView.js",
	"bin-debug/view/GameLogic.js",
	"bin-debug/view/GameOverPanel.js",
	"bin-debug/view/LevelReqViewManage.js",
	"bin-debug/view/PropViewManage.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "noScale",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: true,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};