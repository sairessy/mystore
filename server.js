// Node modules
const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const multer = require('multer');

// App modules


const upload = multer({dest: 'public/upload'});

const app = express();

app.use(express.static('public'));


const port = process.env.PORT || 3000;

app.listen(port);

app.use(express.json());

app.use(cookieParser());

const pages = {
    index: 'public/index.html',
    category: 'public/category.html',
    details: 'public/details.html',
    login: 'public/login.html',
    panel: 'public/panel.html',
    search: 'public/search.html',
    signup: 'public/signup.html',
    store: 'public/store.html',
    promotion: 'public/promotion.html'
}

// Create database
const database = {
    users: new Datastore('users.db'),
    items: new Datastore('items.db'),
    deleted: new Datastore('deleted.db'),
    errorUpload: new Datastore('errorupload.db')
}; 


database.users.loadDatabase();
database.items.loadDatabase();
database.deleted.loadDatabase();
database.errorUpload.loadDatabase();


module.exports = database;
//  User class
const User = require('./App/User');

const user = new User();

app.listen(8080);

// Registry new user
app.post('/adduser', (req, res)=> {
    const data = req.body;
    user.add(req, res, data);
});

// Check login status
app.post('/requestlogin', (req, res)=> {
    const data = req.body;
    user.requestLogin(req, res, data);
});

// Update profile info
app.post('/updateprofile', upload.single('store_photo'), (req, res, next)=> {
    const data = req.body;
    const file = req.file; 
    const id = req.cookies.user;

    const mimetype = file.mimetype;
    
    if(mimetype == 'image/png' || mimetype == 'image/jpeg') {
        // Remove old profile image
        database.users.find({_id: req.cookies.user}, (err, _d)=>{
            const path = __dirname + '/' + 'public/upload/' + _d[0].img;
            fs.unlink(path, (err)=> {
                if(err) {
                    console.error(err);
                }
            });
        });

        database.users.update({_id: req.cookies.user}, { $set: { img: file.filename } }, {}, (err, numReplaced)=> {
            if(err) {
                console.error(err);
                return;
            }
        });

        database.users.update({_id: req.cookies.user}, { $set: { store: data.store_name } }, {}, (err, numReplaced)=> {
            if(err) {
                console.error(err);
                return;
            }
        });

        database.users.update({_id: req.cookies.user}, { $set: { contact: data.store_number } }, {}, (err, numReplaced)=> {
            if(err) {
                console.error(err);
                return;
            }
        });

        
    } else {
        const path = __dirname + `/public/upload/${file.filename}`; 

        fs.unlink(path, (err)=> {
            if(err) {
                console.error(err);
                return;
            }
        });
    }

    // res.sendFile( __dirname + "/" + "public/panel.html" );
    res.writeHead(302, {
        'Location': '/panel'
    });

    res.end();
});

// update password
app.post('/updatepassword', (req, res)=> {
    let data = req.body;
    user.updatePassword(req, res, data);
    
});

// Add items
app.post('/additem', upload.single('file_img'), (req, res, next)=> {
    const data = req.body;
    const file = req.file; 

    const promoting = (data.promoting == 'on');

    const mimetype = file.mimetype; 


    if(mimetype == 'image/png' || mimetype == 'image/jpeg') {
        database.items.insert({
            title: data.txt_title,
            price: data.price, 
            promoting,
            who: req.cookies.user, 
            img: file.filename, 
            category: data.category,
            city: data.city,
            description: req.body.description,
            date: Date.now(),
            views: 0,
            deleted: false
        });

        res.writeHead(302, {
            'Location': '/panel'
        });

        res.end();

    } else {
        database.errorUpload.insert({_file: file.filename});
        res.send(`O ficheiro carregado não é uma imagem <a href="/panel">voltar ao painel"`);
    }    
    
});

// Delete items
app.post('/deleteitem', (req, res)=> {
    database.items.find({_id: req.body.id}, (err, d)=> {
        const path = __dirname + `/public/upload/${d[0].img}`; 
        
        fs.unlink(path, (err)=> {
            if(err) {
                console.error(err);
                return;
            }
        })
        database.deleted.insert(d);
    });

    database.items.remove({_id: req.body.id});
    res.end();
});


