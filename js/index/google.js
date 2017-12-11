function onSignIn(googleUser) {
				
	 console.log(globales);	
	 var profile = googleUser.getBasicProfile();
	 var datos={
	  	id:profile.getId(),
	  	nombre:profile.getName(),
	  	apellido:profile.getFamilyName(),
	  	foto_perfil:profile.getImageUrl(),
	  	email:profile.getEmail(),
	  	birthday:"0000-00-00",
	  	rol:"alumno", 	
	};

	console.log(datos);

	if(globales._usuario==false){
	  	registrarDato("usuariosGO",datos,function(rs){
	             mostrarMensaje(rs);
	             console.log(rs);
	             if(rs.respuesta){
	             		iniciar_panel(rs.datos,"divLogin","divMenuAdmin");
                 }else{
		              	document.getElementById("logGo").style.display="none";
		              }
	   });	
	}

}

