var arr_alumnos;
function iniciar_index_alumno(){
	//BUSCAR ALUMNO
	agregarEvento("txtBuscarAlumno","keypress",function(e){
		if(e.keyCode!=13){
			if(this.value!=""){
				consultarDatos("usuarios/"+this.value,{},function(rs){
					crear_data_list("dtAlumnos",rs.datos,"id","nombre_usuario");
				});
			}	
		}else{
			e.preventDefault();
			consultarDatos("usuarios/"+this.value,{},function(rs){
					if(rs.respuesta){
						$('#consultaAlumno').fadeOut('fast');
        				$('#resultadoAl').fadeIn('slow');
        				dibujar_alumno_consultado(rs.datos);
					}
				});

		}
		
	});
	//BUSCAR ALUMNO
	agregarEvento("btnconsultaAl","click",function(){

		if(document.getElementById("txtBuscarAlumno").value!=""){
				consultarDatos("usuarios/"+document.getElementById("txtBuscarAlumno").value,{},function(rs){
					if(rs.respuesta){
						 $('#consultaAlumno').fadeOut('fast');
        				 $('#resultadoAl, #tblAlumnos').fadeIn('slow');
        				dibujar_alumno_consultado(rs.datos);
					}
				});	
		}else{
			consultarDatos("usuarios_index",{},function(rs){
					if(rs.respuesta){
						 $('#consultaAlumno').fadeOut('fast');
        				 $('#resultadoAl, #tblAlumnos').fadeIn('slow');
        				dibujar_alumno_consultado(rs.datos);
					}
				});	
		}
				
	});
	//REGISTRAR NUEV ALUMNO
	agregarEvento("btnCrearAlumno","click",function(){
		var datos = $("#formCrearAlumno").serializarFormulario();		
		datos.rol="1";//1 => alumno

		


		if(datos.correo_usuario[0]!=datos.correo_usuario[1]){
			mostrarMensaje("Correos no coinciden");
			return false;
		}else{
			datos.correo_usuario=datos.correo_usuario[0];
		}
		if(datos.clave[0]!=datos.clave[1]){
			mostrarMensaje("Claves no coinciden");
			return false;
		}else{
			datos.clave=datos.clave[0];
		}

		registrarDato("usuarios",datos,function(rs){
			mostrarMensaje(rs);
		},"formCrearAlumno");
	});
	//EDITAR ALUMNO
	agregarEvento("btnEditarAlumno","click",function(){
		var datos = $("#formEditarAlumno").serializarFormulario();		

		editarDato("usuarios/"+datos.id_usuario,datos,function(rs){
			mostrarMensaje(rs);
			document.getElementById("txtBuscarAlumno").value="";
		},"formEditarAlumno");
	});
	agregarEvento("btnInscribirAlumno","click",function(){
		if(confirm("Desea inscribir a este alumno el curso?")){
			var datos = $("#formEditarAlumno").serializarFormulario();		
			if(document.getElementById("selCursoActivo").value!="0"){
				datos.rol="alumno";
				registrarDato("detalle_usuario_curso",datos,function(rs){
					mostrarMensaje(rs);
					//mostrar_editar(datos.id_usuario);
				},"formCrearAlumno");		
			}else{
				mostrarMensaje("Debes seleccioanr un curso");
			}
		}
		
	});


	agregarEvento("txtDocumentoUsuario","change",function(){
		console.log(this.value);
		if(this.value!=""){
				
				consultarDatos("validar_usuario/"+this.value,{},function(rs){
					if(rs.respuesta){
						mostrarMensaje(rs);
						this.value="";

					}
				});
		}

	});
}

