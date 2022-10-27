/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-27 15:35:06
 * @LastEditTime: 2022-10-27 15:35:32
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezHomepage\db\collections\fields\status.js
 */
export default {
		"collection": "bookmarks",
		"field": "status",
		"type": "string",
		"schema": {
			"name": "status",
			"table": "bookmarks",
			"data_type": "varchar",
			"default_value": "published",
			"generation_expression": null,
			"max_length": 255,
			"numeric_precision": null,
			"numeric_scale": null,
			"is_generated": false,
			"is_nullable": true,
			"is_unique": false,
			"is_primary_key": false,
			"has_auto_increment": false,
			"foreign_key_column": null,
			"foreign_key_table": null,
			"comment": ""
		},
		"meta": {
			// "id": 13,
			"collection": "bookmarks",
			"field": "status",
			"special": null,
			"interface": "select-dropdown",
			"options": {
				"choices": [{
					"text": "$t:published",
					"value": "published"
				}, {
					"text": "$t:draft",
					"value": "draft"
				}, {
					"text": "$t:archived",
					"value": "archived"
				}]
			},
			"display": "labels",
			"display_options": {
				"showAsDot": true,
				"choices": [{
					"text": "$t:published",
					"value": "published",
					"foreground": "#FFFFFF",
					"background": "var(--primary)"
				}, {
					"text": "$t:draft",
					"value": "draft",
					"foreground": "#18222F",
					"background": "#D3DAE4"
				}, {
					"text": "$t:archived",
					"value": "archived",
					"foreground": "#FFFFFF",
					"background": "var(--warning)"
				}]
			},
			"readonly": false,
			"hidden": false,
			"sort": null,
			"width": "full",
			"translations": null,
			"note": null,
			"conditions": null,
			"required": false,
			"group": null,
			"validation": null,
			"validation_message": null
		}
	}
