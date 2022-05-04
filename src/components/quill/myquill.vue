<template>
    <div>
        <div>
            <button @click="addpieceBlock">添加实体</button>
            <button @click="getcontent">get</button>
        </div>
        <quill-editor ref="myQuillEditor" :options="options"></quill-editor>
    </div>
</template>


<script>
import Quill from 'quill'
let toolbarOptions = {
    container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['emoji'],
    ],
    // handlers: { 'emoji': function () { } }
}
export default {
    data() {
        return {
            options: {
                modules: {
                    toolbar: toolbarOptions,
                    "emoji-toolbar": true,
                    // "emoji-textarea": true,
                    // "emoji-shortname": true,
                }
            }
        }
    },
    computed: {
        quill() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        addpieceBlock() {
            const insertData = {
                ttype: 'entity',
                key: '${entity}',
                value: `<span>123</span>`
            }
            this.insertEmbed(insertData)
        },
        insertEmbed(insertData) {
            if (!insertData) return
            switch (insertData.ttype) {
                // 实体
                case 'entity':
                    this.defaultInsertEmbed(insertData)
                    break;
            }
        },
        defaultInsertEmbed(insertData) {
            const quill = this.quill
            quill.focus()
            let range = quill.getSelection()
            let rangindx = range ? range.index : 0
            quill.insertEmbed(rangindx, 'mention', insertData, Quill.sources.USER)
            quill.setSelection(rangindx + 1, Quill.sources.USER)
        },
        getcontent() {
            let c = this.quill.getContents().ops
            console.log(c)
        }
    },

}
</script>


<style lang='less'>
.mention {
    font-size: 14px;
    display: flex;
    align-items: center;
    background: rgb(76, 126, 235);
    display: inline-block;
    border-radius: 5%;
    margin: 0 2px;
    padding: 0 4px 0 2px;
    color: #fff !important;
}
</style>