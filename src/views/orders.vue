<template>
  <div>
    <nav-header>

    </nav-header>
     
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Order History</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul >
                <li style="text-align: left; padding-left:50px; ">Items</li>
                <li style="text-align: left;">Price</li>
                <li style="text-align: left;">Quantity</li>
                <li style="text-align: left;">Subtotal</li>
              </ul>
            </div>
            <ul v-for="(order, index) in orderList" class="cart-item-list">
              <br>
              <div><h1 style="text-align: left;">Order {{index+1}}:</h1><br>
              </div>
              <li v-for="item in order" >
                <div class="cart-tab" >
                  <div class="cart-item-pic">
                    <img v-bind:src="'/static/'+item.image" v-bind:alt="item.name" style="height: 80%;">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.name}}</div>
                  </div>
                </div>
                <div class="cart-tab">
                  <div class="cart-item-title">
                    <div class="item-name">${{item.price}}</div>
                  </div>
                </div>
                <div class="cart-tab">
                  <div class="cart-item-title">
                    <div class="item-name">${{item.price}}</div>
                  </div>
                </div>
                <div class="cart-tab">
                  <div class="cart-item-title">
                   <div class="item-name">${{(item.productNum*item.price).toFixed(2) }}</div>
                  </div>
                </div>      
                
              </li>
              <br>
            </ul>
          </div>
        </div>
        
      </div> 
    </div>
    <nav-footer></nav-footer>
  </div>
</template>


<script>
    import NavHeader from './../components/NavHeader'
    import NavFooter from './../components/NavFooter'
    import axios from 'axios'
    export default{
        data(){
            return{
                 orderList:[],
            }
        },
        components:{
          NavHeader,
          NavFooter,
        },

        mounted(){
            this.init();
        },

        methods: {
          init(){
              axios.get("/users/orders").then((response)=>{
                  let res = response.data;
                  this.orderList = res.result;
              });
            },
        }
    }
</script>

<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    /* border: 1px solid #f0f0f0; */
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  } 
  
</style>