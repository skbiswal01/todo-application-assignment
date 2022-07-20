const express = require("express");
const router = express.Router();
const fs = require('fs')
const path = require("path");
const filepath = path.join(__dirname, "../data.json")

// getting all users
router.get("/", async (req, res) => {
    try {

        const data = fs.readFileSync(filepath, 'utf8');
        // parse JSON string to JSON object
        const { User } = JSON.parse(data);

        return res.send(User)

    } catch (err) {
       
        return res.send(err)
    }
})

// delete user by userID 
router.delete("/:id",(req,res)=>{
    try {
        // read the file
        fs.readFile(filepath, 'utf8', (err, data) => {

            if (err) {
                console.log(`Error reading file from disk: ${err}`);
                res.send({ message: err })
            } else {
                let update = null;
                const databases = JSON.parse(data);
                for (let i = 0; i < databases.User.length; i++) {
                    if (databases.User[i].userId == req.params.id) {
                        update = databases.User.splice(i,1);
                        // console.log(databases, databases.User)
                        break;
                    }
                }
                // write new data back to the file
                fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
                    if (err) {

                        console.log(`Error writing file: ${err}`);
                        return res.send({ message: err.message })
                    }
                });
                return res.send(update)
            }

        });
    } catch (error) {
        return res.send(err)
    }
})

// get user by id 
router.get("/:id", async (req, res) => {
    try {
        const data = fs.readFileSync(filepath, 'utf8');
        let { User } = JSON.parse(data);
        for (let i = 0; i < User.length; i++) {
            if (User[i].userId == req.params.id) {
                return res.send(User[i])
            }
        }
   return res.send({})
    } catch (error) {
        return res.send(err)
    }
})

module.exports = router