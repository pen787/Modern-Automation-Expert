// priority: 20

ServerEvents.recipes((e) => {
    e.replaceInput(
        { output: "modern_industrialization:bronze_compressor" },
        "modern_industrialization:forge_hammer",
        "create:mechanical_press"
    );

	e.replaceInput(
        { output: 'modern_industrialization:bronze_water_pump' },
        'modern_industrialization:copper_rotor',
        'create:mechanical_pump'
    );

	e.replaceInput(
        { output: 'modern_industrialization:bronze_macerator' },
        'minecraft:diamond',
        'create:millstone'
    );

	e.replaceInput(
        { output: 'modern_industrialization:bronze_mixer' },
        'modern_industrialization:copper_rotor',
		'create:mechanical_mixer'
    );

	e.replaceInput(
        { output: 'modern_industrialization:bronze_cutting_machine' },
        'minecraft:diamond',
		'create:mechanical_saw'
    );
});
