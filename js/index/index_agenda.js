var agenda_modulo;
function iniciar_agenda(){
	//CREAR AGENDA
	agregarEvento("btnCrearEventoAgenda","click",function(){
		var datos = $("#formAgenda").serializarFormulario();
		if(datos!=false){
			
				registrarDato("agenda",datos,function(rs){
						mostrarMensaje(rs);
				},"formAgenda");
				

		
			
		}else{
			mostrarMensaje("Por favor ingresa todos los campos");
		}
	});
	//CURSOS ACTIVOS
	agregarEvento("selAgendaCurso","change",function(){
		if(this.value!="0"){
			consultarDatos("modulo_curso/"+this.value,{},function(rs){
				if(rs.respuesta){

					crear_select("selAgendaModulos",rs.datos,"id","nombre_modulo");
				}
			});
		}
	});

	agregarEvento("selAgendaModulos","click",function(){
		console.log(this.value);
		if(this.value!="0"){
				var val="fk_id_modulo_curso&=&"+this.value;
				consultarDatos("agenda/"+val,{},function(rs){
					console.log(rs);
					if(rs.respuesta){
						agenda_modulo=rs.datos;
					}
				});
		}
		
	});
	

	agregarEvento("dtFechaEventoIni","click",function(){

	});



	agregarEvento("tmHoraEventoIni","change",function(){
		console.log(this.value);	
		var hoy=new Date();
		hoyaaaa=hoy.getFullYear();
		hoymm=hoy.getMonth();
		hoydd=hoy.getDate();
		hoyhh=hoy.getHours();
		hoymin=hoy.getMinutes();
		hoyss=hoy.getSeconds();


		/*var f=agenda_modulo.activo_desde.split(" ")[0];
		var aaaa=f.split("/")[0];
		var mm=f.split("/")[1];
		var dd=f.split("/")[2];

		var h=agenda_modulo.activo_desde.split(" ")[1];
		var hh=h.split(":")[0];
		var mm=h.split(":")[1];	
		var ss=h.split(":")[2];

		var fecha1=new Date(Number(aaaa),Number(mm),Number(dd),Number(hh),Number(mm),Number(ss));*/

		
		var f2=document.getElementById("dtFechaEventoIni").value;
		console.log(f2);
		var aaaa2=f2.split("-")[0];
		var mm2=f2.split("-")[1];
		var dd2=f2.split("-")[2];
		console.log(aaaa2);
		console.log(mm2);
		console.log(dd2);

		var h2=this.value.split(":");
		console.log(h2);
		var hh2=h2[0];
		var min2=h2[1];	
		var ss2="00";
		var fecha2=new Date(Number(aaaa2),Number(mm2)-1,Number(dd2),Number(hh2),Number(min2),Number(ss2));
		console.log(fecha2);
		console.log("fecha seleccionada");
		console.log(fecha2.getFullYear());	
		console.log(fecha2.getMonth());	
		console.log(fecha2.getDate());	
		console.log(fecha2.getHours());	
		console.log(fecha2.getMinutes());	
		console.log(fecha2.getSeconds());	
		//
		console.log("hoy");
		console.log(hoy);
		console.log(hoyaaaa);
		console.log(hoymm);
		console.log(hoydd);
		console.log(hoyhh);
		console.log(hoymin);
		console.log(hoyss);
			//validar que la fecha sea mayor a la de hoy
			/*if(fecha2.getFullYear()  >= hoyaaaa &&
					 fecha2.getMonth() >= hoymm &&
					  fecha2.getDate() >= hoydd && 
					  fecha2.getHours() > hoyhh  ){*/
			if(fecha2 > hoy ){		  	
					// validar que no exista una actividad con un modulo con esta fecha
 
				    for(var f in agenda_modulo){
				    	if(agenda_modulo[f].tipo_actividad=="evento" || agenda_modulo[f].tipo_actividad=="evaluacion"){
				    		console.log(agenda_modulo[f]);	
				    		var aaaa3=agenda_modulo[f].activo_desde.split(" ")[0].split("-")[0];
				    		var mm3=agenda_modulo[f].activo_desde.split(" ")[0].split("-")[1];
				    		var dd3=agenda_modulo[f].activo_desde.split(" ")[0].split("-")[2];
				    		var hh3=agenda_modulo[f].activo_desde.split(" ")[1].split(":")[0];
				    		var min3=agenda_modulo[f].activo_desde.split(" ")[1].split(":")[1];
				    		var ss3=agenda_modulo[f].activo_desde.split(" ")[1].split(":")[2];
				    		
				    		var fecha_evento=new Date(Number(aaaa3),
				    									Number(mm3),
				    									Number(dd3),
				    									Number(hh3),
				    									Number(dd3),
				    									Number(ss3));
				    		console.log(fecha_evento < fecha2);
				    		if(fecha_evento < fecha2 ){
				    		  
				    		}else{
				    			return false;
				    			mostrarMensaje("Ya existe un evento para esta afecha");
				    		}
				    	}
				    	
				    }



			}else{
				mostrarMensaje("Por favor selecciona posterior a HOY");
			}
	});

	agregarEvento("tmHoraEventoFin","click",function(){
		
	});

	agregarEvento("btnBuscarAgenda","click",function(){
		var datos = $("#formConsultarAgenda").serializarFormulario();
		if(datos!=false){
			
				consultarDatos("agenda/"+datos.id_curso,datos,function(rs){
						mostrarMensaje(rs);
						if(rs.respuesta){
							$('#consultaAgenda').fadeOut('fast');
        					$('#respuestaAgenda').fadeIn('slow');
							dibujar_tabla_agendas(rs.datos);
						}
				},"formAgenda");
				

		
			
		}else{
			mostrarMensaje("Por favor ingresa todos los campos");
		}
	});
	agregarEvento("selTipoEventoAgenda","change",function(){
		if(this.value=="evento"){
			document.getElementById("txt_url_agenda").style.display='';
		}else{
			document.getElementById("txt_url_agenda").style.display='none';
		}
	});
	agregarEvento("selTipoEventoAgendaEdi","change",function(){
		if(this.value=="evento"){
			document.getElementById("txt_url_agenda_edi").style.display='';
		}else{
			document.getElementById("txt_url_agenda_edi").style.display='none';
		}
	});
	agregarEvento("selAgendaCursoEdi","change",function(){
		if(this.value!="0"){
			consultarDatos("modulo_curso/"+this.value,{},function(rs){
				if(rs.respuesta){

					crear_select("selAgendaModulos",rs.datos,"id","nombre_modulo");
				}
			});
		}
	});

	agregarEvento("btnEditarEventoAgenda","click",function(){
		
		var datos = $("#formEditarAgenda").serializarFormulario();
		if(datos!=false){
				console.log(datos);
				editarDato("agenda/"+datos.id_actividad,datos,function(rs){
						mostrarMensaje(rs);
				},"formEditarAgenda");
				

		
			
		}else{
			mostrarMensaje("Por favor ingresa todos los campos");
		}
	});
}

