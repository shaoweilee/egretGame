var levelRequire = (function () {
    function levelRequire() {
        this.reqElements = [];
    }
    var d = __define,c=levelRequire;p=c.prototype;
    //获取过关数量，需要多少种元素需要消除
    p.getLevelReqNum = function () {
        return this.reqElements.length;
    };
    //添加关卡元素，添加类型与数据
    p.addElement = function (type, num) {
        var ele = new LevelRequireElement();
        ele.num = num;
        ele.type = type;
        this.reqElements.push(ele);
    };
    //过关，清空关卡元素
    p.openChange = function () {
        this.reqElements = [];
    };
    //减少关卡中元素数量：当玩家消除了三个类型1的元素，需要修改过关需要的元素
    p.changeReqNum = function (type, num) {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqElements[i].type = type) {
                this.reqElements[i].num -= num;
                return;
            }
        }
    };
    //检测关卡元素是否都被消除掉了，即玩家是否通关。
    p.isClear = function () {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqElements[i].num > 0) {
                return false;
            }
            return true;
        }
    };
    return levelRequire;
})();
egret.registerClass(levelRequire,"levelRequire");
//# sourceMappingURL=levelRequire.js.map