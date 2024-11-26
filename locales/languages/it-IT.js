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
        },
        geolocation: {
            permission_denied: 'Non hai autorizzato l\'accesso alla tua posizione.',
            current_coordinates: 'Coordinate attuali',
            no_results: 'Non sono stati trovati risultati per la tua ricerca.',
        },
        google:{
            sign_in_error: "Errore nel login con Google",
            sign_out_error: "Errore nel logout da Google",
            fetching_token_error: "Errore nell\'acquisizione di informazioni dal token",
            reverse_geocode_error:'Errore nella traduzione della posizione',
        }
    }
}

export default it;
