// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    

    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      if(globales._usuario==false ){
        registro_fb();
      }else if(globales._usuario!=false){
        iniciar_panel(globales._usuario,"divLogin","divMenuAdmin");
      }
      
      
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log("No has iniciado sesion con facebook");
        
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);

    });
  }

  window.fbAsyncInit = function() {
  
  FB.init({
    appId      : '1735468506759204',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.10' // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {

    statusChangeCallback(response);


  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  /*function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me',{fields:['name','first_name','last_name','email','birthday']}, function(response) {
      console.log(response);
      if(response.first_name==undefined){
        response.first_name="";
      }
      if(response.last_name==undefined){
        response.last_name="";
      }
      if(response.email==undefined){
        response.email="";
      }
      if(response.birthday==undefined){
        response.birthday="0000-00-00";
      }
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Gracias por registrate, ' + response.name + '! ';
          
    });

      
  }*/
function registro_fb(){

      FB.api('/me',{fields:['name','first_name','last_name','email','birthday','picture']},function(response){
          if(response.first_name==undefined){
             response.first_name="";
          }
          if(response.last_name==undefined){
            response.last_name="";
          }
          if(response.email==undefined){
            response.email="";
          }
          if(response.birthday==undefined){
            response.birthday="0000-00-00";
          }
          response.rol="alumno";
          //console.log(document.getElementById("fb_login"));
          
          if(globales._usuario==false){
            registrarDato("usuariosFB",response,function(rs){
                mostrarMensaje(rs);
                if(rs.respuesta){
                  globales._usuario=rs.datos;
                  agregar_session_storage("ssGlobales",globales);
                  iniciar_panel(rs.datos,"divLogin","divMenuAdmin");  
                }
            });
            
          }
          
      });
}

function salirApp(){
  FB.logout(function(response) {
    mostrarMensaje("Haz cerrado sesion"); 
  });
  document.getElementById("fb_login").style.display="";
  document.getElementById('btnSalir').style.display="none";
  document.getElementById('status').innerHTML =
            'Por avor inicia sesion! ';
  globales._usuario=false;
  agregarSessionStorage("ssGlobales",globales);          
}
