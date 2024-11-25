const en={
    ares:{
        components:{
            input:{
                fields:{
                    Text:{
                        not_allowed_digit:(char,name)=>`Char "${char}" is not allowed in "${name}"`,
                        not_allowed_value:(char,name)=>`Value "${value}" is not allowed in "${name}"`,
                    }
                }
            }
        }
    }
}

export default en;
