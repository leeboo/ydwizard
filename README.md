# YDWizard

帮助你的网站建立使用向导

**用法**

引入js文件：`<script src="pathto/dist/ydwizard.umd.js"></script>`

**设置模式**：

`ydwizard.startSetting()`

然后在界面上点击元素添加操作向导，最好导出向导配置，把配置文件放到生产环境中。

**生产环境：**

自行根据cookie等判断向导是否已经显示过了，没显示则调用：

`ydwizard.start(config, function (){
   // 关闭向导回掉
   })`

显示向导，其中config是设置模式导出等向导配置文件
