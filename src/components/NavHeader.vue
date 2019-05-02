<template>
    <header class="header">
        <div class="navbar">
            <div class="navbar-left-container">
              <a href="/" class="navbar-link">Home</a>
              <a href="javascript:void(0)" class="navbar-link" v-show="adminFlag" @click="addItemFlag=true"  v-if="!addItemFlag">Add Product</a>
            </div>
            <div class="navbar-right-container" style="display: flex;">
              <div class="navbar-menu-container">
                <span class="navbar-link" v-if="userLoggedIn" style="color:white;">Welcome,{{userLoggedIn}}</span>
                <a href="javascript:void(0)" class="navbar-link" @click="signupModalFlag=true" v-if="!userLoggedIn">SignUp</a>
                <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="!userLoggedIn">Login</a>
                <a href="javascript:void(0)" class="navbar-link" @click="logout" v-if="userLoggedIn">Logout</a>

                <div class="navbar-cart-container">
                  <!-- <span class="navbar-cart-count" v-if="cartCount>0">{{cartCount}}</span> -->
                  <a class="navbar-link navbar-cart-link"  href="/#/cart">
                    <img  class="navbar-cart-logo" src="/static/Shopping-Cart.png" alt="">
                  </a>
                </div>
              </div>
            </div>
        </div>
       <div class="md-modal modal-msg md-modal-transition" style="weight:auto height:auto;" v-bind:class="{'md-show':addItemFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
                <div class='md-title'>Add An new Item</div>
                <button class="md-close" @click="addItemFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <form class="addItem">
                  <table>
                      <tr>
                          <td style="text-align: left;"><label for="name">Name:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="name" id="name" v-model="PhoneName" ></td>
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
                          <td style="padding:0.3em; margin: 1em;"><input type="file" name="myImage" @change="onFileSelected"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="imageSpan"></span></td>
                      </tr>

                       
                  </table>
              </form>
              </div>
              <div class="login-wrap">
                <a href="javascript:void(0)" class="btn-login" @click="addItem">Add Item</a>
              </div>
            </div>
            </div>
        </div>
          <div class="md-overlay" v-if="addItemFlag" @click="addItemFlag=false"></div>
        <div class="md-modal modal-msg md-modal-transition" style="width:50%; height:auto;" v-bind:class="{'md-show':signupModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
                <div class='md-title'>Sign up</div>
                <button class="md-close" @click="signupModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="signupErrorTip">A problem occurred during sign-up!</span>
                </div>
                <form class="signup">
                  <table>
                      <tr>
                          <td style="text-align: left;"><label for="signupName">Username:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="signupName" id="signupName" @focus="showNameSpan" @blur="checkName"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="nameSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="email">Email:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="email" id="email" @focus="showEmailSpan" @blur="checkEmail"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="emailSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="signupPwd1">Password:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="password" name="signupPwd" id="signupPwd1" @focus="showPwdSpan1" @blur="checkPwd1"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="pwdSpan1"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="signupPwd2">Repeat Password:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="password" name="signupPwd" id="signupPwd2" @focus="showPwdSpan2" @blur="checkPwd2"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="pwdSpan2"></span></td>
                      </tr>                                
                  </table>
              </form>
              </div>
              <div class="login-wrap">
                <a href="javascript:void(0)" class="btn-login" @click="signup">Sign up</a>
              </div>
            </div>
            </div>
          </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
                <div class='md-title'>Log in</div>
                <button class="md-close" @click="loginModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">Wrong username or password!</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1"  v-model="userEmail" class="regi_login_input regi_login_input_left" placeholder="Email">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:void(0)" class="btn-login" @click="login">Log In</a>
              </div>
            </div>
            </div>
          </div>
          <div class="md-overlay" v-if="loginModalFlag || signupModalFlag" @click="loginModalFlag=false, signupModalFlag=false"></div>
    </header>

