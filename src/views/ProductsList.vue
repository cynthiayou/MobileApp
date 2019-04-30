<template>
    <div>
        <nav-header></nav-header>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
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
        </modal>
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
                productsList:[],
                sortFlag: true,
                page:1,
                pageSize:8,
                busy:true,
                show:true,
                loading:false,
                mdShow:false,
                mdOutOfStock: false,
                mdShowCart: false,
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
                internalStorage: "all"
            }
        },
        mounted: function(){
                this.getProductsList();
        },
        methods: {
            getProductsList(flag){
                let param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag? 1 : -1,
                    priceLevel: this.priceLevel,
                    brand: this.brand,
                    internalStorage: this.internalStorage
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

</style>
