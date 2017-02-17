# front-pc-scaffold
pc端项目结构示例(gulp+webpack+bootstrap)

# 项目目录说明
.<br />
|-- src                              // 源码目录<br />
|   |-- assets                       // 静态资源目录<br />
|       |-- css                      // 自定义样式目录<br />
|       |-- fonts                    // 字体图标存放目录<br />
|       |-- images                   // 图片存放目录<br />
|       |-- js                       // 自定义js代码目录<br />
|           |-- public               // 公共js代码模块目录<br />
|   |-- lib                          // 第三方依赖库及框架存放目录<br />
|       |-- css                      // 第三方依赖样式目录<br />
|       |-- js                       // 第三方依赖js文件目录<br />
|-- views                            // 模板文件存放目录<br />
|   |-- public                       // 公共组件模板存放目录<br />
|-- .babelrc                         // ES6语法编译配置<br />
|-- .jshintrc                        // JSHint配置<br />
|-- gulpfile.js                      // 启动，打包，部署，自动化构建<br />
|-- webpack.config.js                // js打包配置<br />
|-- README.md                        // 项目说明<br />
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建<br />
|-- changelog.md                     // 版本迭代更新说明<br />
.<br />

# 运行程序
安装依赖包：npm install<br />
编译打包并运行：gulp<br />
清除打包文件：gulp clean<br />
