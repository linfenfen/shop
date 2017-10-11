new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		selectAllFlag:false,
		delFlag:false,
		curProduct:""
	},
	filters:{
		formaterMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.creView();
		});
	},
	methods:{
		creView:function(){
			var _this=this;
			this.$http.get("data/cartData.json").then(function(res){
				_this.productList=res.data.result.list;
				// _this.totalMoney=res.data.result.totalMoney;
			})
		},
		changMoney:function(item,way){
			if(way>0){
				item.productQuantity++;
			}else{
				if(item.productQuantity>1){
					item.productQuantity--;
				}
			}
			this.calculateMoney();
		},
		selectProduct:function(item){
			if(typeof item.checked == "undefined"){
				this.$set(item,"checked",true);
			}else{
				item.checked=!item.checked;
			}
			this.calculateMoney();
		},
		selectAll:function(flag){
			var _this=this;
			this.selectAllFlag=flag;
			this.productList.forEach(function(item,index){
				if(typeof item.checked == "undefined"){
					_this.$set(item,"checked",_this.selectAllFlag);
				}else{
					item.checked=_this.selectAllFlag;
				}
			})
			this.calculateMoney();
		},
		calculateMoney:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item,index){
				if(item.checked == true){
					_this.totalMoney += item.productPrice*item.productQuantity
				}
			})
		},
		delConfirm:function(item){
			this.delFlag=true;
			this.curProduct=item;
		},
		delProduct:function(){
			var index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag=false;
		},
		submit:function(){
			if(this.totalMoney==0){
				return false;
			}
			return true;
		}
	}
})
Vue.filter("money",function(value,type){
	return "￥"+value.toFixed(2)+type;
})