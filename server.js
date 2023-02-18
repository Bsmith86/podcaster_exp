const express = require('express');

const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require("./passport-config");
const session = require('express-session');
// const cookieParser = require('cookie-parser');

const cors = require('cors');
require("dotenv").config();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const uuidv4  = require('uuid').v4;
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const mysql = require('mysql');
const moment = require('moment');

const db = require('./rdsClient')
const multer  = require('multer')
const doUpload = multer({ dest: 'uploads/' })

const { getFileStream } = require('./s3.js');

// const { addOrUpdatePodcast } = require('./dynamo.js');



console.log(typeof moment().format('YYYY-MM-DD'));


aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.DEFAULT_REGION
})


const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const BUCKET = process.env.BUCKET

const upload = multer({
    storage: multerS3({
        bucket: BUCKET,
        s3: s3,
        acl:"public-read",
        key: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
})

const { getAllUsers, getUserByEmail, getUserById, addOrUpdateUser } = require('./rds.js')


const app = express();





//Initialize Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: ["http://localhost:3000", "https://master.d1rsiy501pb2g2.amplifyapp.com/"],
    credentials: true
}))

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(morgan('dev'));

app.use(session({
    secret: process.env.SECRET_SECRET,
    resave: false,
    saveUninitialized: false
}))
// app.use(cookieParser(process.env.SECRET_SECRET));
app.use(passport.initialize())
app.use(passport.session())
initializePassport(
    passport,
    async email => {
        const result = await getUserByEmail("w@w")
        console.log(result)
        return result
    },
    async id => {
        const result = await getUserById()
        return result
    }
);
//-------------END OF MIDDLEWARE----------------//

//--------------START OF ROUTES---------------------//


// passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
// })

// app.get('/auth', passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
// }))

app.put('/create-account', async (req, res) => {
    let { email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    const response = await getUserByEmail(req.body.email);
    if (response !== undefined) {
        res.status(400).json({error: "Account with this email already exists"})
    } else {
            const userId = uuidv4()
            addOrUpdateUser({
                ...req.body,
                userId,
                password: hashedPassword,
            }).then((res) => {
                console.log("user created ", res)
            })
            res.send("user created")
    }
});

app.get("/get-user", (req, res) => {
    if (!req.user){
      res.json({loggedIn: false})
    } else {
      res.json({
        loggedIn: true,
        user: {...req.user},
      })
    }
  })
app.get("/getme", (req, res) => {
    res.send("got me!")
  })
  app.post('/search_participants_names', (req, res) => {
    console.log(req.body.name)
    let sql = `SELECT * FROM PeerPod1.Users WHERE firstName LIKE "${req.body.name}%"`
    
    db.query(sql, async (err, result) => {
        let userArray;
        if (result.length) {
            userArray = await result.map((item) => {
                let { userId, firstName, lastName } = JSON.parse(JSON.stringify(item));
                return { userId, firstName, lastName }
            })
        }
        res.json({
            userArray
        })
    })
})



app.post("/login", (req, res, next) =>{
    console.log("running authenticate")
    passport.authenticate("local", (err, user, info) => {
        console.log("in auth")
        if (err) throw err;
        if (!user) {
            res.json({
                message: "no user with that email",
                loggedIn: false
              });
            } else {
              req.logIn(user, err => {
                if (err) console.log("ERR ", err);
                res.json({
                  message: "successfully Authenticated",
                  loggedIn: true
                });
              });
            }
    })(req, res, next);
})


app.post("/upload_audio", upload.single('audio'),  upload.single("file"), (req, res) => {
    const file = req.files.file;
    file.user = "Chase"
    const params = {
        Bucket: BUCKET,
        Key: `${uuidv4()}`,
        Body: req.files.file.data,
        Metadata: {
           uploader: "chase"
          }
    }
    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(data)
        }
    })

})
app.post('/audio_sql', (req, res) => {
    const {audioId, title, subject, shcoolLevel, series, selectedUsers, description} = req.body;
    console.log("body: ", req.body)
            const date = moment().format('YYYY-MM-DD')

            const sql = `INSERT INTO PeerPod1.Podcast_Data_Table (dataId, podcastId, date, title, description) VALUES ('${uuidv4()}', '${audioId}', '${date}', '${title}', '${description}')`                                                                         
            db.query(sql, (err, result) => {
                if (err) throw err;
            })
            selectedUsers.forEach((user) => {
                const hostSql = `INSERT INTO PeerPod1.Podcasts_Users_Table (id, podcastId, userId, role) VALUES ('${uuidv4()}', '${audioId}', '${user.userId}', '${user.role}')`                                                                         
                db.query(hostSql, (err, result) => {
                    if (err) throw err;
                })
            })
            setTimeout(() => {
                res.send("good job!")
            }, [5000])
})
app.get("/list", async (req, res) => {
    let r = await s3.listObjectsV2({Bucket: BUCKET}).promise();
    let x = r.Contents.map(item=>item)
    res.send(x)
})

app.get('/audio_file', (req,res) => {
    const key = req.params.key;
   const readStream =  getFileStream(key);
   readStream.pipe(res)
})
app.get('/get_one', async (req,res) => {
    const downloadParams = {
        Key: "ea7c4edc-1199-481a-9fde-07a25cdf3854",
        Bucket: process.env.BUCKET,

    }
    s3.getObject(downloadParams, function(err, data) {
        if (err) {
            res.send(err)
        } else 
        {
            res.send(data)
        }
    })
    // s3.getObject(downloadParams).createReadStream().pipe(res)
})

app.post('/get_participants', (req, res) => {
    let sql = `SELECT * FROM PeerPod1.Podcasts_Users_Table WHERE podcastId = "${req.body.id}"`
    db.query(sql, (err, result) => {
        res.send(result)
    })
})
app.post('/get_user_info', async (req, res) => {
    console.log("body::: ", req.body)
    let users = await getAllUsers();
    console.log(users)
    let namesAndIds = []
    users.Items.forEach((item) => {
        let nameAndId = {
            name: item.firstName,
            id: item.userId
        }
        namesAndIds.push(nameAndId)
    })
    res.send(namesAndIds)
})

app.get('/get_random_podcast_data', (req, res) => {
    let sql = `SELECT * FROM PeerPod1.Podcast_Data_Table LIMIT 3`
    db.query(sql, (err, result) => {
        res.send(result)
    })
})
app.post('/get_podcast_participants', async (req, res) => {
    console.log("par body: ", req.body)
    let sql = `SELECT userId FROM PeerPod1.Podcasts_Users_Table WHERE podcastId = '${req.body.podcastId}'`
    db.query(sql, async (err, result) => {
        console.log("res: ", result)
        let userIds = JSON.parse(JSON.stringify(result));
        
        console.log("ids: ", userIds)

        const users = await Promise.all(userIds.map(async (object) => {
            let usrSql = `SELECT userId, firstName, lastName FROM PeerPod1.Users WHERE userId = '${object.userId}' LIMIT 1`
            let myResult
            return new Promise(resolve => {
                db.query(usrSql, (err, usrResult) => {
                    console.log("RESULT: ", usrResult)
                    resolve(JSON.parse(JSON.stringify(usrResult[0])))
                })
            })
        }))
        console.log(users);
        res.send(users)
        // res.send(result)
    })
})





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
