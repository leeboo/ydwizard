import { createPopper } from '@popperjs/core'
import LangEn from './i18n/en'
import LangZhCn from './i18n/zh_cn'

const STYLE_TEXT = `
#ydw-wizard{
  background-color: #fff; border-radius:8px;
  position: absolute;padding:15px;z-index:2023;box-shadow: 0px 0rem 1rem 9px rgba(0, 0, 0, .15) !important;min-width:300px;
  max-width:200px;
}
#ydw-setting-header{
  cursor:move
}
#ydw-wizard button{
  color: #0d6efd;display: inline-block;text-align: center;text-decoration: none;vertical-align: middle;user-select: none;background-color: transparent;
  border: 1px solid #0d6efd;padding: .25rem .5rem;font-size: 0.875rem;border-radius: .2rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  font-size:12px;
  padding: 2px 5px;
}
#ydw-wizard button:hover{
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  font-size:12px;
  padding: 2px 5px;
}
.ydw-wizard-foot{
  display:flex;justify-content: flex-end;align-items: center;align-content: center;margin-top:15px;
}
#ydw-setting{
  background-color: #efefef;border:1px solid #ccc;border-radius:8px;position: fixed;right: 10px; top: 10px;padding:20px;z-index:2022;box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}
#ydw-quit{
  position: absolute;right: 15px;
}
#ydwizard-form{
  z-index:9999;
}
#ydwizard-form [data-popper-arrow], #ydw-wizard [data-popper-arrow]{
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: -1;
}
#ydwizard-form [data-popper-arrow]::before, #ydw-wizard [data-popper-arrow]::before{
  transition: transform 0.2s ease-out, visibility 0.2s ease-out;
  visibility: visible;
  transform: translateX(0px) rotate(45deg);
  transform-origin: center center;
  content: "";
  background: rgb(255, 255, 255);
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: -1;
}
`

const rectStyle =
  'border:2px solid #0781ff;display:none;position: fixed;pointer-events: none;z-index:2021;'
const tipStyle =
  'background-color:#0781ffbf;color:#fff;text-align:center;position: fixed;pointer-events: none;z-index:2021;'
const wizardDialogStyle =
  'background-color: #fff;border:1px solid #efefef;border-radius:8px;padding:15px;box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;z-index:2021;'
const actionStyle =
  'background-color:#0781ff;display:none;position: fixed;z-index:2021;color:#fff;cursor:pointer;padding:2px;text-overflow: ellipsis;white-space:nowrap; overflow:hidden'

const transparentImg = new Image()
transparentImg.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

let currDOMSelector: any
let wizardConfigs: any = []
let translateX = 0
let translateY = 0
let startX = 0
let startY = 0
let scrolllX = 0
let scrolllY = 0
let isInSetting = true // 是否处于设置模式
let currWizardIndex = 0 // 当前向导索引
let _quitCallback: any
let _lang = 'zh_cn'

function translate(word: string) {
  let Lang: any = null
  switch (_lang.toLowerCase()) {
    case 'en': {
      Lang = LangEn
      break
    }
    default:
      Lang = LangZhCn
  }
  return Lang[word] || word
}
function getUUID() {
  const strings = '0123456789abcdefghijklmnopqrstuvwxyz0123456789'
  const arr = []
  for (let i = 0; i < 16; i++) {
    const index = Math.floor(Math.random() * 45 + 1)
    arr.push(strings.substring(index, index + 1))
  }
  return arr.join('')
}
function moveSettingDiaglog(event: DragEvent) {
  const settingDialog = document.getElementById('ydw-setting')
  if (!settingDialog) return
  const { x, y } = event
  const newX = translateX + x - startX
  const newY = translateY + y - startY
  settingDialog.style.transform = `translate(${newX}px, ${newY}px )`
}
function getTranslate(target: HTMLElement) {
  const transform = target.style.transform
  const translate = transform.replace(/translate|\(|\)|px/gi, '').split(',')
  if (translate.length !== 2) return { translateX: 0, translateY: 0 }
  return {
    translateX: parseInt(translate?.[0].trim(), 10),
    translateY: parseInt(translate?.[1].trim(), 10)
  }
}
function dragstart(event: DragEvent) {
  if (!event || !event?.dataTransfer || !isInSetting) return
  const el = event.target as any
  const rst = getTranslate(el)
  translateX = rst.translateX
  translateY = rst.translateY
  startX = event.x
  startY = event.y
  event.dataTransfer.setDragImage(transparentImg, 0, 0) // 设置拖动图像为透明图片
}
function drag(event: DragEvent) {
  if ((event.x === 0 && event.y === 0) || !isInSetting) return
  moveSettingDiaglog(event)
}
function dragend(event: DragEvent) {
  // (event.target as any).style.opacity = 1;
  moveSettingDiaglog(event)
}
function exportSetting() {
  const link = document.getElementById('ydw-export-link')
  if (!link) return
  link.setAttribute(
    'href',
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(wizardConfigs, null, 4))
  )
  link.setAttribute('download', 'ydwizard.json')
  link.click()
}
function extraFromImport(data: any) {
  let json
  try {
    json = JSON.parse(data)
    if (!Array.isArray(json)) {
      alert(translate('invalidJsonData'))
    }
    wizardConfigs = json
    updateHasWizardTip()
    alert(translate('importSuccess'))
  } catch (e) {
    alert(translate('invalidJsonData'))
  }
}

