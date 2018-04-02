var arr_profe;
function iniciar_profesores(){
	//BUSCAR PROFESOR
	agregarEvento("txtBuscarProfesor","keypress",function(e){
		if(e.keyCode!=13){
			if(this.value!=""){
				consultarDatos("profes/"+this.value,{},function(rs){
					crear_data_list("dtProfesores",rs.datos,"id","nombre_usuario");
				});
			}	
		}else{
			e.preventDefault();
			consultarDatos("profes/"+this.value,{},function(rs){
					mostrarMensaje(rs);
					if(rs.respuesta){
						//$('#consultaAlumno').fadeOut('fast');
        				//$('#resultadoAl').fadeIn('slow');
        				dibujar_profesor_consultado(rs.datos);
					}
				});

		}

	});
	agregarEvento("txtDocumentoProfesor","change",function(){
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
	agregarEvento("txtBuscarProfesor","change",function(){
		if(this.value!=""){
				
				consultarDatos("profes/"+this.value,{},function(rs){
					crear_data_list("dtProfesores",rs.datos,"documento_usuario","nombre_usuario");
				});
		}	

	});
	//BUSCAR PROFESOR
	agregarEvento("btnconsultaProfesor","click",function(){
		if(document.getElementById("txtBuscarProfesor").value!=""){
				consultarDatos("profes/"+document.getElementById("txtBuscarProfesor").value,{},function(rs){
					if(rs.respuesta){
						 $('#crearProfesor, #consultaProfesor, #editarProfesor').fadeOut('fast');
        				 $('#respuestaProfesor, #tbConsultalProfesores').fadeIn('slow');
        				dibujar_profesor_consultado(rs.datos);
					}
				});
		}else{
			consultarDatos("usuarios",{},function(rs){
					if(rs.respuesta){
						 $('#crearProfesor, #consultaProfesor, #editarProfesor').fadeOut('fast');
        				 $('#respuestaProfesor, #tbConsultalProfesores').fadeIn('slow');
        				 dibujar_profesor_consultado(rs.datos);
					}
				});
		}
		
	});
	//CREAR PROFESOR
	agregarEvento("btnCrearProfesor","click",function(){
		var datos = $("#formCrearProfesor").serializarFormulario();
		if(datos!=false){
			
			//var archivo=document.getElementById("flFotoProfe");
			//console.log(archivo.files);
			
				if(datos.clave[0]===datos.clave[1]){
					//datos.foto_profesor=archivo.files[0].name;
					/*registrarDatoArchivo("profesores",datos,archivo,"formRegistroProfesor",function(rs){	
						console.log(rs);
						mostrarMensaje(rs);
					});		*/
					datos.rol="2";//2 => profesor
					datos.curso="0";//0 => n/a
					datos.clave=datos.clave[0];
					registrarDato("usuarios",datos,function(rs){
						mostrarMensaje(rs);
					},"formCrearProfesor");
				}else{
					mostrarMensaje("Contraseñas no coinciden");
				}

		
			
		}else{
			mostrarMensaje("Por favor ingresa todos los campos");
		}
			
		
	});
	//EDITAR PROFESOR
	agregarEvento("btnEditarProfesor","click",function(){
		var datos = $("#formEditarProfesor").serializarFormulario();
		if(datos!=false){
			console.log(datos);
			//var archivo=document.getElementById("flFotoProfe");
			//console.log(archivo.files);
			
					//datos.foto_profesor=archivo.files[0].name;
					/*registrarDatoArchivo("profesores",datos,archivo,"formRegistroProfesor",function(rs){	
						console.log(rs);
						mostrarMensaje(rs);
					});		*/
					datos.rol="2";//2 => profesor
					datos.curso="0";//0 => n/a

					if(datos.clave.length==2){
						if(datos.clave[0]==datos.clave[1]){
							datos.clave=datos.clave[0];
						}else{
							mostrarMensaje("Las contraseñas deben coincidir");
							return false;
						}	
					}
					editarDato("usuarios/"+datos.id_usuario,datos,function(rs){
						mostrarMensaje(rs);
						document.getElementById("txtBuscarProfesor").value="";
					},"formEditarProfesor");
				

		
			
		}else{
			mostrarMensaje("Por favor ingresa todos los campos");
		}
	});
	//SUBIR FOTO PROFESOR
	agregarEvento("flFotoProfe","change",function(){
		
		var opc=this.value.split(".")[1];
		console.log(opc);
		switch(opc){
			case "JPG":
				break;
			case "jpg":
				break; 
			case "PNG":
				break;
			case "png":
				break;
			case "JPEG":
				break;
			case "jpeg":

				break;
			default:
				mostrarMensaje("Por favor ingresa un archivo valido");
			break;
		}
	});
}

function dibujar_profesor_consultado(datos){
			arr_profe=datos;
			var tbl=document.getElementById("tbConsultalProfesores");
			tbl.innerHTML="";

			var tr=document.createElement("tr");

			var td=document.createElement("td");
			td.innerHTML="Documento";
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Nombre completo del Profesor";
			tr.appendChild(td);

			

			var td=document.createElement("td");
			td.innerHTML="Correo Electronico";
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Direccion ";
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML="Telefono Electronico";
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
			td.innerHTML=datos[e].direccion_usuario;
			tr.appendChild(td);

			var td=document.createElement("td");
			td.innerHTML=datos[e].telefono_usuario;
			tr.appendChild(td);


			/*var td=document.createElement("td");
			var sele=document.createElement("select");
			for (var c in datos[e].cursos){
				var opt=document.createElement("option");
				opt.innerHTML="";
				opt.value="";
				sele.appendChild(opt);
			}
			td.appendChild(sele);
			tr.appendChild(td);*/

			

			var td=document.createElement("td");
			var inp=document.createElement("input");
			inp.setAttribute("type","button");	
			inp.setAttribute("value","EDITAR");	
			inp.setAttribute("onclick","mostrar_editar_profe("+datos[e].id+")");	
			td.appendChild(inp);
			tr.appendChild(td);

			var td=document.createElement("td");
			var inp=document.createElement("input");
			inp.setAttribute("type","button");	
			inp.setAttribute("value","ELIMINAR");	
			inp.setAttribute("onclick","eliminar_profe("+datos[e].id+")");	
			td.appendChild(inp);
			tr.appendChild(td);

			tbl.appendChild(tr);
		}
}

function buscar_profe_js(id){
	for(var e in arr_profe){
		if(arr_profe[e].id==id){
			return arr_profe[e];
		}
	

            return false;
        }
}
function  mostrar_editar_profe(id) {
	if(confirm("¿Desea editar este profesor?")){
		var al=buscar_profe_js(id);
		if(false!=al){
			console.log(al);
			document.getElementById("hdIdprofeEdi").value=al.id;
			document.getElementById("txtNombreProfeEdi").value=al.nombre_usuario;
			document.getElementById("txtApellidoProfeEdi").value=al.apellido_usuario;
			document.getElementById("txtDocProfeEdi").value=al.documento_usuario;
			document.getElementById("txtTeleProfeEdi").value=al.telefono_usuario;
			document.getElementById("txtDirProfeEdi").value=al.direccion_usuario;
			document.getElementById("txtCorreoProfeEdi").value=al.correo_usuario;
			document.getElementById("dtFechaNacProfeEdi").value=al.fecha_nacimiento;
			//document.getElementById("selCursoActivoEdi").value=al.curso;
			
			$('#respuestaProfesor').fadeOut('fast');
        	$('#editarProfesor').fadeIn('slow');
		}
	}
}
function eliminar_profe(id){
	if(confirm("¿Desea eliminar este profesor?")){
		
		eliminarDato("usuarios/"+id,{},function(rs){	
			mostrarMensaje(rs);
		});
	}
}
