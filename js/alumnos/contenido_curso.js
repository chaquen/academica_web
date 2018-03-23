var _curso;
agregarEventoPageShow(iniciar_contenido_curso);
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
		globales=existe;
		//aqui valavalidacion delusuario 
	}

	consultarDatos("cursos/id&=&"+params,{},function(rs){
			if(rs.respuesta){
				var liListaActividades=document.getElementById("liListaActividades");
				liListaActividades.innerHTML="";
				_curso=rs.datos[0];
				document.getElementById("tlTitulo").innerHTML=rs.datos[0].nombre_curso;
				document.getElementById("h1TlContenidoCurso").innerHTML=rs.datos[0].nombre_curso;
				//document.getElementById("pTlDescCurso").innerHTML=rs.datos[0].descripcion_curso;
				var lista=document.getElementById("liModulosCurso");
				lista.innerHTML="";
				for(var d in rs.datos[0].modulos){
					
					var li=document.createElement("li");
					var h4=document.createElement("h4");
					h4.innerHTML=rs.datos[0].modulos[d].nombre_modulo;
					h4.setAttribute("onclick","dibujar_lista_contenido('"+rs.datos[0].modulos[d].id+"')");
					li.appendChild(h4);
					lista.appendChild(li);

						
				}	
				//dibujar_lista_contenido(1);
				/*agregarEvento("liSalir","click",function(){

					if(confirm("¿Desea salir de la aplicación?")){
						
						globales._usuario=false;
						globales._cerrar_sesion=true;
						console.log(globales);	
					
						agregar_session_storage("ssGlobales",globales);
						
						location.href="index.html";
					}


					
				});*/
			}
			
		});		
	
}

function dibujar_contenido_cursos(datos){
	/*var div=document.getElementById("divContenidoDelCurso");
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
			
	}*/
	console.log(datos);
}

function dibujar_lista_contenido(id_modulo){
	var liListaActividades=document.getElementById("liListaActividades");
	liListaActividades.innerHTML="";
	for(var f in _curso.modulos){

				if(_curso.modulos[f].id==id_modulo){
						for(var ff in _curso.modulos[f].actividades){
							var img="";
							switch(_curso.modulos[f].actividades[ff].tipo_actividad){
								case "documento":
										img="lectura.png";	
										break;
								case "video":
										img="video.png";	
										break;
								case "evento":
										img="taller.png";	
										break;				
								case "evaluacion":
										img="evaluacion.png";

										break;
								case "audio":
										img="audio.png";
										break;				
							}
							var li=document.createElement("li");
							var image=document.createElement("img");
							image.setAttribute("src","Imagen/"+img);
							var h4=document.createElement("h4");
							h4.innerHTML=_curso.modulos[f].nombre_modulo;
							image.setAttribute("onclick","dibujar_contenido('"+_curso.modulos[f].actividades[ff].id+"')");
							li.appendChild(image);
							li.appendChild(h4);
							liListaActividades.appendChild(li);
						}
			
							

				



				
				
				}	
			
	}
		
	
}

function dibujar_contenido(id_actividad){
 	var divContenido=document.getElementById("divContenido");
 	divContenido.innerHTML="";
 	var divx=document.createElement("div");
 	divx.innerHTML="X";
 	divContenido.appendChild(divx);
 	for(var f in _curso.modulos){
 		for(var ff in _curso.modulos[f].actividades){

 			if(_curso.modulos[f].actividades[ff].id==id_actividad){
 				switch(_curso.modulos[f].actividades[ff].tipo_actividad){
					case "documento":
								var iframe=document.createElement("iframe");
								//iframe.setAttribute("class","ifram");
								iframe.setAttribute("src",globales._URL+"recursos/cursos/"+_curso.id+"/"+_curso.modulos[f].actividades[ff].actividad_recurso);
								divContenido.appendChild(iframe);
							break;
					case "video":
								var iframe=document.createElement("iframe");
								//iframe.setAttribute("class","ifram");
								iframe.setAttribute("src","https://www.youtube.com/embed/"+_curso.modulos[f].actividades[ff].actividad_recurso);
								iframe.setAttribute("frameborder","0");
								//iframe.setAttribute("allow","autoplay");
								iframe.setAttribute("allow","encrypted-media");
								iframe.setAttribute("allowfullscreen","");
								divContenido.appendChild(iframe);
							break;
					case "evento":
								var div_eva=document.createElement("div");
								//div_eva.setAttribute("class","ifram");
								var a=document.createElement("a");
								a.innerHTML=_curso.modulos[f].actividades[ff].nombre_actividad;
								a.setAttribute("onclick","abrir_ventana('webinar.html?ev="+_curso.modulos[f].actividades[ff].id+"&us="+globales._usuario.id+"')");
								//a.setAttribute("href","#");
								div_eva.appendChild(a);
								divContenido.appendChild(div_eva);
							break;				
					case "evaluacion":
								console.log(_curso.modulos[f].actividades[ff].nombre_actividad);
								var div_eva=document.createElement("div");
								//div_eva.setAttribute("class","ifram");
								var a=document.createElement("a");
								a.innerHTML=_curso.modulos[f].actividades[ff].nombre_actividad;
								a.setAttribute("onclick","abrir_ventana('mi_evaluacion.html?ev="+_curso.modulos[f].actividades[ff].id+"&us="+globales._usuario.id+"')");
								//a.setAttribute("href","#");
								div_eva.appendChild(a);
								divContenido.appendChild(div_eva);

							break;
					case "audio":
							break;				
				}		
 			}
 			
 		}
 	}
 
}