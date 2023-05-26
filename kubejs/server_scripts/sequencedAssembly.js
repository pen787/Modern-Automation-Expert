let MI = (id) => 'modern_industrialization:' + id
let MC = (id) => 'minecraft:' + id
let CE = (id) => "create:" + id
let KJS = (id) => "kubejs:" + id

let MI_ITEM = (amount, item) => { return { "amount": amount, "item": item } }

ServerEvents.recipes(e => {
	//harder analog circuit
	
	
	// let inter = 'modern_industrialization:analog_circuit_board'
	e.remove({ output: MI("analog_circuit"), type: MC('crafting_shaped') })
	let inter = KJS('incomplete_analog_circuit')
	e.recipes.createSequencedAssembly([
		Item.of('modern_industrialization:analog_circuit').withChance(70.0),
		Item.of('modern_industrialization:analog_circuit_board').withChance(1.0),
		'modern_industrialization:inductor',
		'3x modern_industrialization:red_alloy_wire',
		'1x create:electron_tube',
		'2x modern_industrialization:resistor',
		'2x modern_industrialization:capacitor',
	],
		"modern_industrialization:analog_circuit_board", [
		e.recipes.createDeploying(inter, [inter, 'create:electron_tube']),
		e.recipes.createDeploying(inter, [inter, Item.of('modern_industrialization:capacitor')]),
		e.recipes.createDeploying(inter, [inter, 'modern_industrialization:inductor']),
		e.recipes.createDeploying(inter, [inter,  Item.of('modern_industrialization:resistor')]),
		e.recipes.createDeploying(inter, [inter,  Item.of('modern_industrialization:red_alloy_wire')]),
		e.recipes.createPressing(inter, inter),
	]).transitionalItem(inter).loops(2)

	//harder steam engine from create to make power
	e.remove({output: 'create:steam_engine'})
	let interrecipe = 'create:steam_engine'
	e.recipes.createSequencedAssembly([
		Item.of('create:steam_engine').withChance(69),
		Item.of('minecraft:copper_block').withChance(2),
		'2x modern_industrialization:analog_circuit',
		'2x modern_industrialization:steel_plate',
		'2x modern_industrialization:gold_plate',
		'2x create:andesite_alloy'
	],'minecraft:copper_block' , [
		e.recipes.createDeploying(interrecipe, [interrecipe, MI("analog_circuit")]),
		e.recipes.createDeploying(interrecipe, [interrecipe, MI("steel_plate")]),
		e.recipes.createDeploying(interrecipe, [interrecipe, MI("gold_plate")]),
		e.recipes.createDeploying(interrecipe, [interrecipe, CE("andesite_alloy")]),
		e.recipes.createPressing(interrecipe, interrecipe)
	]).transitionalItem(interrecipe).loops(2)

	//harder alternator
	e.remove({output: 'createaddition:alternator'})
	let inter1 = 'createaddition:alternator'
	e.recipes.createSequencedAssembly([
		'createaddition:alternator',
	],'modern_industrialization:steel_machine_casing' , [
		e.recipes.createDeploying(inter1, [inter1, MI("analog_circuit")]),
		e.recipes.createDeploying(inter1, [inter1, MI("analog_circuit")]),
		e.recipes.createDeploying(inter1, [inter1, MI("steel_plate")]),
		e.recipes.createDeploying(inter1, [inter1, 'modern_industrialization:copper_cable']),
		e.recipes.createDeploying(inter1, [inter1, 'modern_industrialization:capacitor']),
		e.recipes.createDeploying(inter1, [inter1, 'modern_industrialization:bronze_ingot']),
		e.recipes.createDeploying(inter1, [inter1, CE("andesite_alloy")]),
		e.recipes.createPressing(inter1, inter1)
	]).transitionalItem(inter1).loops(1)

	//harder resistor
	e.remove({output: 'modern_industrialization:resistor', type:"crafting_shaped"})
	let inter2 = 'modern_industrialization:resistor'
	e.recipes.createSequencedAssembly([
		Item.of('3x modern_industrialization:resistor'),
	],'minecraft:paper' , [
		e.recipes.createDeploying(inter2, [inter2,'modern_industrialization:copper_fine_wire']),
		e.recipes.createDeploying(inter2, [inter2,'#c:coal_dusts']),
		e.recipes.createDeploying(inter2, [inter2,'modern_industrialization:copper_fine_wire']),
		e.recipes.createPressing(inter2, inter2)
	]).transitionalItem(inter2).loops(1)

	//harder capaistor
	e.remove({output: 'modern_industrialization:capacitor', type:"crafting_shaped"})
	let inter3 = 'modern_industrialization:capacitor'
	e.recipes.createSequencedAssembly([
		Item.of('modern_industrialization:capacitor'),
	],'modern_industrialization:rubber_sheet' , [
		e.recipes.createDeploying(inter3, [inter3,'modern_industrialization:copper_wire']),
		e.recipes.createDeploying(inter3, [inter3,'modern_industrialization:gold_plate']),
		e.recipes.createDeploying(inter3, [inter3,'modern_industrialization:copper_wire']),
		e.recipes.createPressing(inter3, inter3)
	]).transitionalItem(inter3).loops(1)

	//harder 'modern_industrialization:inductor'
	e.remove({output: 'modern_industrialization:inductor', type:"crafting_shaped"})
	inter3 = 'modern_industrialization:inductor'
	e.recipes.createSequencedAssembly([
		Item.of('modern_industrialization:inductor'),
	],'modern_industrialization:steel_rod' , [
		e.recipes.createDeploying(inter3, [inter3,'modern_industrialization:copper_wire']),
	]).transitionalItem(inter3).loops(8)

	//harder 'createaddition:electric_motor'
	e.remove({output: 'createaddition:electric_motor'})
	inter3 = 'createaddition:electric_motor'
	e.recipes.createSequencedAssembly([
		'createaddition:electric_motor',
	],'modern_industrialization:bronze_machine_casing' , [
		e.recipes.createDeploying(inter3, [inter3, MI("analog_circuit")]),
		e.recipes.createDeploying(inter3, [inter3, MI("steel_plate")]),
		e.recipes.createDeploying(inter3, [inter3, 'modern_industrialization:copper_cable']),
		e.recipes.createDeploying(inter3, [inter3, 'modern_industrialization:bronze_ingot']),
		e.recipes.createDeploying(inter3, [inter3, CE("andesite_alloy")]),
		e.recipes.createPressing(inter3, inter3)
	]).transitionalItem(inter3).loops(1)


	
})
