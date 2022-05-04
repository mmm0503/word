import * as Quill from "quill";

import * as Emoji from "quill-emoji";
Quill.register("modules/emoji", Emoji);
import "quill-emoji/dist/quill-emoji.css";


const Embed = Quill.import('blots/embed')

class MentionBlot extends Embed {
    static create(data) {
        const node = super.create()
        const denotationChar = document.createElement('span')
        node.setAttribute('contenteditable', 'false')
        denotationChar.className = 'ql-mention-denotation-char'
        denotationChar.innerHTML = data.key
        node.appendChild(denotationChar)
        node.innerHTML = `${data.value}`
        return MentionBlot.setDataValues(node, data)
    }

    static setDataValues(element, data) {
        const domNode = element
        Object.keys(data).forEach(key => {
            if (typeof data[key] == 'object') {
                domNode.dataset[key] = JSON.stringify(data[key])
            } else {
                domNode.dataset[key] = data[key]
            }
        })
        return domNode
    }
    static value(domNode) {
        return domNode.dataset
    }
}

MentionBlot.blotName = 'mention'
MentionBlot.tagName = 'span'
MentionBlot.className = 'mention'
Quill.register(MentionBlot)