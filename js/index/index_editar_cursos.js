var cursos_obj_edi={
	nombre_curso:"",
	descripcion_curso:"",
	valor_curso:"",
	id_categoria:0,
	tipo_curso:"",
	modulos:[],
	fecha_inicio_curso:"",
	fecha_fin_curso:""
};
var modulos_edi={
	fk_id_curso:0,
	nombre_modulo:"",
	fecha_inicio_modulo:"0000-00-00 00:00:00",
	fecha_fin_modulo:"0000-00-00 00:00:00",
	actividades:[],
	
};
var actividades_edi={
						nombre_actividad:"",
						actividad_recurso:"",
						tipo_actividad:"",
						activo_desde:"",
						activo_hasta:"",
				};
function iniciar_editar_cursos(){

	
		
	/*agregarEvento("txtNombreCurso","keypress",function(){
		document.getElementById("hNombreCurso").innerHTML=document.getElementById("txtNombreCurso").value;
		document.getElementById("hNombreCurso").value=document.getElementById("txtNombreCurso").value;

	});*/
	document.getElementById("liFechaIniCursoEdi").style.display="none";
	document.getElementById("liFechaFinCursoEdi").style.display="none";
	document.getElementById("liFechaIniModuloEdi").style.display="none";
	document.getElementById("liFechaFinModuloEdi").style.display="none";
	document.getElementById("liValorCursoEdi").style.display="none";
	document.getElementById("liDocEdi").style.display="none";
	document.getElementById("liVideoEdi").style.display="none";
	document.getElementById("liEventoEdi").style.display="none";

	agregarEvento("selTiempoCursoEdi","change",function(){
		
			switch(this.value){
				case "temporal":
					document.getElementById("liFechaIniCursoEdi").style.display="";
					document.getElementById("liFechaFinCursoEdi").style.display="";
					document.getElementById("liFechaIniModuloEdi").style.display="";
					document.getElementById("liFechaFinModuloEdi").style.display="";
					//cursos_obj_edi.tipo_curso="temporal";
					break;
				case "perpetuo":
					document.getElementById("liFechaIniCursoEdi").style.display="none";
					document.getElementById("liFechaFinCursoEdi").style.display="none";
					document.getElementById("liFechaIniModuloEdi").style.display="none";
					document.getElementById("liFechaFinModuloEdi").style.display="none";
					//cursos_obj_edi.tipo_curso="gratis";
					break;	
				case "0":
					document.getElementById("liFechaIniCursoEdi").style.display="none";
					document.getElementById("liFechaFinCursoEdi").style.display="none";
					document.getElementById("liFechaIniModuloEdi").style.display="none";
					document.getElementById("liFechaFinModuloEdi").style.display="none";					
					break;	
			}
		
	});
	agregarEvento("selTipoCursoEdi","change",function(){
		if(this.value!="0"){
			if(this.value=="pago"){
				document.getElementById("liValorCursoEdi").style.display="";
				
			}else{
				document.getElementById("liValorCursoEdi").style.display="none";
				
			}
				cursos_obj_edi.tipo_curso=this.value;
				document.getElementById("hTipoCursoEdi").innerHTML="Tipo de curso: "+this.options[this.selectedIndex].innerHTML;
				document.getElementById("hTipoCursoEdi").value=this.value;
		}else{
			document.getElementById("liValorCursoEdi").style.display="none";
			cursos_obj_edi.tipo_curso="";	
		}
	});
	agregarEvento("txtNombreCursoEdi","change",function(){
		document.getElementById("hNombreCursoEdi").innerHTML=this.value;
		document.getElementById("hNombreCursoEdi").value=this.value;
		cursos_obj_edi.nombre_curso=this.value;
	});
	agregarEvento("txtDescripcionCursoEdi","change",function(){
		document.getElementById("hDescripcionCursoEdi").innerHTML=this.value;
		document.getElementById("hDescripcionCursoEdi").value=this.value;
		cursos_obj_edi.descripcion_curso=this.value;
	});
	
	agregarEvento("txtValorCursoEdi","change",function(){
		if(document.getElementById("selTipoCursoEdi").value=="pago" && this.value!=""){
			cursos_obj_edi.valor_curso=this.value;
			document.getElementById("hValorCursoEdi").innerHTML=" $"+formato_numero(this.value,"0",",",".");
		}else{
			document.getElementById("hValorCursoEdi").innerHTML=" $"+formato_numero(0000,"0",",",".");
		}
	});

	agregarEvento("dtFIniCurEdi","change",function(){
		if(this.value!=""){
			cursos_obj_edi.fecha_inicio_curso=this.value;	
			document.getElementById("hFechaInicioCurso").innerHTML=this.value;
		}
		
	});

	agregarEvento("dtFFinCurEdi","change",function(){
		if(this.value!=""){
			cursos_obj_edi.fecha_fin_curso=this.value;
			document.getElementById("hFechaFinCurso").innerHTML=this.value;
		}			
	});

	agregarEvento("txtNombreModuloEdi","change",function(){
		if(this.value!=""){

			modulos_edi.nombre_modulo=this.value;	
			
		}
		
	});
	agregarEvento("dtFIniModEdi","change",function(){
		if(this.value!=""){
			modulos_edi.fecha_inicio_modulo=this.value;
		}
	});
	agregarEvento("dtFFinModEdi","change",function(){
		if(this.value!=""){
			modulos_edi.fecha_fin_modulo=this.value;
		}	
	});
	agregarEvento("btnAgregraModuloEdi","click",function(){
		//agregar un nuevo elemento al array cursos_obj.modulos
		 if(modulos_edi.nombre_modulo!=""){
		 		var valido;
		 		modulos_edi.fk_id_curso=cursos_obj_edi.id;
		 		if(cursos_obj_edi.fecha_inicio_curso=="0000-00-00 00:00:00" && cursos_obj_edi.fecha_fin_curso=="0000-00-00 00:00:00"){
		 			valido=true;
		 		}else{
		 			
		 			if(document.getElementById("dtFIniModEdi").value!="" && document.getElementById("dtFFinModEdi").value!=""){
		 				var f1=new Date(document.getElementById("dtFIniModEdi").value);	
		 				var f2=new Date( document.getElementById("dtFFinModEdi").value);	
		 				var f3=new Date(horaCliente().split(" ")[0]);	
		 				if(f1>=f3 && f2>=f3 && f2>=f1){
							valido=true
		 				}else{
		 					valido=false;
		 					mostrarMensaje("Las dos fechas deben tener un periodo logico para su desarrollo");	
		 				}
		 			}else{
		 				valido=false;
		 				mostrarMensaje("Las dos fechas son obligatorias");
		 			}
		 		}
		 		if(valido){
		 			registrarDato("modulos",modulos_edi,function(rs){
						if(rs.datos){
							console.log(modulos_edi);
							cursos_obj_edi.modulos.push(modulos_edi);

							
							
							modulos_edi={
								fk_id_curso:cursos_obj_edi.id,
								nombre_modulo:"",
								actividades:[],
								fecha_inicio_modulo:"0000-00-00",
								fecha_fin_modulo:"0000-00-00",
								
							};	
							document.getElementById("txtNombreModuloEdi").value="";

							dibujar_modulos_edicion();
							dibujar_select_edicion();
						}
					});	
		 		}
		 		
		 }else{
		 	mostrarMensaje("Debes ingresar un nombre al modulo");
		 }
			

		
	});

	

	agregarEvento("txtContenidosEdi","change",function(){

		if(this.value!=""){		
			actividades_edi.nombre_actividad=this.value;
			
		}	
		
	});
	
	agregarEvento("flvArchivoContenidoEdi","change",function(){
		
		if(this.value!=""){

			actividades_edi.actividad_recurso=this.files[0].name;
			registrarDatoArchivo("subir_archivos",{},this,"",function(rs){
				mostrarMensaje(rs);
			});

			
		}
		//subir archivo al servidor

	});
	
	agregarEvento("btnAgregarContenidoEdi","click",function(){
		

			if(document.getElementById("txtContenidosEdi").value!="" && document.getElementById("selTipoContenidoEdi").value!="0" ){
				actividades_edi.tipo_actividad=document.getElementById("selTipoContenidoEdi").value;
				console.log(document.getElementById("selModulosCrearCursoEdi").value);
				console.log(cursos_obj_edi.modulos[Number(document.getElementById("selModulosCrearCursoEdi").value)-1]);
				console.log(cursos_obj_edi.modulos[Number(document.getElementById("selModulosCrearCursoEdi").value)-1].actividades);	

				cursos_obj_edi.modulos[Number(document.getElementById("selModulosCrearCursoEdi").value)-1].actividades.push(actividades_edi);

				actividades_edi={
						nombre_actividad:"",
						actividad_recurso:"",
						tipo_actividad:"",
						activo_desde:"",
						activo_hasta:"",
				};
				


				document.getElementById("txtContenidosEdi").value="";
				document.getElementById("flvArchivoContenidoEdi").value="";
				document.getElementById("txtVideoEdi").value="";
				document.getElementById("selTipoEventoEdi").selectedIndex=0;
				console.log(document.getElementById("selTipoEventoEdi").selectedIndex);
				document.getElementById("dtFIniEveEdi").value="";
				document.getElementById("tmHIniEveEdi").value="";
				document.getElementById("dtFFinEveEdi").value="";
				document.getElementById("tmHFinEveEdi").value="";
				
				dibujar_modulos_edicion();
			}else{
				mostrarMensaje("Por favor ingresa una descripcion del contenido");
			}
			

			
		
	});
	agregarEvento("txtVideoEdi","change",function(){
		if(this.value!=""){
			actividades_edi.actividad_recurso=this.value.split("https://www.youtube.com/watch?v=")[1];
		}
	});

	agregarEvento("dtFIniEveEdi","change",function(){
		if(this.value!=""){
			actividades_edi.activo_desde=this.value;
		}
	});
	agregarEvento("tmHIniEveEdi","change",function(){
		if(this.value!=""){
			actividades_edi.activo_desde+=" "+this.value+":00";
		}
	});
	agregarEvento("dtFFinEveEdi","change",function(){
		if(this.value!=""){
			actividades_edi.activo_hasta=this.value;
		}	
	});
	agregarEvento("tmHFinEveEdi","change",function(){
		if(this.value!=""){
			actividades_edi.activo_hasta+=" "+this.value+":00";
		}
	});
	agregarEvento("selTipoEventoEdi","change",function(){
		if(this.value!="0"){
			if(document.getElementById("selTipoContenidoEdi").value=="evento"){
				actividades_edi.tipo_actividad=this.value;
			}
			
		}
	});

	
	agregarEvento("selCatCursoEdi","change",function(){
		if(this.value!=0){
			cursos_obj_edi.id_categoria=this.value;
		}
	});
	agregarEvento("selTipoContenidoEdi","change",function(){
		switch(this.value){
			case "documento":
					document.getElementById("liDocEdi").style.display="";
					document.getElementById("liVideoEdi").style.display="none";
					document.getElementById("liEventoEdi").style.display="none";
					actividades_edi.tipo_actividad="documento";

				break;
			case "video":
					document.getElementById("liDocEdi").style.display="none";
					document.getElementById("liVideoEdi").style.display="";
					document.getElementById("liEventoEdi").style.display="none";
					actividades_edi.tipo_actividad="video";
				break;
			case "evento":
					document.getElementById("liDocEdi").style.display="none";
					document.getElementById("liVideoEdi").style.display="none";
					document.getElementById("liEventoEdi").style.display="";
					
					actividades_edi.nombre_actividad="evento";
				break;	
			case "0":
					document.getElementById("liDocEdi").style.display="none";
					document.getElementById("liVideoEdi").style.display="none";
					document.getElementById("liEventoEdi").style.display="none";
					actividades_edi.tipo_actividad="";
					actividades_edi.nombre_actividad="";
				break;	

		}
	});

	agregarEvento("btnEditarCurso","click",function(){
		console.log(cursos_obj_edi);
		var aprobado=true;
		if(cursos_obj_edi.nombre_curso==""){
			aprobado=false;
			mostrarMensaje("Ingresa un nombre al curso");
		}

		if(aprobado){
			editarDato("cursos/"+cursos_obj_edi.id,cursos_obj_edi,function(rs){
				mostrarMensaje(rs);
				if(rs.respuesta){
					document.getElementById("hNombreCursoEdi").innerHTML="";
					document.getElementById("hNombreCursoEdi").value="";
					document.getElementById("hDescripcionCursoEdi").innerHTML="";
					document.getElementById("hDescripcionCursoEdi").value="";
					document.getElementById("hTipoCursoEdi").innerHTML="";
					document.getElementById("hTipoCursoEdi").value="";
					document.getElementById("hValorCursoEdi").innerHTML="";
					document.getElementById("hValorCursoEdi").value="";
					$('#editarCurso').fadeOut('slow');
				}
			},"formEditarCurso");	
		}
		
	});


}
function dibujar_modulos_edicion(){
	$('#crearCurso, #formBuscarCurso, #resultadoCur, #tblCursos').fadeOut('fast');
    $('#editarCurso').fadeIn('slow');
	if(cursos_obj_edi.valor_curso==null){
		cursos_obj_edi.valor_curso=0;
	}
	document.getElementById("txtNombreCursoEdi").value=cursos_obj_edi.nombre_curso;
	document.getElementById("txtDescripcionCursoEdi").value=cursos_obj_edi.descripcion_curso;
	document.getElementById("txtValorCursoEdi").value=cursos_obj_edi.valor_curso;
	
	if(cursos_obj_edi.fecha_inicio_curso == "0000-00-00 00:00:00"){
		document.getElementById("selTiempoCursoEdi").value="perpetuo";
	}else{
		document.getElementById("selTiempoCursoEdi").value="temporal";
		document.getElementById("dtFIniCurEdi").value=cursos_obj_edi.fecha_inicio_curso;
		document.getElementById("dtFFinCurEdi").value=cursos_obj_edi.fecha_fin_curso;
	}

	document.getElementById("selTipoCursoEdi").value=cursos_obj_edi.tipo_curso;
	document.getElementById("selCatCursoEdi").value=cursos_obj_edi.fk_id_categoria_curso;
	
	document.getElementById("hNombreCursoEdi").innerHTML=cursos_obj_edi.nombre_curso;
	document.getElementById("hNombreCursoEdi").value=cursos_obj_edi.nombre_curso;
	document.getElementById("hDescripcionCursoEdi").innerHTML=cursos_obj_edi.descripcion_curso;
	document.getElementById("hDescripcionCursoEdi").value=cursos_obj_edi.descripcion_curso;
	document.getElementById("hTipoCursoEdi").innerHTML="Tipo de curso: "+cursos_obj_edi.tipo_curso.toUpperCase();
	document.getElementById("hFechaInicioCurso").innerHTML=cursos_obj_edi.fecha_inicio_curso;
	document.getElementById("hFechaFinCurso").innerHTML=cursos_obj_edi.fecha_fin_curso;

	if(cursos_obj_edi.valor_curso==null){
		cursos_obj_edi.valor_curso=0;
	}

	document.getElementById("hValorCursoEdi").innerHTML=" $ "+formato_numero(cursos_obj_edi.valor_curso,"0",",",".");
	

	var mod=cursos_obj_edi.modulos;
	console.log(mod);
	var lista=document.getElementById("ulListaModulosEdi");
	lista.innerHTML="";
	for(var e in mod){
		console.log(mod[e]);
		var lis=document.createElement("li");		
		var h4=document.createElement("h4");		
		h4.innerHTML=mod[e].nombre_modulo;
		var h5=document.createElement("h5");		
		h5.setAttribute("onclick","quitarModuloEdi("+e+")");
		h5.innerHTML="X";
		lis.appendChild(h5);
		lis.appendChild(h4);
		var ul=document.createElement("ul");
		for(var c in mod[e].actividades){
			console.log(mod[e].actividades[c]);
			var li=document.createElement("li");		
			var h5=document.createElement("h5");		
			h5.innerHTML=mod[e].actividades[c].nombre_actividad;
			li.appendChild(h5);
			var h6=document.createElement("h6");
			h6.innerHTML="X";
			h6.setAttribute("onclick","quitarContenidoEdi("+e+","+c+")");	
			li.appendChild(h6);				
			ul.appendChild(li);
		}
		lis.appendChild(ul);

		lista.appendChild(lis);
	}

	dibujar_select_edicion();
}
function dibujar_select_edicion(){
	var sel=document.getElementById("selModulosCrearCursoEdi");
	sel.innerHTML="";
	var mod=cursos_obj_edi.modulos;
	var opt=document.createElement("option");
		opt.innerHTML="SELECCIONA UN MODULO";
		opt.value="0";
		sel.appendChild(opt);	
		var i=1;
	for(var e in mod){
		var opt=document.createElement("option");
		opt.innerHTML=mod[e].nombre_modulo;
		opt.value=i;
		sel.appendChild(opt);	
		i++;

	}


}
function quitarContenidoEdi(posicion_modulo,posicion_contenido){

	if(confirm("¿Desea quitar este contenido del modulo?")){
		//quitar elemento 
		eliminarDato("agenda/"+cursos_obj_edi.modulos[posicion_modulo].actividades[posicion_contenido].id,{},function(rs){
			console.log(cursos_obj_edi.modulos[posicion_modulo]);
			cursos_obj_edi.modulos[posicion_modulo].actividades.splice(posicion_contenido,1);	
			dibujar_modulos_edicion();
		});
		
	}
}

function quitarModuloEdi(posicion_modulo){

	if(confirm("¿Desea quitar este modulo?, recuerda que esto eliminara las actividades asocadas")){
		//quitar elemento 
		eliminarDato("modulos/"+cursos_obj.modulos[posicion_modulo].id,{},function(rs){
			console.log(cursos_obj.modulos[posicion_modulo]);
			cursos_obj_edi.modulos.splice(posicion_modulo,1);	
			dibujar_modulos_edicion();
			dibujar_select_edicion();
		});
		
	}
}
function mostrar_editar_curso(id){
	if(confirm("¿Desea editar este curso?")){
		consultarDatos("cursos/id&=&"+id,{},function(rs){
				console.log(rs);
				if(rs.respuesta){
					cursos_obj_edi=rs.datos[0];
					
					console.log(cursos_obj_edi);
					dibujar_modulos_edicion();
				}
			});
	}
}