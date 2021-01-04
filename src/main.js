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
    const codeWord = editor.document.getText(editor.selection);
    const languageId = editor.document.languageId;
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
  const carbonSearchParams = {
    bg: encodeURIComponent(config.get("backgroundColor")), // 背景色支持rgba(默认rgba(0,0,0,0))
    t: config.get("theme"), // 代码主题(默认vscode)
    l: languageId, // 代码语言插件自动判断赋值
    wc: config.get("windowControls"), // 是否显示窗口样式(boolean,默认true)
    wt: config.get("windowTheme"), // 窗口主题[none,sharp,bw,boxy]
    ds: config.get("dropShadow"), // 是否显示窗口阴影(boolean)
    dsyoff: config.get("dropShadowOffset") + 'px', // 窗口阴影偏移offset-y(0->100)
    dsblur: config.get("dropShadowBlurRadius") + 'px', // 窗口阴影半径blur-radius(0->100)
    wa: config.get("autoAdjustWidth"), // 是否自动调整宽度,即是否换行(boolean)
    pv: config.get("paddingVertical") + 'px', // padding上下边距(0->200)
    ph: config.get("paddingHorizontal") + 'px', // padding左右边距(0->100)
    ln: config.get("lineNumbers"), // 是否显示行数(boolean)
    fl: config.get("firstLineNumber"), // 显示行数时的起始行数(0->∞)
    fm: config.get("fontFamily"), // 字体类型(String,默认'JetBrains Mono')
    fs: config.get("fontSize") + 'px', // 字体大小(10->20)
    lh: config.get("lineHeight") + '%', // 行高(90%->250%)
    wm: false, // 是否显示carbon水印,默认为false即可
    code: encodeURIComponent(codeWord), // 代码片段
  };
  for (let k in carbonSearchParams) {
    carbonUrl.searchParams.set(k, carbonSearchParams[k])
  }
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
