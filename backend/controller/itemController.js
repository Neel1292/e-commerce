const pool = require('../db.js');

exports.getAllItems = async(req, res) => {
    let items = await pool.query("SELECT id, item_name, item_description, item_price, encode(item_image, 'base64') AS item_image, created_at, seller_name FROM items");
    res.status(200).json({item: items.rows});
}

exports.getOneItem = async(req, res) => {
    let items = await pool.query("SELECT id, item_name, item_description, item_price, encode(item_image, 'base64') AS item_image, created_at FROM items WHERE id = $1", [req.params.id]);
    res.status(200).send(items.rows[0]);
}

exports.addItem = async(req, res) => {
    let {  item_name, item_description, item_price, seller_name } = req.body;
    let item_image = req.file.buffer;
    let { role } = req.user;

    if(role === 'admin') {
        let item = await pool.query('INSERT INTO items (item_name, item_description, item_image, item_price, seller_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [item_name, item_description, item_image, item_price, seller_name]);

        res.status(201).json({ item: item.rows[0], message: "Item Added Successfully" }); 
    } else {
        res.status(404).json({ message: "Please Contact Admin to Add  your product" });
    }
}   

exports.updateItem = async(req, res) => {
    let {  item_name, item_description, item_price, seller_name } = req.body;
    let item_image = req.file.buffer;
    let { role } = req.user;

    if(role === 'admin') {

        await pool.query('UPDATE items SET item_name = $1, item_description =$2, item_image = $3, item_price = $4, seller_name = $5 WHERE id = $6', [item_name, item_description, item_image, item_price, seller_name, req.params.id]);
    }

    res.status(201).json({ message: "Item Updated Successfully" });  
}   

exports.deleteItem = async(req, res) => {
    try {
        let { rows } = await pool.query('DELETE FROM items WHERE id = $1 RETURNING id', [req.params.id])
        res.status(201).json({ id: rows[0], message: "Item Deleted Successfully" });  
    }catch(error) {
        res.status(401).send('Error while deleteing item');
    }

}   