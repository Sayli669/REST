const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users',(req,res)=>{
    User.find({}, (err, users) => {
        if (err) {
          res.status(400).json(err);
        }
        res.json(users);
      })
    
})

app.post('/users',(req, res) => {
    
    const user = new User(req.body)
    //console.log("user" +user);
    // const user = Joi.validate(req.body, schema); 
    user.save().then(() => {
        res.status(201).send(user)
        //console.log(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})



app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/post-test', (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

// app.listen(3000, () => console.log(`Started server at http://localhost:8080!`));