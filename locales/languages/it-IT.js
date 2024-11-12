const it={
    ares:{
        components:{
            input:{
                fields:{
                    Text:{
                        not_allowed_digit:(char,name)=>`Il carattere "${char}" non è ammesso nel campo "${name}"`,
                        not_allowed_value:(char,name)=>`Il valore "${value}" non è conforme al formato richisto nel campo "${name}"`,
                    }
                }
            }
        }
    }
}

export default it;