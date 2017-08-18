var ElementViewManageEvent = (function (_super) {
    __extends(ElementViewManageEvent, _super);
    function ElementViewManageEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this.propToElementLocation = 0;
        this.ele1 = 0;
        this.ele2 = 0;
    }
    var d = __define,c=ElementViewManageEvent;p=c.prototype;
    ElementViewManageEvent.TAP_TWO_ELEMENT = "tap_two_element";
    ElementViewManageEvent.REMOVE_ANIMATION_OVER = "remove_animation_over";
    ElementViewManageEvent.UPDATE_MAP = "update_map";
    ElementViewManageEvent.UPDATE_VIEW_OVER = "update_view_over";
    ElementViewManageEvent.USE_PROP_CLICK = "use_prop_click";
    return ElementViewManageEvent;
})(egret.Event);
egret.registerClass(ElementViewManageEvent,"ElementViewManageEvent");
//# sourceMappingURL=ElementViewManageEvent.js.map