import { SignIn, SignUp, ChangePassword, ForgotPassword } from "./auth.mjs";

const authRoutes = (router) => {
  router.post("/sign-in", (req, res) => SignIn(req, res));
  router.post("/sign-up", (req, res) => SignUp(req, res));
  router.post("/forgot-password", (req, res) => ForgotPassword(req, res));
  router.post("/change-password", (req, res) => ChangePassword(req, res));
};

export default authRoutes;