/**
 * 预览模式
 */
function preview() {
  const previewBtn = document.getElementById('ydw-preview')
  if (isInSetting) {
    if (previewBtn) previewBtn.innerText = translate('stopPreview')
    document
      .querySelectorAll('.ydwizard-tip, #ydwizard-bounding, #ydwizard-form, #ydwizard-action')
      .forEach(function(el) {
        ;(el as any).style.display = 'none'
      })
    currWizardIndex = 0
    showWizard()
  } else {
    if (previewBtn) previewBtn.innerText = translate('preview')
    document.getElementById('ydw-wizard')?.remove()
    document.querySelectorAll('.ydwizard-tip').forEach(function(el) {
      ;(el as any).style.display = 'block'
    })
  }
  isInSetting = !isInSetting
}

function importSetting(event: any) {
  const files = event.target.files
  if (typeof FileReader !== 'undefined') {
    let reader = new FileReader()

    if (reader.readAsText) {
      reader.onload = function(e: any) {
        extraFromImport(e.target.result)
      }
      reader.readAsText(files[0])
    }
  } else {
    alert('This browser does not support HTML5.')
  }
}

function elementScroll(event: Event) {
  if (!isInSetting) {
    const el = document.querySelector(wizardConfigs[currWizardIndex].selector)
    showBoundingClientRect(el)
    return
  }
  const el = event.target as HTMLElement
  // console.log(document.documentElement.scrollTop)
  document
    .querySelectorAll('#ydwizard-action, #ydwizard-form, #ydwizard-bounding')
    .forEach(function(el) {
      ;(el as any).style.display = 'none'
    })
  updateHasWizardTip()
}

function getDomPath(el: HTMLElement) {
  if (el.hasAttribute('id')) {
    return '#' + el.getAttribute('id')
  }
  const path = []

  while (true) {
    let parentEl = el.parentElement
    if (!parentEl) {
      path.unshift(el.tagName + ':nth-child(1)')
      break
    }

    for (let index = 0; index < parentEl.children.length; index++) {
      if (parentEl.children.item(index) === el) {
        path.unshift(`${el.tagName}:nth-child(${index + 1})`)
      }
    }

    if (parentEl.hasAttribute('id')) {
      path.unshift('#' + parentEl.getAttribute('id'))
      break
    }
    el = parentEl
    parentEl = parentEl.parentElement
  }
  return path.join('>')
}

/**
 * 初始化元素的边框
 */
function initBoundingClientRect() {
  if (document.getElementById('ydwizard-bounding')) return
  const bounding = document.createElement('div')
  bounding.setAttribute('style', rectStyle)
  bounding.setAttribute('class', 'ydw-ignore')
  bounding.setAttribute('id', 'ydwizard-bounding')
  document.body.append(bounding)
}
function showBoundingClientRect(targetEl: any) {
  if (!targetEl) return
  const rectDom = document.getElementById('ydwizard-bounding')
  const rect = targetEl.getBoundingClientRect()
  if (rectDom) {
    rectDom.style.display = 'block'
    rectDom.style.left = rect.left - 2 + 'px'
    rectDom.style.top = rect.top - 2 + 'px'
    rectDom.style.width = rect.width + 'px'
    rectDom.style.height = rect.height + 'px'
  }
}

/**
 * 打开向导设置对话框
 * @param event
 */
function openForm(event: MouseEvent) {
  const popcorn = event.target as HTMLElement
  const ydwizard = document.querySelector('#ydwizard-form') as HTMLElement
  const arrow = document.querySelector('#ydwizard-form [data-popper-arrow]') as HTMLElement

  if (!popcorn) return
  if (!ydwizard) return
  const { config } = getWizardConfig(currDOMSelector)
  ;(document.querySelector('#ydwizard-form textarea') as any).value = config?.text || ''

  ydwizard.style.display = 'block'
  createPopper(popcorn, ydwizard, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrow
        }
      }
    ]
  })
}

