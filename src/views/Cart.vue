<template>
  <div>
    <nav-header>

    </nav-header>

    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-bind:src="'/static/'+item.image" v-bind:alt="item.name" style="height: 80%;">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.name}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">${{item.price}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="editCart('minu',item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="editCart('add',item)">+</a>
                      </div>
                      <br>
                      <span style="font-style:italic; font-size: 0.8em">{{item.inventory}} in stock</span>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">${{(item.productNum*item.price).toFixed(2) }}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item)">
                       <img  class="icon icon-del" src="/static/bin.png" alt="">
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="toggleCheckAll">
                  <span class="checkbox-btn item-check-btn" v-bind:class="{'check':checkAllFlag}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">${{totalPrice}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" v-bind:class="{'btn--dis':checkedCount==0}" @click="checkOut">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">Are you sure you want to delete this item?</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="delCart">Confirm</a>
        <a class="btn btn--m btn--red" href="javascript:;" @click="modalConfirm = false">Cancel</a>
      </div>
    </Modal>
    <nav-footer></nav-footer>
  </div>
</template>
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
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
<script>
    import NavHeader from './../components/NavHeader'
    import NavFooter from './../components/NavFooter'
    import Modal from './../components/Modal'
    import axios from 'axios'
    // import {currency} from './../util/currency'
    import './../assets/css/checkout.css'
    export default{
        data(){
            return{
                cartList:[],
                delItem:{},
                modalConfirm:false
            }
        },
        mounted(){
            this.init();
        },
        computed:{
          checkAllFlag(){
            return this.checkedCount == this.cartList.length;
          },
          checkedCount(){
            var i = 0;
            this.cartList.forEach((item)=>{
              if(item.checked=='1')i++;
            })
            return i;
          },
          totalPrice(){
            var money = 0;
            this.cartList.forEach((item)=>{
              if(item.checked=='1'){
                money += parseFloat(item.price)*parseInt(item.productNum);
              }
            })
            return money.toFixed(2);
          }
        },
        components:{
          NavHeader,
          NavFooter,
          Modal
        },
        methods:{
            init(){
              axios.get("/users/cartList").then((response)=>{
                  let res = response.data;
                  this.cartList = res.result;
              });
            },
            closeModal(){
              this.modalConfirm = false;
            },
            delCartConfirm(item){
                this.delItem = item;
                this.modalConfirm = true;
            },
            delCart(){
              axios.post("/users/cartDel",{
                productId:this.delItem._id,
                productNum: this.delItem.productNum
              }).then((response)=>{
                  let res = response.data;
                  if(res.status == '0'){
                    this.modalConfirm = false;
                    this.$router.push({
                        path:"/"
                      });
                    // this.$store.commit("updateCartCount",-this.delItem.productNum);
                  }
              });
            },
            editCart(flag,item){
                if(flag=='add'){
                  if (item.inventory <= 0){
                    return;
                  }
                  item.productNum++;
                  item.inventory--;
                }else if(flag=='minu'){
                  if(item.productNum<=1){
                    return;
                  }
                  item.productNum--;
                  item.inventory++;
                }else{
                  item.checked = item.checked=="1"?'0':'1';
                }

                axios.post("/users/cartEdit",{
                  productId:item._id,
                  productNum:item.productNum,
                  checked:item.checked,
                  inventory: item.inventory
                }).then((response)=>{
                    let res = response.data;
                    let num = 0;
                    if(flag=='add'){
                      num = 1;
                    }else if(flag=='minu'){
                      num = -1;
                    }

                })
            },
            toggleCheckAll(){
                var flag = !this.checkAllFlag;
                this.cartList.forEach((item)=>{
                  item.checked = flag?'1':'0';
                })
                axios.post("/users/editCheckAll",{
                  checkAll:flag
                }).then((response)=>{
                    let res = response.data;
                    if(res.status=='0'){
                        console.log("update suc");
                    }
                })
            },
            checkOut(){
                axios.post("/users/checkout",{
                }).then((response)=>{
                    let res = response.data;
                    if(res.status=='0'){
                      this.init();
                      alert("Checked out successfully!");
                      this.$router.push({
                        path:"/"
                      });

                    }else{
                      alert("Sorry, unable to check out this time!")
                    }
                })
                // this.$router.push({
                //     path:"/address"
                // });
            }
        }
    }
</script>
