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