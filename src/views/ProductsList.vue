<template>
    <div>
        <nav-header></nav-header>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <!-- <span class="def">Default</span> -->
                    <a href="javascript:void(0)" class="price" >Price <img id="arrow" src="/static/loading-arrow.svg" alt=""></a>
                    <a href="javascript:void(0)" class="filterby stopPop" >Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
                        <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)"  >All</a></dd>
                        <dd v-for="(price, index) in priceFilter"> 
                            <a href="javascript:void(0)"  >{{price.startPrice}} - {{price.endPrice}}</a>
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
                                            <a href="javacript:void(0)" class="btn btn--m">Add to cart</a>
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
                ]
            }
        },
        mounted(){
            axios.get("/products").then((response) => {
                let res = response.data;
                if (res.status == '0'){
                    this.productsList = res.result.list;
                } else {
                    this.productsList = [];
                }
            })
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
