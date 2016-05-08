function initCognitoCredentials() {
  AWS.config.region = '__REGION__';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: '__IDENTITY_POOL_ID__'
  });

  // Cognito User Pool Id
  AWSCognito.config.region = '__REGION__';
  AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: '__IDENTITY_POOL_ID__'
  });
}

function createUserPool() {
  var poolData = {
    UserPoolId : '__USER_POOL_ID__',
    ClientId : '__CLIENT_ID__'
  };
  return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
}

function getUser(username, userPool) {
  var userData = {
    Username : username,
    Pool : userPool
  };
  return new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
}

function getUsername(email) {
  return email.replace('@', '_');
}

function CognitoAttrs() {
  this.attrs = [];
}

CognitoAttrs.prototype.toArray = function() {
  return this.attrs;
}

CognitoAttrs.prototype.add = function(name, value) {
  var attr = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({ Name : name, Value : value });
  this.attrs.push(attr);
}

function signup(email, password) {
  initCognitoCredentials();

  var now = new Date();
  var userPool = createUserPool();
  var username = getUsername(email);

  var attrs = new CognitoAttrs();
  attrs.add('email', email);

  userPool.signUp(username, password, attrs.toArray(), null, function(err, result){
    if (err) {
      console.log(err);
      return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    console.log('call result: ' + result);
  });
}

function verify(email, code) {
  var userPool = createUserPool();
  var username = getUsername(email);
  var cognitoUser = getUser(username, userPool);

  cognitoUser.confirmRegistration(code, true, function(err, result) {
    if (err) {
      alert(err);
      return;
    }
    console.log('call result: ' + result);
  });
}

function signin(email, password) {
  var userPool = createUserPool();
  var username = getUsername(email);
  var cognitoUser = getUser(username, userPool);

  var authenticationData = {
    Username : username,
    Password : password,
  };
  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
    },
    onFailure: function(err) {
      alert(err);
    },

  });
}

jQuery(document).ready(function($) {
  initCognitoCredentials();
  $(document).on('click', '#signup', function() {
    signup($('#signup-email').val().trim(), $('#signup-password').val().trim());
  });
  $(document).on('click', '#verify', function() {
    verify($('#verify-email').val().trim(), $('#verify-code').val().trim());
  });
  $(document).on('click', '#signin', function() {
    signin($('#signin-email').val().trim(), $('#signin-password').val().trim());
  });
});
