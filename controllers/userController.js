import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type == "admin") {
    if (req.user == null) {
      res.json({
        message: "Please login as administrator to create admin account",
      });
      return;
    }

    if (req.user.type != "admin") {
      res.json({
        message: "Please login as administrator to create admin account",
      });
      return;
    }
  }

  newUserData.password = bcrypt.hashSync(newUserData.password, 10);

  const user = new User(newUserData);

  user
    .save()
    .then(() => {
      res.json({
        message: "User created",
      });
    })
    .catch(() => {
      res.status(403).json({
        message: "User not created",
      });
    });
}

export function loginUser(req, res) {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length == 0) {
      res.json({
        message: "User not found",
      });
    } else {
      const user = users[0];

      const isPasswordCrorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (isPasswordCrorrect) {
        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isBlocked: user.isBlocked,
            type: user.type,
            profilePicture: user.profilePicture,
          },
          process.env.SECRET_KEY
        );

        res.json({
          message: "User logged in",
          token: token,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            profilePicture: user.profilePicture,
            email: user.email,
            isBlocked: user.isBlocked,
          },
        });
      } else {
        res.json({
          message: "User not logged in (wrong password)",
        });
      }
    }
  });
}
export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.type != "admin") {
    return false;
  }

  return true;
}

export function isCustomer(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.type != "customer") {
    return false;
  }

  return true;
}

export async function googleLogin(req,res){
    const token = req.body.token
    //'https://www.googleapis.com/oauth2/v3/userinfo'
    try{
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const email = response.data.email
      //check if user exists
      const usersList = await User.find({email: email})
      if(usersList.length >0){
        const user = usersList[0]
        const token = jwt.sign({
          email : user.email,
          firstName : user.firstName,
          lastName : user.lastName,
          isBlocked : user.isBlocked,
          type : user.type,
          profilePicture : user.profilePicture
        } , process.env.SECRET_KEY)
        
        res.json({
          message: "User logged in",
          token: token,
          user : {
            firstName : user.firstName,
            lastName : user.lastName,
            type : user.type,
            profilePicture : user.profilePicture,
            email : user.email
          }
        })
      }else{
        //create new user
        const newUserData = {
          email: email,
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          type: "customer",
          password: "ffffff",
          profilePicture: response.data.picture
        }
        const user = new User(newUserData)
        user.save().then(()=>{
          res.json({
            message: "User created"
          })
        }).catch((error)=>{
          res.status(403).json({      
            message: "User not created"
          })
        })
  
      }
  
    }catch(e){
      res.json({
        message: "Google login failed"
      })
    }
  }

export async function getUser(req, res) {
  if (req.user == null) {
    res.status(404).json({
      message: "Please login to view user details",
    });
    return;
  }
  res.json(req.user);
}

export function getAllUsers(req, res) {
  User.find({}).then((users) => {
    res.json(users);
  });
}

export function updateUserType(req, res){
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as admin to edit User Type",
    });
    return;
  }

  const userEmail = req.params.email;
  const newUser = req.body;

  User.updateOne({email : userEmail}, newUser).then(
    ()=>{
      res.json({
        message : "User Type updated."
      })
    }
  ).catch(
    (e)=>{
      res.status(403).json({
        message : e
      })
    })
}

export function changeUserInfo(req, res) {
  if (req.user == null) {
    res.status(404).json({
      message: "Please login to edit user details",
    });
    return;
  }

  const userEmail = req.user.email;
  const newUser = req.body;

  User.updateOne({ email: userEmail }, newUser)
    .then(() => {
      res.json({
        message: "User details updated.",
      });
    })
    .catch((e) => {
      res.status(403).json({
        message: e,
      });
    });
}

// {
//     "email": "sandun250@example.com","password": "hashedpassword123" ---- "admin",
// }

// {
//     "email": "sandun200@example.com","password": "hashedpassword123" --- "coustomer"
// }
