WorldgenEvents.add(event => {
	// use the anchors helper from the event
	const { anchors } = event

	/*
	event.addOre(ore => {
		ore.id = 'kubejs:big_iron'

		// examples on how to use targets
		ore.addTarget('#minecraft:stone_ore_replaceables', 'minecraft:iron_ore')
		ore.addTarget('minecraft:deepslate', 'minecraft:deepslate_iron_ore')
		ore.addTarget([
			'minecraft:gravel',
			/minecraft:(.*)_dirt/
		], 'minecraft:iron_ore')

		ore.count([2, 8])
			.squared()
			.triangleHeight(
				anchors.aboveBottom(32),
				anchors.absolute(90)
			)								              
		ore.size = 25
		ore.noSurface = 0.5
		ore.worldgenLayer = 'underground_ores'
		ore.chance = 0.3
	})

	event.addOre(ore => {
		ore.id = 'kubejs:big_copper'

		ore.addTarget('#minecraft:stone_ore_replaceables','minecraft:copper_ore')
		ore.addTarget('minecraft:deepslate', 'minecraft:deepslate_copper_ore')
		ore.addTarget([
			'minecraft:gravel',
			/minecraft:(.*)_dirt/
		],'minecraft:copper_ore')

		ore.count([2, 6])
			.squared()
			.triangleHeight(
				anchors.aboveBottom(50),
				anchors.absolute(120)
			)

		
		ore.size = 25
		ore.noSurface = 0.5
		ore.worldgenLayer = 'underground_ores'
		ore.chance = 0.35
	})

	event.addOre(ore => {
		ore.id = 'kubejs:big_tin' // (optional, but recommended) custom id for the feature

		// examples on how to use targets
		ore.addTarget('#minecraft:stone_ore_replaceables','modern_industrialization:tin_ore') // replace anything in the vanilla stone_ore_replaceables tag with Glowstone
		ore.addTarget('minecraft:deepslate', 'modern_industrialization:deepslate_tin_ore')       // replace Deepslate with Nether Wart Blocks
		ore.addTarget([
			'minecraft:gravel',     // replace gravel...
			/minecraft:(.*)_dirt/   // or any kind of dirt (including coarse, rooted, etc.)...
		],'modern_industrialization:tin_ore')       // with TNT (trust me, it'll be funny)

		ore.count([2, 5])             // generate between 15 and 50 veins (chosen at random), you could use a single number here for a fixed amount of blocks
			.squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
			.triangleHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
				anchors.aboveBottom(50),    // the lower bound should be 32 blocks above the bottom of the world, so in this case, Y = -32 since minY = -64
				anchors.absolute(70)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
			)								              // in total, the ore can be found between Y levels -32 and 96, and will be most likely at Y = (96 + -32) / 2 = 32

		// more, optional parameters (default values are shown here)
		ore.size = 25                            // max. vein size
		ore.noSurface = 0.5                     // chance to discard if the ore would be exposed to air
		ore.worldgenLayer = 'underground_ores'  // what generation step the ores should be generated in (see below)
		ore.chance = 0.35							            // if != 0 and count is unset, the ore has a 1/n chance to generate per chunk
	})

	event.addOre(ore => {
		ore.id = 'kubejs:big_nickle' // (optional, but recommended) custom id for the feature

		// examples on how to use targets
		ore.addTarget('#minecraft:stone_ore_replaceables','modern_industrialization:nickel_ore') // replace anything in the vanilla stone_ore_replaceables tag with Glowstone
		ore.addTarget('minecraft:deepslate', 'modern_industrialization:deepslate_nickel_ore')       // replace Deepslate with Nether Wart Blocks
		ore.addTarget([
			'minecraft:gravel',     // replace gravel...
			/minecraft:(.*)_dirt/   // or any kind of dirt (including coarse, rooted, etc.)...
		],'modern_industrialization:nickel_ore')       // with TNT (trust me, it'll be funny)

		ore.count([2, 6])             // generate between 15 and 50 veins (chosen at random), you could use a single number here for a fixed amount of blocks
			.squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
			.triangleHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
				anchors.aboveBottom(50),    // the lower bound should be 32 blocks above the bottom of the world, so in this case, Y = -32 since minY = -64
				anchors.absolute(80)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
			)								              // in total, the ore can be found between Y levels -32 and 96, and will be most likely at Y = (96 + -32) / 2 = 32

		// more, optional parameters (default values are shown here)
		ore.size = 20                            // max. vein size
		ore.noSurface = 0.5                     // chance to discard if the ore would be exposed to air
		ore.worldgenLayer = 'underground_ores'  // what generation step the ores should be generated in (see below)
		ore.chance = 0.35							            // if != 0 and count is unset, the ore has a 1/n chance to generate per chunk
	})

	event.addOre(ore => {
		ore.id = 'kubejs:big_lead' // (optional, but recommended) custom id for the feature

		// examples on how to use targets
		ore.addTarget('#minecraft:stone_ore_replaceables','modern_industrialization:lead_ore') // replace anything in the vanilla stone_ore_replaceables tag with Glowstone
		ore.addTarget('minecraft:deepslate', 'modern_industrialization:deepslate_lead_ore')       // replace Deepslate with Nether Wart Blocks
		ore.addTarget([
			'minecraft:gravel',     // replace gravel...
			/minecraft:(.*)_dirt/   // or any kind of dirt (including coarse, rooted, etc.)...
		],'modern_industrialization:lead_ore')       // with TNT (trust me, it'll be funny)

		ore.count([2, 6])             // generate between 15 and 50 veins (chosen at random), you could use a single number here for a fixed amount of blocks
			.squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
			.triangleHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
				anchors.aboveBottom(50),    // the lower bound should be 32 blocks above the bottom of the world, so in this case, Y = -32 since minY = -64
				anchors.absolute(50)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
			)								              // in total, the ore can be found between Y levels -32 and 96, and will be most likely at Y = (96 + -32) / 2 = 32

		// more, optional parameters (default values are shown here)
		ore.size = 25                            // max. vein size
		ore.noSurface = 0.5                     // chance to discard if the ore would be exposed to air
		ore.worldgenLayer = 'underground_ores'  // what generation step the ores should be generated in (see below)
		ore.chance = 0.34							            // if != 0 and count is unset, the ore has a 1/n chance to generate per chunk
	})

	event.addOre(ore => {
		ore.id = 'kubejs:big_redstone' // (optional, but recommended) custom id for the feature

		// examples on how to use targets
		ore.addTarget('#minecraft:stone_ore_replaceables','minecraft:redstone_ore') // replace anything in the vanilla stone_ore_replaceables tag with Glowstone
		ore.addTarget('minecraft:deepslate', 'minecraft:deepslate_redstone_ore')       // replace Deepslate with Nether Wart Blocks
		ore.addTarget([
			'minecraft:gravel',     // replace gravel...
			/minecraft:(.*)_dirt/   // or any kind of dirt (including coarse, rooted, etc.)...
		],'minecraft:redstone_ore')       // with TNT (trust me, it'll be funny)

		ore.count([2, 4])             // generate between 15 and 50 veins (chosen at random), you could use a single number here for a fixed amount of blocks
			.squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
			.triangleHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
				anchors.aboveBottom(50),    // the lower bound should be 32 blocks above the bottom of the world, so in this case, Y = -32 since minY = -64
				anchors.absolute(10)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
			)								              // in total, the ore can be found between Y levels -32 and 96, and will be most likely at Y = (96 + -32) / 2 = 32

		// more, optional parameters (default values are shown here)
		ore.size = 28                            // max. vein size
		ore.noSurface = 0.5                     // chance to discard if the ore would be exposed to air
		ore.worldgenLayer = 'underground_ores'  // what generation step the ores should be generated in (see below)
		ore.chance = 0.4							            // if != 0 and count is unset, the ore has a 1/n chance to generate per chunk
	})
	*/

})