function dibujar_tabla_agendas(datos){

	 var tbl=document.getElementById("tblTablaAgenda");
	 tbl.innerHTML="";
	 for(var f in datos){
	 	 console.log(datos[f]);
	 	 var tr=document.createElement("tr");
	 	 
	 	 var td=document.createElement("td");
	 	 td.innerHTML=datos[f].nombre_modulo;
	 	 tr.appendChild(td);

	 	 var td=document.createElement("td");
	 	 td.innerHTML=datos[f].nombre_actividad;
	 	 tr.appendChild(td);

	 	 var td=document.createElement("td");
	 	 td.innerHTML=datos[f].activo_desde;
	 	 tr.appendChild(td);

	 	 var td=document.createElement("td");
	 	 td.innerHTML=datos[f].activo_hasta;
	 	 tr.appendChild(td);

	 	 var td=document.createElement("td");
	 	 var inp=document.createElement("input");
	 	 inp.setAttribute("type","button");
	 	 inp.setAttribute("value","EDITAR");
	 	 inp.setAttribute("onclick","editar_agenda("+datos[f].id+")");
	 	 td.appendChild(inp);
	 	 tr.appendChild(td);

	 	  var td=document.createElement("td");
	 	 var inp=document.createElement("input");
	 	 inp.setAttribute("type","button");
	 	 inp.setAttribute("value","ELIMINAR");
	 	 inp.setAttribute("onclick","eliminar_agenda("+datos[f].id+")");
	 	 td.appendChild(inp);
	 	 tr.appendChild(td);


	 	 tbl.appendChild(tr);
	 }

}

function editar_agenda(id_agenda){
	if(confirm("¿Desea editar esta agenda?")){
		consultarDatos("agenda_por_id/"+id_agenda,{},function(rs){
			if(rs.respuesta){
				$('#respuestaAgenda').fadeOut('fast');
        		$('#editarAgenda').fadeIn('slow');
				mostrarAgendaEdicion(rs.datos[0]);
			}
		});
	}
}
function mostrarAgendaEdicion(datos){
	document.getElementById("selAgendaCursoEdi").value=datos.fk_id_curso;
	document.getElementById("hd_id_actividad").value=datos.id;
	consultarDatos("modulo_curso/"+datos.fk_id_curso,{},function(rs){
				if(rs.respuesta){

					crear_select("selAgendaModulosEdi",rs.datos,"id","nombre_modulo");
					document.getElementById("selAgendaModulosEdi").value=datos.fk_id_modulo_curso;
				}
	});
	document.getElementById("selTipoEventoAgendaEdi").value=datos.tipo_actividad;
	document.getElementById("txt_nombre_evento_edi").value=datos.nombre_actividad;
	
	document.getElementById("dtFechaEventoIniEdi").value=datos.activo_desde.split(" ")[0];
	document.getElementById("tmHoraEventoIniEdi").value=datos.activo_desde.split(" ")[1];
	document.getElementById("dtFechaEventoFinEdi").value=datos.activo_hasta.split(" ")[0];
	document.getElementById("tmHoraEventoFinEdi").value=datos.activo_hasta.split(" ")[1];
}

function eliminar_agenda(id_agenda){
	if(confirm("¿Deseas eliminare esta actividad?")){
		eliminarDato("agenda/"+id_agenda,{},function(rs){	
			mostrarMensaje(rs);
		});
	}
}

