# cocoscreator_hall_with_subgames_demo


大厅和子游戏均为正常cocos creater项目，只是热更新的时候指向的地址和本地保存的目录不一样。
##热更新
1.  创建大厅项目
详细逻辑见 hall项目

2.  创建子游戏项目
详细逻辑见 subgame项目

注意：坑1，不要都创建helloworld，可以一个空项目，一个helloworld项目再修改，否则加载子游戏的时候会爆错
Class already exists with the same __cid__ : "280c3rsZJJKnZ9RqbALVwtK".
导致子游戏按钮点起来没反应！

3，  创建hotupdate文件夹，目的为托管热更新文件，在hotupdate项目的public文件夹下创建remote-assets文件夹。

4，  在subgame项目根目录下创建build-template/jsb-binary/src文件夹，新建main.js dating.js文件在此文件夹，具体代码参见对应文件，这样每次构建编译，ccc就会自动帮你拷贝到build文件夹下面对应路径。

用cocoscreater构建，编译subgame。

然后在subgame根目录下，执行命令：
node version_generator.js -v 1.0.0 -u http://10.180.5.150:8101/remote-assets/subgame/ -s build/jsb-binary -d remote-assets/
生成子游戏的热更新文件。

拷贝build/js-binary下生成的res和src文件夹到 romote-assets文件夹。
此时，子游戏的所有热更新文件已经生成完毕。

5，  拷贝subgam项目下romote-assets里面的所有文件到hotupdate项目下的public/romote-assets/subgame文件。

注意：坑2，生成的project.manifest放到public/romote-assets/subgame要改名字，改成跟代码里对应的名字，只要不叫project.manifest就行，例如peision.manifest或则sub_game_project.manifest（此处可以修改version_generator.js脚本逻辑给其重命名，免掉手动修改的麻烦）否则每次重启APP都会清空本地下载的子游戏，导致再次进入不了，具体原因未知。

启动hotupdate，在浏览器打开http://10.180.5.150:8101/remote-assets/subgame/version.manifest如果能看到正常的version.manifest内容说明，服务器搭建成功，热更新文件能正常访问。


##数据传递

###main.js
1.初始化window.gameMgr对象
```$xslt
// load scene
cc.director.loadScene(launchScene, null,
    function () {
        if (cc.sys.isBrowser) {
            // show canvas
            canvas.style.visibility = '';
            var div = document.getElementById('GameDiv');
            if (div) {
                div.style.backgroundImage = '';
            }
        }
        cc.loader.onProgress = null;
        console.log('Success to load scene: ' + launchScene);
        cc.gameMgr = {}
    }
);

```



###hall.js
2.将大厅数据赋值给windows.gameMgr.hall，并且获取子游戏数据

```$xslt
cc.gameMgr.hall = "hall";
if ("undefined" != typeof(cc.gameMgr.subgame)){
    this.tips.string = cc.gameMgr.subgame;
}
```

###HelloWorld.js
3.将子游戏数据赋值给windows.gameMgr.subgame，并且获取大厅数据

```$xslt
cc.gameMgr.subgame = "subgame";
if ("undefined" != typeof(cc.gameMgr.hall)){
    this.label.string = cc.gameMgr.hall;
}
```
