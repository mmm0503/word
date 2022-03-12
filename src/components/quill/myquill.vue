<template>
    <div>
        <div>
            <button @click="addpieceBlock">添加实体</button>
        </div>
        <quill-editor ref="myQuillEditor"></quill-editor>
    </div>
</template>


<script>
import Quill from 'quill'
export default {
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
                value: '国泰君安'
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
        }
    },

}
</script>


<style lang='less'>
.mention {
    font-size: 14px;
    display: flex;
    align-items: center;
    background-color: rgb(76, 126, 235);
    display: inline-block;
    border-radius: 5%;
    margin: 0 2pt;
    padding: 0 2pt;
    color: #fff;
}
</style>