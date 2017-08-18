class ElementViewManage extends egret.EventDispatcher 
{
    private _layer:egret.Sprite;
    public constructor(elementLayer:egret.Sprite) 
    {
        super();
        this._layer = elementLayer;
        this.init();
    }

    private elementviews: ElementView[];
    private init()
    {
        this.elementviews = new Array();
        var l:number = GameData.MaxColumn * GameData.MaxRow;
        var el:ElementView;
        for (var i:number = 0; i < l; i++) 
        {
            el = new ElementView(this._layer);
            el.id = i;
            el.location = GameData.elements[i].locataion;
            this.elementviews.push(el);
            el.addEventListener(ElementViewManageEvent.REMOVE_ANIMATION_OVER, this.removeAniOver, this);
            el.addEventListener(egret.TouchEvent.TOUCH_TAP, this.elTap, this);
            el.addEventListener(ElementViewManageEvent.UPDATE_MAP, this.updateMap, this);
            el.addEventListener(ElementViewManageEvent.UPDATE_VIEW_OVER, this.moveNewLocationOver, this);
        }
    }

    private _currentTapID:number = -1;
    private elTap(evt:egret.TouchEvent)
    {
        if (PropViewManage.proptype == -1) 
        {
            if (evt.currentTarget instanceof ElementView) 
            {
                var ev:ElementView = <ElementView>evt.currentTarget;
                if (this._currentTapID != -1) 
                {
                    if (ev.id == this._currentTapID) 
                    {
                        ev.setFocus(false);
                        this._currentTapID = -1;
                    }
                    else
                    {
                        var event: ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.TAP_TWO_ELEMENT);
                        event.ele1 = this._currentTapID;
                        event.ele2 = ev.id;
                        this.dispatchEvent(event);
                    }
                }
                else
                {
                    ev.setFocus(true);
                    this._currentTapID = ev.id;
                }
            }
        }
        else
        {
            if (this._currentTapID != -1) 
            {
                this._currentTapID = -1;
            }
            var evts: ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.USE_PROP_CLICK);
            evts.propToElementLocation = (<ElementView>evt.currentTarget).location;
            this.dispatchEvent(evts);
        }
    }
    public setNewElementFocus(location: number)
    {
        this.elementviews[this._currentTapID].setFocus(false);
        this.elementviews[location].setFocus(true);
        this._currentTapID = location;
    }

    public changeLocationAndBack(id1:number, id2:number)
    {
        if (this.elementviews[id1].focus) 
        {
            this.elementviews[id1].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1])<this._layer.getChildIndex(this.elementviews[id2])) 
            {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndBack(this.elementviews[id2].location, true);
            this.elementviews[id2].moveAndBack(this.elementviews[id1].location);
        }
        else
        {
            this.elementviews[id2].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) > this._layer.getChildIndex(this.elementviews[id2])) 
            {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndBack(this.elementviews[id2].location);
            this.elementviews[id2].moveAndBack(this.elementviews[id1].location, true);
        }
        this._currentTapID = -1;
    }


    public changeLocationAndScale(id1:number, id2:number)
    {
        if (this.elementviews[id1].focus) 
        {
            this.elementviews[id1].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1])<this._layer.getChildIndex(this.elementviews[id2])) 
            {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndScale(this.elementviews[id2].location, true);
            this.elementviews[id2].moveAndScale(this.elementviews[id1].location);
        }
        else
        {
            this.elementviews[id2].setFocus(false);
            if (this._layer.getChildIndex(this.elementviews[id1]) > this._layer.getChildIndex(this.elementviews[id2])) 
            {
                this._layer.swapChildren(this.elementviews[id1], this.elementviews[id2]);
            }
            this.elementviews[id1].moveAndScale(this.elementviews[id2].location);
            this.elementviews[id2].moveAndScale(this.elementviews[id1].location, true);
        }
        this._currentTapID = -1;
    }

    public showAllElement()
    {
        this._layer.removeChildren();
        var gridwidth:number = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY:number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
        var ele:ElementView;
        for (var i:number = 0; i < GameData.MaxRow; i++) {
            for (var t:number = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    ele = this.elementviews[GameData.mapData[i][t]];
                    ele.setTexture("e" + GameData.elements[GameData.mapData[i][t]].type + "_png");
                    ele.x = ele.targetX();
                    ele.y = startY - ele.width;
                    ele.show( (50*GameData.MaxColumn * GameData.MaxRow - 50 * GameData.unMapNum) - (i * GameData.MaxRow + t) * 50 );
                }
            }
        }
    }

    private removenum:number = 0;
    private removeAniOver(evt:ElementViewManageEvent)
    {
        this.removenum++;
        if (this.removenum == 2) {
            this.removenum = 0;
            this.dispatchEvent(evt);
        }
    }

    private moveeleNum:number = 0;
    public playReqRemoveAn(id:number, tx:number, ty:number)
    {
        this.moveeleNum++;
        var el:ElementView = this.elementviews[id];
        if (el.parent) 
        {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playCurveMove(tx, ty);
    }


    public playRemoveAni(id:number)
    {
        this.moveeleNum++;
        var el:ElementView = this.elementviews[id];
        if (el.parent) 
        {
            this._layer.setChildIndex(el, this._layer.numChildren);
        }
        el.playRemoveAni();
    }
    private updateMap(evt:ElementViewManageEvent)
    {
        this.moveeleNum--;
        if (this.moveeleNum == 0) 
        {
            this.dispatchEvent(evt);
        }
    }


    public updateMapData()
    {
        var len:number = this.elementviews.length;
        this.moveLocElementNum = 0;
        for (var i:number = 0; i < len; i++) {
            this.elementviews[i].location = GameData.elements[i].locataion;
            this.elementviews[i].setTexture("e" + GameData.elements[i].type + "_png");
            this.elementviews[i].moveNewLocation;
        }
    }
    private moveLocElementNum:number = 0;
    private moveNewLocationOver(event: ElementViewManageEvent)
    {
        this.moveLocElementNum++;
        if (this.moveLocElementNum == (GameData.MaxColumn * GameData.MaxRow)) 
        {
            var evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);
            this.dispatchEvent(evt);
        }
    }

    public updateOrder()
    {
        var len:number = this.elementviews.length;
        egret.Tween.removeAllTweens();
        for (var i:number = 0; i < len; i++) 
        {
            this.elementviews[i].location = GameData.elements[i].locataion;
            this.elementviews[i].move();
        }
    }
}