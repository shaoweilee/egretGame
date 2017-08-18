class linkLogic {
	public static lines:number[][];
	public static isHaveLine():boolean//寻找有没有可消除元素
	{
		linkLogic.lines = [];
		var currentType:string = "";
		var typeNum:number = 0;
		for (var i = 0; i < GameData.MaxRow; i++) //第i行
		{
			for (var t = 0; t < GameData.MaxColumn; t++) //第i行的第t个方块
			{
				if (GameData.mapData[i][t] != -1) //方块不为-1
				{
					if( currentType != GameData.elements[ GameData[i][t] ].type )//当前类型不是目前这个元素的类型，即 不是同一种元素
					{
						if(typeNum >= 3)//不是同一种元素，那么已经累计的，达到消除条件了吗
						{
							var arr:number[] = [];
							for(var q=0; q < typeNum; q++)
							{
								arr.push( GameData.mapData[i][t-q-1] );
							}
							linkLogic.lines.push(arr);
						}
						currentType = GameData.elements[ GameData[i][t] ].type;//没有达到消除条件，那么重置一下类型和计数器。
						typeNum = 1;
					}
					else//元素类型相同，是同一种类型
					{
						typeNum++;
					}
				}
				else//方块为-1，意味着数据被截断
				{
					if( typeNum >=3 )//那么已经累计的，达到消除条件了吗
					{
						var arr:number[] = [];
						for(var q=0; q < typeNum; q++)
						{
							arr.push( GameData.mapData[i][t-q-1] );
						}
						linkLogic.lines.push(arr);
					}//没有达到消除条件，就从头开始
					currentType = "";
					typeNum = 0;
				}
			}//第i行遍历完毕
			if( typeNum >=3 )
			{
				var arr:number[] = [];
				for(var q=0; q < typeNum; q++)
				{
					arr.push( GameData.mapData[i][t-q-1] );
				}
				linkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}//横向上，整个地图遍历完毕
		for (i = 0; i < GameData.MaxRow; i++) 
		{
			for (var t = 0; t < GameData.MaxColumn; t++) 
			{
				if ( GameData.mapData[t][i] != -1 ) 
				{
					if (currentType != GameData.elements[ GameData.mapData[t][i] ].type) 
					{
						if ( typeNum >= 3 ) {
							var arr:number[] = [];
							for (var q = 0; q < typeNum; q++) 
							{
								arr.push(GameData.mapData[t-q-1][i]);
							}
							linkLogic.lines.push(arr);
						}
						currentType = GameData.elements[ GameData.mapData[t][i] ].type;
						typeNum = 1;
					}
					else
					{
						typeNum++;
					}
				}
				else
				{
					if ( typeNum >= 3 ) {
						var arr:number[] = [];
						for (var q = 0; q < typeNum; q++) 
						{
							arr.push(GameData.mapData[t-q-1][i]);
						}
						linkLogic.lines.push(arr);
					}
					currentType = "";
					typeNum = 0;
				}
			}
			if ( typeNum >= 3 ) {
				var arr:number[] = [];
				for (var q = 0; q < typeNum; q++) 
				{
					arr.push(GameData.mapData[t-q-1][i]);
				}
				linkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}
		if (linkLogic.lines.length != 0) 
		{
			return true;
		}
		return false;
	}
	public static isNextHaveLine():boolean
	{
		for (var i = 0; i < GameData.MaxRow; i++) //i最大值为7
		{
			for(var t=0; t<GameData.MaxColumn; t++) //t最大值为7
			{
				if( GameData.mapData[i][t] != -1 )
				{
					if( t<(GameData.MaxColumn-1) && GameData.mapData[i][t+1] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i][t+1]].type )
					{//横向二连，开始穷举情况
						if (t>0 && GameData.mapData[i][t-1] != -1) 
						{
							if ( i>0 && t>0 && GameData.mapData[i-1][t-1] && GameData.mapData[i-1][t-1] != -1 && GameData.elements[ GameData.mapData[i-1][t-1] ].type == GameData.elements[GameData.mapData[i][t]].type ) //判断左上角
							{
								return true;
							}
							if ( i<(GameData.MaxRow-1) && t>0 && GameData.mapData[i+1][t-1] && GameData.mapData[i+1][t-1] != -1 && GameData.elements[ GameData.mapData[i+1][t-1] ].type == GameData.elements[GameData.mapData[i][t]].type ) //左下角
							{
								return true;
							}
							if ( t>1 && GameData.mapData[i][t-2] && GameData.mapData[i][t-2]!=-1 && GameData.elements[ GameData.mapData[i][t-2] ].type == GameData.elements[GameData.mapData[i][t]].type ) //左边隔一个元素
							{
								return true;
							}
						}
						if (t<(GameData.MaxColumn-1)&&GameData.mapData[i][t+2]!=-1) 
						{
							if (i>0 && t<(GameData.MaxColumn-2) && GameData.mapData[i-1][t+2] && GameData.mapData[i-1][t+2]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type==GameData.elements[ GameData.mapData[i-1][t+2] ].type)// 右上角
							{
								return true;
							}
							if (i<(GameData.MaxRow-1) && t<(GameData.MaxColumn-2) && GameData.mapData[i+1][t+2] && GameData.mapData[i+1][t+2]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type==GameData.elements[ GameData.mapData[i+1][t+2] ].type) //右下角
							{
								return true;								
							}
							if (t<(GameData.MaxColumn-3) && GameData.mapData[i][t+3]&&GameData.mapData[i][t+3]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type==GameData.elements[ GameData.mapData[i][t+3] ].type) //右边隔一个
							{
								return true;								
							}
						}
					}//横向二连穷举完毕

					if( i<(GameData.MaxRow-1) && GameData.mapData[i+1][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i+1][t]].type )
					{//纵向二连，开始穷举情况
						if (i>0 && GameData.mapData[i-1][t] != -1) //判断上方
						{
							if ( t>0 && GameData.mapData[i-1][t-1] && GameData.mapData[i-1][t-1] != -1 && GameData.elements[ GameData.mapData[i-1][t-1] ].type == GameData.elements[GameData.mapData[i][t]].type ) //判断左上角
							{
								return true;
							}
							if ( t<GameData.MaxColumn-1 && GameData.mapData[i-1][t+1] && GameData.mapData[i-1][t+1] != -1 && GameData.elements[ GameData.mapData[i-1][t+1] ].type == GameData.elements[GameData.mapData[i][t]].type ) //右上角
							{
								return true;
							}
							if ( i>1 && GameData.mapData[i-2][t] && GameData.mapData[i-2][t]!=-1 && GameData.elements[ GameData.mapData[i-2][t] ].type == GameData.elements[GameData.mapData[i][t]].type ) //上方隔一个元素
							{
								return true;
							}
						}
						if (i<(GameData.MaxRow-2)&&GameData.mapData[i+2][t]!=-1) //判断下方
						{
							if (t>0 && GameData.mapData[i+2][t-1] && GameData.mapData[i+2][t-1]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type==GameData.elements[ GameData.mapData[i+2][t-1] ].type)// 左下角
							{
								return true;
							}
							if (t<(GameData.MaxColumn-1) && GameData.mapData[i+2][t+1] && GameData.mapData[i+2][t+1]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type==GameData.elements[ GameData.mapData[i+2][t+1] ].type) //右下角
							{
								return true;								
							}
							if (i<(GameData.MaxRow-3) && GameData.mapData[i+3][t]&&GameData.mapData[i+3][t]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type==GameData.elements[ GameData.mapData[i+3][t] ].type) //下方隔一个
							{
								return true;								
							}
						}
					}//纵向二连穷举完毕
					//方式二开始
					//横向
					if (t<GameData.MaxColumn-2 && GameData.mapData[i][t+2]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type == GameData.elements[ GameData.mapData[i][t+2] ].type) 
					{
						if (GameData.mapData[i][t+1] != -1) 
						{
							if (i>0 && GameData.mapData[i-1][t+1] && GameData.mapData[i-1][t+1]!=-1 && GameData.elements[ GameData.mapData[i-1][t+1] ].type==GameData.elements[ GameData.mapData[i][t] ].type) 
							{
								return true;
							}
							if (i<GameData.MaxRow-1 && GameData.mapData[i+1][t+1] && GameData.mapData[i+1][t+1]!=-1 && GameData.elements[ GameData.mapData[i+1][t+1] ].type==GameData.elements[ GameData.mapData[i][t] ].type) 
							{
								return true;
							}
						}
					}
					//纵向
					if (i<GameData.MaxRow-2 && GameData.mapData[i+2][t]!=-1 && GameData.elements[ GameData.mapData[i][t] ].type == GameData.elements[ GameData.mapData[i+2][t] ].type) 
					{
						if (GameData.mapData[i+1][t] != -1) 
						{
							if (t>0 && GameData.mapData[i+1][t-1] && GameData.mapData[i+1][t-1]!=-1 && GameData.elements[ GameData.mapData[i+1][t-1] ].type==GameData.elements[ GameData.mapData[i][t] ].type) 
							{
								return true;
							}
							if (t<GameData.MaxColumn-1 && GameData.mapData[i+1][t+1] && GameData.mapData[i+1][t+1]!=-1 && GameData.elements[ GameData.mapData[i+1][t+1] ].type==GameData.elements[ GameData.mapData[i][t] ].type) 
							{
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}
	public static canMove(id1:number, id2:number):boolean//判断是否可移动
	{
		var l1row:number = Math.floor( GameData.elements[id1].locataion/GameData.MaxRow );
		var l1col:number = GameData.elements[id1].locataion % GameData.MaxColumn;

		var l2row:number = Math.floor( GameData.elements[id2].locataion/GameData.MaxRow );
		var l2col:number = GameData.elements[id2].locataion % GameData.MaxColumn;

		if (l1row == l2row) {
			if ( Math.abs( l1col-l2col ) == 1 ) {
				return true;
			}
		}
		if (l1col == l2col) {
			if ( Math.abs( l1row-l2row ) == 1 ) {
				return true;
			}
		}
		return false;
	}
	public static changeOrder() //全局乱序算法
	{
		var arr:number[] =[];
		for (var i = 0; i < GameData.MaxRow; i++) 
		{
			for (var t = 0; t < GameData.MaxColumn; t++) 
			{
				if (GameData.mapData[i][t] != -1) 
				{
					arr.push(GameData.mapData[i][t]);
				}
			}
		}
		var index:number = 0;
		for (var i = 0; i < GameData.MaxRow; i++) 
		{
			for (var t = 0; t < GameData.MaxColumn; t++) 
			{
				index = Math.floor( Math.random() * arr.length );
				GameData.mapData[i][t] = arr[index];
				GameData.elements[ arr[index] ].locataion = i * GameData.MaxColumn + t;
				arr.slice(index, i);
			}
		}
	}

	public static isHaveLineByIndex(p1:number, p2:number):boolean
	{
		var p1n:number = p1;
		var p2n:number = p2;

		var p1id:number = GameData.mapData[ Math.floor(p1 / GameData.MaxColumn) ][ p1 % GameData.MaxRow ];
		var p2id:number = GameData.mapData[ Math.floor(p2 / GameData.MaxColumn) ][ p2 % GameData.MaxRow ];

		GameData.mapData[ Math.floor(p1 / GameData.MaxColumn) ][ p1 % GameData.MaxRow ] = p2id;
		GameData.mapData[ Math.floor(p2 / GameData.MaxColumn) ][ p2 % GameData.MaxRow ] = p1id;

		var rel:boolean = linkLogic.isHaveLine();
		if (rel) 
		{
			GameData.elements[p1id].locataion = p2;	
			GameData.elements[p2id].locataion = p1;	
			return true;
		}
		else
		{
			GameData.mapData[ Math.floor(p1 / GameData.MaxColumn) ][ p1 % GameData.MaxRow ] = p1id;
			GameData.mapData[ Math.floor(p2 / GameData.MaxColumn) ][ p2 % GameData.MaxRow ] = p2id;
		}
		return false;
	}
}