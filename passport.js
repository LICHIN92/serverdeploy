// import passport from "passport";
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import Userr from "./Models/userModels";
// const jwtOptions = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'abcd' // Replace with your secret key
//   };

//   passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
//     try {
//         console.log(jwtPayload)
//       const user = await Userr.findOne({email:jwtPayload.user});
//       if (user) {
//         console.log(user);
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     } catch (error) {
//       return done(error, false);
//     }
//   }));
//   export default passport

import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Userr from './Models/userModels.js';
import 'dotenv/config'


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY // Replace with your secret key
  };

  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {

        console.log(jwtPayload)
        console.log(jwtPayload.user)

      const user = await Userr.findOne({email:jwtPayload.user});
      if (user) {
        console.log(user);

        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));

  export default passport;