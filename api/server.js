const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const User = require('./models/user.model');
const Product = require('./models/product.model');
const ProductValidation= require('./models/productValidation.model');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }); //! be careful of these parameters,mongodb 6 have omitted most of the old one

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});
//  todo const authorization = (req,res,next)=>{
//      req.body;
//      next();
//  }

app.post("/register", async (req, res) => {
 
     // Our register logic starts here
     try {
       // Get user input
       const {username, password,validator} = req.body;
   
       // Validate user input
       if (!(username && password && validator)) {
         res.status(400).send("All input is required");
       }
   
       // check if user already exist
       // Validate if user exist in our database
       const oldUser = await User.findOne({ username });
   
       if (oldUser) {
         return res.status(409).send("User Already Exist. Please Login");
       }
   
       //Encrypt user password
       encryptedPassword = await bcrypt.hash(password, 10);
       validatorStat= validator;
   
       // Create user in our database
       const user = await User.create({
         username: username, // sanitize: convert username to lowercase
         password: encryptedPassword,
         validator:validatorStat,
       });
       res.status(201).json(user);
     } catch (err) {
       console.log(err);
     }
     // Our register logic ends here
   });


app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { username, password } = req.body;
  
      // Validate user input
      if (!(username && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        console.log(user.validator);
        // Create token
        //let result ={username,password};
        const resUser= {
          username: user.username,
          validator: user.validator
        };
        // res.cookie('userData',resUser,{maxAge: 360000});
        res.status(200).json(resUser);
      }
      else{
      console.log(user);
      res.status(400).send("Invalid Credentials");
    }
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


// app.get("/logout",async(req,res)=> {
//   try{
//     res.clearCookie('userData');
//     console.log(req.cookies);
//   }catch(err){
//     console.log(err);
//   }
// });


app.post("/product", async(req, res) =>{
  if(req.cookies === null){
    res.send("Not logged  in");
    return;
  }
   try{
     const{product_name,product_type,product_price}= req.body;

     if (!(product_name && product_price && product_type)) {
      res.status(400).send("All input is required");
    }
    created_by=req.cookies;
    creator_name= created_by.userData.username;
    console.log(created_by.userData.username);

     const productDetail = await ProductValidation.create({
       product_name: product_name,
       product_type: product_type,
       product_price: product_price,
       created_by: creator_name,
       votes:0,
     });
     res.status(201).json(productDetail);
   }catch(err){
     console.log(err);
    }
}); 

app.get("/product/notvalidated", async(req,res) =>{
  ProductValidation.find({},function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
});


app.get("/product/validated", async(req,res) =>{
    Product.find({},function(err,result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
});

app.get("/product/validate/:id",async(req,res)=>{
  var fileId = req.params.id;
  //var o_id = mongoose.Types.ObjectId(fileId);
  //console.log(o_id);
  console.log(fileId);

  try{
    await ProductValidation.findOneAndUpdate(
      {
        "_id": fileId,
      },
      {
        $inc: {
          "votes": 1,
        }
      }
    )
    // try{
        var valProd = await ProductValidation.findOne({"_id":fileId});
        var votes=Number(valProd.votes);
        console.log(votes);
        console.log(valProd.product_name);
        if(votes>2){
          var productDetail = await Product.create({
            product_name: valProd.product_name,
            product_type: valProd.product_type,
            product_price: valProd.product_price,
  
          });
          await ProductValidation.deleteOne({"_id":fileId}).exec();
        }else{
          console.log("needs more vote");
        }

      //  }catch(err){
      //    console.log(err);
      //  }


  }catch(err){
    console.log(err);
  }


  //console.log(showRes);
})
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
