// A view of an object

Vue.component('obj-view', {
	template: `
	<div v-bind:class="'objview objview-' + getType(obj)">
		
		<div v-if="getType(obj) === 'object'"
			class="objview-row" v-for="(value, name) in obj">
			<div class="objview-row-label" >{{name}}</div>:
			<div class="objview-row-content">
			
				<obj-view :obj="value">
				</obj-view>
			</div>
		</div>

		<div v-if="getType(obj) ==='array'">
			ARRAY
		</div>

		<div v-if="getType(obj) ==='string'">
			STRING:{{obj}}
		</div>
	</div>
	`,
	props: ["obj"],
	methods: {
		getType: function() {
			if (typeof this.obj === "object") {
				if (Array.isArray(this.obj))
					return "array";
				return "object"
			}
			return typeof this.obj
		}
	}
})

Vue.component('array-view', {
	template: `
	<div>
		
		<div class="arrayview-item" v-for="item in arr">
			{{item}}
		</div>
	</div>
	`,
	props: ["arr"]
})

var langViewer = new Vue({
	template: `
	<div class="panel language-view">
		<div class="header">
			<div class="header-main">
				{{selected}}
			</div>
			<div class="header-controls">
				<select v-model="selected" @change="onChange">
					<option v-for="(lang, key) in languageSpecs"
						v-bind:value="lang"
					>
					{{key}}
					</option>
				</select>
				
			</div>
		</div>
		<div class="content">
			<obj-view :obj="selected"></obj-view>
		</div>
	</div>
	`,

	methods: {
		onChange: function() {
			console.log(this.selected)
		}
	},


	el: "#spec",
	data: function() {
		return {

			languageSpecs: languageSpecs,
			selected: languageSpecs.traceryOG
		}
	}
})
