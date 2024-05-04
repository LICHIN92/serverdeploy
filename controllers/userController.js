import Userr from '../Models/userModels.js'
import userr from '../Models/userModels.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const getUsers = async (req, res) => {
    try {

        let user = await userr.find({})
        if (!user) {
            res.status(400).json({ error: 'not found' })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
}

const getUserByName = async (req, res) => {
    console.log(req.params);
    try {

        let user = await userr.findOne({ username: req.params.username })
        if (!user) {
            res.status(400).json({ error: 'not found' })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'not found' })

    }
}

const adduser = async (req, res) => {

    console.log('add user');
    try {
        let Password = req.body.password;
        let saltRound = 10;
        bcrypt.hash(Password, saltRound, async (err, hash) => {
            if (err) {
                console.error(`error generated hash: ${err}`);
                return
            }
            console.log(hash);
            let useritem = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash,
                createdAt: new Date()
            };

            let user = new Userr(useritem);
            await user.save().then(resp => {
                console.log('User saved successfully:', useritem);

                res.status(201).send(useritem);
            }).catch(errr =>
                console.log(errr))
        })


    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
}

const updateUser = async (req, res) => {
    try {

        let user = await userr.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) {
            res.status(400).json({ error: 'not found' })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'not found' })

    }
}

const updateUserput = async (req, res) => {
    try {
        let user = await userr.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) {
            res.status(400).json({ error: "not found" })
        } else {
            res.status(201).json({ messege: "updated" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'not found' })
    }
}
const deleteuser = async (req, res) => {
    try {
        let user = await userr.findByIdAndDelete(req.params.id, { new: true })
        if (!user) {
            res.status(400).send('not found')
        } else {
            res.status(200).json({ messege: 'deleted' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'not found' })
    }
}
const Login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body
        const dd = await Userr.findOne({ email: email })
        if (!dd) {
            return res.status(400).json('not found')
        } else {
            console.log(dd);
            let valid_password=await bcrypt.compare(password, dd.password)
            console.log(valid_password);
            if (valid_password) {
                let payload = { user: email, pwd: password }
                let token = jwt.sign(payload,process.env.JWT_SECRET_KEY//  'abcd'
               )
                return res.status(200).json({ message: 'login success', token })

            }
            return res.status(400).json('login not success')

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'not found' })
    }
}
export { getUsers, getUserByName, adduser, updateUser, updateUserput, deleteuser, Login }

