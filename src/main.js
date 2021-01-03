const hx = require('hbuilderx');
const {
  URL
} = require('url');

function getHbuilderxText() {
  return new Promise(async (resolve, reject) => {
    const editor = await hx.window.getActiveTextEditor();
    if (!editor) {
      reject('未找到激活的编辑器,操作终止!');
    }
    const selection = editor.selection;
    const document = editor.document;
    const codeWord = document.getText(selection);
    const languageId = document.languageId;

    if (!codeWord) {
      reject('请先选中需要分享的代码片段!');
    }
    resolve([codeWord, languageId]);
  });
}

function log(title, text) {
  console.log('carbon-hbuilderx: ' + title + '=>' + text);
}

function openUrl(data) {
  const [codeWord, languageId] = data;
  const config = hx.workspace.getConfiguration("carbon-hbuilderx");
  const carbonUrl = new URL(config.get("carbonUrl", 'http://carbon.retrocode.io'));
  // 背景色支持rgba(默认rgba(0,0,0,0))
  carbonUrl.searchParams.set("bg", encodeURIComponent(config.get("backgroundColor")));

  // 代码主题(默认vscode)
  carbonUrl.searchParams.set("t", config.get("theme"));
  // 代码语言插件自动判断赋值
  carbonUrl.searchParams.set("l", languageId);

  // 是否显示窗口样式(boolean,默认true)
  carbonUrl.searchParams.set("wc", config.get("windowControls"));
  // 窗口主题[none,sharp,bw,boxy]
  carbonUrl.searchParams.set("wt", config.get("windowTheme"));
  // 是否显示窗口阴影(boolean)
  carbonUrl.searchParams.set("ds", config.get("dropShadow"));
  // 窗口阴影偏移offset-y(0->100)
  carbonUrl.searchParams.set("dsyoff", config.get("dropShadowOffset")+'px');
  // 窗口阴影半径blur-radius(0->100)
  carbonUrl.searchParams.set("dsblur", config.get("dropShadowBlurRadius")+'px');

  // 是否自动调整宽度,即是否换行(boolean)
  carbonUrl.searchParams.set("wa", config.get("autoAdjustWidth"));
  // padding上下边距(0->200)
  carbonUrl.searchParams.set("pv", config.get("paddingVertical")+'px');
  // padding左右边距(0->100)
  carbonUrl.searchParams.set("ph", config.get("paddingHorizontal")+'px');

  // 是否显示行数(boolean)
  carbonUrl.searchParams.set("ln", config.get("lineNumbers"));
  // 显示行数时的起始行数(0->∞)
  carbonUrl.searchParams.set("fl", config.get("firstLineNumber"));

  // 字体类型(String,默认'JetBrains Mono')
  carbonUrl.searchParams.set("fm", config.get("fontFamily"));
  // 字体大小(10->20)
  carbonUrl.searchParams.set("fs", config.get("fontSize")+'px');
  // 行高(90%->250%)
  carbonUrl.searchParams.set("lh", config.get("lineHeight")+'%');

  // 是否显示carbon水印,默认为false即可
  carbonUrl.searchParams.set("wm", false);

  // 代码片段
  carbonUrl.searchParams.set("code", encodeURIComponent(codeWord));

  hx.env.openExternal(carbonUrl.toString());
}

function carbon() {
  getHbuilderxText().then(openUrl).catch(err => {
    log('异常', err.toString());
    hx.window.showErrorMessage(err.toString());
  });
};

module.exports = {
  carbon
}
