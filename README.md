# front-pc-scaffold
pc端项目结构示例(gulp+webpack+bootstrap)

# 项目目录说明
.
|-- src                              // 源码目录
|   |-- assets                       // 静态资源目录
|       |-- css                      // 自定义样式目录
|       |-- fonts                    // 字体图标存放目录
|       |-- images                   // 图片存放目录
|       |-- js                       // 自定义js代码目录
|           |-- public               // 公共js代码模块目录
|   |-- lib                          // 第三方依赖库及框架存放目录
|       |-- css                      // 第三方依赖样式目录
|       |-- js                       // 第三方依赖js文件目录
|-- views                            // 模板文件存放目录
|   |-- public                       // 公共组件模板存放目录
|-- .babelrc                         // ES6语法编译配置
|-- .jshintrc                        // JSHint配置
|-- gulpfile.js                      // 启动，打包，部署，自动化构建
|-- webpack.config.js                // js打包配置
|-- README.md                        // 项目说明
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建
|-- changelog.md                     // 版本迭代更新说明
.

# 运行程序
安装依赖包：npm install
编译打包并运行：gulp
清除打包文件：gulp clean
