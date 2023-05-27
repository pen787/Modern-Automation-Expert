// priority: 500

console.info('Hello, World! (You will see this line every time server resources reload)')

ServerEvents.recipes(event => {
	event.remove({ output: 'ae2:inscriber' })
	event.remove({ id: 'ad_astra:conversion/oxygen_from_water' })
	event.remove({ id: 'ad_astra:conversion/fuel_from_oil' })

	event.remove({ type: 'ad_astra:compressing' })
	event.remove({ type: 'ad_astra:fuel_refinery' })
	event.remove({ output: 'ad_astra:compressor' })
	event.remove({ output: 'ad_astra:fuel_refinery' })
	event.remove({ input: Item.of('ad_astra:hammer') })
	event.remove({ output: Item.of('ad_astra:hammer') })

	event.remove({ output: 'ad_astra:iron_rod' })

	event.shapeless('notreepunching:plant_fiber',['farmersdelight:straw'])
	event.shapeless('farmersdelight:straw',['notreepunching:plant_fiber'])

	event.remove({mod : "farmersdelight", output: '#c:tools/knives'})

	//remove all the rolling mill recipe
	event.remove({mod: 'createaddition', type:"createaddition:rolling", not: {output: 'createaddition:straw'} })

})

ServerEvents.tags('item', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')

	event.get("c:tools/knives").add('notreepunching:flint_knife')
	event.get("c:tools/knives").add('notreepunching:iron_knife')
	event.get("c:tools/knives").add('notreepunching:gold_knife')
	event.get("c:tools/knives").add('notreepunching:diamond_knife')
	event.get("c:tools/knives").add('notreepunching:netherite_knife')

	event.get("c:limestone").add('blockus:limestone')
	event.get("c:limestone").add('create:limestone')
})

ServerEvents.tags('fluid', e => {
	e.get('ad_astra:oxygen').add('modern_industrialization:oxygen')
})