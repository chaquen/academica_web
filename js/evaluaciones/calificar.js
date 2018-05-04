agregarEventoLoad(function(){
	agregarEvento("selCursosCalificaciones","change",function(){
		consultarDatos("buscar_actividades_por_curso/"+this.value,{},function(rs){
			crear_select("SelActividadesCalificaciones",rs.datos,"id","nombre_actividad");
		});

		consultarDatos("usuarios_por_curso/"+this.value,{},function(rs){
			crear_select_dos("selAlumnosCalificaciones",rs.datos);
		});
	});
	agregarEvento("SelActividadesCalificaciones","change",function(){
		if(document.getElementById("selAlumnosCalificaciones").value!="0"){
			consultarDatos("actividades_del_usuario/"+document.getElementById("selAlumnosCalificaciones").value
								+"/"+document.getElementById("selCursosCalificaciones").value
								+"/"+document.getElementById("SelActividadesCalificaciones").value,{},function(rs){

				mostrarActividades(rs.datos,rs.nota);

			});
		}
	});

	agregarEvento("btnCalificar","click",function(rs){
		var datos = $("#formCalificar").serializarFormulario();

		registrarDato("registrar_nota",datos,function(rs){
				console.log(rs);
				mostrarMensaje(rs);
				
			},"formCalificar");
	});

	agregarEvento("selAlumnosCalificaciones","change",function(){
		if(this.value!="0"){
			consultarDatos("actividades_del_usuario/"+document.getElementById("selAlumnosCalificaciones").value
								+"/"+document.getElementById("selCursosCalificaciones").value
								+"/"+document.getElementById("SelActividadesCalificaciones").value,{},function(rs){

				if(rs.respuesta){
					mostrarActividades(rs.datos,rs.nota);	
				}else{
					document.getElementById("divArchivos").value="";
				}
				

			});
		}else{
			mostrarMensaje("Debes seleccionar un alumno");
		}
	});
	
});


function mostrarActividades(datos,nota){
	console.log(datos);
	
	if(nota.nota_evaluacion!=undefined){
		document.getElementById("txt_Nota").innerHTML=nota.nota_evaluacion;	
	}
	
	var da=document.getElementById("divArchivos");
	da.innerHTML="";
	var lista=document.createElement("ul");
	for(var f in datos){
		var li=document.createElement("li");
		var a=document.createElement("a");
		a.innerHTML=datos[f];
		a.setAttribute("target","_blank");
		a.href=globales._URL+"actividades/"
										+document.getElementById("selAlumnosCalificaciones").value
										+"/"+document.getElementById("selCursosCalificaciones").value
										+"/"+document.getElementById("SelActividadesCalificaciones").value
										+"/"+datos[f];	
		li.appendChild(a);
		lista.appendChild(li);
		da.appendChild(lista);
	}
}