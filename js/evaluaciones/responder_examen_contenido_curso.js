var preguntas_evaluacion;
/*agregarEventoLoad(iniciar_responder_examen);

function iniciar_responder_examen(){
	preguntas_evaluacion=obtener_local_storage("preguntas");
	console.log(preguntas_evaluacion);

	if(preguntas_evaluacion==false){
		consultar_examen();
	}else{
		
		dibujar_evaluacion(preguntas_evaluacion)
	}
	
	agregarEvento("","click",function(rs){

	});
}*/
function consultar_examen(valor){
	
	console.log(valor);
	consultarDatos("evaluacion_de_alumno/"+valor+"/"+globales._usuario.id,{},function(rs){
		if(rs.respuesta){
			console.log(rs.datos);
			//agregar_local_storage("preguntas",rs.datos);
			preguntas_evaluacion=rs.datos[0];
			dibujar_evaluacion(preguntas_evaluacion);

		}else{
			mostrarMensaje(rs);
		}
	});
}

function dibujar_evaluacion(datos_pre){
	 var div_pre=document.getElementById("divExamen");
	
	 var opc="abcdefgijklmnopqrstuvwxyz";
	


	 var datos=datos_pre.preguntas;
		for(var d in datos){

			console.log(datos[d]);
			var lista=document.createElement("ul");
			lista.setAttribute("id","pre_"+datos[d].id);
			
			var li=document.createElement("li");
			
			if(Number(d)>0){
				lista.style.display='none';	
			}
			
			
			var h2=document.createElement("h2");
			
			h2.innerHTML=datos[d].argumento_pregunta;
			
			li.appendChild(h2);
			lista.appendChild(li);

			

			var res=datos[d].respuestas;
			
			if(datos[d].tipo_pregunta=="cerrada"){
				for(var r in res){
					console.log(res[r]);
					var li=document.createElement("li");

					
					
					var radiobutton=document.createElement("input");
					radiobutton.setAttribute("value",res[r].id);
					radiobutton.setAttribute("name","respuestas_"+datos[d].id);
					radiobutton.setAttribute("id","res_"+res[r].id);
					radiobutton.setAttribute("type","radio");		
					radiobutton.setAttribute("onclick","seleccionar('"+datos[d].id+"','"+res[r].id+"')");	
					li.appendChild(radiobutton);

					var text_respuesta=document.createElement("h3");			
					text_respuesta.innerHTML=opc[r]+"-"+res[r].argumento_respuesta;
					text_respuesta.setAttribute("onclick","seleccionar('"+datos[d].id+"','"+res[r].id+"')");
					li.appendChild(text_respuesta);
					lista.appendChild(li);

					
				
				}
			}else if(datos[d].tipo_pregunta=="abierta"){
					var li=document.createElement("li");
					var text_respuesta=document.createElement("input");	
					text_respuesta.setAttribute("type","text");		
					text_respuesta.setAttribute("name","respuestas_"+datos[d].id);
					text_respuesta.setAttribute("id","res_"+res[0].id);
					text_respuesta.setAttribute("onchange","seleccionar('"+datos[d].id+"','"+res[0].id+"')");
					li.appendChild(text_respuesta);
					lista.appendChild(li);

			}else if(datos[d].tipo_pregunta=="cerrada_comentario"){

				for(var r in res){
					console.log(res[r]);
					var li=document.createElement("li");

					
					
					var radiobutton=document.createElement("input");
					radiobutton.setAttribute("value",res[r].id);
					radiobutton.setAttribute("name","respuestas_"+datos[d].id);
					radiobutton.setAttribute("id","res_"+res[r].id);
					radiobutton.setAttribute("type","radio");
					radiobutton.setAttribute("onclick","seleccionar('"+datos[d].id+"','"+res[r].id+"')");			
					li.appendChild(radiobutton);

					var text_respuesta=document.createElement("h3");			
					text_respuesta.innerHTML=opc[r]+"-"+res[r].argumento_respuesta;
					text_respuesta.setAttribute("onclick","seleccionar('"+datos[d].id+"','"+res[r].id+"')");
					li.appendChild(text_respuesta);
					lista.appendChild(li);

					var li=document.createElement("li");
					var text_respuesta=document.createElement("input");	
					text_respuesta.setAttribute("type","text");		
					text_respuesta.setAttribute("name","respuestas_"+datos[d].id);
					text_respuesta.setAttribute("placeholder","Tu comentario aqui");
					text_respuesta.setAttribute("id","txt_res_"+res[r].id);
					text_respuesta.setAttribute("onchange","seleccionar('"+datos[d].id+"','"+res[r].id+"')");
					li.appendChild(text_respuesta);
					lista.appendChild(li);
					
				
				}
					

					

			}else if(datos[d].tipo_pregunta=="cerrada_multiple"){



					for(var r in res){
						console.log(res[r]);
						var li=document.createElement("li");

						
						
						var radiobutton=document.createElement("input");
						radiobutton.setAttribute("value",res[r].id);
						radiobutton.setAttribute("name","respuestas_"+datos[d].id);
						radiobutton.setAttribute("id","res_"+res[r].id);
						radiobutton.setAttribute("type","checkbox");		
						radiobutton.setAttribute("onclick","seleccionar('"+datos[d].id+"','"+res[r].id+"')");	
						li.appendChild(radiobutton);

						var text_respuesta=document.createElement("h3");			
						text_respuesta.innerHTML=opc[r]+"-"+res[r].argumento_respuesta;
						text_respuesta.setAttribute("onclick","seleccionar('"+datos[d].id+"','"+res[r].id+"')");
						li.appendChild(text_respuesta);
						lista.appendChild(li);

					
				
					}
			}
			
			if(Number(d)<Object.keys(datos).length-1){
				var li=document.createElement("li");
				
				var btn_sig=document.createElement("input");
				btn_sig.setAttribute("type","button");
				btn_sig.setAttribute("value","siguiente");
				btn_sig.setAttribute("id","btn_sig_"+datos[d].id);
				
				btn_sig.setAttribute("class","uno");
				btn_sig.setAttribute("onclick","siguiente("+datos[d].id+","+false+")");
				
				li.appendChild(btn_sig);
				lista.appendChild(li);
				lista.appendChild(li);
				//div_pre.appendChild(el);
					
			}else{
				var li=document.createElement("li");
				var btn_sig=document.createElement("input");
				btn_sig.setAttribute("type","button");
				btn_sig.setAttribute("value","enviar");
				btn_sig.setAttribute("class","uno");
				btn_sig.setAttribute("id","btn_sig_"+datos[d].id);
				btn_sig.setAttribute("onclick","siguiente("+datos[d].id+","+true+","+datos_pre.id+")");			
				
				li.appendChild(btn_sig);
				//div_pre.appendChild(el);
				lista.appendChild(li);	
			}
			console.log(lista);
			div_pre.appendChild(lista);
			console.log(div_pre);

		}
}
//seleccionar respuesta de pregunta
function seleccionar(id_pregunta,id_respuesta){
	if(document.getElementById("res_"+id_respuesta).type=="radio" || document.getElementById("res_"+id_respuesta).type=="checkbox"){
		document.getElementById("res_"+id_respuesta).checked=true;
	}
	
	var datos=preguntas_evaluacion.preguntas;
	for(var e in datos){
		if(datos[e].id==id_pregunta){
			for(var ee in datos[e].respuestas){
				if(datos[e].respuestas[ee].id==id_respuesta){
					datos[e].respuestas[ee].seleccionada=true;
					if(datos[e].tipo_pregunta=="abierta" || datos[e].tipo_pregunta=="cerrada_comentario"){

						datos[e].respuestas[ee].texto_respuesta=document.getElementById("res_"+id_respuesta).value;
					}
					preguntas_evaluacion.preguntas=datos;
					agregar_local_storage("preguntas",preguntas_evaluacion);

				}else{
					datos[e].respuestas[ee].seleccionada=false;
					if(datos[e].tipo_pregunta=="abierta" || datos[e].tipo_pregunta=="cerrada_comentario"){
						
						datos[e].respuestas[ee].texto_respuesta="";
					}
				}
			}
		}
	}

}
function siguiente(id,salir,id_eva){


	console.log(preguntas_evaluacion);
	var selecciona=false;
	var pos;
	var id;
	var valor;
	var datos=preguntas_evaluacion.preguntas;
	 for(var p in datos){
	 	if(datos[p].id==id){
	 		if(salir){
	 			valor=Number(p);
	 		}else{
	 			valor=Number(p)+1;

	 		}
	 		//valido que la siguiente pregunta exista
	 		if(datos[valor].id!=undefined){
	 			for(var r in datos[p].respuestas){
	 				if(datos[p].respuestas[r].seleccionada){
	 					selecciona=true;

	 				}
	 			}

	 		}else{
	 			break;
	 		}
	 		
	 	}
	 }

	 if(selecciona){
	 	//console.log("posicion "+pos);
	 	//console.log("id "+id);
	 	document.getElementById("pre_"+id).style.display='none';
	 	//document.getElementById("btn_sig_"+id).style.display='none';
	 	
	 	if(salir){
			finalizar_concurso(id_eva);	 		
	 	}else{

	 		document.getElementById("pre_"+datos[valor].id).style.display='block';
	 		//document.getElementById("btn_sig_"+preguntas[pos].id).style.display='block';	
	 	}
	 					
	 }else{
	 	alert("Por favor selecciona una respuesta");
	 }
}
function finalizar_concurso(id_evaluacion){
	
	preguntas_evaluacion=obtener_local_storage("preguntas");
	eliminar_session_storage("preguntas");
	var d=preguntas_evaluacion.preguntas;
	registrarDato("respuestas_de_usuario",{
		preguntas:d,
		usuario:globales._usuario.id,
		evaluacion:id_evaluacion,
	},validar,"");
}
function validar(rs){
	mostrarMensaje(rs);
	console.log(rs);
}