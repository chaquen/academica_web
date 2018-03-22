 preguntas={
	argumento_pregunta:"",
	tipo_pregunta:"abierta",
	respuestas:[],
};
agregarEventoLoad(iniciar_evaluacion);
function iniciar_evaluacion(){
	consultar_todas_las_preguntas();
	agregarEvento("selTipoPregunta","change",function(){
		switch(this.value){
			case "abierta":
				document.getElementById("numPreguntas").value=0;
				break;
			default:
				document.getElementById("numPreguntas").value=2;
				break;	
		}
	});
	agregarEvento("btnAgregarPreguntas","click",function(){
		
		if(document.getElementById("txtArgumentoPre").value!=""){
			switch(document.getElementById("selTipoPregunta").value){
				case "abierta":
				 	   preguntas.tipo_pregunta="abierta";
				 	   preguntas.argumento_pregunta=document.getElementById("txtArgumentoPre").value;
				 	   mostrarMensaje("No es necesario agregar respuestas, puedes crear la pregunta directamnete");	
					   return false;	
					break;
				case "cerrada":
						preguntas.tipo_pregunta="cerrada";
					break;
				case "cerrada_multiple":
						preguntas.tipo_pregunta="cerrada_multiple";
					break;
				case "cerrada_comentario":
						preguntas.tipo_pregunta="cerrada_comentario";
					break;
				default:
						preguntas.tipo_pregunta="";
						mostrarMensaje("Selecciona un tipo de pregunta");	
						return false;	
					break;				
			}

			if(document.getElementById("numPreguntas").value!="" && document.getElementById("numPreguntas").value >= 2){
				var listaRespuestas=document.getElementById("listaRespuestas");
				
				for(var i =0;i < document.getElementById("numPreguntas").value;i++){
					var li=document.createElement("li");
					var inp=document.createElement("input");	
					inp.setAttribute("type","text");
					inp.setAttribute("name","mis_respuestas");
					li.appendChild(inp);
					listaRespuestas.appendChild(li);
					var inp2=document.createElement("input");	
					inp2.setAttribute("type","checkbox");
					inp2.setAttribute("name","es_correcta");
					inp2.setAttribute("id","es_correcta_"+i);
					li.appendChild(inp2);
					var h6=document.createElement("h6");
					h6.innerHTML="es correcta";
					li.appendChild(h6);
					listaRespuestas.appendChild(li);
				}


			}else{
				mostrarMensaje("Debes ingresar el numero de respuestas");	
					return false;	
			}


		}else{
			mostrarMensaje("Ingresa un argumento para la pregunta");
		}	
	});

	agregarEvento("btnCrearPregunta","click",function(){
		if(document.getElementById("txtArgumentoPre").value!=""){
			preguntas.argumento_pregunta=document.getElementById("txtArgumentoPre").value;	
			if(preguntas.tipo_pregunta!="abierta"){
				
				var mis_respuestas=document.getElementsByName("mis_respuestas");
				var correctas=document.getElementsByName("es_correcta");
				
				console.log(mis_respuestas);
				var e=0;
				for(mr in mis_respuestas){
					var correcta=false;
					if(mis_respuestas[mr].value!=undefined){
						if(correctas[mr].value!=undefined && correctas[mr].checked){
							correcta=true;
						}else{
							correcta=false;
						}
						preguntas.respuestas[e]={
									respuesta:mis_respuestas[mr].value,
									es_correcta:correcta,
						};
						e++;
						//console.log(mis_respuestas[mr].value);
					}
					
				}	
			}
			registrarDato("preguntas",preguntas,function(rs){
				console.log(rs);
				mostrarMensaje(rs);
				if(rs.respuesta){
					document.getElementById("txtArgumentoPre").value="";
					document.getElementById("numPreguntas").value="0";
				}
			},"formCrearPregunta");
		}else{
			mostrarMensaje("Ingresa un argumento para la pregunta");
		}
		
	});
	agregarEvento("btnAgregarPreguntas1","click",function(){
		
		if(document.getElementById("txtArgumentoPre1").value!=""){
			switch(document.getElementById("selTipoPregunta1").value){
				case "abierta":
				 	   preguntas.tipo_pregunta="abierta";
				 	   preguntas.argumento_pregunta=document.getElementById("txtArgumentoPre").value;
				 	   mostrarMensaje("No es necesario agregar respuestas, puedes crear la pregunta directamnete");	
					   return false;	
					break;
				case "cerrada":
						preguntas.tipo_pregunta="cerrada";
					break;
				case "cerrada_multiple":
						preguntas.tipo_pregunta="cerrada_multiple";
					break;
				case "cerrada_comentario":
						preguntas.tipo_pregunta="cerrada_comentario";
					break;
				default:
						preguntas.tipo_pregunta="";
						mostrarMensaje("Selecciona un tipo de pregunta");	
						return false;	
					break;				
			}

			if(document.getElementById("numPreguntas1").value!="" && document.getElementById("numPreguntas1").value >= 2){
				var listaRespuestas=document.getElementById("listaRespuestas1");
				
				for(var i =0;i < document.getElementById("numPreguntas1").value;i++){
					var li=document.createElement("li");
					var inp=document.createElement("input");	
					inp.setAttribute("type","text");
					inp.setAttribute("name","mis_respuestas_1");
					li.appendChild(inp);
					listaRespuestas.appendChild(li);
					var inp2=document.createElement("input");	
					inp2.setAttribute("type","checkbox");
					inp2.setAttribute("name","es_correcta_1");
					inp2.setAttribute("id","es_correcta_"+i);
					li.appendChild(inp2);
					var h6=document.createElement("h6");
					h6.innerHTML="es correcta";
					li.appendChild(h6);
					listaRespuestas.appendChild(li);
				}


			}else{
				mostrarMensaje("Debes ingresar el numero de respuestas");	
					return false;	
			}


		}else{
			mostrarMensaje("Ingresa un argumento para la pregunta");
		}	
	});

	agregarEvento("btnCrearPregunta1","click",function(){
		if(document.getElementById("txtArgumentoPre1").value!=""){
			preguntas.argumento_pregunta=document.getElementById("txtArgumentoPre1").value;	
			if(preguntas.tipo_pregunta!="abierta"){
				
				var mis_respuestas=document.getElementsByName("mis_respuestas_1");
				var correctas=document.getElementsByName("es_correcta_1");
				
				console.log(mis_respuestas);
				var e=0;
				for(mr in mis_respuestas){
					var correcta=false;
					if(mis_respuestas[mr].value!=undefined){
						if(correctas[mr].value!=undefined && correctas[mr].checked){
							correcta=true;
						}else{
							correcta=false;
						}
						preguntas.respuestas[e]={
									respuesta:mis_respuestas[mr].value,
									es_correcta:correcta,
						};
						e++;
						//console.log(mis_respuestas[mr].value);
					}
					
				}	
			}
			registrarDato("preguntas",preguntas,function(rs){
				console.log(rs);
				mostrarMensaje(rs);
				agregar_a_evaluacion(rs.id);
			});
		}else{
			mostrarMensaje("Ingresa un argumento para la pregunta");
		}
		
	});
	agregarEvento("btnCrearEvaluacion","click",function(){
		console.log(lista_preguntas);
		if(lista_preguntas.length==0){
			mostrarMensaje("Debe agregar preguntas a la evaluacion");
			return false;
		}
		if(document.getElementById("txtNombreEvaluacion").value==""){
			
			mostrarMensaje("Por favor ingresa un nombre para la evaluacion");
			return false;
		}
		if(document.getElementById("selBuscarCursoEva").value=="0"){
			
			mostrarMensaje("Por favor selecciona un curso");
			return false;
		}
		/*if(document.getElementById("selActividadModuloEva").value=="0"){
			
			mostrarMensaje("Por favor selecciona una actividad ");
			return false;
		}*/
		if(document.getElementById("dtFechaInicioEva").value==""){
			
			mostrarMensaje("Por favor ingresa una fecha de inicio del curso");
			return false;
		}
		if(document.getElementById("dthHoraInicioEva").value==""){
			
			mostrarMensaje("Por favor ingresa una hora de inicio");
			return false;
		}
		if(document.getElementById("dtFechaFinEva").value==""){
			
			mostrarMensaje("Por favor ingresa una fecha de finalizacion");
			return false;
		}
		if(document.getElementById("dtHoraFinEva").value==""){
			
			mostrarMensaje("Por favor ingresa una hora de finalizacion");
			return false;
		}

		var evaluacion={
			
			fk_id_curso:document.getElementById("selBuscarCursoEva").value,
			tipo_evaluacion:"examen",
			fk_id_modulo_curso:document.getElementById("selModuloCursoEva").value,
			nombre_evaluacion:document.getElementById("txtNombreEvaluacion").value,
			fk_id_actividad:document.getElementById("selActividadModuloEva").value,//esta valor sale del modulo y de la actividad
			fecha_evaluacion_inicio:document.getElementById("dtFechaInicioEva").value+" "+document.getElementById("dthHoraInicioEva").value,
			fecha_evaluacion_fin:document.getElementById("dtFechaFinEva").value+" "+document.getElementById("dtHoraFinEva").value,
			preguntas:lista_preguntas
		};
		registrarDato("evaluacion",evaluacion,function(rs){
			console.log(rs);
			mostrarMensaje(rs);
		});
	});

	agregarEvento("selTipoEdiPregunta","change",function(){
		consultar_preguntas(this.value);
	});
	agregarEvento("btnMostrar","click",function(){
		$("#liCrearPreguntas").show();
	});
	agregarEvento("btnOcultar","click",function(){
		$("#liCrearPreguntas").hide();
	});
	agregarEvento("btnMostrarBanco","click",function(){
		$("#liAbiertas").show();
		$("#liCerradas").show();
		$("#liCerradaComentario").show();
		$("#liCerradaMultiple").show();
	});
	agregarEvento("btnOcultarBanco","click",function(){
		$("#liAbiertas").hide();
		$("#liCerradas").hide();
		$("#liCerradaComentario").hide();
		$("#liCerradaMultiple").hide();
	});
	agregarEvento("selBuscarCursoEva","change",function(e){
		if(this.value!="0" ){
			consultarDatos("cursos/id&=&"+this.value,{},function(rs){
				console.log(rs);
				if(rs.respuesta){
					mostrar_modulos(rs.datos[0].modulos);
				}
			});
		}
	});

	agregarEvento("selModuloCursoEva","change",function(){
		if(this.value!="0"){
			consultarDatos("evaluaciones/actividades.fk_id_modulo_curso/"+this.value+"/actividades.tipo_actividad/evaluacion",{},function(rs){
				crear_select("selActividadModuloEva",rs.datos,"id","nombre_actividad");
			});
		}
	});
	agregarEvento("dtFechaInicioEva","change",function(){
		var f1=new Date(horaCliente().split(" ")[0]);
		var f2=new Date(this.value);
		if(f2<f1){
			mostrarMensaje("La fecha debe ser mayor a hoy");
			this.value="";
		}
	});
	agregarEvento("dtFechaFinEva","change",function(){
		var f1=new Date(horaCliente().split(" ")[0]);
		var f2=new Date(this.value);
		var f3=new Date(document.getElementById("dtFechaInicioEva").value);
		if(f2<f1 && f2<f3){

			mostrarMensaje("La fecha debe ser despues de hoy y despues de la fecha de inicio ");
			this.value="";
		}
	});
	agregarEvento("","change",function(){});
}
var lista_preguntas=[];
function agregar_a_evaluacion(id){
	consultarDatos("preguntas/"+id,{},function(rs){
			console.log(rs);	
			if(rs.respuesta){
				dibujar_preguntas_evaluacion(rs.datos);
				lista_preguntas.push(rs.datos);	
			}else{
				var div=document.getElementById("divListaPreguntas1");
				div.innerHTML="";
			}
			
		});
}
function dibujar_preguntas_evaluacion(datos){
	var div=document.getElementById("divListaPreguntas1");
	
	div.innerHTML="";
	var p=1;
	for(var d in datos){
		var lista=document.createElement("ul");
		lista.setAttribute("id","li_"+datos[d].id);

		var li=document.createElement("li");
		var h4=document.createElement("h4");
		h4.innerHTML="Argumento";
		li.appendChild(h4);
		lista.appendChild(li);
		
		var li=document.createElement("li");
		var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","arg_"+datos[d].id);
		//inp.setAttribute("onchange","editar_argumento_pregunta('"+datos[d].id+"');");
		inp.value=datos[d].argumento_pregunta;
		li.appendChild(inp);
		lista.appendChild(li);

		var li=document.createElement("li");
			
		lista.appendChild(li);

		var li=document.createElement("li");
		var h4=document.createElement("h4");
		h4.innerHTML="Respuestas";
		li.appendChild(h4);
		lista.appendChild(li);
		if(datos[d].tipo_pregunta!="abierta"){
				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","button");
				inp.setAttribute("id","arg_"+datos[d].id);
				//inp.setAttribute("onclick","agregar_respuesta('"+datos[d].id+"');");
				inp.value="Agregar respuesta";
				li.appendChild(inp);
				lista.appendChild(li);

			for(var r in datos[d].respuestas){
				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","text");
				inp.setAttribute("value",datos[d].respuestas[r].id);		
				inp.setAttribute("id","arg_res_"+datos[d].respuestas[r].id);
				//inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
				inp.value=datos[d].respuestas[r].argumento_respuesta
				li.appendChild(inp);

				var inp=document.createElement("input");
				inp.setAttribute("type","checkbox");
				inp.setAttribute("value",datos[d].respuestas[r].id);		
				inp.setAttribute("id","arg_res_cor_"+datos[d].respuestas[r].id);
				if(datos[d].respuestas[r].es_correcta==="1"){
					inp.setAttribute("checked",true);
				}
				//inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
				inp.value=" - "+datos[d].respuestas[r].argumento_respuesta
				li.appendChild(inp);		
				lista.appendChild(li);

				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","button");
				inp.setAttribute("id","arg_"+datos[d].id);
				//inp.setAttribute("onclick","quitar_respuesta('"+datos[d].respuestas[r].id+"');");
				inp.value="Quitar";
				li.appendChild(inp);
				lista.appendChild(li);


			}
			

			
			p++;
		}
		console.log(lista);
		div.appendChild(lista);
		console.log(div);
			
	}


}
function consultar_preguntas(tipo){
	consultarDatos("preguntas_tipo/"+tipo,{},function(rs){
			console.log(rs);	
			if(rs.respuesta){
				dibujar_preguntas_por_tipo(rs.datos)	
			}
			
		});
}

