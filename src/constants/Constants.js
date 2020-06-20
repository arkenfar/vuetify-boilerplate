import Logo_DarkMode from "../assets/Logo_DarkMode.png";
import Logo_Default from "../assets/Logo_Default.png";

export default {
  APPLICATION: {
    NAME: process.env.VUE_APP_VUE_APP_TITLE,
    LOGO: Logo_Default,
    LOGO_DARK_MODE: Logo_DarkMode,
    GET_APP_NAME() {
      return this.NAME.toUpperCase();
    },
  },
  COPYRIGHTS: {
    OWNER: process.env.VUE_APP_VUE_APP_COPYRIGHT_OWNER,
    YEAR: new Date().getFullYear(),
    GET_COPYRIGHTS() {
      return (
        this.OWNER.toString() +
        " \u00A9 " +
        this.YEAR.toString() +
        " All Rights Reserved"
      );
    },
  },
  FIREBASE: {
    API_KEY: process.env.VUE_APP_FIREBASE_WEB_API_KEY,
    DB_URL: process.env.VUE_APP_FIREBASE_DB_URL,
    PROJECT_ID: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  },
};
