import express from "express";
import {
  edit,
  remove,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id(\\d+)/edit", edit);
userRouter.get("/:id(\\d+)/delete", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
userRouter.get("/:id(\\d+)", see);
userRouter.get("/logout", logout);
export default userRouter;
