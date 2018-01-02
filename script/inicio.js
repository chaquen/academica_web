$(document).ready(function(){
    
    //Division del Menu Administrativo
        //Menu de Curso
    $('#menuCur').click(function(){
        $('#menuAlumno, #menuProfesor, #menuAgenda, .formulario, #menuPines').fadeOut('fast');
        $('#menuCurso').fadeIn('slow');
    });
        //Menu de Alumno
    $('#menuAl').click(function(){
        $('#menuCurso, #menuProfesor, #menuAgenda, .formulario, #menuPines').fadeOut('fast');
        $('#menuAlumno').fadeIn('slow');
    });
        //Menu de Profesor
    $('#menuProf').click(function(){
        $('#menuAlumno, #menuCurso, #menuAgenda, .formulario, #menuPines, #menuEvaluacion').fadeOut('fast');
        $('#menuProfesor').fadeIn('slow');
    });
        //Menu de Agenda
    $('#menuAg').click(function(){
        $('#menuAlumno, #menuProfesor, #menuCurso, .formulario, #menuPines, #menuEvaluacion').fadeOut('fast');
        $('#menuAgenda').fadeIn('slow');
    });
        //Menu de los PINES
    $('#menuPin').click(function(){
        $('#menuAlumno, #menuProfesor, #menuCurso, .formulario, #menuAgenda, #menuEvaluacion').fadeOut('fast');
        $('#menuPines').fadeIn('slow');
    });
        //Manu de Evalucaión
    $('#menuEva').click(function(){
        $('#menuAlumno, #menuProfesor, #menuCurso, .formulario, #menuAgenda, #menuPines').fadeOut('fast');
        $('#menuEvaluacion').fadeIn('slow');
    });
    
    //Salir de los Menus
    $('.salirMenu').click(function(){
        $('.subMenu').fadeOut('fast');
    }); 
    
    //Salir de los formularios
    $('.salirFor, .salir').click(function(){
        $('.formulario, #crearCurso, #respuestaProfesor, #editarCurso, .tabla').fadeOut('fast');
    });
    
    
    //Formularios Alumnos ******************************************************
       
    //Crear Alumno
    $('#crearAl').click(function(){
        $('#editarAlumno, #consultaAlumno, #eliminarAlumno, #resultadoAl').fadeOut('fast');
        $('#crearAlumno').fadeIn('slow');
    });
    //Conultar Alumno
    $('.consultaAl').click(function(){
        $('#editarAlumno, #crearAlumno, #eliminarAlumno, #resultadoAl').fadeOut('fast');
        $('#consultaAlumno').fadeIn('slow');
    });
    //Resultado de la busqueda Alumno
    $('#btnconsultaAl').click(function(){
        //$('#consultaAlumno').fadeOut('fast');
        //$('#resultadoAl').fadeIn('slow');
    });
    //Editar Alumno
    $('#editarAl').click(function(){
        $('#consultaAlumno, #crearAlumno, #eliminarAlumno, #resultadoAl').fadeOut('fast');
        $('#editarAlumno').fadeIn('slow');
    });
    //Eliminar Alumno
    $('#eliminarAl').click(function(){
        $('#editarAlumno, #crearAlumno, #consultaAlumno, #resultadoAl').fadeOut('fast');
        $('#eliminarAlumno').fadeIn('slow');
    });
    //Vista Usuario Logueado
    $('#datosUsuario').click(function(){
        $('#formUsuarioLog').fadeIn('slow');
    });
    
    //Formularios de Profesores *************************************************
   
    //Crear Profesor
    $('#crearPr').click(function(){
        $('#respuestaProfesor, #consultaProfesor, #editarProfesor').fadeOut('fast');
        $('#crearProfesor').fadeIn('slow');
    });
    
    //Editar Profesor
    $('.consultaPr').click(function(){
        $('#crearProfesor, #respuestaProfesor, #editarProfesor').fadeOut('fast');
        $('#consultaProfesor').fadeIn('slow');
    });
    
    //Respuesta Consulta
    //$('#btnConsultaProfesor').click(function(){
        //$('#crearProfesor, #consultaProfesor, #editarProfesor').fadeOut('fast');
        //$('#respuestaProfesor').fadeIn('slow');
    //});
    
    //Formulario Editar Profesor
    $('#editarPr').click(function(){
        $('#crearProfesor, #respuestaProfesor, #consultaProfesor').fadeOut('fast');
        $('#editarProfesor').fadeIn('slow');
    });
    
    //Formularios de Agenda ****************************************************
    //Crear Agenda
    $('#crearAg').click(function(){
        $('#consultaAgenda, #editarAgenda').fadeOut('fast');
        $('#crearAgenda').fadeIn('slow');
    });
    //Consulta Agenda
    $('.consultaAg').click(function(){
        $('#crearAgenda, #editarAgenda').fadeOut('fast');
        $('#consultaAgenda').fadeIn('slow');
    });
    //Respuesta Agenda
    $('#btnBuscarAgenda').click(function(){
        $('#consultaAgenda').fadeOut('fast');
        $('#respuestaAgenda').fadeIn('slow');
    });
    //Editar Agenda
    $('.btnEditarAgenda').click(function(){
        $('#crearAgenda, #consultaAgenda, .tabla').fadeOut('fast');
        $('#editarAgenda').fadeIn('slow');
    });
    
    //Formularios de Cursos ****************************************************

    //Crear Curso
    $('#crearCur').click(function(){
        $('#editarCurso, #formBuscarCurso').fadeOut('fast');
        $('#crearCurso').fadeIn('slow');
    });
    //Consultar Curso
    $('.consultaCur').click(function(){
        $('#crearCurso, #editarCurso').fadeOut('fast');
        $('#formBuscarCurso').fadeIn('slow');
    });
    //Editar Curso
    $('#editarCur').click(function(){
        $('#crearCurso, #formBuscarCurso').fadeOut('fast');
        $('#formBuscarCurso').fadeIn('slow');
    });
    
    //Formularios de PINES *****************************************************
    //Crear Pin
    $('#crearP').click(function(){
        $('#consultaPin, #eliminarPin').fadeOut('fast');
        $('#crearPin').fadeIn('slow');
    });
    //Consulta Pin
    $('#consultaP').click(function(){
        $('#crearPin, #eliminarPin').fadeOut('fast');
        $('#consultaPin').fadeIn('slow');
    });
    //Eliminar Pin
    $('#eliminarP').click(function(){
        $('#crearPin, #consultaPin').fadeOut('fast');
        $('#eliminarPin').fadeIn('slow');
    });
    
    //Formularios de las Preguntas
    //Crear Preguntas
    $('#crearPre').click(function(){
        $('.subMenu').fadeOut('fast');
        $('#crearPregunta').fadeIn('slow');
    });
    //Consulta de preguntas
    $('#consultaPre').click(function(){
        $('.subMenu').fadeOut('fast');
        $('#consultaPregunta').fadeIn('slow');
    });
    //Crear Evaluacion
    $('#crearEv').click(function(){
        $('.subMenu').fadeOut('fast');
        $('#crearEvaluacion').fadeIn('slow');
    });
    
    //Formulario de la vista del usuario
   $('#datosUsuario').click(function(){
        $('#formUsuarioLog').fadeIn('slow');
    });
    
    
});
