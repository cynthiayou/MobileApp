<template>
    <div>
        <nav-header v-on:admin="isAdmin" v-on:notAdmin="notAdmin" v-on:refresh="pageRefresh"></nav-header>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <form class="form-inline" style="float: left;">
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input id="keyword" class="form-control form-control-xs ml-3 w-75" type="text" placeholder="Search" aria-label="Search" style="height:30px;">
                        <img id="search" src="/static/searchIcon.png" alt="search" style="margin-left: 5px; height: 10px;" @click="search">
                    </form>
                    <span class="sortby">Sort by:</span>
                    <select class="form-control" id="brandFilter" name="brandFilter" @change="onBrandChange($event)">
                        <option value="all" selected="">All Brands</option>
                        <option value="iPhone">iPhone</option>
                        <option value="Google">Google</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Huawei">Huawei</option>
                    </select>
                    <select class="form-control" id="memoryFilter" name="memoryFilter" @change="onGBChange($event)">
                        <option value="all" selected="">Internal Storage</option>
                        <option value="64">64GB</option>
                        <option value="128">128GB</option>
                        <option value="256">256GB</option>
                        <option value="512">512GB</option>
                    </select>

                    <!-- <a href="javascript:void(0)" class="default cur">Default</a> -->
                    <!-- <span class="def">Default</span> -->
                    <a href="javascript:void(0)" class="price" @click="sortProducts">Price <img id="arrow" src="/static/loading-arrow.svg" v-bind:class="{'sort-up': sortFlag}" alt=""></a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
                        <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)"  @click="setPriceAll" v-bind:class="{'cur':priceLevel=='all'}" >All</a></dd>
                        <dd v-for="(price, index) in priceFilter">
                            <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceLevel==index}" >{{price.startPrice}} - {{price.endPrice}}</a>
                        </dd>
                        </dl>
                    </div>
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in productsList">
                                    <div class='pic'>
                                        <a href="javacript:void(0)">
                                            <img v-bind:src="'/static/'+item.image">
                                        </a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.name}}</div>
                                        <div class="price">${{item.price }}</div>
                                        <div class="memory">Memory:{{item.memory}}G</div>
                                        <div class="color">Color:{{item.color}}</div>
                                        <div class="inventory">Qty in stock:{{item.inventory}}</div>
                                        <div>
                                            <button v-show="adminFlagPar" type="button" class="btn btn-xs" @click="edit(item._id)" >Edit</button>
                                            <button v-show="adminFlagPar" type="button" class="btn btn-xs"  @click="delConfirm(item)">Delete</button>
                                        </div>
                                        <div class="btn-area">
                                            <a href="javacript:;" class="btn btn--m" @click="addCart(item._id)">Add to cart</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="loadMore" v-show="show" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                            <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
            <h3 slot="message">Please log in first before adding to cart!</h3>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShow=false">Close</a>
            </div>
        </modal>
        <modal v-bind:mdShow="mdOutOfStock" v-on:close="closeModal">
            <h3 slot="message">Out of stock!</h3>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdOutOfStock=false">Close</a>
            </div>
        </modal >





      <div class="md-modal modal-msg md-modal-transition" style="weight:auto height:auto;" v-bind:class="{'md-show':editShow}">
          <div class="md-modal-inner">
            <div class="md-top">
                <div class='md-title'>Update Item</div>
                <button class="md-close" @click="editShow=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <form class="addItem">
                  <table>
                      <tr>
                          <td style="text-align: left;"><label for="name">Name:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="name" id="name" v-model="PhoneName"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="phoneNameSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="brand">Brand:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="brand" id="brand" v-model="PhoneBrand"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="brandSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="price">Price:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="price" id="price" v-model="PhonePrice"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="priceSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="memory">Memory</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="memory" id="memory" v-model="PhoneMemory"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="descriptionSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="color">Color:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="color" id="color" v-model="PhoneColor"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="colorSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="inventory">Inventory:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="inventory" id="inventory" v-model="PhoneInventory"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="colorSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="description">Description:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><textarea name="description" id="description" v-model="PhoneDescription"></textarea></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="descriptionSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="image">Image:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="file" name="myImage"  @change="onFileSelected"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="imageSpan"></span></td>
                      </tr>

                       
                  </table>
              </form>
              </div>
              <div class="login-wrap">
                <a href="javascript:void(0)" class="btn-login" @click="update" >Update Item</a>
              </div>
            </div>
            </div>
        </div>
          <div class="md-overlay" v-if="editShow" @click="editShow=false"></div>

















        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
            <h3 slot="message">
                <svg class="icon-status-ok">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>Added to cart successfully!</span>
            </h3>
            <div slot="btnGroup">
                <a class="btn btn--m" style="font-size: 12px;" href="javascript:;" @click="mdShowCart=false" >Continue shopping</a>
                <router-link class="btn btn--m" style="font-size: 12px;" href="javascript:;" to="/cart">Go to cart</router-link>
            </div>
        </modal>
        <Modal :mdShow="modalConfirm" @close="modalConfirm = false">
            <p slot="message">Are you sure you want to delete this item?</p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="softDel">Confirm</a>
                <a class="btn btn--m btn--red" href="javascript:;" @click="modalConfirm = false">Cancel</a>
            </div>
        </Modal>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import './../assets/css/checkout.css'

    import NavHeader from "./../components/NavHeader"
    import NavFooter from "./../components/NavFooter"
    import Modal from "./../components/Modal"
    import axios from "axios"
    export default {
        data () {
            return {
                itemUpdated: '',
                PhoneInventory:'',
                image:'',
                PhoneImage:'',
                PhoneName: '',
                PhoneBrand:'',
                PhoneMemory:'',
                PhonePrice:'',
                PhoneDescription:'',
                PhoneColor:'',
                productsList:[],
                sortFlag: true,
                page:1,
                pageSize:8,
                editShow:false,
                busy:true,
                show:true,
                loading:false,
                mdShow:false,
                adminFlagPar: false,
                mdOutOfStock: false,
                mdShowCart: false,
                modalConfirm: false,
                delItem:'',
                keyword:'',
                priceFilter:[
                    {
                        startPrice: '0.00',
                        endPrice: '500.00',
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00',
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '5000.00',
                    }
                ],
                priceLevel: 'all',
                filterBy:false,
                overLayFlag: false,
                brand: 'all',
                internalStorage: "all",
            }
        },
        mounted: function(){
                this.getProductsList();
        },
        methods: {
            pageRefresh(){
                this.page=1;
                this.getProductsList();
            },
            getProductsList(flag){
                let param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag? 1 : -1,
                    priceLevel: this.priceLevel,
                    brand: this.brand,
                    internalStorage: this.internalStorage,
                    keyword: this.keyword,
                  }
                this.loading = true;
                axios.get("/products/list", {
                    params: param
                }).then(response => {
                        let res = response.data;
                        this.loading = false;
                        if(res.status=="0"){
                            if (flag){
                                this.productsList = this.productsList.concat(res.result.list);
                                if (res.result.count < 8 ){
                                    this.busy = true;
                                    this.show = false;
                                } else{
                                    this.busy = false;
                                }
                            }else{
                                this.productsList = res.result.list;
                                this.busy = false;
                            }
                        }else{
                            this.productsList = [];
                        }
                    });
            },

            loadMore(){
                this.busy = true;
                this.show = true;
                setTimeout(() => {
                    this.page++;
                    this.getProductsList(true);
                }, 500);
            },

            sortProducts(){
                this.sortFlag = !this.sortFlag;
                this.page=1;
                this.getProductsList();
            },

            showFilterPop(){
                this.filterBy = true;
                this.overLayFlag = true;
            },
            setPriceAll(){
                this.priceLevel='all';
                this.page = 1;
                this.getProductsList();
                this.closePop();
            },
            setPriceFilter(index){
                this.priceLevel = index;
                this.page = 1;
                this.getProductsList();
                this.closePop();
            },
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            },
            addCart(id){
                axios.post("/products/addCart", {
                    // userId: $cookies.get("userId"),
                    productId:id
                }).then(response => {
                    var res = response.data;
                    if (res.status == '0'){
                        this.mdShowCart = true;
                    } else if (res.status == '2'){
                        this.mdOutOfStock = true;
                    } else{
                        this.mdShow = true;
                        // alert("msg: "+res.msg);
                    }
                });
            },
            edit(id){
              this.editShow = true;
              this.itemUpdated = id;
              axios.get("/products/getProduct",{
                params:{
                  productId: id
                }
              }).then(
               (response)=>{
                    var res = response.data;
                    if(res.status=="0"){
                      console.log(response.data);
                      var product = res.result.product;
                      this.PhoneName = product.name;
                      this.PhoneInventory = product.inventory;
                      this.PhoneBrand = product.brand;
                      this.PhonePrice = product.price;
                      this.PhoneMemory = product.memory;
                      this.PhoneDescription = product.description;
                      this.PhoneColor = product.color;
                      this.image = product.image;
                      }
                }
              )
            },
            update(){
              let formData1 = new FormData();
            formData1.append('inventory', this.PhoneInventory);
            formData1.append('name', this.PhoneName);
            formData1.append('brand', this.PhoneBrand);
            formData1.append('memory', this.PhoneMemory);
            formData1.append('price',this.PhonePrice);
            formData1.append('description',this.PhoneDescription);
            formData1.append('color', this.PhoneColor);
            formData1.append('productId', this.itemUpdated);
            formData1.append('updated', true);
            // console.log(formData1.price);
            // console.log(this.PhoneInventory);
            if (this.PhoneImage){
              formData1.append('file', this.PhoneImage);
              formData1.append('image', '');
            } else{
              formData1.append('file', '');
              formData1.append('image', this.image);
            };
            axios.post("/products/addItem",formData1).
            then(response => {
              let res = response.data;
              if (res.status == "0"){
                this.addItemFlag = false;
                this.$emit("refresh");
              } else{
                this.addItemFlag = true;
              }
            })
            },
          onFileSelected(event){
                this.PhoneImage = event.target.files[0];
          },
            closeModal(){
                this.mdShow = false;
                this.mdShowCart = false;
            },
            onBrandChange(event){
                console.log(event.target.value);
                this.brand = event.target.value;
                this.page=1;
                this.getProductsList();
            },
            onGBChange(event){
                console.log(event.target.value);
                this.internalStorage = event.target.value;
                this.page=1;
                this.getProductsList();
            },
            delConfirm(item){
                this.delItem = item;
                this.modalConfirm = true;
            },
            softDel(){
                axios.post("/products/softDel", {
                    productId: this.delItem._id
                }).then(response => {
                    var res = response.data;
                    if (res.status == '0'){
                        this.modalConfirm = false;
                        this.getProductsList();
                    } else{
                        alert("unable to delete this item.");
                    }
                });
            },
            isAdmin(){
                this.adminFlagPar = true;
                console.log("Recieved logged in");

            },
            notAdmin(){
                console.log("Recieved logged out");
                this.adminFlagPar = false;
                // this.getProductsList();
            },
            search(){
                this.keyword = $("#keyword").val();
                this.page=1;
                this.getProductsList();

            }
        },
        components:{
            NavHeader,
            NavFooter,
            Modal,
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.list-wrap ul::after{
    clear: both;
    content: '';
    height: 0;
    display: block;
    visibility: hidden;
}
.loadMore{
    height: 100px;
    line-height:100px;
    text-align: center;
}
.btn-xs {
    height: 20px;
    line-height: 10px;
    margin-top:3px;
    padding-left: .8em;
    padding-right: .8em;
    font-size: 10px;
    letter-spacing: .1em;
    margin-bottom: 0px;

}

</style>
