const pool = require('../db.js');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../middleware/authToken.js');

exports.signup = async (req, res)=>{
    try {
        const {name, email, password, phone, address, role} = req.body;

        if (!name || !email || !password || !phone || !address || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        let { rowCount } = await pool.query("SELECT * FROM ecom_users WHERE email = $1", [email]);

        if (rowCount.length > 0 ) {
            return res.status(400).json({ error: 'This email already exists, try another' });
        } else {
            bcrypt.genSalt(12, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    let {rows } = await pool.query(
                        "INSERT INTO ecom_users (name , email, password, phone, address, role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [name, email, hash, phone, address, role]
                    );

                    const token = generateJWT({ name, email, role });
                    res.status(200).json({user: rows[0], "token": token});
                })
            });


        }
    }
     catch (error) {
        res.status(500).json({ error: 'Internal Server Error From Signup' });
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password, role } = req.body;

        if ( !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        } 
        
        let { rows: results, rowCount } = await pool.query("SELECT * FROM ecom_users WHERE email = $1",[email]);
        let name = results[0].name;

        if(rowCount == 0){
            res.status(400).json({"error" : "Invalid email or password"});
        } else {
            let value = bcrypt.compare(password, results[0].password)

            if(!value || role !== results[0].role){
                res.status(400).json({"error" : "Invalid email or password"})
            } else {    
                const token = generateJWT({ name, email, role});
                res.status(200).json({"user": results[0], "token": token})
            }
        }
    }
    catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.update = async (req, res) => {
    try{
        const { name, email, phone, address, role } = req.body;

        if ( !name || !email || !phone || !address ) {
            return res.status(400).json({ error: 'All fields are required' });
        } 
        
        let { rows, rowCount } = await pool.query("UPDATE ecom_users SET name = $1, email = $2, phone = $3, address = $4, role = $5 WHERE id = $6 RETURNING id, name, email, address, phone, role",[name, email, phone, address, role, req.params.id]);
        
        if (!rowCount) {
            res.status(400).json({ error: "Error while updating..." });
        }
        
        res.status(200).send(rows);
    }
    catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getUsers = async (req, res) => {
    try{
        let { role } = req.user

        if(role === 'admin') {  
            let { rows } = await pool.query("SELECT * FROM ecom_users");     
            res.status(200).send(rows);
        }
    }
    catch(error) {
        res.status(500).json({ error: 'Server Error Please contact your Admin...' });
    }
}

exports.addUser = async (req, res)=>{
    try {
        if(req.user.role === 'admin') {

            const {name, email, password, phone, address, role} = req.body;

            if (!name || !email || !password || !phone || !address || !role) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            
            let { rowCount } = await pool.query("SELECT * FROM ecom_users WHERE email = $1", [email]);

            if (rowCount.length > 0 ) {
                return res.status(400).json({ error: 'This email already exists, try another' });
            } else {
                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(password, salt, async (err, hash) => {
                        let { rows } = await pool.query(
                            "INSERT INTO ecom_users (name , email, password, phone, address, role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [name, email, hash, phone, address, role]
                        );
                        
                        res.status(200).json({ user: rows })
                    })
                });
            }
        }
    }
     catch (error) {
        res.status(500).json({ error: 'Internal Server Error From Signup' });
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        if(req.user.role === 'admin') {
            
            let { rows, rowCount } = await pool.query("DELETE FROM ecom_users WHERE id = $1 RETURNING id", [req.params.id]);

            if (rowCount > 0 ) {
                res.status(200).send(rows);
            } else {
                res.status(400).json({ error: 'Error while deleting user, try again later' });
            }
        }
    }
     catch (error) {
        res.status(500).json({ error: 'Internal Server Error From Signup' });
    }
}