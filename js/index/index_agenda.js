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
}



