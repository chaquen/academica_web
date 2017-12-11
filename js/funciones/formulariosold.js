    /*Funcion que devuelve un arreglo con los valores del formulario*/
function validar_campo_formulario(e,type){
    
    switch(type){
        case "text":
                return true;
            if(rgxLetras.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        case "number":
            if(rgxNumero.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        case "email":
            if(rgxEmail.test(e.value)){
                return true;
            }else{
                return false;
            }
            break;
        default:
            return true;
        break;
    }
}


function obtener_valores_filas_tabla(id){
    var valores=[];
    console.log(document.getElementById(id));
    var n=document.getElementById(id).childNodes;
    console.log(n);
    console.log(n.childNodes);
    console.log(n.firstChild);
    
    for(var e in n){
        console.log(n[e].nodeName);
        console.log(n[e].firstElementChild);
        if(n[e].nodeName=="TD"){
                var el=n[e];    
                console.log(n[e].firstElementChild);
                if(el.firstElementChild!=null){
                         console.log(el.firstElementChild.value);	
                         valores.push(el.firstElementChild.value);
                }

            }
    }
    console.log(valores);
    return valores;
    
    
}
function limpiar_elemento(id){
    
    if(document.getElementById(id)!= undefined && document.getElementById(id) != null){
        document.getElementById(id).innerHTML="";
    }else{
        mostrarMensaje("estas intentando limpar u elemento que no existe "+ id);
    }
}
/*Funcion para limpiar un formulario*/
function limpiarFormulario(idForm){
    var form=document.getElementById(idForm);
    console.log(form);
    if(form!=null){
            for(var i in form.elements){

            if(form.elements[i].nodeName == "TEXTAREA"){
                form.elements[i].value="";  
            }
            //console.log(form.elements[i].type);
            //console.log(form.elements[i].checked);
            //console.log(form.elements[i].value);


            switch(form.elements[i].type){
                case "text":
                    form.elements[i].value="";
                    break;
                case "email":
                    form.elements[i].value="";
                    break;
                case "number":
                    form.elements[i].value="";
                    break;
                case "password":
                    form.elements[i].value="";
                    break;
                case "select-one":
                    form.elements[i].value="0";
                    break;
                case "checkbox":
                    form.elements[i].checked=false;
                    break;
                case "radio":
                    form.elements[i].checked=false;
                break;
                 case "file":
                    form.elements[i].value="";
                break;
            }
        }
    }
    
    console.log(form);
    console.log(idForm);
 }   