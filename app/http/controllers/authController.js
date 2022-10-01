const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    return {
        login(req, res) {
            return res.render('login')
        },

        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err) => {
                    //console.log("hereeeee")
                    if(err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req, res, next)
        },

        register(req, res) {
            return res.render('register')
        },

        async postRegister(req, res) {
            const {name, phone, email, password, password2} = req.body
            console.log(req.body)

            //validate request

            if(!name || !email || !phone || !password || !password2) {
                req.flash('error', 'All fields are required')

                req.flash('name', name)
                req.flash('email', email)
                req.flash('phone', phone)

                return res.redirect('/register')
            }

            if(password != password2) {
                req.flash('error', 'Please Re-enter the password correctly')

                req.flash('name', name)
                req.flash('email', email)
                req.flash('phone', phone)

                return res.redirect('/register')
            }

            User.exists({email: email}, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already exists!')
                    req.flash('name', name)
                    req.flash('phone', phone)

                    return res.redirect('/register')
                }
            })

            User.exists({phone: phone}, (err, result) => {
                if(result) {
                    req.flash('error', 'Phone number already exists!')
                    req.flash('name', name)
                    req.flash('email', email)

                    return res.redirect('/register')
                }
            })

            //Hash Password

            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a user
            const user = new User({
                name: name, 
                phone: phone,
                email: email,
                password: hashedPassword

            })

            user.save().then(() => {
                //Login

                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })
        },

        logout(req, res) {
            req.logout((err)=> {
                if (err) { return next(err); }
            })
            
            return res.redirect('/login')
        }

    }
}

module.exports = authController