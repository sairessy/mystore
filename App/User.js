const database = require('../server');

class User {
    // Add a new user
    add(req, res, data) {

        database.users.find({}, (err, d)=> {
            let used = false;

            for(let i=0; i<d.length; i++) {
                if(d[i].email == data.email) {
                    used = true; 
                    break;
                }      
            }
    
            if(!used) {
                database.users.insert(data);
            }
            
            res.json({used});
            
        }); 
    }

    // Request permition to log in
    requestLogin(req, res, data) {
        database.users.find({}, (err, d)=> {
            let success = false;

            for(let i=0; i<d.length; i++) {
                if(d[i].email == data.email && d[i].password == data.password ) {
                    success = true;
                    let cookie = req.cookies.user;

                    if(cookie == undefined || cookie == '') {
                        res.cookie('user', d[i]._id, {maxAge: 900000, httpOnly: true});
                    } 
                    
                    break;
                }      
            }

            res.json({success});
        });
    }

    // Change password
    updatePassword(req, res, data) {
        database.users.find({password: data.old}, (err, d)=> {
            const success =  d.length > 0;

            if(success) {
                database.users.update({_id: req.cookies.user}, { $set: { password: data.pass } }, {}, (err, numReplaced)=> {
                    console.log(numReplaced);
                    if(err) {
                        console.error(err);
                        return;
                    }
                });
            }

            res.json({success});
        });
    }
}


module.exports = User;