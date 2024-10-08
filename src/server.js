import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express(); //express application을 만든다.
const logger = morgan("dev");
app.use(logger);

//서버를 시작하도록 하는 애플리케이션
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // 이것은 express의 어플리케이션이 form의 value를 이해할 수 있도록 하고, 우리가 쓸 수 있는 멋진 자바스크립트 형식으로 변형시켜 줄 것이다.

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); //노출 시키고 싶은 폴더의 이름을 적는다
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);
app.use("/ffmpeg", express.static("node_modules/@ffmpeg"));

export default app;
