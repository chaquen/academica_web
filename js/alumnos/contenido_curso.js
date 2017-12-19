function iniciar_contenido_curso(){
	var params=recibirValorGet();
	console.log(params[0].split("=")[1]);	
	consultar_curso(params[0].split("=")[1]);	
}


function consultar_curso(params){
	

	var existe=obtener_session_storage("ssGlobales");
	if(!existe){
		existe=globales;
	}

	if(false!=existe._usuario && undefined!=existe._usuario){
		consultarDatos("cursos/id&=&"+params,{},function(rs){
			if(rs.respuesta){
				
				document.getElementById("h4NombreUsuario").innerHTML=globales._usuario.nombre_usuario;
			
				
				
				agregarEvento("liSalir","click",function(){

					if(confirm("¿Desea salir de la aplicación?")){
						
						globales._usuario=false;
						globales._cerrar_sesion=true;
						console.log(globales);	
						/*FB.logout(function(response) {
					    	mostrarMensaje("Haz cerrado sesion."); 
						});*/
						agregar_session_storage("ssGlobales",globales);
						
						location.href="index.html";
					}


					
				});
			}
			
		});	
	}

	
}

function dibujar_contenido_cursos(datos){
	var div=document.getElementById("divContenidoDelCurso");
	div.innerHTML="";
	for(var f in datos){
		console.log(datos[f]);
		var h2=document.createElement("h2");
		h2.innerHTML=datos[f].nombre_curso;
		document.getElementById("tlCurso").innerHTML=datos[f].nombre_curso;
		div.appendChild(h2);
		for(var ff in datos[f].modulos){
			console.log(datos[f].modulos[ff].nombre_modulo);
			var h4=document.createElement("h4");
			h4.innerHTML=datos[f].modulos[ff].nombre_modulo;
			h4.setAttribute("onclick","mostrarContenidoModulo");
			div.appendChild(h4);
			
		}
			
	}
	console.log(div);
}