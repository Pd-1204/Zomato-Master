/* {"web":{"client_id":"817553760441-57p5milfqslg9q66hmsl37hmkhhm92lh.apps.googleusercontent.com","project_id":"flowing-scholar-336417","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:4000/auth/google/callback"],"javascript_origins":["http://localhost:4000"]}} */

import googleOAuth from "passport-google-oauth20";

import {UserModel} from "../Database/allModels";

const GoogleStrategy = googleOAuth.Strategy;


export default (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: "817553760441-57p5milfqslg9q66hmsl37hmkhhm92lh.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback"
    },
async(accessToken, refreshToken, profile, done) => {
  //creating a new user
  const newUser = {
    fullname: profile.displayName,
    email: profile.emails[0].value,
    profilePic: profile.photos[0].value
  };
  try{
    //check whether user exists or not
    const user = await UserModel.findOne({email: newUser.email});
    if(user) {

      //generating jwt token
      const token = user.generateJwtToken();
      //return user
      done(null, {user, token});
    } else {
      //create a new user
      const user = await UserModel.create(newUser);

      //generating jwt token
      const token = user.generateJwtToken();
      //return user
      done(null, {user, token});
    }
  } catch(error) {
    done(error, null);
  }
}
)
);

passport.serializeUser((userData,done) => done(null, {...userData}));
passport.deserializeUser((id, done) => done(null, id));

};