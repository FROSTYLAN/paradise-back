import passport from 'passport'
import FacebookTokenStrategy from 'passport-facebook-token'

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      const user = profile._json
      return done(null, user)
    }
  )
)

export default passport
