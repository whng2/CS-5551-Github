var mongoose = require('mongoose');
var User = mongoose.model('User');
var chalk = require('chalk');

exports.search = function(req,res){
  User.find({}, function(err, user){
    console.log(user);
    res.render('Home',{session:req.session, users:user});
    console.log('welcome to Home page');
  });

}

exports.deleteUser = function(req, res){
  var name = req.body.name;

  var existUser = new User();
  existUser.name = name;

  User.remove({name:name},function(err, result){
    if(err){
      console.log('user unable to be deleted.');
      var message = 'Please try later after some time.';
      res.render('Home',{errorMessage:message});
    }
    else{
      User.find({},function(err,result){
        console.log('user deleted successfully.');
        console.log(result);
        res.render('Home',{users:result});
      });

    }
  });
}

exports.regUser= function(req,res) {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var cnf_pwd = req.body.cnf_password;

  var user = new User();
  user.name = name;
  user.username = username;
  user.email = email;
  user.password = password;
  user.cnf_pwd = cnf_pwd;

  user.save(function(err,user) {
    if(err){
      console.log("User already exists.");
      var error = 'Please select different username or email';
      res.render('Register',{errorMessage:error});
      return;
    }
    else{
      console.log("User registration successfully.");
      req.session.user = user.username;
      // res.render('Welcome',{session:req.session});
    }

  });

}

exports.login = function(req, res){

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({email:email},function(err,user){
    if(user==null){
      console.log("Authentication failed");
      var message='username or password invalid';
      res.render('Login',{errorMessage:message});
      return;
    }
    console.log(user);
    user.comparePwd(password,function(err,isMatch){
      if(isMatch && isMatch==true){
        console.log("Authentication success.");
        req.session.username = user.username;
        req.session.loggedIn = true;
        console.log("current user logged in is: "+req.session.username);
        res.redirect('/users');
      }
      else{
        console.log("Authentication failed.");
        var message ="Username or password invalid";
        res.render('Login', {errorMessage:message});
        return;
      }
    });
  });
}