// Get published items to display on the webpage

app.get('/items', (req, res)=> {

    database.items.find({}, (err, data)=> {
        let d = data;
        database.users.find({}, (err, _data)=> {
            for(let i=0; i<d.length; i++) { 
                for(let j=0; j<_data.length; j++) { 
                    if(d[i].who == _data[j]._id) {
                        d[i].store = _data[j].store;
                        d[i].imgUser = _data[j].img;
                        break;
                    }                    
                }
            }

            res.json(d);
        });
        
    }); 

});

// Get user given id

app.get('/user', (req, res)=> {
    database.users.find({_id: req.cookies.user}, (err, data)=> {

        res.json(data);
    });
});

// Get my items to display on the panel
app.get('/myitems', (req, res)=> {

    database.items.find({who: req.cookies.user}, (err, d0)=> {
        res.json(d0);
    });
});

// REDIRECTS TO SPECIFIC ROUTES
// Logout the user
app.get('/logout', (req, res)=> {
    res.cookie('user', '' , {maxAge: 0});
    
    res.writeHead(302, {
        'Location': '/login'
    });

    res.end();
});

// Get items details and update num views
app.post('/details',(req, res)=> {
   
    database.items.find({_id: req.body.id}, (err, d0)=> {
        let data = d0[0];

        // Update num views
        database.items.update({_id: req.body.id}, { $set: { views: d0[0].views+1 } }, {}, (err, numReplaced)=> {
            if(err) {
                console.error(err);
                return;
            }
        });
    
        database.users.find({_id: data.who}, (err, d1)=> {
            data.contact = d1[0].contact;
            data.store = d1[0].store;
            // Update views
            res.json(data);
        });
    });
});

// Get items store
app.post('/store',(req, res)=> {
    const url = new URL(req.headers.referer);
    const id = url.searchParams.get('id');
    // console.log(id)
    
    database.items.find({who: id}, (err, d)=> {
        let data = d;
        database.users.find({_id: id}, (err, _d)=> {
            for(let i=0; i<data.length; i++) { 
                for(let j=0; j<_d.length; j++) { 
                    if(data[i].who == _d[j]._id) {
                        data[i].store = _d[j].store;
                        data[i].imgStore = _d[j].img;
                        break;
                    }                    
                }
            }

            res.json(data);
        });
        
    });
});


// SERVE HTML PAGES
// Login page
app.get('/login', (req, res)=> {
    database.users.find({_id: req.cookies.user}, (err, data)=> {
        if(data.length > 0) {
            res.writeHead(302, {
                'Location': '/panel'
            });

            res.end();
        
        } else {
            res.sendFile(__dirname + "/" + pages.login);
        }
    });
});

app.get('/signup', (req, res)=> {
    database.users.find({_id: req.cookies.user}, (err, data)=> {
        if(data.length > 0) {
            res.sendFile(__dirname + "/" + pages.panel);
        
        } else {
            res.sendFile(__dirname + "/" + pages.signup);
        }
    });

});

// Panel page
app.get('/panel', (req, res)=> {
    database.users.find({_id: req.cookies.user}, (err, data)=> {
        if(data.length > 0) {
            res.sendFile(__dirname + "/" + pages.panel);
        } else {
            res.send(`Tem de efectuar o login para acessar esta página! <a href='/login'>fazer login</a>`);
        }
    });
});

// Home page
app.get('/home', (req, res)=> {
    res.sendFile( __dirname + "/" + pages.index);
});

// details page
app.get('/details', (req, res)=> {
    res.sendFile( __dirname + "/" + pages.details);
});

// Search page
app.get('/search', (req, res)=> {
    res.sendFile(__dirname + "/" + pages.search);
});

// Category page
app.get('/category', (req, res)=> {
    res.sendFile(__dirname + "/" + pages.category);
});

// Store page
app.get('/store', (req, res)=> {
    res.sendFile(__dirname + "/" + pages.store);
});

// Promotion
app.get('/promotion', (req, res)=> {
    res.sendFile(__dirname + "/" + pages.promotion);
});

app.use(express.static(__dirname + '/public'));

