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

      return this;
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
    const result = await GoogleSignin.hasPlayServices();
    if(!result){
      this.handleError({code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE});
    }
    return result;
  },

  signIn: async function () {
    try{
       this.userInfo = await GoogleSignin.signIn();
       return this.userInfo;
    }catch(error){
      this.handleError(error);
    }
  },

  signOut: async function () {
    try {
      const logout = await GoogleSignin.signOut();
      console.log("Successfully signed out");
      return logout;
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  },

  getTokenInfo: async function (token) {
    try {
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching token info:", error);
      throw error;
    }
  },
};
export default Google;
