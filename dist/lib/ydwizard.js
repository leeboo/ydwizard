"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@popperjs/core");
var STYLE_TEXT = "\n#ydw-wizard{\n  background-color: #fff; border-radius:8px;\n  position: absolute;padding:15px;z-index:2023;box-shadow: 0px 0rem 1rem 9px rgba(0, 0, 0, .15) !important;min-width:300px;\n  max-width:200px;\n}\n#ydw-setting-header{\n  cursor:move\n}\n#ydw-wizard button{\n  color: #0d6efd;display: inline-block;text-align: center;text-decoration: none;vertical-align: middle;user-select: none;background-color: transparent;\n  border: 1px solid #0d6efd;padding: .25rem .5rem;font-size: 0.875rem;border-radius: .2rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\n  font-size:12px;\n  padding: 2px 5px;\n}\n#ydw-wizard button:hover{\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  font-size:12px;\n  padding: 2px 5px;\n}\n.ydw-wizard-foot{\n  display:flex;justify-content: flex-end;align-items: center;align-content: center;margin-top:15px;\n}\n#ydw-setting{\n  background-color: #efefef;border:1px solid #ccc;border-radius:8px;position: fixed;right: 10px; top: 10px;padding:20px;z-index:2022;box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;\n}\n#ydw-quit{\n  position: absolute;right: 15px;\n}\n#ydwizard-form{\n  z-index:9999;\n}\n#ydwizard-form [data-popper-arrow], #ydw-wizard [data-popper-arrow]{\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  z-index: -1;\n}\n#ydwizard-form [data-popper-arrow]::before, #ydw-wizard [data-popper-arrow]::before{\n  transition: transform 0.2s ease-out, visibility 0.2s ease-out;\n  visibility: visible;\n  transform: translateX(0px) rotate(45deg);\n  transform-origin: center center;\n  content: \"\";\n  background: rgb(255, 255, 255);\n  top: 0px;\n  left: 0px;\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  z-index: -1;\n}\n";
var rectStyle = "border:2px solid #0781ff;display:none;position: fixed;pointer-events: none;z-index:2021;";
var tipStyle = "background-color:#0781ffbf;color:#fff;text-align:center;position: fixed;pointer-events: none;z-index:2021;";
var wizardDialogStyle = "background-color: #fff;border:1px solid #efefef;border-radius:8px;padding:15px;box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;z-index:2021;";
var actionStyle = "background-color:#0781ff;display:none;position: fixed;z-index:2021;color:#fff;cursor:pointer;padding:2px;text-overflow: ellipsis;white-space:nowrap; overflow:hidden";
var WIZARD_DIALOG_HTML = "<div data-popper-arrow></div>\n<div style=\"\" class=\"ydw-ignore\">\n  <div style=\"".concat(wizardDialogStyle, "\" class=\"ydw-ignore\">\n    <div class=\"ydw-ignore\">Wizard Text\uFF1A</div>\n    <div class=\"ydw-ignore\">\n        <textarea style=\"resize: none\" class=\"ydw-ignore\" cols=\"60\" rows=\"3\" placeholder=\"please input text\"></textarea>\n    </div>\n  </div>\n</div>");
var SETTING_DIALOG_HTML = "<strong id=\"ydw-setting-header\" class=\"ydw-ignore\">YDWizard</strong>\n      <p class=\"ydw-ignore\">mouse hovers element and then click \"add wizard\"</p>\n      <div class=\"ydw-ignore\" style=\"display: flex;gap: 20px;align-items: center\">\n        <a id=\"ydw-export-link\"></a>\n        <button type=\"button\" class=\"ydw-ignore\" id=\"ydw-export\">Export</button>\n        <button type=\"button\" class=\"ydw-ignore\" id=\"ydw-import\">Import</button>\n        <button type=\"button\" class=\"ydw-ignore\" id=\"ydw-preview\">Preview</button>\n      </div>\n      <input type=\"file\" id=\"ydw-import-file\" accept=\"application/json\" style=\"display: none\">\n      <p style=\"text-align: right\"><small> by <a href=\"http://yidianhulian.com\" target=\"_blank\">\u6613\u70B9\u4E92\u8054</a>&copy;</small></p>\n";
var transparentImg = new Image();
transparentImg.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
var currDOMSelector;
var wizardConfigs = [];
var translateX = 0;
var translateY = 0;
var startX = 0;
var startY = 0;
var scrolllX = 0;
var scrolllY = 0;
var isInSetting = true; // 是否处于设置模式
var currWizardIndex = 0; // 当前向导索引
var _quitCallback;
var _lang = 'zh_CN';
function loadLocale(locale) {
    return __awaiter(this, void 0, void 0, function () {
        var translations, error_1;
        return __generator(this, function (_a) {
            var _b;
            switch (_a.label) {
                case 0:
                    if (!locale)
                        locale = 'zh_cn';
                    locale = locale.toLowerCase();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (_b = "./i18n/".concat(locale, ".js"), Promise.resolve().then(function () { return require(_b); }))];
                case 2:
                    translations = _a.sent();
                    console.log(translations);
                    return [2 /*return*/, translations];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error loading locale ".concat(locale, ":"), error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function translate(word) {
    var _a;
    loadLocale(_lang);
    var Lang = (_a = "./i18n/".concat(_lang, ".ts"), Promise.resolve().then(function () { return require(_a); }));
    console.log(Lang);
    return Lang.word || word;
}
function getUUID() {
    var strings = '0123456789abcdefghijklmnopqrstuvwxyz0123456789';
    var arr = [];
    for (var i = 0; i < 16; i++) {
        var index = Math.floor(Math.random() * 45 + 1);
        arr.push(strings.substring(index, index + 1));
    }
    return arr.join('');
}
function moveSettingDiaglog(event) {
    var settingDialog = document.getElementById("ydw-setting");
    if (!settingDialog)
        return;
    var x = event.x, y = event.y;
    var newX = translateX + x - startX;
    var newY = translateY + y - startY;
    settingDialog.style.transform = "translate(".concat(newX, "px, ").concat(newY, "px )");
}
function getTranslate(target) {
    var transform = target.style.transform;
    var translate = transform.replace(/translate|\(|\)|px/ig, "").split(",");
    if (translate.length !== 2)
        return { translateX: 0, translateY: 0 };
    return { translateX: parseInt(translate === null || translate === void 0 ? void 0 : translate[0].trim(), 10), translateY: parseInt(translate === null || translate === void 0 ? void 0 : translate[1].trim(), 10) };
}
function dragstart(event) {
    if (!event || !(event === null || event === void 0 ? void 0 : event.dataTransfer) || !isInSetting)
        return;
    var el = event.target;
    var rst = getTranslate(el);
    translateX = rst.translateX;
    translateY = rst.translateY;
    startX = event.x;
    startY = event.y;
    event.dataTransfer.setDragImage(transparentImg, 0, 0); // 设置拖动图像为透明图片
}
function drag(event) {
    if (event.x === 0 && event.y === 0 || !isInSetting)
        return;
    moveSettingDiaglog(event);
}
function dragend(event) {
    // (event.target as any).style.opacity = 1;
    moveSettingDiaglog(event);
}
function exportSetting() {
    var link = document.getElementById("ydw-export-link");
    if (!link)
        return;
    link.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wizardConfigs, null, 4)));
    link.setAttribute("download", "ydwizard.json");
    link.click();
}
function extraFromImport(data) {
    var json;
    try {
        json = JSON.parse(data);
        if (!Array.isArray(json)) {
            alert("invalid json data");
        }
        wizardConfigs = json;
        updateHasWizardTip();
        alert("import success");
    }
    catch (e) {
        alert("invalid json data");
    }
}
/**
 * 预览模式
 */
function preview() {
    var _a;
    var previewBtn = document.getElementById("ydw-preview");
    if (isInSetting) {
        if (previewBtn)
            previewBtn.innerText = translate('stopPreview');
        document.querySelectorAll(".ydwizard-tip, #ydwizard-bounding, #ydwizard-form, #ydwizard-action").forEach(function (el) {
            el.style.display = "none";
        });
        currWizardIndex = 0;
        showWizard();
    }
    else {
        if (previewBtn)
            previewBtn.innerText = translate('preview');
        (_a = document.getElementById("ydw-wizard")) === null || _a === void 0 ? void 0 : _a.remove();
        document.querySelectorAll(".ydwizard-tip").forEach(function (el) {
            el.style.display = "block";
        });
    }
    isInSetting = !isInSetting;
}
function importSetting(event) {
    var files = event.target.files;
    if (typeof (FileReader) !== "undefined") {
        var reader = new FileReader();
        if (reader.readAsText) {
            reader.onload = function (e) {
                extraFromImport(e.target.result);
            };
            reader.readAsText(files[0]);
        }
    }
    else {
        alert("This browser does not support HTML5.");
    }
}
function elementScroll(event) {
    if (!isInSetting) {
        var el_1 = document.querySelector(wizardConfigs[currWizardIndex].selector);
        showBoundingClientRect(el_1);
        return;
    }
    var el = event.target;
    // console.log(document.documentElement.scrollTop)
    document.querySelectorAll("#ydwizard-action, #ydwizard-form, #ydwizard-bounding").forEach(function (el) {
        el.style.display = "none";
    });
    updateHasWizardTip();
}
function getDomPath(el) {
    if (el.hasAttribute("id")) {
        return "#" + el.getAttribute("id");
    }
    var path = [];
    while (true) {
        var parentEl = el.parentElement;
        if (!parentEl) {
            path.unshift(el.tagName + ":nth-child(1)");
            break;
        }
        for (var index = 0; index < parentEl.children.length; index++) {
            if (parentEl.children.item(index) === el) {
                path.unshift("".concat(el.tagName, ":nth-child(").concat(index + 1, ")"));
            }
        }
        if (parentEl.hasAttribute("id")) {
            path.unshift("#" + parentEl.getAttribute("id"));
            break;
        }
        el = parentEl;
        parentEl = parentEl.parentElement;
    }
    return path.join(">");
}
/**
 * 初始化元素的边框
 */
function initBoundingClientRect() {
    if (document.getElementById("ydwizard-bounding"))
        return;
    var bounding = document.createElement("div");
    bounding.setAttribute("style", rectStyle);
    bounding.setAttribute("class", "ydw-ignore");
    bounding.setAttribute("id", "ydwizard-bounding");
    document.body.append(bounding);
}
function showBoundingClientRect(targetEl) {
    if (!targetEl)
        return;
    var rectDom = document.getElementById("ydwizard-bounding");
    var rect = targetEl.getBoundingClientRect();
    if (rectDom) {
        rectDom.style.display = "block";
        rectDom.style.left = (rect.left - 2) + "px";
        rectDom.style.top = (rect.top - 2) + "px";
        rectDom.style.width = (rect.width) + "px";
        rectDom.style.height = (rect.height) + "px";
    }
}
/**
 * 打开向导设置对话框
 * @param event
 */
function openForm(event) {
    var popcorn = event.target;
    var ydwizard = document.querySelector('#ydwizard-form');
    var arrow = document.querySelector('#ydwizard-form [data-popper-arrow]');
    if (!popcorn)
        return;
    if (!ydwizard)
        return;
    var config = getWizardConfig(currDOMSelector).config;
    document.querySelector("#ydwizard-form textarea").value = (config === null || config === void 0 ? void 0 : config.text) || "";
    ydwizard.style.display = "block";
    (0, core_1.createPopper)(popcorn, ydwizard, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrow
                },
            },
        ],
    });
}
function getWizardConfig(selector) {
    for (var index = 0; index < wizardConfigs.length; index++) {
        var config = wizardConfigs[index];
        if (selector === config.selector)
            return { index: index, config: config };
    }
    return { index: -1, config: null };
}
/**
 *
 */
