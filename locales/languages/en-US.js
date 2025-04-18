const en={
    ares:{
        components:{
            input:{
                fields:{
                    Text:{
                        not_allowed_digit:(char,name)=>`Char "${char}" is not allowed in "${name}"`,
                        not_allowed_value:(char,name)=>`Value "${value}" is not allowed in "${name}"`,
                    }
                },
                options: {
                    no_available_options: 'Nessuna opzione disponibile',
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
        },
        submit: "Submit",
        cancel: "Cancel",
        ok: "Ok",
        close: "Close",
        more: "More",
        less: "Less",
        clear: "Clear",
        clear_all: "Clear all",
        clear_all_confirmation: "Are you sure you want to clear all the data?",
        clear_confirmation: "Are you sure you want to clear the data?",
        add: "Add",
        add_new: "Add new",
        delete: "Delete",
        delete_confirmation: "Are you sure you want to delete this item?",
        delete_all: "Delete all",
        delete_all_confirmation: "Are you sure you want to delete all the items?",
        delete_all_confirmation_title: "Delete all confirmation",
        delete_all_confirmation_message: "Are you sure you want to delete all the items?",
        edit: "Edit",
        save: "Save",
        save_confirmation: "Are you sure you want to save the data?",
        save_confirmation_title: "Save confirmation",
        save_confirmation_message: "Are you sure you want to save the data?",
        select: "Select",
        select_all: "Select all",
        select_all_confirmation: "Are you sure you want to select all the items?",
        select_all_confirmation_title: "Select all confirmation",
        select_all_confirmation_message: "Are you sure you want to select all the items?",
        unselect: "Unselect",
        unselect_all: "Unselect all",
        unselect_all_confirmation: "Are you sure you want to unselect all the items?",
        unselect_all_confirmation_title: "Unselect all confirmation",
        unselect_all_confirmation_message: "Are you sure you want to unselect all the items?",
        yes: "Yes",
        no: "No",
        ok: "Ok",
        cancel: "Cancel",
        close: "Close",
        search: "Search",
        back: "Back",
        next: "Next",
        previous: "Previous",
        first: "First",
        last: "Last",
        loading: "Loading",
        no_results: "No results were found for your search.",
        no_results_title: "No results",
        no_results_message: "No results were found for your search.",
        no_results_action: "Search again",
        no_results_action_title: "Search again",
        no_results_action_message: "No results were found for your search. Search again",
        error: "Error",
        error_title: "Error",
        error_message: "An error occurred.",
        error_action: "Retry",
        error_action_title: "Retry",
        error_action_message: "An error occurred. Retry",
        warning: "Warning",
        warning_title: "Warning",
        warning_message: "A warning occurred.",
        warning_action: "Retry",

    }
}

export default en;
