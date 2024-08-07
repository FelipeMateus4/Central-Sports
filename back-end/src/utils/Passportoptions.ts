import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userModel } from '../Models/UserModel';

passport.use(
    new LocalStrategy(async (username, password, done) => {
        console.log('Local Strategy');
        try {
            const user = await userModel.findOne({
                where: { username: username },
            });
            if (!user) {
                return done(null, false, {
                    message: 'Usuário ou senha incorretos.',
                });
            }
            if (!(await user.comparePassword(password))) {
                return done(null, false, {
                    message: 'Usuário ou senha incorretos.',
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findOne({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
