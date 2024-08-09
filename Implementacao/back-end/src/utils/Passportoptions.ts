import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userModel } from '../Models/UserModel';
import speakeasy from 'speakeasy';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: any, password: any, done) => {
            try {
                const user = await userModel.findOne({
                    where: { email: email },
                });
                if (!user) {
                    return done(null, false, {
                        message: 'Email ou senha incorretos.',
                    });
                }
                if (!(await user.comparePassword(password))) {
                    return done(null, false, {
                        message: 'Email ou senha incorretos.',
                    });
                }

                const token = speakeasy.totp({
                    secret: user.secret,
                    encoding: 'base32',
                });

                console.log(token);

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
    try {
        const user = await userModel.findOne({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
