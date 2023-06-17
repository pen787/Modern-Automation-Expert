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

    let createaddition_rolling_mill = (input, output) => {
        e.custom({
            "type": "createaddition:rolling",
            "input": input,
            "result": output
        })
    }

    let custom_quarry_drill = (input, outputs, energy_use, duration) => {
        e.custom({
            type: "modern_industrialization:quarry",
            eu: energy_use,
            duration: duration,
            item_inputs: input,
            item_outputs: outputs,
        });
    };

    //Red alloy dust recipe
    e.recipes.modern_industrialization.mixer(2, 200)
        .itemIn("modern_industrialization:copper_dust")
        .itemIn("5x minecraft:redstone")
        .itemOut("3x modern_industrialization:red_alloy_dust")

    e.recipes.create.mixing("3x modern_industrialization:red_alloy_dust", [
        "modern_industrialization:copper_dust",
        "minecraft:redstone",
        "minecraft:redstone",
        "minecraft:redstone",
        "minecraft:redstone",
        "minecraft:redstone",
    ]);

    //ad astra fuel recipes
    e.recipes.modern_industrialization.chemical_reactor(36, 200)
        .fluidIn(MI("hydrogen"), 100)
        .fluidIn(MI("oxygen"), 100)
        .fluidIn(MI("heavy_fuel"), 50)
        .fluidOut("ad_astra:fuel", 200)

    //rocket workbrech tweak
    e.remove({ output: "ad_astra:nasa_workbench" });
    e.recipes.modern_industrialization.assembler(20, 500)
        .itemIn("modern_industrialization:digital_circuit")
        .itemIn("4x modern_industrialization:stainless_steel_plate")
        .itemIn("modern_industrialization:assembler")
        .itemIn("2x modern_industrialization:large_motor")
        .itemIn("modern_industrialization:turbo_machine_hull")
        .itemIn("2x modern_industrialization:robot_arm")
        .itemOut(1, "ad_astra:nasa_workbench")

    //moon drill
    ////head
    e.recipes.modern_industrialization.assembler(8, 200)
        .itemIn("3x ad_astra:desh_ingot")
        .itemIn("5x ad_astra:desh_plate")
        .itemIn("3xad_astra:cheese")
        .itemOut("kubejs:moon_drill_head")

    ////drill
    e.recipes.modern_industrialization.assembler(8, 200)
        .itemIn("kubejs:moon_drill_head")
        .itemIn("2x modern_industrialization:advanced_motor")
        .itemIn("2x modern_industrialization:advanced_pump")
        .itemIn("modern_industrialization:iron_gear")
        .itemIn("modern_industrialization:digital_circuit")
        .itemOut("kubejs:moon_drill")

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
    e.recipes.modern_industrialization.mixer(23, 200)
        .itemIn("4x ad_astra:desh_ingot")
        .itemIn("2x modern_industrialization:tin_dust")
        .itemIn("modern_industrialization:silicon_dust")
        .fluidIn(MI("molten_redstone"), 300)
        .itemOut("6x " + MI("rash_alloy_dust"))


    //harder 'modern_industrialization:highly_advanced_machine_hull'
    e.remove({
        output: "modern_industrialization:highly_advanced_machine_hull",
        type: MI("assembler"),
    });
    e.recipes.modern_industrialization.assembler(8, 200)
        .itemIn("2x modern_industrialization:cadmium_battery")
        .itemIn("3x modern_industrialization:annealed_copper_cable")
        .itemIn("modern_industrialization:highly_advanced_machine_casing")
        .itemIn("modern_industrialization:processing_unit")
        .itemIn("4x modern_industrialization:rash_alloy_plate")
        .itemOut("modern_industrialization:highly_advanced_machine_hull")

    //recipe for ostumium
    e.recipes.modern_industrialization.mixer(36, 200)
        .itemIn("4x ad_astra:ostrum_ingot")
        .itemIn("2x modern_industrialization:silver_dust")
        .itemIn("modern_industrialization:quartz_dust")
        .fluidIn(MI("molten_redstone"), 100)
        .itemOut("8x " + MI("ostumium_dust"))

    //recipe for 'modern_industrialization:calosisum_dust'
    e.recipes.modern_industrialization.mixer(36, 200)
        .itemIn("4x ad_astra:calorite_ingot")
        .itemIn("2x modern_industrialization:titanium_dust")
        .itemIn("ad_astra:desh_ingot")
        .fluidIn(MI("argon"), 80)
        .itemOut("8x " + MI("calosisum_dust"))

    //harder quantum machine casing
    e.remove({
        output: "modern_industrialization:quantum_machine_casing",
        type: MI("assembler"),
    });
    e.recipes.modern_industrialization.assembler(8, 200)
        .itemIn("modern_industrialization:highly_advanced_machine_hull")
        .itemIn("4x modern_industrialization:iridium_plate")
        .itemIn("4x modern_industrialization:ostumium_plate")
        .itemOut("modern_industrialization:quantum_machine_casing")

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
    e.recipes.modern_industrialization.assembler(8, 200)
        .itemIn("modern_industrialization:electronic_circuit")
        .itemIn("modern_industrialization:basic_machine_hull")
        .itemIn("2x modern_industrialization:robot_arm")
        .itemIn("modern_industrialization:conveyor")
        .itemOut("modern_industrialization:circuit_assembler")


    //harder analog_circuit
    e.remove({
        id: "modern_industrialization:assembler_generated/electric_age/circuit/craft/lv_circuit",
    });
    e.recipes.modern_industrialization.circuit_assembler(8, 300)
        .itemIn("3x modern_industrialization:red_alloy_wire", 0.5)
        .itemIn("2x modern_industrialization:resistor")
        .itemIn("2x modern_industrialization:capacitor")
        .itemIn("modern_industrialization:inductor")
        .itemIn("modern_industrialization:analog_circuit_board")
        .fluidIn("modern_industrialization:soldering_alloy", 50)
        .itemOut("modern_industrialization:analog_circuit")
        .itemOut("modern_industrialization:analog_circuit", 0.15)

    //better electonic circuit
    e.recipes.modern_industrialization.circuit_assembler(16, 300)
        .itemIn("3x modern_industrialization:copper_wire", 0.5)
        .itemIn("3x modern_industrialization:analog_circuit")
        .itemIn("2x modern_industrialization:diode")
        .itemIn("2x modern_industrialization:transistor")
        .itemIn("modern_industrialization:electronic_circuit_board")
        .fluidIn("modern_industrialization:soldering_alloy", 50)
        .itemOut("modern_industrialization:electronic_circuit")
        .itemOut("modern_industrialization:electronic_circuit", 0.15)

    //other
    e.recipes.modern_industrialization.circuit_assembler(16, 300)
        .itemIn("3x modern_industrialization:copper_wire", 0.5)
        .itemIn("3x kubejs:plate.integrated_logic_circuit")
        .itemIn("2x modern_industrialization:diode")
        .itemIn("2x modern_industrialization:transistor")
        .itemIn("modern_industrialization:electronic_circuit_board")
        .fluidIn("modern_industrialization:soldering_alloy", 50)
        .itemOut("modern_industrialization:electronic_circuit")
        .itemOut("modern_industrialization:electronic_circuit", 0.3)

    //harder Digital circuit
    e.remove({ output: 'modern_industrialization:digital_circuit', type: MI("assembler") })
    e.recipes.modern_industrialization.circuit_assembler(32, 300)
        .itemIn("modern_industrialization:or_gate")
        .itemIn("modern_industrialization:and_gate")
        .itemIn("2x modern_industrialization:not_gate")
        .itemIn("4x modern_industrialization:electronic_circuit")
        .itemIn("modern_industrialization:digital_circuit_board")
        .fluidIn("modern_industrialization:soldering_alloy", 50)
        .itemOut("modern_industrialization:digital_circuit")

    e.recipes.modern_industrialization.clean_circuit_processing_assembler(40, 500)
        .itemIn("modern_industrialization:or_gate")
        .itemIn('modern_industrialization:and_gate')
        .itemIn("2x modern_industrialization:not_gate")
        .itemIn("4x modern_industrialization:electronic_circuit")
        .itemIn("modern_industrialization:digital_circuit_board")
        .fluidIn('modern_industrialization:soldering_alloy', 100)
        .fluidIn('modern_industrialization:red_alloy', 100)
        .itemOut("modern_industrialization:digital_circuit")
        .itemOut("modern_industrialization:digital_circuit", 0.15)

    //harder 'modern_industrialization:processing_unit'
    e.remove({
        id: "modern_industrialization:assembler_generated/electric_age/circuit/craft/processing_unit",
    });
    e.recipes.modern_industrialization.clean_circuit_processing_assembler(64, 750)
        .itemIn("modern_industrialization:arithmetic_logic_unit")
        .itemIn("modern_industrialization:processing_unit_board")
        .itemIn("modern_industrialization:memory_management_unit")
        .itemIn("2x modern_industrialization:random_access_memory")
        .itemIn("4x modern_industrialization:digital_circuit")
        .fluidIn('modern_industrialization:soldering_alloy', 100)
        .fluidIn('modern_industrialization:red_alloy', 100)
        .itemOut("modern_industrialization:processing_unit")
        .itemOut("modern_industrialization:processing_unit", 0.05)

    //harder 'modern_industrialization:quantum_circuit'
    e.remove({
        type: MI("assembler"),
        output: "modern_industrialization:quantum_circuit",
    });
    e.recipes.modern_industrialization.clean_circuit_processing_assembler(128, 1000)
        .itemIn("modern_industrialization:quantum_circuit_board")
        .itemIn("2x modern_industrialization:cooling_cell")
        .itemIn("2x modern_industrialization:qbit")
        .itemIn("4x modern_industrialization:processing_unit")
        .fluidIn('modern_industrialization:tritium', 150)
        .fluidIn('modern_industrialization:cryofluid', 150)
        .itemOut("modern_industrialization:quantum_circuit")

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
    e.remove({ type: "create:crafting/materials/rose_quartz" })
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
        e.remove({ type: CE("pressing"), output: element })
    });

    // unified create making compess using pressing
    e.forEachRecipe({ type: MI("compressor"), output: /modern_industrialization:(.*)_plate/, not: { output: /modern_industrialization:(.*)_curved_plate/ } }, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult
        e.recipes.create.pressing(output, ingredients)
    })

    // bender machine
    e.forEachRecipe({ type: MI("compressor"), output: /modern_industrialization:(.*)_plate/ }, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult
        // console.info(ingredients.join(', '))
        // console.info(output)
        e.recipes.modern_industrialization.blenderMachine(8, 50)
            .itemIn(ingredients)
            .itemOut(output)
    })

    e.forEachRecipe({ type: MI("compressor"), output: /modern_industrialization:(.*)_ring/ }, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult
        // console.info(ingredients.join(', '))
        // console.info(output)
        e.recipes.modern_industrialization.blenderMachine(8, 75)
            .itemIn(ingredients)
            .itemOut(output)
    })

    // forge machine
    e.forEachRecipe({ type: MI("macerator"), output: /modern_industrialization:(.*)_crushed/ }, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult

        e.remove({ type: MI("macerator"), input: ingredients, output: output })
        e.recipes.modern_industrialization.forge_hammer_machine(2, 100)
            .itemIn(ingredients)
            .itemOut(output)
    })

    // rolling machine
    e.forEachRecipe({ type: MI("compressor"), output: /modern_industrialization:(.*)_curved_plate/ }, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult

        createaddition_rolling_mill(ingredients, output)
    })

    e.forEachRecipe({ type: MI("cutting_machine"), output: /modern_industrialization:(.*)_rod/ }, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult

        createaddition_rolling_mill(ingredients, output)
    })

    //create cutting machine
    e.forEachRecipe({ type: MI("cutting_machine"), output: /modern_industrialization:(.*)_bolt/ }, r => {
        let ingredients = r.originalRecipeIngredients
        let output = r.originalRecipeResult

        e.recipes.create.cutting(output, ingredients).processingTime(300)
    })

    // the gear seuencedassembly in "sequencedAssembly"


    //recipe for bender machine and forge machine
    e.shaped('modern_industrialization:bender_machine', [
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
    e.shaped('modern_industrialization:electric_forge_hammer_machine', [
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
    e.shaped('modern_industrialization:bronze_forge_hammer_machine', [
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


    //electric laser machine
    e.shaped('modern_industrialization:laser_machine', [
        "MGM",
        "CHC",
        "ACA",
    ], {
        G: 'kubejs:component.glass.tube',
        M: 'modern_industrialization:motor',
        A: 'modern_industrialization:digital_circuit',
        H: 'modern_industrialization:advanced_machine_hull',
        C: 'modern_industrialization:tin_cable',
    })

    // make a lens
    //// white
    e.recipes.modern_industrialization.cutting_machine(8, 500)
        .itemIn('minecraft:glass_pane')
        .fluidIn('modern_industrialization:lubricant', 200)
        .itemOut('2x kubejs:white_len')

    const lens_color = [
        ['kubejs:red_len', 'minecraft:red_dye'],
        ['kubejs:blue_len', 'minecraft:blue_dye'],
        ['kubejs:uv_len', 'minecraft:yellow_dye'],
        ['kubejs:white_len', 'minecraft:white_dye'],
    ]

    lens_color.forEach(element => {
        e.recipes.modern_industrialization.chemical_reactor(8, 100)
            .itemIn('#modern_industrialization:lens')
            .itemIn(element[1])
            .itemOut(element[0])
    });

    //quantum eye
    e.recipes.modern_industrialization.chemical_reactor(8, 500)
        .itemIn('minecraft:ender_eye')
        .itemIn('kubejs:white_len')
        .fluidIn('modern_industrialization:tritium', 150)
        .itemOut('kubejs:quantumeye_len', 0.95)

    // convert wafer to that wafer lol
    const lens_for_wafer = [
        { len: 'kubejs:white_len', wafer: 'kubejs:wafer.integrated_logic_circuit', plate: 'kubejs:plate.integrated_logic_circuit', eu: 40 },
        { len: 'kubejs:uv_len', wafer: 'kubejs:wafer.random_access_memory', plate: 'kubejs:plate.random_access_memory', eu: 40 },
        { len: 'kubejs:red_len', wafer: 'kubejs:wafer.controll_memory_chip', plate: 'kubejs:plate.controll_memory_chip', eu: 40 },
        { len: 'kubejs:blue_len', wafer: 'kubejs:wafer.central_processing_unit', plate: 'kubejs:plate.central_processing_unit', eu: 40 },
        { len: 'kubejs:quantumeye_len', wafer: 'kubejs:wafer.qbit', plate: 'kubejs:plate.qbit', eu: 64 },
    ]

    lens_for_wafer.forEach(element => {
        e.recipes.modern_industrialization.laser_machine(element.eu, 500)
            .itemIn('modern_industrialization:silicon_wafer')
            .itemIn(element.len, 0)
            .itemOut(element.wafer)

        e.recipes.modern_industrialization.cutting_machine(8, 250)
            .itemIn(element.wafer)
            .fluidIn('modern_industrialization:lubricant', 100)
            .itemOut('4x ' + element.plate)
    });

    //steel spring
    e.recipes.modern_industrialization.blenderMachine(8, 100)
        .itemIn('modern_industrialization:steel_rod')
        .itemOut('2x modern_industrialization:steel_spring')

    e.recipes.modern_industrialization.forge_hammer(20, 0)
        .itemIn('modern_industrialization:steel_rod')
        .itemOut('modern_industrialization:steel_spring')

    createaddition_rolling_mill({ item: 'modern_industrialization:steel_rod' }, { item: 'modern_industrialization:steel_spring' })

    //place circuit component using plate circuit silicion thing
    //// ram plate
    e.replaceInput({ output: 'modern_industrialization:random_access_memory' }, 'modern_industrialization:silicon_wafer', '4x kubejs:plate.random_access_memory')

    //// memory management unit 
    e.replaceInput({ output: 'modern_industrialization:memory_management_unit' }, 'modern_industrialization:silicon_wafer', '2x kubejs:plate.controll_memory_chip')

    //qbit thing
    e.replaceInput({ output: 'modern_industrialization:qbit' }, '#c:glass_panes', '2x kubejs:plate.qbit')

    e.recipes.modern_industrialization.circuit_assembler(16, 300)
        .itemIn('#c:diamond_plates')
        .itemIn('kubejs:plate.central_processing_unit')
        .itemOut("modern_industrialization:arithmetic_logic_unit")
        .itemOut("modern_industrialization:arithmetic_logic_unit", 0.25)

    //replace wire in piston with spring
    event.replaceInput({ output: 'modern_industrialization:piston' }, 'modern_industrialization:tin_cable', 'modern_industrialization:steel_spring')

    //harder item pipe and fluid pipe
    e.remove({ output: "moderndynamics:item_pipe" });
    e.remove({ output: "moderndynamics:fluid_pipe" });

    e.recipes.modern_industrialization.assembler(8, 100)
        .itemIn('2x modern_industrialization:steel_curved_plate')
        .itemIn("1x " + MC("glass"))
        .itemOut("moderndynamics:item_pipe")

    e.recipes.modern_industrialization.assembler(8, 100)
        .itemIn('2x modern_industrialization:bronze_curved_plate')
        .itemIn("1x " + MC("glass"))
        .itemOut("8x moderndynamics:fluid_pipe")
});

ServerEvents.tags("item", (event) => {
    //blacklist modern_industrialization:replicator_blacklist
    let noclone = ["@modern_industrialization"];

    noclone.forEach((element) => {
        event.get("modern_industrialization:replicator_blacklist").add(element);
    });

    event.get("modern_industrialization:lens").add(/kubejs:(.*)_len/)
    event.get("modern_industrialization:lens").remove('kubejs:quantumeye_len')
});
