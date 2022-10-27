/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-27 11:50:33
 * @LastEditTime: 2022-10-27 16:12:16
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezHomepage\db\index.js
 */

const db = {
    collections: [],
    fields: {}
}

const collection = import.meta.globEager('./*/index.js')
Object.keys(collection).forEach((key) => {
    const label = key.replace(/^\.\/(.*?)\/index\.js$/gi, '$1')
    db.collections.push(collection[key].default)
    db.fields[label] = []
})

const field = import.meta.globEager('./*/fields/*.js')
Object.keys(field).forEach((key) => {
    const [c, f] = key
        .replace(/^\.\/(.*?)\/fields\/(.*?)\.js$/gi, '$1|$2')
        .split('|')
    db.fields[c].push(field[key].default)
})

console.log('[db]', db)
export default db
