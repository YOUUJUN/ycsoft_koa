/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : ycsoft

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-02-10 16:00:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `post_id` varchar(255) NOT NULL,
  `post_author` varchar(255) DEFAULT NULL,
  `post_date` datetime DEFAULT NULL,
  `post_title` varchar(255) DEFAULT NULL,
  `post_content` mediumtext,
  `topic_id` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('79', '06ff49b0-1bc2-11e9-b6f4-efeb906e68fe', '1', '2019-01-19 16:12:56', '如何成为WEB前端开发工程师', '如何成为WEB前端开发工程师![](/users/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410/articles/0.3587873330408251.jpeg)', '14');
INSERT INTO `article` VALUES ('80', '1a7659c0-1bc2-11e9-b6f4-efeb906e68fe', '1', '2019-01-19 16:13:29', '如何使用NODE', '如何使用NODE', '15');
INSERT INTO `article` VALUES ('81', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '1', '2019-01-19 16:14:08', '谁能教教我多表查询', '谁能教教我多表查询\n\nSO SAD BRO', '16');
INSERT INTO `article` VALUES ('82', 'd0467a60-2e72-11e9-86b0-dbccef6f7c54', '1', '2019-02-12 11:03:46', 'ewewe', 'ewewe', '17');
INSERT INTO `article` VALUES ('85', 'bf95a150-2e95-11e9-91c1-c5afeea18dc6', '1', '2019-02-12 15:13:51', 'ewqe', 'weqe', '13');
INSERT INTO `article` VALUES ('87', '8504f680-2ea4-11e9-91c1-c5afeea18dc6', '1', '2019-02-12 16:59:35', 'sasas', '》sas', '19');
INSERT INTO `article` VALUES ('88', 'c63929a0-2ea4-11e9-91c1-c5afeea18dc6', '1', '2019-02-12 17:01:24', 'sadasdas', 'sadasda', '20');
INSERT INTO `article` VALUES ('89', '53b34550-31b5-11e9-bea4-4dfda5e3a803', '1', '2019-02-16 14:37:27', 'sdsad', 'sad', '13');
INSERT INTO `article` VALUES ('90', '9cbe9c90-31b5-11e9-9e7b-2b269d623f9c', '1', '2019-02-16 14:39:30', 'dasdds', 'saddsa', '13');
INSERT INTO `article` VALUES ('91', '84430900-31b8-11e9-9286-cd911267878d', '1', '2019-02-16 15:00:17', 'weqewqwe', 'weqwewqe', '13');
INSERT INTO `article` VALUES ('92', '8b6c39e0-31b8-11e9-9286-cd911267878d', '1', '2019-02-16 15:00:29', 'dasdsad', 'sdads', '21');
INSERT INTO `article` VALUES ('93', '50f71510-31c1-11e9-aff5-13b22906e99a', '1', '2019-02-16 16:03:16', 'ewqe', 'ewqwe', '22');
INSERT INTO `article` VALUES ('94', 'e3638f40-31c2-11e9-81e8-8905fedabf1e', '1', '2019-02-16 16:14:31', 'ewqe', 'weqwe', '23');
INSERT INTO `article` VALUES ('95', '1815b3d0-31c3-11e9-9fc8-bbb5a5c80194', '1', '2019-02-16 16:16:00', 'weqwe', 'ewqe', '24');
INSERT INTO `article` VALUES ('96', '38978a70-31c3-11e9-9fc8-bbb5a5c80194', '1', '2019-02-16 16:16:54', 'dsad', 'sdad', '25');
INSERT INTO `article` VALUES ('99', '2137c100-44a7-11e9-a0ef-8d85f4e44512', '1', '2019-03-12 17:13:41', 'Editor.md使用文档', '### 主要特性\n\n- 支持“标准”Markdown / CommonMark和Github风格的语法，也可变身为代码编辑器；\n- 支持实时预览、图片（跨域）上传、预格式文本/代码/表格插入、代码折叠、搜索替换、只读模式、自定义样式主题和多语言语法高亮等功能；\n- 支持ToC（Table of Contents）、Emoji表情、Task lists、@链接等Markdown扩展语法；\n- 支持TeX科学公式（基于KaTeX）、流程图 Flowchart 和 时序图 Sequence Diagram;\n- 支持识别和解析HTML标签，并且支持自定义过滤标签解析，具有可靠的安全性和几乎无限的扩展性；\n- 支持 AMD / CMD 模块化加载（支持 Require.js & Sea.js），并且支持自定义扩展插件；\n- 兼容主流的浏览器（IE8+）和Zepto.js，且支持iPad等平板设备；\n- 支持自定义主题样式；\n\n# Editor.md\n\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\n\n![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)\n\n**目录 (Table of Contents)**\n\n[TOCM]\n\n[TOC]\n\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md \"Heading link\") Heading link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n\n#### 标题（用底线的形式）Heading (underline)\n\nThis is an H1\n=============\n\nThis is an H2\n-------------\n\n### 字符效果和横线等\n                \n----\n\n~~删除线~~ <s>删除线（开启识别HTML标签时）</s>\n*斜体字*      _斜体字_\n**粗体**  __粗体__\n***粗斜体*** ___粗斜体___\n\n上标：X<sub>2</sub>，下标：O<sup>2</sup>\n\n**缩写(同HTML的abbr标签)**\n\n> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启\n\nThe <abbr title=\"Hyper Text Markup Language\">HTML</abbr> specification is maintained by the <abbr title=\"World Wide Web Consortium\">W3C</abbr>.\n\n### 引用 Blockquotes\n\n> 引用文本 Blockquotes\n\n引用的行内混合 Blockquotes\n                    \n> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](http://localhost/)。\n\n### 锚点与链接 Links\n\n[普通链接](http://localhost/)\n\n[普通链接带标题](http://localhost/ \"普通链接带标题\")\n\n直接链接：<https://github.com>\n\n[锚点链接][anchor-id] \n\n[anchor-id]: http://www.this-anchor-link.com/\n\nGFM a-tail link @pandao\n\n> @pandao\n\n### 多语言代码高亮 Codes\n\n#### 行内代码 Inline code\n\n执行命令：`npm install marked`\n\n#### 缩进风格\n\n即缩进四个空格，也做为实现类似`<pre>`预格式化文本(Preformatted Text)的功能。\n\n    <?php\n        echo \"Hello world!\";\n    ?>\n    \n预格式化文本：\n\n    | First Header  | Second Header |\n    | ------------- | ------------- |\n    | Content Cell  | Content Cell  |\n    | Content Cell  | Content Cell  |\n\n#### JS代码　\n\n```javascript\nfunction test(){\n	console.log(\"Hello world!\");\n}\n \n(function(){\n    var box = function(){\n        return box.fn.init();\n    };\n\n    box.prototype = box.fn = {\n        init : function(){\n            console.log(\'box.init()\');\n\n			return this;\n        },\n\n		add : function(str){\n			alert(\"add\", str);\n\n			return this;\n		},\n\n		remove : function(str){\n			alert(\"remove\", str);\n\n			return this;\n		}\n    };\n    \n    box.fn.init.prototype = box.fn;\n    \n    window.box =box;\n})();\n\nvar testBox = box();\ntestBox.add(\"jQuery\").remove(\"jQuery\");\n```\n\n#### HTML代码 HTML codes\n\n```html\n<!DOCTYPE html>\n<html>\n    <head>\n        <mate charest=\"utf-8\" />\n        <title>Hello world!</title>\n    </head>\n    <body>\n        <h1>Hello world!</h1>\n    </body>\n</html>\n```\n\n### 图片 Images\n\nImage:\n\n![](https://pandao.github.io/editor.md/examples/images/4.jpg)\n\n> Follow your heart.\n\n![](https://pandao.github.io/editor.md/examples/images/8.jpg)\n\n> 图为：厦门白城沙滩\n\n图片加链接 (Image + Link)：\n\n[![](https://pandao.github.io/editor.md/examples/images/7.jpg)](https://pandao.github.io/editor.md/examples/images/7.jpg \"李健首张专辑《似水流年》封面\")\n\n> 图为：李健首张专辑《似水流年》封面\n                \n----\n\n### 列表 Lists\n\n#### 无序列表（减号）Unordered Lists (-)\n                \n- 列表一\n- 列表二\n- 列表三\n     \n#### 无序列表（星号）Unordered Lists (*)\n\n* 列表一\n* 列表二\n* 列表三\n\n#### 无序列表（加号和嵌套）Unordered Lists (+)\n                \n+ 列表一\n+ 列表二\n    + 列表二-1\n    + 列表二-2\n    + 列表二-3\n+ 列表三\n    * 列表一\n    * 列表二\n    * 列表三\n\n#### 有序列表 Ordered Lists (-)\n                \n1. 第一行\n2. 第二行\n3. 第三行\n\n#### GFM task list\n\n- [x] GFM task list 1\n- [x] GFM task list 2\n- [ ] GFM task list 3\n    - [ ] GFM task list 3-1\n    - [ ] GFM task list 3-2\n    - [ ] GFM task list 3-3\n- [ ] GFM task list 4\n    - [ ] GFM task list 4-1\n    - [ ] GFM task list 4-2\n                \n----\n                    \n### 绘制表格 Tables\n\n| 项目        | 价格   |  数量  |\n| --------   | -----:  | :----:  |\n| 计算机      | $1600   |   5     |\n| 手机        |   $12   |   12   |\n| 管线        |    $1    |  234  |\n                    \nFirst Header  | Second Header\n------------- | -------------\nContent Cell  | Content Cell\nContent Cell  | Content Cell \n\n| First Header  | Second Header |\n| ------------- | ------------- |\n| Content Cell  | Content Cell  |\n| Content Cell  | Content Cell  |\n\n| Function name | Description                    |\n| ------------- | ------------------------------ |\n| `help()`      | Display the help window.       |\n| `destroy()`   | **Destroy your computer!**     |\n\n| Left-Aligned  | Center Aligned  | Right Aligned |\n| :------------ |:---------------:| -----:|\n| col 3 is      | some wordy text | $1600 |\n| col 2 is      | centered        |   $12 |\n| zebra stripes | are neat        |    $1 |\n\n| Item      | Value |\n| --------- | -----:|\n| Computer  | $1600 |\n| Phone     |   $12 |\n| Pipe      |    $1 |\n                \n----\n\n#### 特殊符号 HTML Entities Codes\n\n© &  ¨ ™ ¡ £\n& < > ¥ € ® ± ¶ § ¦ ¯ « · \n\nX² Y³ ¾ ¼  ×  ÷   »\n\n18ºC  \"  \'\n\n### Emoji表情 :smiley:\n\n> Blockquotes :star:\n\n#### GFM task lists & Emoji & fontAwesome icon emoji & editormd logo emoji :editormd-logo-5x:\n\n- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and <del>tags</del> supported :editormd-logo:;\n- [x] list syntax required (any unordered or ordered list supported) :editormd-logo-3x:;\n- [x] [ ] :smiley: this is a complete item :smiley:;\n- [ ] []this is an incomplete item [test link](#) :fa-star: @pandao; \n- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;\n    - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;\n    - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);\n \n#### 反斜杠 Escape\n\n\\*literal asterisks\\*\n            \n### 科学公式 TeX(KaTeX)\n                    \n$$E=mc^2$$\n\n行内的公式$$E=mc^2$$行内的公式，行内的$$E=mc^2$$公式。\n\n$$\\(\\sqrt{3x-1}+(1+x)^2\\)$$\n                    \n$$\\sin(\\alpha)^{\\theta}=\\sum_{i=0}^{n}(x^i + \\cos(f))$$\n\n多行公式：\n\n```math\n\\displaystyle\n\\left( \\sum\\_{k=1}^n a\\_k b\\_k \\right)^2\n\\leq\n\\left( \\sum\\_{k=1}^n a\\_k^2 \\right)\n\\left( \\sum\\_{k=1}^n b\\_k^2 \\right)\n```\n\n```katex\n\\displaystyle \n    \\frac{1}{\n        \\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{\n        \\frac25 \\pi}} = 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {\n        1+\\frac{e^{-6\\pi}}\n        {1+\\frac{e^{-8\\pi}}\n         {1+\\cdots} }\n        } \n    }\n```\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty\n    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\n    \\,d\\xi\n```\n                \n### 绘制流程图 Flowchart\n\n```flow\nst=>start: 用户登陆\nop=>operation: 登陆操作\ncond=>condition: 登陆成功 Yes or No?\ne=>end: 进入后台\n\nst->op->cond\ncond(yes)->e\ncond(no)->op\n```\n                    \n### 绘制序列图 Sequence Diagram\n                    \n```seq\nAndrew->China: Says Hello \nNote right of China: China thinks\\nabout it \nChina-->Andrew: How are you? \nAndrew->>China: I am good thanks!\n```\n\n### End', '14');
INSERT INTO `article` VALUES ('100', '180f2930-46c1-11e9-b5a4-db5a96966b9e', '824000803@qq.com', '2019-03-15 09:24:35', 'EJDUWDNDW', 'WIDPOPW', '13');