function dibujar_alumno_consultado(datos){
			arr_alumnos=datos;
			var tbl=document.getElementById("tblAlumnos");
			tbl.innerHTML="";

			var tr=document.createElement("tr");

			var td=document.createElement("td");
			td.innerHTML="Documento";
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Nombre completo del Alumno";
			tr.appendChild(td);

			

			var td=document.createElement("td");
			td.innerHTML="Correo Electronico";
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Programa";
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="EDITAR";
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="ELIMINAR";
			tr.appendChild(td);
			tbl.appendChild(tr);
		for(var e in datos){
			console.log(datos[e]);
			var tr=document.createElement("tr");

			var td=document.createElement("td");
			td.innerHTML=datos[e].documento_usuario;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=datos[e].nombre_usuario+" "+datos[e].apellido_usuario;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=datos[e].correo_usuario;
			tr.appendChild(td);

			var td=document.createElement("td");
			var sele=document.createElement("select");
			if(datos[e].cursos.length>0){
				for (var c in datos[e].cursos){
					var opt=document.createElement("option");
					opt.innerHTML=datos[e].cursos[c].nombre_curso;
					opt.value=datos[e].cursos[c].id;
					sele.appendChild(opt);
				}	
			}else{
				var opt=document.createElement("option");
				opt.innerHTML="Sin cursos";
				opt.value="0";
				sele.appendChild(opt);
			}
			
			td.appendChild(sele);
			tr.appendChild(td);

			

			var td=document.createElement("td");
			var inp=document.createElement("input");
			inp.setAttribute("type","button");	
			inp.setAttribute("value","EDITAR");	
			inp.setAttribute("onclick","mostrar_editar("+datos[e].id+")");	
			td.appendChild(inp);
			tr.appendChild(td);

			var td=document.createElement("td");
			var inp=document.createElement("input");
			inp.setAttribute("type","button");	
			inp.setAttribute("value","ELIMINAR");	
			inp.setAttribute("onclick","eliminar_alumno("+datos[e].id+")");	
			td.appendChild(inp);
			tr.appendChild(td);

			tbl.appendChild(tr);
		}
}

/*MOSTRAR DATOS FORMULARIO EDICION ALUMNO*/
function mostrar_editar(id){
	if(confirm("¿Desea editar este alumno?")){
		var al=buscar_alumno_js(id);
		if(false!=al){
			console.log(al);
			document.getElementById("hdIdAlumnoEdi").value=al.id;
			document.getElementById("txtNombreAlumnoEdi").value=al.nombre_usuario;
			document.getElementById("txtApellidoAlumnoEdi").value=al.apellido_usuario;
			document.getElementById("txtDocumentoAlumnoEdi").value=al.documento_usuario;
			document.getElementById("txtTelefonoAlumnoEdi").value=al.telefono_usuario;
			document.getElementById("txtDireccionAlumnoEdi").value=al.direccion_usuario;
			document.getElementById("txtCorreoAlumnoEdi").value=al.correo_usuario;
			document.getElementById("dtFechaCumpleAlu").value=al.fecha_nacimiento;
			document.getElementById("liMisCursos").innerHTML="";
			for(var c in al.cursos){
				var li=document.createElement("li");
				li.innerHTML=al.cursos[c].nombre_curso;
				document.getElementById("liMisCursos").appendChild(li);

				var li=document.createElement("li");
				var inp=document.createElement("input");
				inp.setAttribute("type","button");
				inp.setAttribute("value","eliminar");
				inp.setAttribute("onclick","eliminar_suscripcion_curso("+al.cursos[c].id+")");
				li.appendChild(inp);
				document.getElementById("liMisCursos").appendChild(li);
			}
			$('#resultadoAl').fadeOut('fast');
        	$('#editarAlumno').fadeIn('slow');
		}
	}
}
/*ELIMINAR ALUMNO*/
function eliminar_alumno(id){
	if(confirm("¿Desea eliminar este alumno?")){
		
		eliminarDato("usuarios/"+id,{},function(rs){	
			mostrarMensaje(rs);
		});
	}
}
/*BUSCAR ALUMNO*/
function buscar_alumno_js(id){
	for(var e in arr_alumnos){
		if(arr_alumnos[e].id==id){
			return arr_alumnos[e];
		}
	}

	return false;
}

function eliminar_suscripcion_curso(curso){
	if(confirm("Desea eliminar este alumno del curso?")){
		eliminarDato("detalle_usuario_curso/"+curso,{},function(rs){
			mostrarMensaje(rs);
		});	
	}
	
}