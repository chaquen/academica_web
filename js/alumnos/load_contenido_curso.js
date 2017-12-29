agregarEventoLoad(iniciar_app_contenido_curso);
function iniciar_app_contenido_curso(){
	var existe;
	if(!obtener_session_storage("ssGlobales")){
		existe=globales;
	}else{
		existe=obtener_session_storage("ssGlobales");
		globales=existe;
		console.log(globales);
	}
	console.log(obtener_session_storage("ssGlobales"));
	
	if(false!=existe._usuario && undefined!=existe._usuario){
		console.log(window.location.href);

		iniciar_contenido_curso();
		agregarEvento("liSalir","click",function(){
			if(confirm("¿Desea salir de la aplicación?")){
				
				globales._usuario=false;
				globales._cerrar_sesion=true;
				console.log(globales);	
				agregar_session_storage("ssGlobales",globales);
				/*FB.logout(function(response) {
				    mostrarMensaje("Haz cerrado sesion"); 
				});*/
				location.href="index.html";
			}
			
		});
	}else{
		location.href="index.html";
	}
	
	
}

