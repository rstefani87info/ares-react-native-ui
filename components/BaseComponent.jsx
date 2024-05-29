import {  PropTypes,useContext, useState } from 'react';
import { Provider, Consumer } from 'react-native';
import aReS from '../contexts/aReSContext.js';
import documentMapContext from '../contexts/documentMapContext.js';
import { Controller } from 'react-hook-form';

export const parameters = {
    /**
     * @desc {en} self tag identifier in documentMapContext 
     */
    id: PropTypes.string,
    /**
     * @desc {en} component to be rendered in view mode of the component
     * @desc {fr} composant a afficher en mode d'affichage de la composante
     * @desc {it} componente grafico da visualizzare in modalità di visualizzazione del componente
     * @desc {es} componente grafico a mostrar en modo de vista del componente
     * @desc {pt} componente grafico a mostrar no modo de vista do componente
     */
    viewAsComponent: PropTypes.func,
    /**
     * @desc {en} function to be called when the component is in view mode
     * @desc {fr} fonction a appeler lorsque la composante est en mode d'affichage
     * @desc {it} funzione da chiamare quando la componente si trova in modalità di visualizzazione
     * @desc {es} funcion a llamar cuando el componente se encuentra en modo de vista
     * @desc {pt} função a ser chamada quando o componente estiver no modo de visualização
     * 
     * @type {function}
     */
    onViewChange:PropTypes.func,
    /**
     * @desc {en} real graphical component to be rendered in input mode of the component
     * @desc {fr} composant graphique a afficher en mode d'entrée de la composante
     * @desc {it} componente grafico da visualizzare in modalità di input del componente
     * @desc {es} componente grafico a mostrar en modo de entrada del componente
     * @desc {pt} componente grafico a mostrar no modo de entrada do componente
     */
    writeAsComponent: PropTypes.func,
    /**
     * @desc {en} function to be called when the component is in write mode
     * @desc {fr} fonction a appeler lorsque la composante est en mode d'entrée
     * @desc {it} funzione da chiamare quando la componente si trova in modalità di input
     * @desc {es} funcion a llamar cuando el componente se encuentra en modo de escritura
     * @desc {pt} função a ser chamada quando o componente estiver no modo de escrita
     * 
     * @type {function}
     */
    onWriteChange:PropTypes.func,
    /**
     * @desc {en} data object
     * @desc {fr} objet de données
     * @desc {it} oggetto di dati
     * @desc {es} objeto de datos
     * @desc {pt} objeto de dados
     */
    data: PropTypes.any,
    /**
     * @desc {en} data type described by an aReS descriptor object
     * @desc {fr} type de données decrivant un objet aReS descriptor
     * @desc {it} tipo di dati descritto da un oggetto aReS descriptor
     * @desc {es} tipo de datos describido por un objeto aReS descriptor
     * @desc {pt} tipo de dados descrito por um objeto aReS descriptor
     * 
     */
    validator: PropTypes.any,
    /**
     * @desc {en} object field name or array index
     * @desc {fr} nom de champ ou index d'un tableau
     * @desc {it} nome del campo o indice di un array
     * @desc {es} nombre del campo o indice de un array
     * @desc {pt} nome do campo ou indice de um array
     * 
     * @type {string|integer}
     */
    name: PropTypes.string|ProtoTypes.integer,

    /** 
     * @desc {en} form object returned from react-hook-form useForm function
     * @desc {fr} objet de formulaire retourne par la fonction useForm de react-hook-form
     * @desc {it} oggetto form restituito da useForm della funzione react-hook-form
     * @desc {es} objeto de formulario devuelto por la funcion useForm de react-hook-form
     * @desc {pt} objeto de formulário retornado pela função useForm da biblioteca react-hook-form

     * @type {Object}
     * 
    */
    form: PropTypes.shape({ 
      register: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      setValue: PropTypes.func.isRequired,
      getValues: PropTypes.func.isRequired,
      errors: PropTypes.objectOf(
        PropTypes.string
      ).isRequired,
    }),

    /** 
     * @desc {en} indicates if the the field name to bind is pointed by a specific index in data parameter
     * @desc {fr} indique si le nom de champ a lier est pointé par un index particulier dans le paramètre data
     * @desc {it} indica se il nome del campo da binder è puntato da un indice particolare nel parametro data
     * @desc {es} indica si el nombre del campo a enlazar está apuntado por un indice particular en el parámetro data
     * @desc {pt} indica se o nome do campo a ligar está apontado por um indice particular no parâmetro data
     * 
     * @type {string|integer}
     */
    listIndex: PropTypes.string|PropTypes.number,
    
    /**
     * @desc {en} parent component
     * @desc {fr} composant parent
     * @desc {it} componente genitore
     * @desc {es} componente padre
     * @desc {pt} componente pai
     */
    parent: PropTypes.func,
  };
export function BaseComponent({
    id,
    // onPress, onLongPress, onTouchStart, onTouchMove, onTouchEnd,
    // onChange, onFocus, onBlur, onTextInput,
    // onSubmit, onReset,
    // onNavigationStateChange,
    // onOrientationChange, onShake, onKeyDown, onKeyUp,
    data,
    validator,
    name,
    form,
    listIndex,
    parent,
    ...others,
},...children) {
    const documentMap = useContext(documentMapContext);
    if(!id || documentMapContext.checkConflict()){
        id = documentMapContext.getNewID();
    }
    const {data, setData}= useState(data);
    documentMap[id] = {
         get id(){ return id; },
         get name(){ 
            let val = '';
            if(listIndex===null || listIndex===undefined || listIndex<0){
                val='['+JSON.stringify(listIndex)+']';
            }
            val=(typeof name === 'number'?'['+name+']':name)+val;
          },
        view:viewAsComponent, 
        write:writeAsComponent, 
        data:useState(data),
        value:useState(documentMap[id].data[name]),
        mode:useState(isWriteMode?'edit':'view'),
        childrenIds:children.map(child=>child.id),
    };
    const {validationMessage, setValidationMessage} = useState('');
    const handleChange = function(event){
        if( validator.validate(event.newValue) ){
            documentMap[id].value.setCurrent(event.newValue);
            if( documentMap[id].mode.current==='view' && onViewChange instanceof Function ){
                onViewChange(event);
            }else if( documentMap[id].mode.current==='edit' && onWriteChange instanceof Function ){
                onWriteChange(event);
            }
        } else if(mode==='view'){
            setValidationMessage(validator.onViewValidationMessage??'Error');
        } else if(mode==='edit'){
            setValidationMessage(validator.onEditValidationMessage??'Error');
        }
    }

    return ( 
        <>
            {isWriteMode && writeAsComponent && 
                <WriteAsComponent
                    id={id}
                    value={documentMap[id].value.current}
                    onChange={handleChange}
                >
                    {children}
                </WriteAsComponent>
                
            }{
                !isWriteMode && viewAsComponent &&
                <ViewAsComponent
                    id={id}
                    value={value}
                >
                    {children}
                </ViewAsComponent>
            }
            <ValidationMessage>{validationMessage}</ValidationMessage>
        </>
    );
}

