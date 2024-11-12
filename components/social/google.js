import { Platform } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const Google = {
  setup: function (settings) {
    GoogleSignin.configure({
      scopes: settings?.scopes ?? [],
      androidClientId: settings?.android?.client?.id,
      webClientId: settings?.web?.client?.id,
      offlineAccess: settings?.offlineAccess ?? true,
      redirectUri: settings[Platform.OS].redirectUri,
    });

    this.handleError =
      settings.handleError ??
      ((error) => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.error("User cancelled the login process");
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.error("Sign in is already in progress");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.error("Google Play Services not available or outdated");
        } else {
          console.error("Sign in error:", error);
          console.error("stack", error.stack);
        }
      });
  },
  getUserAdditionalInfo: async function (accessToken) {
    try {
      const response = await fetch(
        "https://people.googleapis.com/v1/people/me?personFields=birthdays,genders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      console.log("User additional info:", data);
    } catch (error) {
      console.error("Error getting user additional info:", error);
    }
  },

  hasPlayServices: async function () {
    return wait(GoogleSignIn.hasPlayServices());
  },

  signIn: async function () {
    try{
      this.userInfo = await wait(GoogleSignIn.signIn());
    }catch(error){
      this.handleError(error);
    }
  },

  signOut: async function () {
    return wait(GoogleSignIn.signOut());
  },
};
export default Google;