var _curso;
agregarEventoPageShow(iniciar_participantes_curso);
function iniciar_participantes_curso(){
	var params=recibirValorGet();
	console.log(params[0].split("=")[1]);	
	consultar_curso_participantes(params[0].split("=")[1]);	

}

function consultar_curso_participantes(params){
	

	var existe=obtener_session_storage("ssGlobales");
	if(!existe){
		existe=globales;
	}

	if(false!=existe._usuario && undefined!=existe._usuario){
		globales=existe;
		//aqui valavalidacion delusuario 
	}

	consultarDatos("usuarios_por_curso/"+params,{},function(rs){
			if(rs.respuesta){
				
				
				document.getElementById("h1NombreCurso").innerHTML=rs.curso[0].nombre_curso;
				//document.getElementById("pTlDescCurso").innerHTML=rs.datos[0].descripcion_curso;
				var lista=document.getElementById("liParticipantes");
				lista.innerHTML="";
				for(var d in rs.datos){
					
					var li=document.createElement("li");
					var img=document.createElement("img");
					var h4=document.createElement("h4");
					h4.innerHTML=rs.datos[d].nombre_usuario+" "+rs.datos[d].apellido_usuario;
					li.appendChild(img);
					li.appendChild(h4);
					lista.appendChild(li);

						
				}	
			}
			
		});		
	
}

