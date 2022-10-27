/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-27 15:53:23
 * @LastEditTime: 2022-10-27 15:53:27
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\db\tags\fields\date_created.js
 */
export default {
    collection: 'tags',
    field: 'date_created',
    type: 'timestamp',
    schema: {
        name: 'date_created',
        table: 'tags',
        data_type: 'timestamp',
        default_value: null,
        generation_expression: null,
        max_length: null,
        numeric_precision: null,
        numeric_scale: null,
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
        id: 50,
        collection: 'tags',
        field: 'date_created',
        special: ['date-created'],
        interface: 'datetime',
        options: null,
        display: 'datetime',
        display_options: {
            relative: true
        },
        readonly: true,
        hidden: true,
        sort: null,
        width: 'half',
        translations: null,
        note: null,
        conditions: null,
        required: false,
        group: null,
        validation: null,
        validation_message: null
    }
}