function saveWizard(event) {
    var textarea = event.target;
    var value = textarea.value.trim();
    var _a = getWizardConfig(currDOMSelector), index = _a.index, config = _a.config;
    if (index === -1) {
        config = { selector: currDOMSelector, text: '' };
        wizardConfigs.push(config);
    }
    if (value && value.length > 0) {
        config.text = value;
    }
    else {
        if (index > -1)
            wizardConfigs.splice(index, 1);
    }
    updateHasWizardTip();
}
function updateHasWizardTip() {
    document.querySelectorAll(".ydwizard-tip").forEach(function (item) {
        item.remove();
    });
    for (var index = 0; index < wizardConfigs.length; index++) {
        var config = wizardConfigs[index];
        var targetEl = document.querySelector(config.selector);
        if (!targetEl)
            continue;
        var tip = document.getElementById("".concat(index, "-tip")) || document.createElement("div");
        tip.setAttribute("style", tipStyle);
        tip.setAttribute("class", "ydw-ignore ydwizard-tip");
        tip.setAttribute("id", "".concat(index, "-tip"));
        tip.innerText = "".concat(index + 1);
        document.body.append(tip);
        var rect = targetEl.getBoundingClientRect();
        tip.style.display = "block";
        tip.style.left = (rect.left) + "px";
        tip.style.top = (rect.top) + "px";
        tip.style.width = (rect.width) + "px";
        tip.style.height = (rect.height) + "px";
    }
}
/**
 * 初始化设置模式
 */
