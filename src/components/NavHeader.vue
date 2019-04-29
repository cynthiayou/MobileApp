<template>
    <header class="header">
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
            <symbol id="icon-arrow-short" viewBox="0 0 25 32">
                <title>arrow-short</title>
                <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
            </symbol>
            <symbol id="icon-status-ok" viewBox="0 0 32 32">
                <title>status-ok</title>
                <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
                <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
            </symbol>
            <symbol id="icon-cart" viewBox="0 0 38 32">
                <title>cart</title>
                <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
                <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
                <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
                <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
            </symbol>
            </defs>
        </svg>
        <div class="navbar">
            <div class="navbar-left-container">
              <a href="/" class="navbar-link">Home</a>
              <a href="/#/contact" class="navbar-link">Contact</a>
            </div>
            <div class="navbar-right-container" style="display: flex;">
              <div class="navbar-menu-container">
                <span class="navbar-link" v-if="userLoggedIn">Welcome,{{userLoggedIn}}</span>
                <a href="javascript:void(0)" class="navbar-link" @click="signupModalFlag=true" v-if="!userLoggedIn">SignUp</a>
                <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="!userLoggedIn">Login</a>
                <a href="javascript:void(0)" class="navbar-link" @click="logout" v-if="userLoggedIn">Logout</a>
    
                <div class="navbar-cart-container">
                  <!-- <span class="navbar-cart-count" v-if="cartCount>0">{{cartCount}}</span> -->
                  <a class="navbar-link navbar-cart-link" href="/#/cart">
                    <svg class="navbar-cart-logo">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" style="width:50%; height:auto;" v-bind:class="{'md-show':signupModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
                <div class='md-title'>Sign up</div>
                <button class="md-close" @click="signupModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="emailErrorTip">This email already exists. Choose another one!</span>
                </div>
                <form class="signup">
                  <table>
                      <tr>
                          <td style="text-align: left;"><label for="username">Username:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="signupName" id="signupName" @focus="showNameSpan" @blur="checkName"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="nameSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="email">Email:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="text" name="email" id="email" @focus="showEmailSpan" @blur="checkEmail"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="emailSpan"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="password">Password:</label></td>
                          <td style="padding:0.3em; margin: 1em;"><input type="password" name="signupPwd" id="signupPwd1" @focus="showPwdSpan1" @blur="checkPwd1"></td>
                          <td style="text-align: left; font-size:0.8em;"><span id="pwdSpan1"></span></td>
                      </tr>
                      <tr>
                          <td style="text-align: left;"><label for="password">Repeat Password:</label></td>
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
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="username" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="password" @keyup.enter="login">
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
                userName: '',
                userPwd: '',
                errorTip: false,
                emailErrorTip: false,
                // nameTip: false,
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
                      this.loginModalFlag = false;
                    }
                });
          },
          login(){
            if (!this.userName || !this.userPwd){
              this.errorTip = true;
              return;
            }
            axios.post("/users/login", {
              userName: this.userName,
              userPwd: this.userPwd
            }).then(response => {
              let res = response.data;
              // console.log(response);
              if (res.status == "0"){
                this.errorTip = false;
                this.loginModalFlag = false;
                this.userLoggedIn = res.result.userName;
              } else{
                this.errorTip = true;
              }
            })
          },

          logout(){
            axios.post("/users/logout").then(response => {
              let res = response.data;
              if (res.status == "0"){
                this.userLoggedIn="";                
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
            console.log("signing up");
          }
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

  .header a, .footer a {
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
    width: 25px;
    height: 25px;
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
