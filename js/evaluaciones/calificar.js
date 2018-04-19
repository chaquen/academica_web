agregarEventoLoad(function(){
	agregarEvento("selCursosCalificaciones","change",function(){
		consultarDatos("buscar_actividades_por_curso/"+this.value,{},function(rs){
			crear_select("SelActividadesCalificaciones",rs.datos,"id","nombre_actividad");
		});

		consultarDatos("usuarios_por_curso/"+this.value,{},function(rs){
			crear_select_dos("selAlumnosCalificaciones",rs.datos);
		});
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
			consultarDatos("actividades_del_usuario/"+document.getElementById("selAlumnosCalificaciones").value+"/"+document.getElementById("selCursosCalificaciones").value+"/"+document.getElementById("SelActividadesCalificaciones").value,{},function(rs){

				console.log(rs);
			});
		}else{
			mostrarMensaje("Debes seleccionar un alumno");
		}
	});
	
});