</template>
<script>
    import axios from 'axios'
    import './../assets/css/login.css'

    export default {
        name: 'NavHeader',
        data () {
            return {
                PhoneInventory:'',
                PhoneImage:'',
                PhoneName: '',
                PhoneBrand:'',
                PhoneMemory:'',
                PhonePrice:'',
                PhoneDescription:'',
                PhoneColor:'',
                userEmail: '',
                userPwd: '',
                errorTip: false,
                adminFlag: false,
                addItemFlag: false,
                signupErrorTip: false,
                loginModalFlag: false,
                signupModalFlag: false,
                signupName: '',
                signupEmail:'',
                signupPwd: '',
                userLoggedIn: '',  //store userName if the user is logged in
            }
        },
        mounted(){
          this.checkLogin();
        },
        methods: {
          checkLogin(){
                axios.get("/users/checkLogin").then((response)=>{
                    var res = response.data;
                    if(res.status=="0"){
                      this.userLoggedIn = res.result;
                      if (this.userLoggedIn == "admin"){
                        this.adminFlag = true;
                        this.$emit("admin")
                      };
                      this.loginModalFlag = false;
                    }
                });
          },
          login(){
            if (!this.userEmail || !this.userPwd){
              this.errorTip = true;
              return;
            }
            axios.post("/users/login", {
              email: this.userEmail,
              userPwd: this.userPwd
            }).then(response => {
              let res = response.data;
              // console.log(response);
              if (res.status == "0"){
                this.errorTip = false;
                this.loginModalFlag = false;
                this.addItemFlag = false;
                this.userLoggedIn = res.result.userName;
                if (this.userLoggedIn == "admin"){
                  this.adminFlag = true;
                }
              } else{
                this.errorTip = true;
              }
            })
          },

          logout(){
            axios.post("/users/logout").then(response => {
              let res = response.data;
              if (res.status == "0"){
                this.userLoggedIn = "";
                this.adminFlag = false;
                this.$emit("notAdmin");
              }
            })
          },

          showNameSpan(){
            // this.nameTip = true;
            $("#nameSpan").text("Username must contain only alphabetical or numeric characters.")
                      .attr("class", "info")
                      .show();
          },

          showEmailSpan(){
            $("#emailSpan").text("Email field should be a valid email address (abc@def.xyz).")
                      .attr("class", "info")
                      .show();
          },

          showPwdSpan1(){
            $("#pwdSpan1").text("Password must be at least eight characters including one uppercase letter, one special character and alphanumeric characters.")
                      .attr("class", "info")
                      .show();
          },

          showPwdSpan2(){
            $("#pwdSpan2").text("Please confirm your password.")
                      .attr("class", "info")
                      .show();
          },

          checkName(){
            // this.nameTip = false;
            this.signupName = $("#signupName").val();
            if (!this.signupName){
              $("#nameSpan").hide();
            }else if (/^[a-zA-Z0-9]+$/.test(this.signupName)){
              $("#nameSpan").text("OK").attr("class", "ok").show();
            }else{
              $("#nameSpan").text("Error").attr("class", "error").show();
            }
          },

          checkEmail(){
            this.signupEmail = $("#email").val();
            if (!this.signupEmail){
              $("#emailSpan").hide();
            } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{3,3}$/.test(this.signupEmail)){
              axios.post("/users/checkEmail", {
                email: this.signupEmail,
              }).then((response)=>{
                    var res = response.data;
                    if(res.status=="0"){
                      $("#emailSpan").text("OK").attr("class", "ok").show();
                    }else {
                      $("#emailSpan").text("Email already exists").attr("class", "error").show();
                    }
                });
            } else{
              $("#emailSpan").text("Error").attr("class", "error").show();
            }
          },

          checkPwd1(){
            this.signupPwd = $("#signupPwd1").val();
            if (!this.signupPwd){
              $("#pwdSpan1").hide();
            } else if (this.signupPwd.length > 7 && this.signupPwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && this.signupPwd.match(/([!,%,&,@,#,$,^,*,?,_,~])/)){
              $("#pwdSpan1").text("OK").attr("class", "ok").show();
            } else{
              $("#pwdSpan1").text("Error").attr("class", "error").show();
            }
          },

          checkPwd2(){
            let pwd2 = $("#signupPwd2").val();
            if (!pwd2){
              $("#pwdSpan2").hide();
            } else if (pwd2 == this.signupPwd){
              $("#pwdSpan2").text("OK").attr("class", "ok").show();
            } else {
              $("#pwdSpan2").text("Error").attr("class", "error").show();
            }
          },
          signup(){
            axios.post("/users/signup", {
              userName: this.signupName,
              email: this.signupEmail,
              userPwd: this.signupPwd,
            }).then(response => {
              let res = response.data;
              // console.log(response);
              if (res.status == "0"){
                this.errorTip = false;
                this.signupModalFlag = false;
                this.loginModalFlag = true;
              } else{
                if (res.msg == 'Email already exists'){
                  $("#emailSpan").text("Email already exists").attr("class", "error").show();
                } else{
                this.signupErrorTip = true;
                }
              }
            })
          },
          addItem(){
            let formData = new FormData();
            formData.append('inventory', this.PhoneInventory);
            formData.append('file', this.PhoneImage);
            formData.append('name', this.PhoneName);
            formData.append('brand', this.PhoneBrand);
            formData.append('memory', this.PhoneMemory);
            formData.append('price',this.PhonePrice);
            formData.append('description',this.PhoneDescription);
            formData.append('color', this.PhoneColor);
            formData.append('updated', false);
            axios.post("products/addItem",formData).
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
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
  }
  .navbar {
    display: flex;
    background-color: slategrey;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }

  .header a{
    color: white;
    text-decoration: none;
  }
  .footer a {
    color: #666;
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-link {
    padding-left: 15px;
  }
  .navbar-cart-container {
    position: relative;
  }
  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .navbar-cart-logo {
    width: 40px;
    height: 40px;
    transform: scaleX(-1);
  }
  .ok, .info, .error {
      padding: 0px 2px;
  }
  .ok {
    background: #cfc;
    border: 2px solid #9c9;
  }
  .info {
    background: #ffc;
    /* border: 2px solid #cc9; */
  }
  .error {
    background: #fcc;
    border: 2px solid #c99;
  }
</style>
