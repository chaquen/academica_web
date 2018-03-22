var id_curso;
var pin;
var hoy_hace_18;
agregarEventoLoad(function(){




  console.log(horaCliente().split(" ")[0]);
  hoy_hace_18=new Date(horaCliente().split(" ")[0]);
  var anio_hace_18=hoy_hace_18.getFullYear();
  hoy_hace_18=new Date(hoy_hace_18.setYear(anio_hace_18-18));
  
  console.log(horaClienteFormato(hoy_hace_18));
  
  document.getElementById("dt_fecha_nac").value=horaClienteFormato(hoy_hace_18);
  console.log(document.getElementById("dt_fecha_nac").value);

	var params=recibirValorGet();	
	if(params!=false){
    console.log(params);
    id_curso=params[0].split("=")[1];
    pin=params[1].split("=")[1];



    consultarDatos("cursos/id&=&"+id_curso,{},function(rs){
      console.log(rs[0]);
      document.getElementById("bNombreCurso").innerHTML=rs.datos[0].nombre_curso;
    });

    agregarEvento("btn_editar_perfil","click",function(){
       var datos = $("#formUsuarioPerfil").serializarFormulario();
           if(datos!=false){
                 if(datos.clave[0]==datos.clave[1]){
                      datos.clave=datos.clave[0];
                      if(datos.correo_usuario[0]==datos.correo_usuario[1]){
                             datos.curso=id_curso;
                             datos.correo_usuario=datos.correo_usuario[0];
                             datos.rol="1";
                             datos.pin=pin;
                             registrarDato("usuarios",datos,function(rs){
                                  mostrarMensaje(rs);
                                  if(rs.respuesta){
                                     globales._usuario=rs.datos;
                                     globales._cerrar_sesion=false;
                                     iniciar_panel(rs.datos);
                                     
                                  }
                              });
                      }else{
                          mostrarMensaje("Los correos no corresponden");
                      }
                  }else{
                      mostrarMensaje("Las contraseñas no corresponden");
                  }     
           }else{
              mostrarMensaje("por favor ingresa los campos obligatorios");
           }
          
    });
    agregarEvento("dt_fecha_nac","change",function(){
      var f1=new Date(this.value);
      var hoy= new Date(horaCliente().split(" ")[0]);
      
        console.log(f1.getFullYear());
        console.log(hoy.getFullYear());
        console.log(hoy_hace_18.getFullYear());
        console.log(f1.getFullYear() - hoy_hace_18.getFullYear());
      
      if( (f1.getFullYear() - hoy_hace_18.getFullYear())==0 ){
         console.log("Grandecito el hp");

      }else{
         console.log("No mi pez te falta edad el hp");
         mostrarMensaje("No tienes la edad suficiente para acceder a la plataforma");
         hoy_hace_18=new Date(horaCliente().split(" ")[0]);
         var anio_hace_18=hoy_hace_18.getFullYear();
         hoy_hace_18=new Date(hoy_hace_18.setYear(anio_hace_18-18));
         document.getElementById("dt_fecha_nac").value=horaClienteFormato(hoy_hace_18);

      }

    });
  }else{
    mostrarMensaje("Debes ingresar un pin para acceder a esta pagina");
    location.href="/";
  }
});