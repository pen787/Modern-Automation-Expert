// priority: 15
let MI = (id) => "modern_industrialization:" + id;
let MC = (id) => "minecraft:" + id;
let CE = (id) => "create:" + id;
let KJS = (id) => "kubejs:" + id;

let MI_ITEM = (amount, item) => {
    return { amount: amount, item: item };
};
let MI_ITEM_CHANCE = (amount, item, probability) => {
    return { amount: amount, item: item, probability: probability };
};
let MI_FLUID = (amount, fluidname) => {
    return { amount: amount, fluid: fluidname };
};

ServerEvents.recipes((e) => {
    const event = e;

    let custom_quarry_drill = (input, outputs, energy_use, duration) => {
        e.custom({
            type: "modern_industrialization:quarry",
            eu: energy_use,
            duration: duration,
            item_inputs: input,
            item_outputs: outputs,
        });
    };

    let assembler = (inputs, outputs, duration, power) =>
        e.custom({
            type: "modern_industrialization:assembler",
            duration: duration,
            eu: power,
            item_inputs: inputs,
            item_outputs: outputs,
        });

    let chemical_reactor = (inputs, outputs, f_in, f_out, duration, power) =>
        e.custom({
            type: "modern_industrialization:chemical_reactor",
            duration: duration,
            eu: power,
            item_inputs: inputs,
            item_outputs: outputs,
            fluid_inputs: f_in,
            fluid_outputs: f_out,
        });


    let mixer = (inputs, outputs, fin, fout, duration, power) =>
        e.custom({
            type: "modern_industrialization:mixer",
            eu: power,
            duration: duration,
            fluid_inputs: fin,
            fluid_outputs: fout,
            item_inputs: inputs,
            item_outputs: outputs,
        });

    let circuit_assembler = (inputs, outputs, fin, duration, power) =>
        e.custom({
            type: "modern_industrialization:circuit_assembler",
            duration: duration,
            eu: power,
            fluid_inputs: fin,
            item_inputs: inputs,
            item_outputs: outputs,
        });

    //Red alloy dust recipe
    mixer(
        [
            MI_ITEM(1, "modern_industrialization:copper_dust"),
            MI_ITEM(5, "minecraft:redstone"),
        ],
        [MI_ITEM(6, "modern_industrialization:red_alloy_dust")],
        [],
        [],
        200,
        2
    );

    e.recipes.create.mixing("6x modern_industrialization:red_alloy_dust", [
        "modern_industrialization:copper_dust",
        "minecraft:redstone",
        "minecraft:redstone",
        "minecraft:redstone",
        "minecraft:redstone",
        "minecraft:redstone",
    ]);

    //ad astra fuel recipes
    chemical_reactor(
        [],
        [],
        [
            MI_FLUID(100, MI("hydrogen")),
            MI_FLUID(100, MI("oxygen")),
            MI_FLUID(50, MI("heavy_fuel")),
        ],
        [MI_FLUID(200, "ad_astra:fuel")],
        200,
        36
    );

    //rocket workbrech tweak
    e.remove({ output: "ad_astra:nasa_workbench" });
    assembler(
        [
            MI_ITEM(1, "modern_industrialization:digital_circuit"),
            MI_ITEM(4, "modern_industrialization:stainless_steel_plate"),
            MI_ITEM(1, "modern_industrialization:assembler"),
            MI_ITEM(2, "modern_industrialization:large_motor"),
            MI_ITEM(1, "modern_industrialization:turbo_machine_hull"),
            MI_ITEM(2, "modern_industrialization:robot_arm"),
        ],
        [MI_ITEM(1, "ad_astra:nasa_workbench")],
        500,
        20
    );

    //moon drill
    ////head
    assembler(
        [
            MI_ITEM(3, "ad_astra:desh_ingot"),
            MI_ITEM(5, "ad_astra:desh_plate"),
            MI_ITEM(3, "ad_astra:cheese"),
        ],
        [MI_ITEM(1, "kubejs:moon_drill_head")],
        200,
        8
    );

    ////drill
    assembler(
        [
            MI_ITEM(1, "kubejs:moon_drill_head"),
            MI_ITEM(2, "modern_industrialization:advanced_motor"),
            MI_ITEM(2, "modern_industrialization:advanced_pump"),
            MI_ITEM(1, "modern_industrialization:iron_gear"),
            MI_ITEM(1, "modern_industrialization:digital_circuit"),
        ],
        [MI_ITEM(1, "kubejs:moon_drill")],
        200,
        8
    );

    custom_quarry_drill(
        [MI_ITEM_CHANCE(1, "kubejs:moon_drill", 0.01)],
        [
            MI_ITEM_CHANCE(3, "ad_astra:moon_cheese_ore", 0.3),
            MI_ITEM_CHANCE(3, "ad_astra:moon_desh_ore", 0.3),
            MI_ITEM_CHANCE(3, "ad_astra:moon_ice_shard_ore", 0.3),
            MI_ITEM_CHANCE(3, "ad_astra:moon_iron_ore", 0.4),
        ],
        16,
        600
    );

    //rash alloy
    mixer(
        [
            MI_ITEM(4, "ad_astra:desh_ingot"),
            MI_ITEM(2, "modern_industrialization:tin_dust"),
            MI_ITEM(1, "modern_industrialization:silicon_dust"),
        ],
        [MI_ITEM(6, MI("rash_alloy_dust"))],
        [MI_FLUID(300, MI("molten_redstone"))],
        [],
        200,
        23
    );

    //harder 'modern_industrialization:highly_advanced_machine_hull'
    e.remove({
        output: "modern_industrialization:highly_advanced_machine_hull",
        type: MI("assembler"),
    });
    assembler(
        [
            MI_ITEM(2, "modern_industrialization:cadmium_battery"),
            MI_ITEM(3, "modern_industrialization:annealed_copper_cable"),
            MI_ITEM(
                1,
                "modern_industrialization:highly_advanced_machine_casing"
            ),
            MI_ITEM(1, "modern_industrialization:processing_unit"),
            MI_ITEM(4, "modern_industrialization:rash_alloy_plate"),
        ],
        [MI_ITEM(1, "modern_industrialization:highly_advanced_machine_hull")],
        200,
        8
    );

    //recipe for ostumium
    mixer(
        [
            MI_ITEM(4, "ad_astra:ostrum_ingot"),
            MI_ITEM(2, "modern_industrialization:silver_dust"),
            MI_ITEM(1, "modern_industrialization:quartz_dust"),
        ],
        [MI_ITEM(8, "modern_industrialization:ostumium_dust")],
        [MI_FLUID(100, MI("molten_redstone"))],
        [],
        200,
        36
    );

    //recipe for 'modern_industrialization:calosisum_dust'
    mixer(
        [
            MI_ITEM(4, "ad_astra:calorite_ingot"),
            MI_ITEM(2, "modern_industrialization:titanium_dust"),
            MI_ITEM(1, "ad_astra:desh_ingot"),
        ],
        [MI_ITEM(8, "modern_industrialization:calosisum_dust")],
        [MI_FLUID(50, MI("argon"))],
        [],
        200,
        36
    );

    //harder quantum machine casing
    e.remove({
        output: "modern_industrialization:quantum_machine_casing",
        type: MI("assembler"),
    });
    assembler(
        [
            MI_ITEM(1, "modern_industrialization:highly_advanced_machine_hull"),
            MI_ITEM(4, "modern_industrialization:iridium_plate"),
            MI_ITEM(4, "modern_industrialization:ostumium_plate"),
        ],
        [MI_ITEM(1, "modern_industrialization:quantum_machine_casing")],
        200,
        8
    );

    //harder quantum circuit board
    e.remove({
        output: "modern_industrialization:quantum_circuit_board",
        type: MI("assembler"),
    });
    e.custom({
        type: "modern_industrialization:assembler",
        eu: 64,
        duration: 2000,
        item_inputs: [
            {
                item: "modern_industrialization:superconductor_cable",
                amount: 12,
            },
            { item: "modern_industrialization:plutonium_battery", amount: 2 },
            {
                item: "modern_industrialization:processing_unit_board",
                amount: 1,
            },
            { tag: "c:iridium_plates", amount: 6 },
            MI_ITEM(4, MI("ostumium_plate")),
        ],
        fluid_inputs: [
            { fluid: "modern_industrialization:helium_3", amount: 50 },
        ],
        item_outputs: [
            {
                item: "modern_industrialization:quantum_circuit_board",
                amount: 1,
            },
        ],
    });

    //drill!
    e.custom({
        type: "modern_industrialization:assembler",
        duration: 400,
        eu: 2,
        fluid_inputs: [
            { amount: 75, fluid: "modern_industrialization:soldering_alloy" },
        ],
        item_inputs: [
            { amount: 1, item: "modern_industrialization:ostumium_plate" },
            {
                amount: 2,
                item: "modern_industrialization:ostumium_curved_plate",
            },
            { amount: 1, item: "modern_industrialization:ostumium_rod" },
            { amount: 2, tag: "c:titanium_gears" },
        ],
        item_outputs: [{ amount: 1, item: "kubejs:ostumium_drill_head" }],
    });

    e.custom({
        type: "modern_industrialization:assembler",
        duration: 200,
        eu: 8,
        item_inputs: [
            { amount: 1, item: "kubejs:ostumium_drill_head" },
            { amount: 2, tag: "c:iron_gears" },
            { amount: 2, tag: "modern_industrialization:item_pipes" },
            {
                amount: 2,
                item: "modern_industrialization:large_advanced_motor",
            },
            {
                amount: 1,
                item: "modern_industrialization:annealed_copper_cable",
            },
            { amount: 1, item: "modern_industrialization:processing_unit" },
        ],
        item_outputs: [{ amount: 4, item: "kubejs:ostumium_drill" }],
    });

    //drill for cal
    e.custom({
        type: "modern_industrialization:assembler",
        duration: 400,
        eu: 2,
        fluid_inputs: [
            { amount: 75, fluid: "modern_industrialization:soldering_alloy" },
        ],
        item_inputs: [
            { amount: 1, item: "modern_industrialization:calosisum_plate" },
            {
                amount: 2,
                item: "modern_industrialization:calosisum_curved_plate",
            },
            { amount: 1, item: "modern_industrialization:calosisum_rod" },
            { amount: 2, tag: "c:titanium_gears" },
        ],
        item_outputs: [{ amount: 1, item: "kubejs:calosisum_drill_head" }],
    });

    e.custom({
        type: "modern_industrialization:assembler",
        duration: 200,
        eu: 8,
        item_inputs: [
            { amount: 1, item: "kubejs:calosisum_drill_head" },
            { amount: 2, tag: "c:iron_gears" },
            { amount: 2, tag: "modern_industrialization:item_pipes" },
            {
                amount: 2,
                item: "modern_industrialization:large_advanced_motor",
            },
            {
                amount: 1,
                item: "modern_industrialization:annealed_copper_cable",
            },
            { amount: 1, item: "modern_industrialization:processing_unit" },
        ],
        item_outputs: [{ amount: 4, item: "kubejs:calosisum_drill" }],
    });

    //drill extactor recipe
    custom_quarry_drill(
        [MI_ITEM_CHANCE(1, "kubejs:ostumium_drill", 0.01)],
        [
            MI_ITEM_CHANCE(3, "ad_astra:mars_ostrum_ore", 0.5),
            MI_ITEM_CHANCE(2, "ad_astra:mars_diamond_ore", 0.3),
            MI_ITEM_CHANCE(2, "ad_astra:mars_iron_ore", 0.4),
            MI_ITEM_CHANCE(2, "ad_astra:mars_ice_shard_ore", 0.3),
        ],
        32,
        600
    );

    custom_quarry_drill(
        [MI_ITEM_CHANCE(1, "kubejs:calosisum_drill", 0.01)],
        [
            MI_ITEM_CHANCE(3, "ad_astra:venus_calorite_ore", 0.5),
            MI_ITEM_CHANCE(2, "ad_astra:venus_diamond_ore", 0.4),
            MI_ITEM_CHANCE(2, "ad_astra:venus_gold_ore", 0.4),
            MI_ITEM_CHANCE(2, "ad_astra:venus_coal_ore", 0.6),
        ],
        32,
        600
    );

    //circuit assembler recipe
    assembler(
        [
            MI_ITEM(1, "modern_industrialization:electronic_circuit"),
            MI_ITEM(1, "modern_industrialization:basic_machine_hull"),
            MI_ITEM(2, "modern_industrialization:robot_arm"),
            MI_ITEM(1, "modern_industrialization:conveyor"),
        ],
        [MI_ITEM(1, "modern_industrialization:circuit_assembler")],
        200,
        8
    );

    //harder analog_circuit
    e.remove({
        id: "modern_industrialization:assembler_generated/electric_age/circuit/craft/lv_circuit",
    });
    circuit_assembler(
        [
            MI_ITEM_CHANCE(3, "modern_industrialization:red_alloy_wire", 0.5),
            MI_ITEM(2, "modern_industrialization:resistor"),
            MI_ITEM(2, "modern_industrialization:capacitor"),
            MI_ITEM(1, "modern_industrialization:inductor"),
            MI_ITEM(1, "modern_industrialization:analog_circuit_board"),
        ],
        [
            MI_ITEM(2, "modern_industrialization:analog_circuit"),
            MI_ITEM_CHANCE(1, "modern_industrialization:analog_circuit", 0.15),
        ],
        [
            MI_FLUID(50, "modern_industrialization:soldering_alloy")
        ],
        300,
        8
    );

    //better electonic circuit
    circuit_assembler(
        [
            MI_ITEM_CHANCE(3, "modern_industrialization:copper_wire"),
            MI_ITEM(3, "modern_industrialization:analog_circuit"),
            MI_ITEM(2, "modern_industrialization:diode"),
            MI_ITEM(2, "modern_industrialization:transistor"),
            MI_ITEM(1, "modern_industrialization:electronic_circuit_board"),
        ],
        [
            MI_ITEM(2, "modern_industrialization:electronic_circuit"),
            MI_ITEM_CHANCE(
                1,
                "modern_industrialization:electronic_circuit",
                0.15
            ),
        ],
        [MI_FLUID(50, "modern_industrialization:soldering_alloy")],
        300,
        16
    );

    //harder Digital circuit
    circuit_assembler(
        [
            MI_ITEM(1, "modern_industrialization:or_gate"),
            MI_ITEM(1, 'modern_industrialization:and_gate'),
            MI_ITEM(2, "modern_industrialization:not_gate"),
            MI_ITEM(4, "modern_industrialization:electronic_circuit"),
            MI_ITEM(1, "modern_industrialization:digital_circuit_board"),
        ],
        [
            MI_ITEM(2, "modern_industrialization:digital_circuit"),
            MI_ITEM_CHANCE(1, "modern_industrialization:digital_circuit", 0.2),
        ],
        [MI_FLUID(50, "modern_industrialization:soldering_alloy")],
        300,
        32
    );

    //harder 'modern_industrialization:processing_unit'
    e.remove({
        id: "modern_industrialization:assembler_generated/electric_age/circuit/craft/processing_unit",
    });
    circuit_assembler(
        [
            MI_ITEM(1, "modern_industrialization:arithmetic_logic_unit"),
            MI_ITEM(1, "modern_industrialization:processing_unit_board"),
            MI_ITEM(1, "modern_industrialization:memory_management_unit"),
            MI_ITEM(2, "modern_industrialization:random_access_memory"),
            MI_ITEM(4, "modern_industrialization:digital_circuit"),
        ],
        [
            MI_ITEM(1, "modern_industrialization:processing_unit"),
            MI_ITEM_CHANCE(1, "modern_industrialization:processing_unit", 0.05),
        ],
        [MI_FLUID(50, "modern_industrialization:soldering_alloy")],
        500,
        40
    );

    //harder 'modern_industrialization:quantum_circuit'
    e.remove({
        type: MI("assembler"),
        output: "modern_industrialization:quantum_circuit",
    });
    circuit_assembler(
        [
            MI_ITEM(1, "modern_industrialization:quantum_circuit_board"),
            MI_ITEM(2, "modern_industrialization:cooling_cell"),
            MI_ITEM(2, "modern_industrialization:qbit"),
            MI_ITEM(4, "modern_industrialization:processing_unit"),
        ],
        [
            MI_ITEM(1, "modern_industrialization:quantum_circuit"),
            MI_ITEM_CHANCE(1, "modern_industrialization:quantum_circuit", 0.05),
        ],
        [MI_FLUID(50, "modern_industrialization:soldering_alloy")],
        500,
        40
    );

    //ad astra
    //// engine fan replacement and engine frame
    e.replaceInput(
        {},
        "ad_astra:engine_fan",
        "modern_industrialization:stainless_steel_rotor"
    );
    e.replaceInput(
        {},
        "ad_astra:engine_frame",
        "modern_industrialization:turbo_machine_casing"
    );

    //other mod
    //cc tweaked
    e.replaceInput(
        { mod: "computercraft" },
        MC("redstone"),
        "modern_industrialization:analog_circuit"
    );

    //brass dust
    e.recipes.modern_industrialization.mixer(2, 100)
        .itemIn("modern_industrialization:zinc_dust")
        .itemIn("modern_industrialization:copper_dust")
        .itemOut("2x modern_industrialization:brass_dust");

    //red alloy liquid
    e.recipes.modern_industrialization.blast_furnace(4, 200)
        .itemIn('modern_industrialization:red_alloy_dust')
        .fluidOut('modern_industrialization:red_alloy', 111);


    //rocket assembler rcipe
    e.recipes.modern_industrialization.assembler(16, 500)
        .itemIn('2x modern_industrialization:digital_circuit')
        .itemIn('4x modern_industrialization:conveyor')
        .itemIn('4x modern_industrialization:robot_arm')
        .itemIn('ad_astra:nasa_workbench')
        .itemOut('modern_industrialization:rocket_assembler')
    
    // rose_quartz in bronze age
    e.remove({type:"create:crafting/materials/rose_quartz"})
    e.recipes.modern_industrialization.mixer(2, 200)
        .itemIn('minecraft:quartz')
        .itemIn('8x minecraft:redstone')
        .itemOut('create:rose_quartz');

    // assembing a 'create:electron_tube'
    e.recipes.modern_industrialization.assembler(8, 500)
        .itemIn('modern_industrialization:iron_plate')
        .itemIn('create:polished_rose_quartz')
        .fluidIn('modern_industrialization:soldering_alloy', 100)
        .itemOut('2x create:electron_tube')

    //remove plate because yes
    let table_Remove_plate = [
        'modern_industrialization:copper_plate',
        'modern_industrialization:iron_plate',
        'ad_astra:calorite_plate',
        'create:brass_sheet',
        'modern_industrialization:steel_plate',
        'modern_industrialization:gold_plate',
        'ad_astra:ostrum_plate',
        'createaddition:zinc_sheet',
        'ad_astra:desh_plate'
    ]

    table_Remove_plate.forEach(element => {
        e.remove({type:CE("pressing"), output: element})
    });

    // unified create making compess using pressing
    e.forEachRecipe({ type: MI("compressor"), output: /modern_industrialization:(.*)_plate/, not:{output: /modern_industrialization:(.*)_curved_plate/ }}, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult
        e.recipes.create.pressing(output, ingredients)
    })

    // bender machine
    e.forEachRecipe({ type: MI("compressor"), output: /modern_industrialization:(.*)_plate/}, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult
        // console.info(ingredients.join(', '))
        // console.info(output)
        e.recipes.modern_industrialization.blenderMachine(8, 50)
            .itemIn(ingredients)
            .itemOut(output)
    })

    // forge machine
    e.forEachRecipe({ type: MI("macerator"), output: /modern_industrialization:(.*)_crushed/}, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult
        
        e.remove({type: MI("macerator"), input: ingredients, output: output})
        e.recipes.modern_industrialization.forge_hammer_machine(2, 100)
            .itemIn(ingredients)
            .itemOut(output)
    })

    //recipe for bender machine and forge machine
    e.shaped('modern_industrialization:bender_machine',[
        "MCM",
        "PHP",
        "ACA",
    ], {
        M: 'modern_industrialization:motor',
        P: 'modern_industrialization:piston',
        A: 'modern_industrialization:analog_circuit',
        H: 'modern_industrialization:basic_machine_hull',
        C: 'modern_industrialization:tin_cable',
    })

    //electric forge machine
    e.shaped('modern_industrialization:electric_forge_hammer_machine',[
        "PMP",
        "CHC",
        "ACA",
    ], {
        M: 'modern_industrialization:motor',
        P: 'modern_industrialization:piston',
        A: 'modern_industrialization:analog_circuit',
        H: 'modern_industrialization:basic_machine_hull',
        C: 'modern_industrialization:tin_cable',
    })

    //bronze forge machine
    e.shaped('modern_industrialization:bronze_forge_hammer_machine',[
        "GFG",
        "PHP",
        "CCC",
    ], {
       G: 'modern_industrialization:copper_gear',
       C: '#modern_industrialization:fluid_pipes',
       P: 'create:mechanical_press',
       F: 'modern_industrialization:forge_hammer',
       H: 'modern_industrialization:bronze_machine_casing',
    })

    //steel forge machine
    e.smithing(
        'modern_industrialization:steel_forge_hammer_machine',  // arg 1: output
        'modern_industrialization:bronze_forge_hammer_machine', // arg 2: the item to be upgraded
        'modern_industrialization:steel_upgrade'   // arg 3: the upgrade item
    )
});

ServerEvents.tags("item", (event) => {
    //blacklist modern_industrialization:replicator_blacklist
    let noclone = ["@modern_industrialization"];

    noclone.forEach((element) => {
        event.get("modern_industrialization:replicator_blacklist").add(element);
    });
});
