import Clipboard from 'clipboard'
import { message } from "ant-design-vue";

function clipboardSuccess() {
    message.success('复制成功')
}

function clipboardError() {
    message.error('复制失败')
}

export default function copyToClipboard(text) {
    const fakeElement = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
        text: () => text
    });

    clipboard.on('success', () => {
        clipboardSuccess()
        clipboard.destroy()
        fakeElement.remove()
    })

    clipboard.on('error', () => {
        clipboardError()
        clipboard.destroy()
    })

    fakeElement.click()
}
