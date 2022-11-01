import users from "./User.mjs";

/** Sign In
 * This function signs a user in.
 * @param {*} req Takes in the data sent from the user
 * @param {*} res Sends different statements back depending on information sent by user.
 */

async function SignIn(req, res) {
  const { body } = req;
  let statement;
  const { Email = "", Password = "" } = body;
  const signInResponse = await FindUser(Email);
  if (signInResponse.length > 0) {
    //Error checking to see if user entered correct username and/or password
    if (
      signInResponse[0].Email !== Email ||
      signInResponse[0].Password !== Password
    ) {
      statement = "Incorrect email address or password.";
    } else {
      statement = signInResponse;
    }
  } else {
    statement = "User not found";
  }
  res.send(statement);
}

/** SignUp
 * This function will sign a user up
 * @param {*} req Takes in data sent by the user
 * @param {*} res Sends the user back their sign in information based on information sent back by the CreateUser function.
 */
async function SignUp(req, res) {
  const signInResponse = await CreateUser(req);
  res.send(signInResponse);
}

/**
 * Forgot Password
 * This function will let the user change their password in case they forgot it.
 * @param {} req Takes in data sent by the user
 * @param {*} res Sends the user their data back.
 * @returns If the user doesn't exist it will send that information back to the user.
 */

async function ForgotPassword(req, res) {
  const userExists = await users.exists({ Email: req.body.Email });
  if (!userExists) {
    return "User doesn't exist, sign up or check if email is correct.";
  }
  const userFind = await FindUser(req.body.Email);
  userFind[0].Password = req.body.newPassword;
  await userFind[0].save();
  res.send(userFind);
}

/**
 * Change Password
 * This function will let the user change their password.
 * @param {*} req It will take in user information like their email, old password, and new password
 * @param {*} res It will send the user back their updated user credentials.
 */
async function ChangePassword(req, res) {
  const userFind = await FindUser(req.body.Email);
  if (userFind[0].Password === req.body.oldPassword) {
    userFind[0].Password = req.body.newPassword;
    await userFind[0].save();
    res.send(userFind[0]);
  } else {
    res.send("Incorrect password entered. Try forgot password.");
  }
}

/**
 * Create User
 * This function will create a user. It will run when called by the CreateUser function above.
 * @param {} req will take in user information
 * @returns if the user does exist then it will tell the user to sign in otherwise it will create a user based on req.
 */
async function CreateUser(req) {
  //Checking to see if user is already created. If it is then we will return a statement telling user to sign-in.
  const userExists = await users.exists({ Email: req.body.Email });
  if (userExists) {
    return "User exists. Sign in";
  }

  const savedUser = await users.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    Password: req.body.Password,
    Email: req.body.Email,
    Address: req.body.Address,
  });

  console.log("Saved User", savedUser);
  return savedUser;
}

/**
 * FindUser
 * This function will find the user in the database.
 * @param {*} emailId This function will find the user through their email id
 * @returns if the user exists then it will return the user otherwise it will tell the user to sign up.
 */
async function FindUser(emailId) {
  if (!users.exists({ Email: emailId })) {
    return "User doesn't exist. Sign up";
  }
  let userFind = await users.find({ Email: emailId });
  return userFind;
}

export { SignIn, SignUp, ChangePassword, ForgotPassword };

//To-DO
//- complete sign-in: DONE ✅
//  - get user email
//  - get user password
//  - check if user password/email is correct
//  - fetch details of each customer from database
//complete sign-up: DONE ✅
// - pass details in request
// - save in database
//forgot password: DONE ✅
// - ask for a new password from customer
// - replace old password with new password
// - take email from user to match with correct user
//change password: DONE ✅
// - old password (check if old password is correct, if correct then replace data)
// - new password
// - e-mail id (used to fetch user data)