function getWizardConfig(selector: string) {
  for (let index = 0; index < wizardConfigs.length; index++) {
    const config = wizardConfigs[index]
    if (selector === config.selector) return { index, config }
  }
  return { index: -1, config: null }
}

/**
 *
 */
function saveWizard(event: KeyboardEvent) {
  const textarea = event.target as any
  const value = textarea.value.trim()
  let { index, config } = getWizardConfig(currDOMSelector)
  if (index === -1) {
    config = { selector: currDOMSelector, text: '' }
    wizardConfigs.push(config)
  }
  if (value && value.length > 0) {
    config.text = value
  } else {
    if (index > -1) wizardConfigs.splice(index, 1)
  }
  updateHasWizardTip()
}

function updateHasWizardTip() {
  document.querySelectorAll('.ydwizard-tip').forEach(item => {
    item.remove()
  })
  for (let index = 0; index < wizardConfigs.length; index++) {
    const config = wizardConfigs[index]
    const targetEl = document.querySelector(config.selector)
    if (!targetEl) continue
    const tip = document.getElementById(`${index}-tip`) || document.createElement('div')
    tip.setAttribute('style', tipStyle)
    tip.setAttribute('class', 'ydw-ignore ydwizard-tip')
    tip.setAttribute('id', `${index}-tip`)
    tip.innerText = `${index + 1}`
    document.body.append(tip)

    const rect = targetEl.getBoundingClientRect()
    tip.style.display = 'block'
    tip.style.left = rect.left + 'px'
    tip.style.top = rect.top + 'px'
    tip.style.width = rect.width + 'px'
    tip.style.height = rect.height + 'px'
  }
}

/**
 * 初始化设置模式
 */
function initSetting() {
  // 设置面板
  const settingDialog = document.createElement('div')
  settingDialog.setAttribute('class', 'ydw-ignore')
  settingDialog.setAttribute('id', 'ydw-setting')
  settingDialog.setAttribute('draggable', 'true')
  settingDialog.innerHTML = `<strong id="ydw-setting-header" class="ydw-ignore">YDWizard</strong>
      <p class="ydw-ignore">${translate('settingDesc')}</p>
      <div class="ydw-ignore" style="display: flex;gap: 20px;align-items: center">
        <button type="button" class="ydw-ignore" id="ydw-export"> ${translate('export')} </button>
        <button type="button" class="ydw-ignore" id="ydw-import"> ${translate('import')} </button>
        <button type="button" class="ydw-ignore" id="ydw-preview"> ${translate('preview')} </button>
        <a id="ydw-export-link"></a>
      </div>
      <input type="file" id="ydw-import-file" accept="application/json" style="display: none">
      <p style="text-align: right"><small> by <a href="http://yidianhulian.com" target="_blank">易点互联</a>&copy;</small></p>
`
  document.body.append(settingDialog)
  document.getElementById('ydw-setting')?.addEventListener('dragstart', dragstart)
  document.getElementById('ydw-setting')?.addEventListener('drag', drag)
  document.getElementById('ydw-setting')?.addEventListener('dragend', dragend)
  document.getElementById('ydw-export')?.addEventListener('click', exportSetting)
  document.getElementById('ydw-preview')?.addEventListener('click', preview)
  document.getElementById('ydw-import')?.addEventListener('click', function() {
    const file = document.getElementById('ydw-import-file')
    if (!file) return
    file.click()
  })
  document.getElementById('ydw-import-file')?.addEventListener('change', importSetting)

  // 初始化悬浮元素边框
  initBoundingClientRect()

  // 提示内容设置框
  const wizardPopper = document.createElement('div')
  wizardPopper.setAttribute('class', 'ydw-ignore')
  wizardPopper.innerHTML = `<div data-popper-arrow></div>
<div style="" class="ydw-ignore">
  <div style="${wizardDialogStyle}" class="ydw-ignore">
    <div class="ydw-ignore">${translate('wizardText')}：</div>
    <div class="ydw-ignore">
        <textarea style="resize: none" class="ydw-ignore" cols="60" rows="3" placeholder="${translate(
          'pleaseInputText'
        )}"></textarea>
    </div>
  </div>
</div>`
  wizardPopper.setAttribute('id', 'ydwizard-form')
  document.body.append(wizardPopper)
  const textarea = document.querySelector('#ydwizard-form textarea') as HTMLElement
  if (textarea) textarea.addEventListener('keyup', saveWizard)

  // 打开向导设置对话框
  const action = document.createElement('div')
  action.setAttribute('style', actionStyle)
  action.setAttribute('class', 'ydw-ignore')
  action.innerHTML = translate('addWizard')
  action.setAttribute('id', 'ydwizard-action')
  document.body.append(action)
  action.addEventListener('click', openForm)

  document.querySelectorAll('*').forEach(item => {
    item.addEventListener('scroll', elementScroll)
  })
  document.addEventListener('scroll', elementScroll)

  document.body.addEventListener('mouseover', function(event: MouseEvent) {
    if (!isInSetting) return
    const targetEl = event?.target as HTMLElement
    // console.log(targetEl)
    if (targetEl.classList.contains('ydw-ignore')) return
    currDOMSelector = getDomPath(targetEl)
    showBoundingClientRect(targetEl)

    const actionDom = document.getElementById('ydwizard-action')
    const popover = document.getElementById('ydwizard-form')
    const rect = targetEl.getBoundingClientRect()
    if (actionDom) {
      actionDom.style.display = 'block'
      actionDom.style.left = rect.left - 2 + 'px'
      actionDom.style.top = rect.top + rect.height + 'px'
      actionDom.style.width = rect.width + 'px'
    }

    if (popover) {
      popover.style.display = 'none'
    }
  })
}