function initSetting() {
    var _a, _b, _c, _d, _e, _f, _g;
    // 设置面板
    var settingDialog = document.createElement("div");
    settingDialog.setAttribute("class", "ydw-ignore");
    settingDialog.setAttribute("id", "ydw-setting");
    settingDialog.setAttribute("draggable", "true");
    settingDialog.innerHTML = SETTING_DIALOG_HTML;
    document.body.append(settingDialog);
    (_a = document.getElementById("ydw-setting")) === null || _a === void 0 ? void 0 : _a.addEventListener("dragstart", dragstart);
    (_b = document.getElementById("ydw-setting")) === null || _b === void 0 ? void 0 : _b.addEventListener("drag", drag);
    (_c = document.getElementById("ydw-setting")) === null || _c === void 0 ? void 0 : _c.addEventListener("dragend", dragend);
    (_d = document.getElementById("ydw-export")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", exportSetting);
    (_e = document.getElementById("ydw-preview")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", preview);
    (_f = document.getElementById("ydw-import")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
        var file = document.getElementById("ydw-import-file");
        if (!file)
            return;
        file.click();
    });
    (_g = document.getElementById("ydw-import-file")) === null || _g === void 0 ? void 0 : _g.addEventListener("change", importSetting);
    // 初始化悬浮元素边框
    initBoundingClientRect();
    // 提示内容设置框
    var wizardPopper = document.createElement("div");
    wizardPopper.setAttribute("class", "ydw-ignore");
    wizardPopper.innerHTML = WIZARD_DIALOG_HTML;
    wizardPopper.setAttribute("id", "ydwizard-form");
    document.body.append(wizardPopper);
    var textarea = document.querySelector("#ydwizard-form textarea");
    if (textarea)
        textarea.addEventListener("keyup", saveWizard);
    // 打开向导设置对话框
    var action = document.createElement("div");
    action.setAttribute("style", actionStyle);
    action.setAttribute("class", "ydw-ignore");
    action.innerHTML = " Add wizard ";
    action.setAttribute("id", "ydwizard-action");
    document.body.append(action);
    action.addEventListener('click', openForm);
    document.querySelectorAll("*").forEach(function (item) {
        item.addEventListener("scroll", elementScroll);
    });
    document.addEventListener("scroll", elementScroll);
    document.body.addEventListener('mouseover', function (event) {
        if (!isInSetting)
            return;
        var targetEl = event === null || event === void 0 ? void 0 : event.target;
        // console.log(targetEl)
        if (targetEl.classList.contains("ydw-ignore"))
            return;
        currDOMSelector = getDomPath(targetEl);
        showBoundingClientRect(targetEl);
        var actionDom = document.getElementById("ydwizard-action");
        var popover = document.getElementById('ydwizard-form');
        var rect = targetEl.getBoundingClientRect();
        if (actionDom) {
            actionDom.style.display = "block";
            actionDom.style.left = (rect.left - 2) + "px";
            actionDom.style.top = (rect.top + rect.height) + "px";
            actionDom.style.width = (rect.width) + "px";
        }
        if (popover) {
            popover.style.display = "none";
        }
    });
}
/**
 * 开始向导
 */
function showWizard() {
    var _a, _b, _c, _d;
    (_a = document.getElementById("ydw-wizard")) === null || _a === void 0 ? void 0 : _a.remove();
    if (!wizardConfigs || !wizardConfigs.length)
        return;
    initBoundingClientRect();
    var wizard = wizardConfigs[currWizardIndex];
    var wizardDialog = document.createElement("div");
    wizardDialog.setAttribute("class", "ydw-ignore");
    wizardDialog.setAttribute("id", "ydw-wizard");
    wizardDialog.innerHTML = "<div data-popper-arrow style=\"margin-top: -15px\"></div>\n<button type=\"button\" id=\"ydw-quit\">\u2715</button>\n<div style=\"padding-right: 20px\">".concat(wizard["text"], "</div>\n<div class=\"ydw-wizard-foot\">\n<button type=\"button\" id=\"ydw-prev-btn\">\u21E6</button>\n<div style=\"margin: 0 10px\">").concat(currWizardIndex + 1, "/").concat(wizardConfigs.length, "</div>\n<button type=\"button\" id=\"ydw-next-btn\">\u21E8</button>\n</div>");
    var hoverEl = document.querySelector(wizard.selector);
    showBoundingClientRect(hoverEl);
    var rect = hoverEl.getBoundingClientRect();
    document.documentElement.scrollTop = rect.top;
    document.documentElement.scrollLeft = rect.left;
    document.body.append(wizardDialog);
    document.querySelectorAll("*").forEach(function (item) {
        item.addEventListener("scroll", elementScroll);
    });
    document.addEventListener("scroll", elementScroll);
    var arrow = document.querySelector('#ydw-wizard [data-popper-arrow]');
    (0, core_1.createPopper)(hoverEl, wizardDialog, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'arrow',
                options: {
                    element: arrow,
                    padding: 20
                },
            },
            {
                name: 'offset',
                options: {
                    offset: [0, 20],
                },
            },
        ],
    });
    (_b = document.getElementById("ydw-prev-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        currWizardIndex--;
        if (currWizardIndex < 0) {
            currWizardIndex = 0;
            return;
        }
        showWizard();
    });
    (_c = document.getElementById("ydw-next-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        currWizardIndex++;
        if (currWizardIndex >= wizardConfigs.length) {
            currWizardIndex = wizardConfigs.length - 1;
            return;
        }
        showWizard();
    });
    (_d = document.getElementById("ydw-quit")) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        var _a;
        preview();
        (_a = document.getElementById("ydw-wizard")) === null || _a === void 0 ? void 0 : _a.remove();
        if (_quitCallback) {
            _quitCallback();
        }
    });
}
/**
 * 注入样式
 */
function injectStyle() {
    var styleEl = document.createElement("style");
    styleEl.type = "text/css";
    try {
        styleEl.appendChild(document.createTextNode(STYLE_TEXT));
    }
    catch (ex) {
        styleEl.styleSheet.cssText = "body{background-color:red}"; // 针对IE
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(styleEl);
}
var Ydwizard = /** @class */ (function () {
    function Ydwizard() {
    }
    Ydwizard.setLang = function (lang) {
        _lang = lang;
    };
    /**
     * 开启设置模式
     */
    Ydwizard.startSetting = function () {
        injectStyle();
        initSetting();
    };
    /**
     * 开启向导模式
     *
     * @param setting
     * @param quitCallback
     */
    Ydwizard.start = function (setting, quitCallback) {
        if (quitCallback === void 0) { quitCallback = null; }
        injectStyle();
        isInSetting = false;
        wizardConfigs = setting;
        _quitCallback = quitCallback;
        currWizardIndex = 0;
        showWizard();
    };
    return Ydwizard;
}());
exports.default = Ydwizard;
//# sourceMappingURL=ydwizard.js.map