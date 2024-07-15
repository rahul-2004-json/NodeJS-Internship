const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto"); //package for hashing the password

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/public/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"], //enum is basically a type of array with constant values , by defining this a client can select only from USER and ADMIN
      default: "USER",
    },
  },
  { timestamps: true }
);

//We can make changes in the data before adding it inside the Mongoose
userSchema.pre("save", function (next) {
  const user = this; //here this is basically pointing towards the user

  //If the path password is not getting modified inside user then just simply return it
  if (!user.isModified("password")) return;

  //creating a salt to be added to hashed password
  const salt = randomBytes(16).toString(); //salt is random letters to be added to password
  const hashedPassword = createHmac("sha256", salt) //sha256 is algorithm and salt is random letters or secret
    .update(user.password) //this updates the password inside the user
    .digest("hex");

  //Updating the salt and password of user before adding to the mongoose
  this.salt = salt;
  this.password = hashedPassword;

  next();
});

//matchPassword is the static function name
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  //Bringing the current salt and hashedpassword
  const salt = user.salt;
  const hashedPassword = user.password;

  //creating hashed password again with pre-existing salt and password just to match with entered password
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedHash)
    throw new Error("Incorrect Password or email");

  //if password is correct then we return the user but not the password ,salt
  return { ...user, password: undefined, salt: undefined };
});

const User = model("user", userSchema);

module.exports = User;
