/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable max-len */
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const PORT = process.env.PORT || 5000

passport.use(new GoogleStrategy.Strategy({
	clientID: process.env.GOOGLE_CLIENT_ID || '',
	clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
	callbackURL: `http://localhost:${PORT}/login/callback`,
	passReqToCallback: true,
},
	// @ts-ignore
	((request, accessToken, refreshToken, profile, done) => {
		// use the profile info (mainly profile id) to check
		// if the user is registered in your db
		// console.log({ request })
		console.log({ accessToken })
		// console.log({ profile })
		return done(null, profile)
	}
	)))

passport.serializeUser((user, done) => {
	// @ts-ignore
	done(null, user)
})

// @ts-ignore
passport.deserializeUser((user, done) => done(null, user))
