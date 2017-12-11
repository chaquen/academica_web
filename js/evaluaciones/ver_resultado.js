agregarEventoLoad(iniciar_ver_resultados);
function iniciar_ver_resultados(){
	consultar_los_cursos_activos();
	agregarEvento("selCursoResultado","change",function(){
		consultarDatos("usuarios_por_curso/"+this.value,{},function(rs){
			if(rs.respuesta){
				console.log(rs.datos);
				crear_select("selAlumnoResultado",rs.datos,"id","nombre_usuario");
			}
		});	
		consultarDatos("evaluaciones_por_curso/"+this.value,{},function(rs){
			if(rs.respuesta){
				console.log(rs.datos);
				crear_select("selEvaluacionResultado",rs.datos,"id","nombre_actividad");
			}
		});
	});

	agregarEvento("selAlumnoResultado","change",function(){
		consultarDatos("resultado_evaluacion/"+document.getElementById("selEvaluacionResultado").value+"/"+this.value,{},function(rs){
			if(rs.respuesta){
				console.log(rs.datos);
				dibujar_resultado(rs.datos);
			}
		});
	});	

}

function consultar_los_cursos_activos(){
	consultarDatos("cursos/estado_curso&=&1",{},function(rs){
		if(rs.respuesta){
			console.log(rs.datos);
			crear_select("selCursoResultado",rs.datos,"id","nombre_curso");
		}
	});
}

function dibujar_resultado(datos){
	for(var d in datos){
		for(var dd in datos[d].respuestas){
			
		}
	}
}