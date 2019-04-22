<template>
    <div>
        <nav-header></nav-header>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
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
                                            <a href="javacript:void(0)" class="btn btn--m" @click="addCart(item._id)">Add to cart</a>
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
        <nav-footer></nav-footer>
    </div>
</template>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import './../assets/css/checkout.css'

    import NavHeader from "./../components/NavHeader"
    import NavFooter from "./../components/NavFooter"
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
                overLayFlag: false
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
                    priceLevel: this.priceLevel
                  }
                this.loading = true;
                axios.get("/products", {
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
                    productId:id
                }).then(res => {
                    if (res.data.status == '0'){
                        alert("Added successfully!");
                    }
                    else{
                        alert("msg:"+res.msg);
                    }
                });
            }
        },            

        components:{
            NavHeader,
            NavFooter,
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
