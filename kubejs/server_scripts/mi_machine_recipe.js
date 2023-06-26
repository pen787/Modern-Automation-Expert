// priority: 20

ServerEvents.recipes((event) => {
    event.replaceInput(
        { output: "modern_industrialization:bronze_compressor" },
        "modern_industrialization:forge_hammer",
        "create:mechanical_press"
    );

	event.replaceInput(
        { output: 'modern_industrialization:bronze_water_pump' },
        'modern_industrialization:copper_rotor',
        'create:mechanical_pump'
    );

	event.replaceInput(
        { output: 'modern_industrialization:bronze_macerator' },
        'minecraft:diamond',
        'create:millstone'
    );

	event.replaceInput(
        { output: 'modern_industrialization:bronze_mixer' },
        'modern_industrialization:copper_rotor',
		'create:mechanical_mixer'
    );

	event.replaceInput(
        { output: 'modern_industrialization:bronze_cutting_machine' },
        'minecraft:diamond',
		'create:mechanical_saw'
    );

});
