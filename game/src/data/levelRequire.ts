class levelRequire {
	public reqElements:LevelRequireElement[];
	public constructor() {
		this.reqElements = [];
	}
	//获取过关数量，需要多少种元素需要消除
	public getLevelReqNum():number//返回一个Number类型的值
	{
		return this.reqElements.length;
	}
	//添加关卡元素，添加类型与数据
	public addElement(type:string, num:number)
	{
		var ele:LevelRequireElement = new LevelRequireElement();
		ele.num = num;
		ele.type = type;
		this.reqElements.push(ele);
	}
	//过关，清空关卡元素
	public openChange()
	{
		this.reqElements = [];
	}
	//减少关卡中元素数量：当玩家消除了三个类型1的元素，需要修改过关需要的元素
	public changeReqNum(type:string, num:number)
	{
		var l:number = this.getLevelReqNum();
		for(var i=0; i<l; i++)
		{
			if(this.reqElements[i].type = type)
			{
				this.reqElements[i].num -= num;
				return;
			}
		}
	}
	//检测关卡元素是否都被消除掉了，即玩家是否通关。
	public isClear():boolean
	{
		var l:number = this.getLevelReqNum();
		for(var i=0; i<l; i++)
		{
			if(this.reqElements[i].num > 0)
			{
				return false;
			}
			return true;
		}
	}

}