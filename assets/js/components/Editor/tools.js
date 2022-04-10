import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
// import Code from '@editorjs/code'
// import LinkTool from '@editorjs/link'
// import Image from '@editorjs/image'
// import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
// import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter'
// import InlineCode from '@editorjs/inline-code'
// import SimpleImage from '@editorjs/simple-image'
import ColorPlugin from 'editorjs-text-color-plugin';

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    // code: Code,
    // linkTool: LinkTool,
    // image: {
    //     class: Image,
    //     config: {
    //         endpoints: {
    //             byFile: 'http://localhost:8000/api/images',
    //         },
    //         field: 'file',
    //         additionalRequestHeaders: {
    //             'Accept': 'application/json',
    //         }
    //     }
    // },
    // raw: Raw,
    header: Header,
    quote: Quote,
    // marker: Marker,
    checklist: CheckList,
    // delimiter: Delimiter,
    // inlineCode: InlineCode,
    // simpleImage: SimpleImage,
    Color: {
        class: ColorPlugin,
        config: {
            colorCollections: ['#000000', '#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
            defaultColor: '#FF1300',
            type: 'text',
        }
    },
    Marker: {
        class: ColorPlugin,
        config: {
            defaultColor: '#FFBF00',
            type: 'marker',
        }
    },
}