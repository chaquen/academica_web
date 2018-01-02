var cursos_obj={
	nombre_curso:"",
	descripcion_curso:"",
	valor_curso:"",
	id_categoria:0,
	tipo_curso:"",
	modulos:[],
	fecha_inicio_curso:"",
	fecha_fin_curso:""
};
var modulos={
	nombre_modulo:"",
	fecha_inicio_modulo:"",
	fecha_fin_modulo:"",
	contenidos:[],
	
};
var contenidos={
	contenido:"",
	recurso:"",
	tipo_recurso:"",
	activo_desde:"",
	activo_hasta:"",
};
function iniciar_crear_cursos(){

	
		
	/*agregarEvento("txtNombreCurso","keypress",function(){
		document.getElementById("hNombreCurso").innerHTML=document.getElementById("txtNombreCurso").value;
		document.getElementById("hNombreCurso").value=document.getElementById("txtNombreCurso").value;

	});*/
	document.getElementById("liFechaIniCurso").style.display="none";
	document.getElementById("liFechaFinCurso").style.display="none";
	document.getElementById("liFechaIniModulo").style.display="none";
	document.getElementById("liFechaFinModulo").style.display="none";
	document.getElementById("liValorCurso").style.display="none";
	document.getElementById("liDoc").style.display="none";
	document.getElementById("liVideo").style.display="none";
	document.getElementById("liAudio").style.display="none";
	document.getElementById("liEvento").style.display="none";

	agregarEvento("selTiempoCurso","change",function(){
		
			switch(this.value){
				case "temporal":
					document.getElementById("liFechaIniCurso").style.display="";
					document.getElementById("liFechaFinCurso").style.display="";
					document.getElementById("liFechaIniModulo").style.display="";
					document.getElementById("liFechaFinModulo").style.display="";
					break;
				case "perpetuo":
					document.getElementById("liFechaIniCurso").style.display="none";
					document.getElementById("liFechaFinCurso").style.display="none";
					document.getElementById("liFechaIniModulo").style.display="none";
					document.getElementById("liFechaFinModulo").style.display="none";
					break;	
				case "0":
					document.getElementById("liFechaIniCurso").style.display="none";
					document.getElementById("liFechaFinCurso").style.display="none";
					document.getElementById("liFechaIniModulo").style.display="none";
					document.getElementById("liFechaFinModulo").style.display="none";					
					break;	
			}
			cursos_obj.tiempo_curso=this.value;
		
	});
	agregarEvento("selTipoCurso","change",function(){
		if(this.value!="0"){
			if(this.value=="pago"){
				document.getElementById("liValorCurso").style.display="";
				document.getElementById("hValorCurso").innerHTML="$ .";
			}else{
				document.getElementById("liValorCurso").style.display="none";
				document.getElementById("hValorCurso").innerHTML="GRATIS";
				
			}
			cursos_obj.tipo_curso=this.value;
				document.getElementById("hTipoCurso").innerHTML="Tipo de curso: "+this.options[this.selectedIndex].innerHTML;
				document.getElementById("hTipoCurso").value=this.value;

		}else{
			document.getElementById("liValorCurso").style.display="none";
			cursos_obj.tipo_curso="";
		}
	});
	agregarEvento("txtNombreCurso","change",function(){
		document.getElementById("hNombreCurso").innerHTML=this.value;
		document.getElementById("hNombreCurso").value=this.value;
		cursos_obj.nombre_curso=this.value;
	});
	agregarEvento("txtDescripcionCurso","change",function(){
		document.getElementById("hDescripcionCurso").innerHTML=this.value;
		document.getElementById("hDescripcionCurso").value=this.value;
		cursos_obj.descripcion_curso=this.value;
	});
	
	agregarEvento("txtValorCurso","change",function(){
		if(document.getElementById("selTipoCurso").value=="pago" && this.value!=""){
			cursos_obj.valor_curso=this.value;
			document.getElementById("hValorCurso").innerHTML=" $"+formato_numero(this.value,"0",",",".");
		}else{
			document.getElementById("hValorCurso").innerHTML=" $"+formato_numero(0000,"0",",",".");
		}
	});

	agregarEvento("dtFIniCur","change",function(){
		if(this.value!=""){
			var f1=new Date(horaCliente().split(" ")[0]);
			var f2=new Date(this.value);
			if(f2>=f1){
				cursos_obj.fecha_inicio_curso=this.value;	
				document.getElementById("hFechaInicioCursoCrear").innerHTML=this.value;
				document.getElementById("hFechaInicioCursoCrear").innerHTML=this.value;
			}else{
				mostrarMensaje("La fecha no puede ser menor a hoy");
				this.value="";
				document.getElementById("hFechaInicioCursoCrear").innerHTML="fecha inicio curso";
			}
			
		}
		
	});

	agregarEvento("dtFFinCur","change",function(){
		if(this.value!=""){
			console.log(new Date(cursos_obj.fecha_inicio_curso));

			console.log(new Date(this.value));
			var f1=new Date(cursos_obj.fecha_inicio_curso);
			var f2=new Date(this.value);
			if(f2>f1){

				cursos_obj.fecha_fin_curso=this.value;

				document.getElementById("hFechaFinCursoCrear").innerHTML=this.value;	
			}else{
				mostrarMensaje("La fecha debe ser despues del inicio del curso");
				this.value="";
				document.getElementById("hFechaFinCursoCrear").innerHTML="fecha fin curso";
			}	

			
		}			
	});

	agregarEvento("txtNombreModulo","change",function(){
		if(this.value!=""){

			modulos.nombre_modulo=this.value;	
			
		}
		
	});
	agregarEvento("dtFIniMod","change",function(){
		if(this.value!=""){
				var f1=new Date(horaCliente().split(" ")[0]);
				var f2=new Date(this.value);
			if(f2>=f1){
				modulos.fecha_inicio_modulo=this.value;	
 		 
			}else{
				mostrarMensaje("Debes ingresar una fecha diferente a la de hoy");
				modulos.fecha_inicio_modulo="";
				this.value="";
			}
				
			
				
			
			
		}
	});
	agregarEvento("dtFFinMod","change",function(){
		var f1=new Date(modulos.fecha_inicio_modulo);
		var f2=new Date(this.value);
		
		if(f2>f1){
			modulos.fecha_fin_modulo=this.value;
		}else{
			mostrarMensaje("La fecha debe ser despues de la de inicio");
			modulos.fecha_fin_modulo="";
			this.value="";
		}
	});
	agregarEvento("btnAgregraModulo","click",function(){
		//agregar un nuevo elemento al array cursos_obj.modulos
		
			if(modulos.nombre_modulo!="" ){
				if(cursos_obj.tiempo_curso!="perpetuo"){
					if( modulos.fecha_inicio_modulo != "" && modulos.fecha_fin_modulo != ""){
						cursos_obj.modulos.push(modulos);

			
						
						modulos={
							nombre_modulo:"",
							contenidos:[],
							fecha_inicio_modulo:"",
							fecha_fin_modulo:"",
							
						};	
						document.getElementById("txtNombreModulo").value="";
						document.getElementById("dtFIniMod").value="";
						document.getElementById("dtFFinMod").value="";
						dibujar_modulos();
						dibujar_select();	
					}else{
						mostrarMensaje("Debes ingresar todos los datos del modulo nombre y fechas");
					}
				}else{
					cursos_obj.modulos.push(modulos);

			
				
					modulos={
						nombre_modulo:"",
						contenidos:[],
						fecha_inicio_modulo:"",
						fecha_fin_modulo:"",
						
					};	
					document.getElementById("txtNombreModulo").value="";

					dibujar_modulos();
					dibujar_select();	
				}
				
			}else{
				mostrarMensaje("Debes ingresar todos los datos del modulo nombre y fechas");
			}

			

		
	});

	

	agregarEvento("txtContenidos","change",function(){

		if(this.value!=""){		
			contenidos.contenido=this.value;
			
		}	
		
	});
	
	agregarEvento("flvArchivoContenido","change",function(){
		
		if(this.value!=""){

			contenidos.recurso=this.files[0].name;
			registrarDatoArchivo("subir_archivos",{nombre_carpeta:cursos_obj.nombre_curso.split(" ").join("")},this,"",function(rs){
				mostrarMensaje(rs);
			});

			
		}
		//subir archivo al servidor

	});
	
	agregarEvento("btnAgregarContenido","click",function(){
		

			if(document.getElementById("txtContenidos").value!="" && document.getElementById("selTipoContenido").value!="0" ){
				contenidos.tipo_recurso=document.getElementById("selTipoContenido").value;
				console.log(cursos_obj.modulos[document.getElementById("selModulosCrearCurso").value].contenidos);
				

				cursos_obj.modulos[document.getElementById("selModulosCrearCurso").value].contenidos.push(contenidos);
				contenidos={
						contenido:"",
						recurso:"",
						tipo_recurso:"",
						activo_desde:"",
						activo_hasta:"",
				};
				


				document.getElementById("txtContenidos").value="";
				document.getElementById("flvArchivoContenido").value="";
				document.getElementById("txtVideo").value="";
				document.getElementById("liVideo").value="";
				document.getElementById("selTipoEvento").selectedIndex=0;
				console.log(document.getElementById("selTipoEvento").selectedIndex);
				document.getElementById("dtFIniEve").value="";
				document.getElementById("tmHIniEve").value="";
				document.getElementById("dtFFinEve").value="";
				document.getElementById("tmHFinEve").value="";
				
				dibujar_modulos();
			}else{
				mostrarMensaje("Por favor ingresa una descripcion del contenido");
			}
			

			
		
	});
	agregarEvento("txtVideo","change",function(){
		if(this.value!=""){
			contenidos.recurso=this.value.split("https://www.youtube.com/watch?v=")[1];
		}
	});

	agregarEvento("txtAudio","change",function(){
		if(this.value!=""){
			contenidos.recurso=this.value;
		}
	});

	agregarEvento("dtFIniEve","change",function(){
		if(this.value!=""){
			contenidos.activo_desde=this.value;
		}
	});
	agregarEvento("tmHIniEve","change",function(){
		if(this.value!=""){
			contenidos.activo_desde+=" "+this.value+":00";
		}
	});
	agregarEvento("dtFFinEve","change",function(){
		if(this.value!=""){
			contenidos.activo_hasta=this.value;
		}	
	});
	agregarEvento("tmHFinEve","change",function(){
		if(this.value!=""){
			contenidos.activo_hasta+=" "+this.value+":00";
		}
	});
	agregarEvento("selTipoEvento","change",function(){
		if(this.value!="0"){
			if(document.getElementById("selTipoContenido").value=="evento"){
				contenidos.tipo_recurso=this.value;
			}
			
		}
	});

	
	agregarEvento("selCatCurso","change",function(){
		if(this.value!=0){
			cursos_obj.id_categoria=this.value;
			document.getElementById("hAreaCurso").innerHTML=this.options[this.selectedIndex].innerHTML;
		}
	});
	agregarEvento("selTipoContenido","change",function(){
		switch(this.value){
			case "documento":
					document.getElementById("liDoc").style.display="";
					document.getElementById("liVideo").style.display="none";
					document.getElementById("liEvento").style.display="none";
					document.getElementById("liAudio").style.display="none";
					contenidos.tipo_recurso="documento";

				break;
			case "video":
					document.getElementById("liDoc").style.display="none";
					document.getElementById("liVideo").style.display="";
					document.getElementById("liEvento").style.display="none";
					document.getElementById("liAudio").style.display="none";
					contenidos.tipo_recurso="video";
				break;
			case "evento":
					document.getElementById("liDoc").style.display="none";
					document.getElementById("liVideo").style.display="none";
					document.getElementById("liAudio").style.display="none";
					document.getElementById("liEvento").style.display="";
					
					contenidos.recurso="evento";
				break;	
			case "audio":
					document.getElementById("liDoc").style.display="none";
					document.getElementById("liVideo").style.display="none";
					document.getElementById("liEvento").style.display="none";
					document.getElementById("liAudio").style.display="";
					
					contenidos.tipo_recurso="audio";
				break;	
			case "0":
					document.getElementById("liDoc").style.display="none";
					document.getElementById("liVideo").style.display="none";
					document.getElementById("liEvento").style.display="none";
					contenidos.tipo_recurso="";
					contenidos.recurso="";
				break;	

		}
	});

	agregarEvento("btnCrearCurso","click",function(){
		console.log(cursos_obj);
		var aprobado=true;
		if(cursos_obj.nombre_curso==""){
			aprobado=false;
			mostrarMensaje("Ingresa un nombre al curso");
		}

		if(aprobado){
			registrarDato("cursos",cursos_obj,function(rs){
				mostrarMensaje(rs);
				if(rs.respuesta){
					document.getElementById("hNombreCurso").innerHTML="";
					document.getElementById("hNombreCurso").value="";
					document.getElementById("hDescripcionCurso").innerHTML="";
					document.getElementById("hDescripcionCurso").value="";
					document.getElementById("hTipoCurso").innerHTML="";
					document.getElementById("hTipoCurso").value="";
					document.getElementById("hValorCurso").innerHTML="";
					document.getElementById("hValorCurso").value="";
					
					consulta_inicial();
				}
			},"formCrearCurso");	
		}
		
	});


}
function dibujar_modulos(){

	var mod=cursos_obj.modulos;
	console.log(mod);
	var lista=document.getElementById("ulListaModulos");
	lista.innerHTML="";
	for(var e in mod){
		var lis=document.createElement("li");		
		var h4=document.createElement("h4");		
		h4.innerHTML=mod[e].nombre_modulo;
		var h5=document.createElement("h5");		
		h5.setAttribute("onclick","quitarModulo("+e+")");
		h5.innerHTML="X";
		lis.appendChild(h5);
		lis.appendChild(h4);
		var ul=document.createElement("ul");
		for(var c in mod[e].contenidos){
			console.log(mod[e].contenidos[c]);
			var li=document.createElement("li");		
			var h5=document.createElement("h5");		
			h5.innerHTML=mod[e].contenidos[c].contenido;
			li.appendChild(h5);
			var h6=document.createElement("h6");
			h6.innerHTML="X";
			h6.setAttribute("onclick","quitarContenido("+e+","+c+")");	
			li.appendChild(h6);				
			ul.appendChild(li);
		}
		lis.appendChild(ul);

		lista.appendChild(lis);
	}
}
function dibujar_select(){
	var sel=document.getElementById("selModulosCrearCurso");
	sel.innerHTML="";
	var mod=cursos_obj.modulos;
	for(var e in mod){
		var opt=document.createElement("option");
		opt.innerHTML=mod[e].nombre_modulo;
		opt.value=e;
		sel.appendChild(opt);	

	}


}
function quitarContenido(posicion_modulo,posicion_contenido){

	if(confirm("¿Desea quitar este contenido del modulo?")){
		//quitar elemento 
		console.log(cursos_obj.modulos[posicion_modulo]);
		cursos_obj.modulos[posicion_modulo].contenidos.splice(posicion_contenido,1);	
		dibujar_modulos();
	}
}

function quitarModulo(posicion_modulo){

	if(confirm("¿Desea quitar este modulo?")){
		//quitar elemento 
		console.log(cursos_obj.modulos[posicion_modulo]);
		cursos_obj.modulos.splice(posicion_modulo,1);	
		dibujar_select();	
		dibujar_modulos();
	}
}