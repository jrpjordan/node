const express = require("express"),
 homeController = require("./controllers/homeController.js"),
 errorController = require("./controllers/errorController.js"),
 layouts = require("express-ejs-layouts"),
 app = express();

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
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

//Middleware...
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http:localhost:${app.get("port")}`);
});