-- ----------------------------
-- Table structure for `article_comment`
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE `article_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(255) DEFAULT NULL,
  `post_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `object_id` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_comment
-- ----------------------------
INSERT INTO `article_comment` VALUES ('1', '0bb5bb10-2dc4-11e9-86b0-dbccef6f7c54', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', 'hello', '2019-02-11 14:12:44');
INSERT INTO `article_comment` VALUES ('2', '35c0e120-2e5d-11e9-86b0-dbccef6f7c54', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '<a href=\"/\">click me</a>', '2019-02-12 08:29:08');
INSERT INTO `article_comment` VALUES ('3', '46feca10-2e5d-11e9-86b0-dbccef6f7c54', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', 'a', '2019-02-12 08:29:36');
INSERT INTO `article_comment` VALUES ('4', '8aa60e20-2e5f-11e9-86b0-dbccef6f7c54', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', 'hello', '2019-02-12 08:45:49');
INSERT INTO `article_comment` VALUES ('5', 'ed567210-2e8e-11e9-91c1-c5afeea18dc6', 'cb743d90-2e8d-11e9-91c1-c5afeea18dc6', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '<script>console.log(\"hello\")</script>', '2019-02-12 14:25:01');
INSERT INTO `article_comment` VALUES ('6', '4002cc90-3c10-11ea-bc92-c9f421a8f221', '180f2930-46c1-11e9-b5a4-db5a96966b9e', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '53ad8ae0-1bba-11e9-a25d-f1ddeaef74d1', '12', '2020-01-21 13:38:27');

-- ----------------------------
-- Table structure for `article_recomment`
-- ----------------------------
DROP TABLE IF EXISTS `article_recomment`;
CREATE TABLE `article_recomment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(255) DEFAULT NULL,
  `post_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `object_id` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_recomment
-- ----------------------------
INSERT INTO `article_recomment` VALUES ('1', '0bb5bb10-2dc4-11e9-86b0-dbccef6f7c54', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', 'hi', '2019-02-11 14:15:03');
INSERT INTO `article_recomment` VALUES ('2', '0bb5bb10-2dc4-11e9-86b0-dbccef6f7c54', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '回复 柯涵 : hello', '2019-02-11 14:27:30');
INSERT INTO `article_recomment` VALUES ('3', '0bb5bb10-2dc4-11e9-86b0-dbccef6f7c54', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', 'hi', '2019-02-11 14:27:53');

-- ----------------------------
-- Table structure for `article_watchs`
-- ----------------------------
DROP TABLE IF EXISTS `article_watchs`;
CREATE TABLE `article_watchs` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `post_id` varchar(255) DEFAULT NULL,
  `post_author` varchar(255) DEFAULT NULL,
  `article_views` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_watchs
-- ----------------------------
INSERT INTO `article_watchs` VALUES ('14', 'e28780c0-1bc1-11e9-b6f4-efeb906e68fe', '1', '1');
INSERT INTO `article_watchs` VALUES ('15', '06ff49b0-1bc2-11e9-b6f4-efeb906e68fe', '1', '6');
INSERT INTO `article_watchs` VALUES ('16', '1a7659c0-1bc2-11e9-b6f4-efeb906e68fe', '1', '6');
INSERT INTO `article_watchs` VALUES ('17', '321c9490-1bc2-11e9-b6f4-efeb906e68fe', '1', '112');
INSERT INTO `article_watchs` VALUES ('18', 'd0467a60-2e72-11e9-86b0-dbccef6f7c54', '1', '28');
INSERT INTO `article_watchs` VALUES ('19', '6592b290-2e8d-11e9-91c1-c5afeea18dc6', '1', '10');
INSERT INTO `article_watchs` VALUES ('20', 'cb743d90-2e8d-11e9-91c1-c5afeea18dc6', '1', '25');
INSERT INTO `article_watchs` VALUES ('21', 'bf95a150-2e95-11e9-91c1-c5afeea18dc6', '1', '2');
INSERT INTO `article_watchs` VALUES ('22', '36a149b0-2e97-11e9-91c1-c5afeea18dc6', '1', '3');
INSERT INTO `article_watchs` VALUES ('23', '8504f680-2ea4-11e9-91c1-c5afeea18dc6', '1', '0');
INSERT INTO `article_watchs` VALUES ('24', 'c63929a0-2ea4-11e9-91c1-c5afeea18dc6', '1', '4');
INSERT INTO `article_watchs` VALUES ('25', '53b34550-31b5-11e9-bea4-4dfda5e3a803', '1', '0');
INSERT INTO `article_watchs` VALUES ('26', '9cbe9c90-31b5-11e9-9e7b-2b269d623f9c', '1', '0');
INSERT INTO `article_watchs` VALUES ('27', '84430900-31b8-11e9-9286-cd911267878d', '1', '0');
INSERT INTO `article_watchs` VALUES ('28', '8b6c39e0-31b8-11e9-9286-cd911267878d', '1', '0');
INSERT INTO `article_watchs` VALUES ('29', '50f71510-31c1-11e9-aff5-13b22906e99a', '1', '4');
INSERT INTO `article_watchs` VALUES ('30', 'e3638f40-31c2-11e9-81e8-8905fedabf1e', '1', '0');
INSERT INTO `article_watchs` VALUES ('31', '1815b3d0-31c3-11e9-9fc8-bbb5a5c80194', '1', '1');
INSERT INTO `article_watchs` VALUES ('32', '38978a70-31c3-11e9-9fc8-bbb5a5c80194', '1', '1');
INSERT INTO `article_watchs` VALUES ('33', '61759bc0-3318-11e9-b449-c177f8ba319b', '1', '27');
INSERT INTO `article_watchs` VALUES ('34', 'f416bf80-3f17-11e9-ad93-5d92dbe28f6d', '1', '13');
INSERT INTO `article_watchs` VALUES ('35', '2137c100-44a7-11e9-a0ef-8d85f4e44512', '1', '3');
INSERT INTO `article_watchs` VALUES ('36', '180f2930-46c1-11e9-b5a4-db5a96966b9e', '824000803@qq.com', '9');

-- ----------------------------
-- Table structure for `framework_document`
-- ----------------------------
DROP TABLE IF EXISTS `framework_document`;
CREATE TABLE `framework_document` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `post_id` varchar(255) NOT NULL,
  `post_author` varchar(255) DEFAULT NULL,
  `post_date` datetime DEFAULT NULL,
  `post_title` varchar(255) DEFAULT NULL,
  `post_content` mediumtext,
  `post_category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of framework_document
-- ----------------------------
INSERT INTO `framework_document` VALUES ('1', '35221d30-334c-11e9-9e17-cb221046b10c', '1', '2019-02-18 15:10:01', '5分钟上手可视化开发平台', '### 主要特性\n\n- 支持“标准”Markdown / CommonMark和Github风格的语法，也可变身为代码编辑器；\n- 支持实时预览、图片（跨域）上传、预格式文本/代码/表格插入、代码折叠、搜索替换、只读模式、自定义样式主题和多语言语法高亮等功能；\n- 支持ToC（Table of Contents）、Emoji表情、Task lists、@链接等Markdown扩展语法；\n- 支持TeX科学公式（基于KaTeX）、流程图 Flowchart 和 时序图 Sequence Diagram;\n- 支持识别和解析HTML标签，并且支持自定义过滤标签解析，具有可靠的安全性和几乎无限的扩展性；\n- 支持 AMD / CMD 模块化加载（支持 Require.js & Sea.js），并且支持自定义扩展插件；\n- 兼容主流的浏览器（IE8+）和Zepto.js，且支持iPad等平板设备；\n- 支持自定义主题样式；\n\n# Editor.md\n\n![](https://pandao.github.io/editor.md/images/logos/editormd-logo-180x180.png)\n\n![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)\n\n**目录 (Table of Contents)**\n\n[TOCM]\n\n[TOC]\n\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n# Heading 1 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n## Heading 2 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n### Heading 3 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n#### Heading 4 link [Heading link](https://github.com/pandao/editor.md \"Heading link\") Heading link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n##### Heading 5 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n###### Heading 6 link [Heading link](https://github.com/pandao/editor.md \"Heading link\")\n\n#### 标题（用底线的形式）Heading (underline)\n\nThis is an H1\n=============\n\nThis is an H2\n-------------\n\n### 字符效果和横线等\n                \n----\n\n~~删除线~~ <s>删除线（开启识别HTML标签时）</s>\n*斜体字*      _斜体字_\n**粗体**  __粗体__\n***粗斜体*** ___粗斜体___\n\n上标：X<sub>2</sub>，下标：O<sup>2</sup>\n\n**缩写(同HTML的abbr标签)**\n\n> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启\n\nThe <abbr title=\"Hyper Text Markup Language\">HTML</abbr> specification is maintained by the <abbr title=\"World Wide Web Consortium\">W3C</abbr>.\n\n### 引用 Blockquotes\n\n> 引用文本 Blockquotes\n\n引用的行内混合 Blockquotes\n                    \n> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](http://localhost/)。\n\n### 锚点与链接 Links\n\n[普通链接](http://localhost/)\n\n[普通链接带标题](http://localhost/ \"普通链接带标题\")\n\n直接链接：<https://github.com>\n\n[锚点链接][anchor-id] \n\n[anchor-id]: http://www.this-anchor-link.com/\n\nGFM a-tail link @pandao\n\n> @pandao\n\n### 多语言代码高亮 Codes\n\n#### 行内代码 Inline code\n\n执行命令：`npm install marked`\n\n#### 缩进风格\n\n即缩进四个空格，也做为实现类似`<pre>`预格式化文本(Preformatted Text)的功能。\n\n    <?php\n        echo \"Hello world!\";\n    ?>\n    \n预格式化文本：\n\n    | First Header  | Second Header |\n    | ------------- | ------------- |\n    | Content Cell  | Content Cell  |\n    | Content Cell  | Content Cell  |\n\n#### JS代码　\n\n```javascript\nfunction test(){\n	console.log(\"Hello world!\");\n}\n \n(function(){\n    var box = function(){\n        return box.fn.init();\n    };\n\n    box.prototype = box.fn = {\n        init : function(){\n            console.log(\'box.init()\');\n\n			return this;\n        },\n\n		add : function(str){\n			alert(\"add\", str);\n\n			return this;\n		},\n\n		remove : function(str){\n			alert(\"remove\", str);\n\n			return this;\n		}\n    };\n    \n    box.fn.init.prototype = box.fn;\n    \n    window.box =box;\n})();\n\nvar testBox = box();\ntestBox.add(\"jQuery\").remove(\"jQuery\");\n```\n\n#### HTML代码 HTML codes\n\n```html\n<!DOCTYPE html>\n<html>\n    <head>\n        <mate charest=\"utf-8\" />\n        <title>Hello world!</title>\n    </head>\n    <body>\n        <h1>Hello world!</h1>\n    </body>\n</html>\n```\n\n### 图片 Images\n\nImage:\n\n![](https://pandao.github.io/editor.md/examples/images/4.jpg)\n\n> Follow your heart.\n\n![](https://pandao.github.io/editor.md/examples/images/8.jpg)\n\n> 图为：厦门白城沙滩\n\n图片加链接 (Image + Link)：\n\n[![](https://pandao.github.io/editor.md/examples/images/7.jpg)](https://pandao.github.io/editor.md/examples/images/7.jpg \"李健首张专辑《似水流年》封面\")\n\n> 图为：李健首张专辑《似水流年》封面\n                \n----\n\n### 列表 Lists\n\n#### 无序列表（减号）Unordered Lists (-)\n                \n- 列表一\n- 列表二\n- 列表三\n     \n#### 无序列表（星号）Unordered Lists (*)\n\n* 列表一\n* 列表二\n* 列表三\n\n#### 无序列表（加号和嵌套）Unordered Lists (+)\n                \n+ 列表一\n+ 列表二\n    + 列表二-1\n    + 列表二-2\n    + 列表二-3\n+ 列表三\n    * 列表一\n    * 列表二\n    * 列表三\n\n#### 有序列表 Ordered Lists (-)\n                \n1. 第一行\n2. 第二行\n3. 第三行\n\n#### GFM task list\n\n- [x] GFM task list 1\n- [x] GFM task list 2\n- [ ] GFM task list 3\n    - [ ] GFM task list 3-1\n    - [ ] GFM task list 3-2\n    - [ ] GFM task list 3-3\n- [ ] GFM task list 4\n    - [ ] GFM task list 4-1\n    - [ ] GFM task list 4-2\n                \n----\n                    \n### 绘制表格 Tables\n\n| 项目        | 价格   |  数量  |\n| --------   | -----:  | :----:  |\n| 计算机      | $1600   |   5     |\n| 手机        |   $12   |   12   |\n| 管线        |    $1    |  234  |\n                    \nFirst Header  | Second Header\n------------- | -------------\nContent Cell  | Content Cell\nContent Cell  | Content Cell \n\n| First Header  | Second Header |\n| ------------- | ------------- |\n| Content Cell  | Content Cell  |\n| Content Cell  | Content Cell  |\n\n| Function name | Description                    |\n| ------------- | ------------------------------ |\n| `help()`      | Display the help window.       |\n| `destroy()`   | **Destroy your computer!**     |\n\n| Left-Aligned  | Center Aligned  | Right Aligned |\n| :------------ |:---------------:| -----:|\n| col 3 is      | some wordy text | $1600 |\n| col 2 is      | centered        |   $12 |\n| zebra stripes | are neat        |    $1 |\n\n| Item      | Value |\n| --------- | -----:|\n| Computer  | $1600 |\n| Phone     |   $12 |\n| Pipe      |    $1 |\n                \n----\n\n#### 特殊符号 HTML Entities Codes\n\n&copy; &  &uml; &trade; &iexcl; &pound;\n&amp; &lt; &gt; &yen; &euro; &reg; &plusmn; &para; &sect; &brvbar; &macr; &laquo; &middot; \n\nX&sup2; Y&sup3; &frac34; &frac14;  &times;  &divide;   &raquo;\n\n18&ordm;C  &quot;  &apos;\n\n### Emoji表情 :smiley:\n\n> Blockquotes :star:\n\n#### GFM task lists & Emoji & fontAwesome icon emoji & editormd logo emoji :editormd-logo-5x:\n\n- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and <del>tags</del> supported :editormd-logo:;\n- [x] list syntax required (any unordered or ordered list supported) :editormd-logo-3x:;\n- [x] [ ] :smiley: this is a complete item :smiley:;\n- [ ] []this is an incomplete item [test link](#) :fa-star: @pandao; \n- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;\n    - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;\n    - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);\n \n#### 反斜杠 Escape\n\n\\*literal asterisks\\*\n            \n### 科学公式 TeX(KaTeX)\n                    \n$$E=mc^2$$\n\n行内的公式$$E=mc^2$$行内的公式，行内的$$E=mc^2$$公式。\n\n$$\\(\\sqrt{3x-1}+(1+x)^2\\)$$\n                    \n$$\\sin(\\alpha)^{\\theta}=\\sum_{i=0}^{n}(x^i + \\cos(f))$$\n\n多行公式：\n\n```math\n\\displaystyle\n\\left( \\sum\\_{k=1}^n a\\_k b\\_k \\right)^2\n\\leq\n\\left( \\sum\\_{k=1}^n a\\_k^2 \\right)\n\\left( \\sum\\_{k=1}^n b\\_k^2 \\right)\n```\n\n```katex\n\\displaystyle \n    \\frac{1}{\n        \\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{\n        \\frac25 \\pi}} = 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {\n        1+\\frac{e^{-6\\pi}}\n        {1+\\frac{e^{-8\\pi}}\n         {1+\\cdots} }\n        } \n    }\n```\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty\n    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\n    \\,d\\xi\n```\n                \n### 绘制流程图 Flowchart\n\n```flow\nst=>start: 用户登陆\nop=>operation: 登陆操作\ncond=>condition: 登陆成功 Yes or No?\ne=>end: 进入后台\n\nst->op->cond\ncond(yes)->e\ncond(no)->op\n```\n                    \n### 绘制序列图 Sequence Diagram\n                    \n```seq\nAndrew->China: Says Hello \nNote right of China: China thinks\\nabout it \nChina-->Andrew: How are you? \nAndrew->>China: I am good thanks!\n```\n\n### End', '9');
INSERT INTO `framework_document` VALUES ('19', 'ff3db2d0-334e-11e9-8b2a-c3c7e8938e55', '1', '2019-02-18 15:29:59', '视图调用', '[TOC]\n\n#### Disabled options\n\n- TeX (Based on KaTeX);\n- Emoji;\n- Task lists;\n- HTML tags decode;\n- Flowchart and Sequence Diagram;\n\n#### Editor.md directory\n\n    editor.md/\n            lib/\n            css/\n            scss/\n            tests/\n            fonts/\n            images/\n            plugins/\n            examples/\n            languages/     \n            editormd.js\n            ...\n\n```html\n<!-- English -->\n<script src=\"../dist/js/languages/en.js\"></script>\n\n<!-- 繁體中文 -->\n<script src=\"../dist/js/languages/zh-tw.js\"></script>\n```\n', '10');
INSERT INTO `framework_document` VALUES ('20', 'd04e53f0-3f18-11e9-8136-8545942c551a', '1', '2019-03-05 15:32:21', 'sd', 'sdasdwwq22', '9');
INSERT INTO `framework_document` VALUES ('21', 'bc481ce0-43f2-11e9-b7d8-6771f66f23db', '1', '2019-03-11 19:42:23', 'eqweqw', '# e2e2ee2edwqd\n\n\ndsa\n\n###### fefe![](/users/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410/articles/0.44168652414689746.jpeg)', '9');
INSERT INTO `framework_document` VALUES ('22', '6879e150-43f4-11e9-b7d8-6771f66f23db', '1', '2019-03-11 19:54:21', 'eqwewqe', 'eqw', '12');

-- ----------------------------
-- Table structure for `framework_document_category`
-- ----------------------------
DROP TABLE IF EXISTS `framework_document_category`;
CREATE TABLE `framework_document_category` (
  `post_category_id` int(4) NOT NULL AUTO_INCREMENT,
  `post_category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`post_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of framework_document_category
-- ----------------------------
INSERT INTO `framework_document_category` VALUES ('9', '平台使用教程');
INSERT INTO `framework_document_category` VALUES ('10', '平台内部JavaScript库');
INSERT INTO `framework_document_category` VALUES ('11', '平台组件');
INSERT INTO `framework_document_category` VALUES ('12', 'eqwewqe');

-- ----------------------------
-- Table structure for `topic`
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `topic_id` int(4) NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of topic
-- ----------------------------
INSERT INTO `topic` VALUES ('13', 'CSGO');
INSERT INTO `topic` VALUES ('14', 'WEB前端');
INSERT INTO `topic` VALUES ('15', 'NODE');
INSERT INTO `topic` VALUES ('16', 'SQL');
INSERT INTO `topic` VALUES ('17', '你好，I\'m');
INSERT INTO `topic` VALUES ('19', 'sass');
INSERT INTO `topic` VALUES ('20', '《我的》');
INSERT INTO `topic` VALUES ('21', 'ssasas');
INSERT INTO `topic` VALUES ('22', 'eqwe');
INSERT INTO `topic` VALUES ('23', 'eqwewe');
INSERT INTO `topic` VALUES ('24', 'ewqewqe');
INSERT INTO `topic` VALUES ('25', 'dasds');
INSERT INTO `topic` VALUES ('26', 'sadasdad');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `if_admin` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('28', '53ad8ae0-1bba-11e9-a25d-f1ddeaef74d1', '824000803@qq.com', 'YOUJUN', 'KHIS302.', '0');
INSERT INTO `users` VALUES ('29', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '1', '柯涵', '1', '1');
INSERT INTO `users` VALUES ('30', '59660e70-2e76-11e9-86b0-dbccef6f7c54', '2', '2', '2', '0');

-- ----------------------------
-- Table structure for `user_focus`
-- ----------------------------
DROP TABLE IF EXISTS `user_focus`;
CREATE TABLE `user_focus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `topic_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_focus
-- ----------------------------
INSERT INTO `user_focus` VALUES ('4', '824000803@qq.com', '13');
INSERT INTO `user_focus` VALUES ('5', '824000803@qq.com', '15');
INSERT INTO `user_focus` VALUES ('8', '1', '15');
INSERT INTO `user_focus` VALUES ('10', '1', '14');
INSERT INTO `user_focus` VALUES ('12', '1', '13');
INSERT INTO `user_focus` VALUES ('14', '1', '16');

-- ----------------------------
-- Table structure for `user_follow`
-- ----------------------------
DROP TABLE IF EXISTS `user_follow`;
CREATE TABLE `user_follow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `author_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_follow
-- ----------------------------
INSERT INTO `user_follow` VALUES ('1', '824000803@qq.COM', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410');

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `portrait` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `blog_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('6', '53ad8ae0-1bba-11e9-a25d-f1ddeaef74d1', '/users/53ad8ae0-1bba-11e9-a25d-f1ddeaef74d1/portraits/0.07900732227868934.jpg', 'CSGO大地球', '<a href=\"/\">click me!!!</a>', '');
INSERT INTO `user_info` VALUES ('7', '0192e830-1bbb-11e9-b9c9-cdaf3c9a2410', '/users/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410/portraits/0.09973871801953105.jpg', 'CSGO职业哥', 'A', '');
INSERT INTO `user_info` VALUES ('8', '59660e70-2e76-11e9-86b0-dbccef6f7c54', '/user-images/0.1436446423680504.jpg', '', '', '');

-- ----------------------------
-- Table structure for `user_like`
-- ----------------------------
DROP TABLE IF EXISTS `user_like`;
CREATE TABLE `user_like` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `post_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_like
-- ----------------------------
INSERT INTO `user_like` VALUES ('119', '824000803@qq.com', '06ff49b0-1bc2-11e9-b6f4-efeb906e68fe');
INSERT INTO `user_like` VALUES ('123', '824000803@qq.com', '321c9490-1bc2-11e9-b6f4-efeb906e68fe');
INSERT INTO `user_like` VALUES ('124', '824000803@qq.com', '1a7659c0-1bc2-11e9-b6f4-efeb906e68fe');
INSERT INTO `user_like` VALUES ('125', '824000803@qq.com', '2137c100-44a7-11e9-a0ef-8d85f4e44512');
