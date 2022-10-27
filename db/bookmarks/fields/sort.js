/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-27 15:53:56
 * @LastEditTime: 2022-10-27 17:17:11
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\db\bookmarks\fields\sort.js
 */
export default {
    collection: 'bookmarks',
    field: 'sort',
    type: 'integer',
    schema: {
        name: 'sort',
        table: 'bookmarks',
        data_type: 'int',
        default_value: null,
        generation_expression: null,
        max_length: null,
        numeric_precision: 10,
        numeric_scale: 0,
        is_generated: false,
        is_nullable: true,
        is_unique: false,
        is_primary_key: false,
        has_auto_increment: false,
        foreign_key_column: null,
        foreign_key_table: null,
        comment: ''
    },
    meta: {
        // id: 14,
        collection: 'bookmarks',
        field: 'sort',
        special: null,
        interface: 'input',
        options: null,
        display: null,
        display_options: null,
        readonly: false,
        hidden: true,
        sort: null,
        width: 'full',
        translations: null,
        note: null,
        conditions: null,
        required: false,
        group: null,
        validation: null,
        validation_message: null
    }
}
