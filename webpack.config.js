const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development", // 여기에 mode 설정 추가
  watch: true,
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recorder: "./src/client/js/recorder.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true, //output folder를 build를 시작하기 전에 clean해 주는 것이다.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          //여기 위 까지는 기억해야한다.
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //webpack은 뒤에서부터 시작한다
        //sass-loader는 scss를 normal-css로 변경한다. 브라우저는 scss를 이해하지 못 한다.
      },
    ],
  },
};

//모든 파일에는 entry와 output이 필요하다.
//entry는 우리가 처리하고자 하는 파일이다.
