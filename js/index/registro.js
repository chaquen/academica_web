function iniciar_registro(){
	agregarEvento("btnRegistroAlumno","click",function(){
			var datos = $("#formRegistroAlumno").serializarFormulario();
			if(false!=datos){
				registrarDato("alumnos",datos,function(rs){
					mostrarMensaje(rs);
				},"formRegistroAlumno");
			}else{
				mostrarMensaje("Por favor ingresa los campos requeridos");
			}
	});
}