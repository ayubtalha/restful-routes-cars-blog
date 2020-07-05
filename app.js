var bodyParser      = require("body-parser"),
	methodOverride  = require("method-override"),
	mongoose        = require("mongoose"),
	express         = require("express"),
	app             = express()

mongoose.connect("mongodb://localhost:27017/cars_restfulapp", { useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"))

var carSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
})

var Car = mongoose.model("Car", carSchema)

// Car.create({
// 	title: "Car Post 2",
// 	image: "https://images.unsplash.com/photo-1493031534415-e40b830b1099?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	body: "Cars can be helpful for limitng the distance between two destinations.Cars can be helpful for limitng the distance between two destinations.Cars can be helpful for limitng the distance between two destinations."
// })
	
//config
app.get("/",function(req,res){
	res.redirect("/cars")
})

//index
app.get("/cars",function(req,res){
	Car.find({},function(err, carsIndex){
		if(err){res.redirect("/cars")}
		else {
			res.render("index", {carsIndex : carsIndex})
		}
	})
})

//new
app.get("/cars/new",function(req,res){
	res.render("new")
})

//create
app.post("/cars", function(req,res){
	Car.create(req.body.car,function(err, createnewpost){
		if(err){res.render("new")}
		else {res.redirect("/cars")}
	})
})

//show
app.get("/cars/:id",function(req,res){
	Car.findById(req.params.id,function(err,showpost){
		if(err){console.log(err)}
		else {res.render("show",{showpost:showpost})}
	})
})

//edit
app.get("/cars/:id/edit",function(req,res){
	Car.findById(req.params.id,function(err,editpost){
		if(err){console.log(err)}
		else {res.render("edit", {editpost: editpost})}
	})
})

//update
app.put("/cars/:id",function(req,res){
	Car.findByIdAndUpdate(req.params.id, req.body.car,function(err, updatedpost){
		if(err){console.log(err)}
		else{res.redirect("/cars/" + req.params.id)}
	})
})

//delete
app.delete("/cars/:id",function(req,res){
	Car.findByIdAndRemove(req.params.id, function(err, dletedpost){
		if(err){console.log(err)}
		else{res.redirect("/cars")}
	})
})

//port
app.listen(7485, function(){
	console.log("server has started working on 7485")
})