function dibujar_preguntas_por_tipo(datos){
	var div=document.getElementById("divListaPreguntas");
	div.innerHTML="";
	var p=1;
	for(var d in datos){
		var lista=document.createElement("ul");
		lista.setAttribute("id","li_"+datos[d].id);

		var li=document.createElement("li");
		var h4=document.createElement("h4");
		h4.innerHTML="Argumento";
		li.appendChild(h4);
		lista.appendChild(li);
		
		var li=document.createElement("li");
		var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","arg_edi"+datos[d].id);
		inp.setAttribute("onchange","editar_argumento_pregunta('"+datos[d].id+"');");
		inp.value=datos[d].argumento_pregunta;
		li.appendChild(inp);
		lista.appendChild(li);

		var li=document.createElement("li");
		var sel=document.createElement("select");
		sel.setAttribute("id","sel_tipo_"+datos[d].id);
		sel.setAttribute("onchange","editar_tipo_pregunta('"+datos[d].id+"');");
		
		var op=document.createElement("option");
		op.setAttribute("value","abierta");
		op.innerHTML="abierta";
		if(datos[d].tipo_pregunta=="abierta"){
			op.setAttribute("selected",true);
		}
		sel.appendChild(op);
		
		var op=document.createElement("option");
		op.setAttribute("value","cerrada");
		op.innerHTML="cerrada";
		if(datos[d].tipo_pregunta=="cerrada"){
			op.setAttribute("selected",true);
		}
		sel.appendChild(op);
		
		var op=document.createElement("option");
		op.setAttribute("value","cerrada_multiple");
		op.innerHTML="cerrada_multiple";
		if(datos[d].tipo_pregunta=="cerrada_multiple"){
			op.setAttribute("selected",true);
		}
		sel.appendChild(op);

		var op=document.createElement("option");
		op.setAttribute("value","cerrada_comentario");
		op.innerHTML="cerrada_comentario";
		if(datos[d].tipo_pregunta=="cerrada_comentario"){
			op.setAttribute("selected",true);
		}
		sel.appendChild(op);

		li.appendChild(sel);		
		lista.appendChild(li);

		var li=document.createElement("li");
		var h4=document.createElement("h4");
		h4.innerHTML="Respuestas";
		li.appendChild(h4);
		lista.appendChild(li);
		if(datos[d].tipo_pregunta!="abierta"){
				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","button");
				inp.setAttribute("id","arg_"+datos[d].id);
				inp.setAttribute("onclick","agregar_respuesta('"+datos[d].id+"');");
				inp.value="Agregar respuesta";
				li.appendChild(inp);
				lista.appendChild(li);

			for(var r in datos[d].respuestas){
				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","text");
				inp.setAttribute("value",datos[d].respuestas[r].id);		
				inp.setAttribute("id","arg_res_"+datos[d].respuestas[r].id);
				inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
				inp.value=datos[d].respuestas[r].argumento_respuesta
				li.appendChild(inp);

				var inp=document.createElement("input");
				inp.setAttribute("type","checkbox");
				inp.setAttribute("value",datos[d].respuestas[r].id);		
				inp.setAttribute("id","arg_res_cor_"+datos[d].respuestas[r].id);
				if(datos[d].respuestas[r].es_correcta==="1"){
					inp.setAttribute("checked",true);
				}
				inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
				inp.value=" - "+datos[d].respuestas[r].argumento_respuesta
				li.appendChild(inp);		
				lista.appendChild(li);

				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","button");
				inp.setAttribute("id","arg_"+datos[d].id);
				inp.setAttribute("onclick","quitar_respuesta('"+datos[d].respuestas[r].id+"');");
				inp.value="Quitar";
				li.appendChild(inp);
				lista.appendChild(li);


			}
			

			
			p++;
		}
		div.appendChild(lista);
			
	}
}

