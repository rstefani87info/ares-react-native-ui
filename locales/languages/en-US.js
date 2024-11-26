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
        },
        geolocation: {
            permission_denied: 'You didn\'t allow the access to your position.',
            current_coordinates: 'Current coordinates',
            no_results: 'No results were found for your search.',
        },
        google:{
            sign_in_error: "Error in google sign in",
            sign_out_error: "Error in google sign out",
            fetching_token_error: "Error in fetching token data",
            reverse_geocode_error:'Error in reverse geocode',
        }
    }
}

export default en;