/**
 * 开始向导
 */
function showWizard() {
  document.getElementById('ydw-wizard')?.remove()
  if (!wizardConfigs || !wizardConfigs.length) return
  initBoundingClientRect()
  const wizard = wizardConfigs[currWizardIndex] as any
  const wizardDialog = document.createElement('div')
  wizardDialog.setAttribute('class', 'ydw-ignore')
  wizardDialog.setAttribute('id', 'ydw-wizard')
  wizardDialog.innerHTML = `<div data-popper-arrow style="margin-top: -15px"></div>
<button type="button" id="ydw-quit">✕</button>
<div style="padding-right: 20px">${wizard['text']}</div>
<div class="ydw-wizard-foot">
<button type="button" id="ydw-prev-btn">⇦</button>
<div style="margin: 0 10px">${currWizardIndex + 1}/${wizardConfigs.length}</div>
<button type="button" id="ydw-next-btn">⇨</button>
</div>`
  const hoverEl = document.querySelector(wizard.selector)
  if (hoverEl) {
    showBoundingClientRect(hoverEl)
    const rect = hoverEl.getBoundingClientRect()
    document.documentElement.scrollTop = rect.top
    document.documentElement.scrollLeft = rect.left
  }
  document.body.append(wizardDialog)

  document.querySelectorAll('*').forEach(item => {
    item.addEventListener('scroll', elementScroll)
  })
  document.addEventListener('scroll', elementScroll)

  const arrow = document.querySelector('#ydw-wizard [data-popper-arrow]') as HTMLElement
  const arrowOption = hoverEl ? {
      name: 'arrow',
      options: {
        element: arrow,
        padding: 20
      }
    } : {}
  createPopper(hoverEl || document.body, wizardDialog, {
    placement: hoverEl ? 'bottom-start' : 'top-start',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrow,
          padding: () => {
            if (hoverEl) return 20
            return 40
          }
        }
      },
      {
        name: 'offset',
        options: {
          offset: () => {
            if (hoverEl) return [0, 20]
            return [
              0,
              -document.body.clientHeight
            ];
          }
        }
      }
    ]
  })

  document.getElementById('ydw-prev-btn')?.addEventListener('click', function() {
    currWizardIndex--
    if (currWizardIndex < 0) {
      currWizardIndex = 0
      return
    }
    showWizard()
  })
  document.getElementById('ydw-next-btn')?.addEventListener('click', function() {
    currWizardIndex++
    if (currWizardIndex >= wizardConfigs.length) {
      currWizardIndex = wizardConfigs.length - 1
      return
    }
    showWizard()
  })
  document.getElementById('ydw-quit')?.addEventListener('click', function() {
    preview()
    document.getElementById('ydw-wizard')?.remove()
    if (_quitCallback) {
      _quitCallback()
    }
  })
}

/**
 * 注入样式
 */
function injectStyle() {
  const styleEl = document.createElement('style')
  styleEl.type = 'text/css'
  try {
    styleEl.appendChild(document.createTextNode(STYLE_TEXT))
  } catch (ex) {
    ;(styleEl as any).styleSheet.cssText = 'body{background-color:red}' // 针对IE
  }
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(styleEl)
}

export default class Ydwizard {
  public static setLang(lang: string) {
    _lang = lang
  }

  /**
   * 开启设置模式
   */
  public static startSetting() {
    injectStyle()
    initSetting()
  }

  /**
   * 开启向导模式
   *
   * @param setting
   * @param quitCallback
   */
  public static start(setting: any, quitCallback = null) {
    injectStyle()
    isInSetting = false
    wizardConfigs = setting
    _quitCallback = quitCallback
    currWizardIndex = 0
    showWizard()
  }
}
