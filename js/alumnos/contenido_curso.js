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
				_curso=rs.datos[0];
				//document.getElementById("h4NombreUsuario").innerHTML=globales._usuario.nombre_usuario;
				document.getElementById("h1TlContenidoCurso").innerHTML=rs.datos[0].nombre_curso;
				document.getElementById("pTlDescCurso").innerHTML=rs.datos[0].descripcion_curso;
				var lista=document.getElementById("liModulosCurso");
				lista.innerHTML="";
				for(var d in rs.datos[0].modulos){
					
					var li=document.createElement("li");
					var a=document.createElement("a");
					a.href="#";
					var span=document.createElement("span");
					span.innerHTML=rs.datos[0].modulos[d].nombre_modulo;
					span.setAttribute("onclick","dibujar_lista_contenido('"+rs.datos[0].modulos[d].id+"')");
					a.appendChild(span);
					li.appendChild(a);
					lista.appendChild(li);

						
				}	
				dibujar_lista_contenido(1);
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
	var thumbnail=document.getElementById("thumbnails");
	//thumbnail.innerHTML="";
	for(var f in _curso.modulos){

		//if(_curso.modulos[f].id==id_modulo){
			for(var ff in _curso.modulos[f].actividades){
				console.log(_curso.modulos[f].actividades[ff].id);
				var art=document.createElement("article");
				art.setAttribute("tabindex","-1");
				//art.setAttribute("id","art_"+ff);
				art.setAttribute("onclick","cambio_class('"+_curso.modulos[f].actividades[ff].id+"')");
				var a=document.createElement("a");
				a.className="thumbnail";
				a.setAttribute("href","vistaAlumno/images/fulls/01.jpg");
				a.setAttribute("data-position","top center");
				var img=document.createElement("img");
				img.setAttribute("src","vistaAlumno/images/thumbs/01.jpg");
				a.appendChild(img);
				art.appendChild(a);
				var diiv=document.createElement("div");
				diiv.setAttribute("class","oculta");
				diiv.setAttribute("name","contenidos");
				diiv.setAttribute("id","ifr_"+_curso.modulos[f].actividades[ff].id);
				
				//iframe.setAttribute("style","display:none");
				console.log(_curso.modulos[f].actividades[ff].tipo_actividad);
				switch(_curso.modulos[f].actividades[ff].tipo_actividad){
					case "documento":
								var iframe=document.createElement("iframe");
								iframe.setAttribute("class","ifram");
								iframe.setAttribute("src",globales._URL+"recursos/cursos/"+_curso.id+"/"+_curso.modulos[f].actividades[ff].actividad_recurso);
								diiv.appendChild(iframe);
							break;
					case "video":
								var iframe=document.createElement("iframe");
								iframe.setAttribute("class","ifram");
								iframe.setAttribute("src","https://www.youtube.com/embed/"+_curso.modulos[f].actividades[ff].actividad_recurso);
								iframe.setAttribute("frameborder","0");
								//iframe.setAttribute("allow","autoplay");
								iframe.setAttribute("allow","encrypted-media");
								iframe.setAttribute("allowfullscreen","");
								diiv.appendChild(iframe);
							break;
					case "evento":
								var div_eva=document.createElement("div");
								div_eva.setAttribute("class","ifram");
								var a=document.createElement("a");
								a.innerHTML=_curso.modulos[f].actividades[ff].nombre_actividad;
								a.setAttribute("onclick","abrir_ventana('webinar.html?ev="+_curso.modulos[f].actividades[ff].id+"&us="+globales._usuario.id+"')");
								//a.setAttribute("href","#");
								div_eva.appendChild(a);
								diiv.appendChild(div_eva);
							break;				
					case "evaluacion":
								var div_eva=document.createElement("div");
								div_eva.setAttribute("class","ifram");
								var a=document.createElement("a");
								a.innerHTML=_curso.modulos[f].actividades[ff].nombre_actividad;
								a.setAttribute("onclick","abrir_ventana('mi_evaluacion.html?ev="+_curso.modulos[f].actividades[ff].id+"&us="+globales._usuario.id+"')");
								//a.setAttribute("href","#");
								div_eva.appendChild(a);
								diiv.appendChild(div_eva);

							break;
					case "audio":
							break;				
				}



				
				art.appendChild(diiv);
				var h2=document.createElement("h2");
				h2.innerHTML=_curso.modulos[f].nombre_modulo
				art.appendChild(h2);
				var p=document.createElement("p");			
				p.innerHTML=_curso.modulos[f].actividades[ff].nombre_actividad;
				art.appendChild(p);
				thumbnail.appendChild(art);
			}
			
		}
	//}
}

function cambio_class_old(id){
	//main.switchTo();
	console.log("ifr_"+id);
	console.log(document.getElementById("ifr_"+id));
	var ifr=document.getElementById("ifr_"+id);
	
	if(ifr!=null){
		ifr.classList.remove("oculta");
		ifr.classList.add("muestra");
		main.init();
		var clas1=document.getElementsByClassName("muestra");
		if(clas1.length>0){
			for(var o in clas1){
				console.log(clas1[o].classList);
				if(clas1[o].classList!=undefined){
					//clas1[o].classList.add("oculta");
					//clas1[o].classList.remove("muestra");
					clas1[o].classList.add("muestra");
					clas1[o].classList.remove("oculta");
					//clas[o].classList.add("oculta");	
				}
				
			}	
		}
	}
	
	

	//var clas=document.getElementsByClassName("active");
	//for(var o in clas){
		//clas[o].classList.add("muestra");
		//clas[o].classList.add("oculta");
	//}
	
	
}
function cambio_class(id){
	//main.switchTo();
	console.log("ifr_"+id);
	console.log(document.getElementById("ifr_"+id));
	var contenidos=document.getElementsByName("contenidos");
	//console.log(contenidos);
	for(var c in contenidos){
		var clas1=document.getElementsByClassName("muestra");
		if(clas1.length>0){
			for(var o in clas1){
				console.log(clas1[o].classList);
				if(clas1[o].classList!=undefined){
					clas1[o].classList.add("oculta");
					clas1[o].classList.remove("muestra");
					
					
				}
				
			}	
		}

			//contenidos[c].classList.remove("oculta");
			//contenidos[c].classList.add("muestra");
			
		console.log(contenidos[c]);
		console.log(contenidos[c].id);
		//if(contenidos[c].id=="ifr_"+id){
			
		//}

		
	}
		main.init();	
		
		
}