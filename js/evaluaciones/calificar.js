agregarEventoLoad(function(){
	agregarEvento("selCursosCalificaciones","change",function(){
		consultarDatos("buscar_actividades_por_curso/"+this.value,{},function(rs){
			crear_select("SelActividadesCalificaciones",rs.datos,"id","nombre_actividad");
		});

		consultarDatos("usuarios_por_curso/"+this.value,{},function(rs){
			crear_select("selAlumnosCalificaciones",rs.datos,"id","nombre_usuario");
		});
	});


	agregarEvento("btnCalificar","click",function(rs){
		var datos = $("#formCalificar").serializarFormulario();

		registrarDato("registrar_nota",datos,function(rs){
				console.log(rs);
				mostrarMensaje(rs);
				
			},"formCalificar");
	});
	
});

