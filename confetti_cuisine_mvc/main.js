'use-strict';

const express = require("express"),
 layouts = require("express-ejs-layouts"),
 app = express(),
 router = express.Router(),

 homeController = require("./controllers/homeController.js"),
 errorController = require("./controllers/errorController.js"),
 subscrbersController = require("./controllers/subscribersController.js"),
 usersController = require("./controllers/usersController.js"),
 coursesController = require("./controllers/coursesController.js"),

 bodyParser = require("body-parser"),
 mongoose = require("mongoose"),
 methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/confetti_cuisine");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));
router.use(layouts);
router.use(express.static("public"));
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

//Home routes...
router.get("/", homeController.index);

//Users routes...
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);















const express = require("express"),
 homeController = require("./controllers/homeController.js"),
 errorController = require("./controllers/errorController.js"),
 subscribersController = require("./controllers/subscribersController.js"),
 layouts = require("express-ejs-layouts"),
 mongoose = require("mongoose"),
 app = express();

 //Connect to ddbb and create confetti_cuisine if not exists
 mongoose.connect("mongodb://localhost:27017/confetti_cuisine");

//Setting variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

//Routes...
app.get("/", homeController.showHomePage);
app.get("/courses", homeController.showCourses);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

//Middleware...
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http:localhost:${app.get("port")}`);
});