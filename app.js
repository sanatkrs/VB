const express  = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js")
const port = process.env.PORT || 3001;

const app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

const itemSchema = {
    name: String
}

mongoose.connect('mongodb+srv://sanat:test123@cluster0.iie0kzp.mongodb.net/todoListDB');

const Item = mongoose.model("person", itemSchema)

const item1 = new Item({
    name: "Buy Food"
});

const item2 = new Item({
    name: "Cook Food"
});

const item3 = new Item({
    name: "Eat Food"
});

const itemArr = [item1, item2, item3];


var workItemList = []

app.get("/", function(req, res) {

    let today = date.getDate()

    Item.find({}, function(err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(itemArr, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("Successfully saved default items to DB")
                }
            })
        } 

        res.render("list", {kindOfDay: today, newListItem: foundItems})
        
     })
})

app.get("/work", function(req, res) {
    res.render("list", {kindOfDay: "Work List", newListItem: workItemList})
})

app.post("/", function(req, res) {

    const itemName = req.body.newItem

    const item = new Item({
        name: itemName
    })

    item.save()

    if (req.body.list === "Work") {
        workItemList.push(req.body.newItem)
        res.redirect("/work")
    } else { 
        res.redirect("/")
    }    
    
})

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox

    Item.findByIdAndDelete(checkedItemId, function(err) {
        if (!err) {
            console.log("Succfully Deleted the checked item.")
            res.redirect("/")
        }
    })
})

app.listen(port, function(){
    console.log("Server started on port " + port)
})