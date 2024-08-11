import User from "@/models/user.model";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const user = await User.findOne({ _id: token.id });
        console.log("USER: ", user);
        if (!user) {
          return done(null, false, { message: "Unauthorized" });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