function editar_argumento_pregunta(id){
	if(confirm("¿Desea editar esta pregunta?")){
		var v=document.getElementById("arg_edi"+id);
		var s=document.getElementById("sel_tipo_"+id);
		if(s.value=="abierta"){
			//eliminar respueastas
		}
		editarDato("preguntas/"+id,{
		argumento_pregunta:v.value,
		tipo_pregunta:s.value
		},function(rs){
		console.log(rs);
		consultar_preguntas(document.getElementById("selTipoEdiPregunta").value);
		});	
	}
	
}
function editar_tipo_pregunta(id){
	if(confirm("¿Desea editar esta pregunta?")){
		var v=document.getElementById("arg_"+id);
		var s=document.getElementById("sel_tipo_"+id);
		if(s.value=="abierta"){
			//eliminar respueastas
		}
		editarDato("preguntas/"+id,{
		argumento_pregunta:v.value,
		tipo_pregunta:s.value
		},function(rs){
		console.log(rs);
		consultar_preguntas(document.getElementById("selTipoEdiPregunta").value);
		});	
	}
	
}
function editar_argumento_respuesta(id,id_p){
	if(confirm("¿Desea editar esta respuesta?")){
		var v=document.getElementById("arg_res_"+id);
		var c=document.getElementById("arg_res_cor_"+id);
		editarDato("respuestas/"+id,{
			argumento_respuesta:v.value,
			es_correcta:c.checked,
			fk_id_pregunta:id_p
		},function(rs){
			console.log(rs);
			consultar_preguntas(document.getElementById("selTipoEdiPregunta").value);
		});
	}	
}
var nueva_res=0;
function agregar_respuesta(id){

			var lista=document.getElementById("li_"+id);

			var li=document.createElement("li");
			var inp=document.createElement("input");
			inp.setAttribute("type","text");
			
			inp.setAttribute("id","arg_res_nueva_"+id+"_"+nueva_res);
			//inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
			//inp.value=datos[d].respuestas[r].argumento_respuesta
			li.appendChild(inp);

			var inp=document.createElement("input");
			inp.setAttribute("type","checkbox");
			//inp.setAttribute("value",datos[d].respuestas[r].id);		
			inp.setAttribute("id","arg_res_cor_nueva_"+id+"_"+nueva_res);
			//if(datos[d].respuestas[r].es_correcta==="1"){
				//inp.setAttribute("checked",true);
			//}
			//inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
			//inp.value=" - "+datos[d].respuestas[r].argumento_respuesta
			li.appendChild(inp);		
			lista.appendChild(li);

			var li=document.createElement("li");
			var inp=document.createElement("input");
			inp.setAttribute("type","button");
			//inp.setAttribute("id","arg_"+datos[d].id);
			inp.setAttribute("onclick","crear_respuesta('"+id+"','"+nueva_res+"');");
			inp.value="Crear respuesta";
			li.appendChild(inp);
			lista.appendChild(li);
			nueva_res++;

}
function quitar_respuesta(id){
	eliminarDato("respuestas/"+id,{},function(rs){
		mostrarMensaje(rs);
		consultar_preguntas(document.getElementById("selTipoEdiPregunta").value);
	});

}

function crear_respuesta(id,posicion){
	
	var v=document.getElementById("arg_res_nueva_"+id+"_"+posicion);
	var c=document.getElementById("arg_res_cor_nueva_"+id+"_"+posicion);
	if(v.value!=""){
		registrarDato("respuestas",{
			argumento_respuesta:v.value,
			es_correcta:c.checked,
			fk_id_pregunta:id
		},function(rs){
			console.log(rs);
			mostrarMensaje(rs);
			consultar_preguntas(document.getElementById("selTipoEdiPregunta").value);
		});
	}else{
		mostrarMensaje("Por favor ingresa un argumento para la respuesta");
	}
	
}

//EVALUACIONES
function consultar_todas_las_preguntas(){
	consultarDatos("preguntas",{},function(rs){
		dibujar_preguntas_todas(rs.datos);
	});
}
function dibujar_preguntas_todas(datos){
	var liAbiertas=document.getElementById("liAbiertas");
	var liCerradas=document.getElementById("liCerradas");
	var liCerradaComentario=document.getElementById("liCerradaComentario");
	var liCerradaMultiple=document.getElementById("liCerradaMultiple");
	
	var p=1;
	for(var d in datos){
		var lista=document.createElement("ul");
		lista.setAttribute("id","li_"+datos[d].id);

		var li=document.createElement("li");
		var h4=document.createElement("h4");
		h4.innerHTML="Argumento";
		li.appendChild(h4);
		lista.appendChild(li);
		
		var li=document.createElement("li");
		var inp=document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","arg_"+datos[d].id);
		//inp.setAttribute("onchange","editar_argumento_pregunta('"+datos[d].id+"');");
		inp.value=datos[d].argumento_pregunta;
		li.appendChild(inp);
		lista.appendChild(li);

		

		if(datos[d].tipo_pregunta!="abierta"){
			var li=document.createElement("li");
			var h4=document.createElement("h4");
			h4.innerHTML="Respuestas";
			li.appendChild(h4);
			lista.appendChild(li);
		
					/*var li=document.createElement("li");
					var inp=document.createElement("input");
					inp.setAttribute("type","button");
					inp.setAttribute("id","arg_"+datos[d].id);
					//inp.setAttribute("onclick","agregar_respuesta('"+datos[d].id+"');");
					inp.value="Agregar respuesta";
					li.appendChild(inp);
					lista.appendChild(li);*/

				for(var r in datos[d].respuestas){
					var li=document.createElement("li");
					var inp=document.createElement("input");
					inp.setAttribute("type","text");
					inp.setAttribute("value",datos[d].respuestas[r].id);		
					inp.setAttribute("id","arg_res_"+datos[d].respuestas[r].id);
					//inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
					inp.value=datos[d].respuestas[r].argumento_respuesta
					li.appendChild(inp);

					var inp=document.createElement("input");
					inp.setAttribute("type","checkbox");
					inp.setAttribute("value",datos[d].respuestas[r].id);		
					inp.setAttribute("id","arg_res_cor_"+datos[d].respuestas[r].id);
					if(datos[d].respuestas[r].es_correcta==="1"){
						inp.setAttribute("checked",true);
					}
					//inp.setAttribute("onchange","editar_argumento_respuesta('"+datos[d].respuestas[r].id+"','"+datos[d].id+"');");			
					inp.value=" - "+datos[d].respuestas[r].argumento_respuesta
					li.appendChild(inp);		
					lista.appendChild(li);

					

					p++;
				}
				var li=document.createElement("li");
					var inp=document.createElement("input");
					inp.setAttribute("type","button");
					inp.setAttribute("id","btn_agre_"+datos[d].id);
					inp.setAttribute("onclick","agregar_a_evaluacion('"+datos[d].id+"');");
					inp.value="Agregar a la evaluacion";
					li.appendChild(inp);
					lista.appendChild(li);
		}else{
			var li=document.createElement("li");
					var inp=document.createElement("input");
					inp.setAttribute("type","button");
					inp.setAttribute("id","btn_agre_"+datos[d].id);
					inp.setAttribute("onclick","agregar_a_evaluacion('"+datos[d].id+"');");
					inp.value="Agregar a la evaluacion";
					li.appendChild(inp);
					lista.appendChild(li);
		}

		switch(datos[d].tipo_pregunta){
			case "abierta":
				liAbiertas.appendChild(lista);
				break;
			case "cerrada":
				liCerradas.appendChild(lista);
				break;
			case "cerrada_multiple":
				liCerradaComentario.appendChild(lista);
				break;
			case "cerrada_comentario":
				liCerradaMultiple.appendChild(lista);
				break;		
		}
			
	}
}


function mostrar_modulos(datos){
	crear_select("selModuloCursoEva",datos,"id","nombre_modulo")
}

