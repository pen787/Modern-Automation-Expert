// priority: 15
Platform.mods.kubejs.name = "Modern Automation Expert";

// console.info('Hello, World! (You will only see this line once in console, during startup)')

ItemEvents.toolTierRegistry(event => {
    event.add('flint_tool', tier => {
        tier.uses = 128
        tier.speed = 0.5
        tier.attackDamageBonus = 0.5
        tier.level = 1
        tier.enchantmentValue = 14
        tier.repairIngredient = 'minecraft:flint'
    })
})

StartupEvents.registry("item", (event) => {
    let newDrill = (id, display, color, tooltip) => {
        event
            .create(id + "_drill")
            .textureJson({
                layer0: "kubejs:item/custom_drill/drill_base",
                layer1: "kubejs:item/custom_drill/drill_head",
            })
            .color(1, color)
            .displayName(display + " Drill")
            .tooltip(tooltip);

        event
            .create(id + "_drill_head")
            .textureJson({
                layer0: "kubejs:item/custom_drill/drill_head",
            })
            .color(0, color)
            .displayName(display + " Drill Head");
    };

    let newPickaxeHead = (id, display_name, color) => {
        event.create(id + ".pickaxe.head").texture("kubejs:item/tool_head_pickaxe").displayName(display_name).color(0, color)
    }

    event
        .create("incomplete_analog_circuit")
        .texture("kubejs:item/incomplete_analog_circuit")
        .displayName("incomplete analog circuit"); //)

    newDrill("moon", "Moon", "#FFD557", "Hmmm");

    newDrill("ostumium", "Ostumium", "#FF6666", "Hm!?");
    newDrill("calosisum", "Calosisum", "#E6E600", "How!?");
    newDrill("superdium", "Superdium", "#FF0000", "How it's not break!?");

    //register a tool
    event.create("mortar", "sword").displayName("Mortar").tier("flint_tool").attackDamageBaseline(0.5)

    event.create("vacuum_tube").displayName("Vacuum tube")
    event.create("random_access_memory").displayName("Ram Silicon Plate").texture("kubejs:item/silicon/random_access_memory")
    event.create("central_processing_unit").displayName("CPU Silicon Plate").texture("kubejs:item/silicon/central_processing_unit")

    event.create("plate.qbit").displayName("qbit Silicon Plate").texture("kubejs:item/silicon/plate.qbit")

    event.create("wafer.central_processing_unit").displayName("CPU Wafer").texture("kubejs:item/silicon/plate.qbit")
    event.create("wafer.qbit_central_processing_unit").displayName("qbit Wafer").texture("kubejs:item/silicon/wafer.central_processing_unit")
    event.create("wafer.random_access_memory").displayName("Ram Wafer").texture("kubejs:item/silicon/wafer.random_access_memory")

    event.create("shape.empty").displayName("Empty Mold").texture("kubejs:item/mold/shape.empty")
    event.create("shape.mold.bun").displayName("Vacuum tube Mold").texture("kubejs:item/mold/shape.mold.bun")
    event.create("shape.mold.pickaxe").displayName("Pickaxe Mold").texture("kubejs:item/mold/shape.mold.pickaxe")

    event.create("blue_len").displayName("Blue len").texture("kubejs:item/lens").color(0, 0x0000ff)
    event.create("white_len").displayName("White len").texture("kubejs:item/lens").color(0, 0xffffff)
    
    event.create("uv_len").displayName("UV len").texture("kubejs:item/lens").color(0, 0xffff00)

    event.create("wooden_form.brick").displayName("Wooden form")
    event.create("wooden_form.empty").displayName("Emty Wooden form")

    event.create("component.glass.tube").displayName("Glass tube")

    //pickaxe head
    newPickaxeHead("iron", "Iron Pickaxe Head", 0x474749)
});

StartupEvents.registry("block", (event) => { })

MIRegistrationEvents.registerFluids((event) => {
    event.register("Red Alloy", "red_alloy", 0xff1111, "water", false, "low");
});

MIMaterialEvents.addMaterials(function (e) {
    e.createMaterial("Pig Iron", "pig_iron", 0x5b5b5b, (b) => {
        b.addParts(
            "nugget",
            "ingot",
            "dust",
            "tiny_dust",
            "rod",
            "gear",
            "ring",
            "plate",
            "bolt",
            "large_plate",
            "curved_plate"
        )
            .defaultRecipes()
            .forgeHammerRecipes();
    });

    e.createMaterial("Red Alloy", "red_alloy", 0xff1111, (b) => {
        b.addParts(
            "nugget",
            "ingot",
            "dust",
            "tiny_dust",
            "rod",
            "gear",
            "ring",
            "plate",
            "bolt",
            "large_plate",
            "curved_plate",
            "wire",
            "fine_wire"
        )
            .block("copper")
            .cable("lv")
            .defaultRecipes()
            .forgeHammerRecipes();
    });

    e.createMaterial("Rash Alloy", "rash_alloy", 0xff7f00, (b) => {
        b.addParts(
            "nugget",
            "ingot",
            "dust",
            "tiny_dust",
            "rod",
            "gear",
            "ring",
            "plate",
            "bolt",
            "large_plate",
            "curved_plate"
        ).defaultRecipes();
    });

    e.createMaterial("Ostumium", "ostumium", 0xff6666, (b) => {
        b.addParts(
            "nugget",
            "ingot",
            "dust",
            "tiny_dust",
            "rod",
            "gear",
            "ring",
            "plate",
            "bolt",
            "large_plate",
            "curved_plate"
        ).defaultRecipes();
    });

    e.createMaterial("Calosisum", "calosisum", 0xe6e600, (b) => {
        b.addParts(
            "nugget",
            "ingot",
            "dust",
            "tiny_dust",
            "rod",
            "gear",
            "ring",
            "plate",
            "bolt",
            "large_plate",
            "curved_plate"
        ).defaultRecipes();
    });

    e.createMaterial("Wrought Iron", "wrought_iron", 0xe3bd86, (b) => {
        b.addParts(
            "nugget",
            "ingot",
            "dust",
            "tiny_dust",
            "rod",
            "gear",
            "ring",
            "plate",
            "bolt",
            "large_plate",
            "curved_plate"
        )
            .defaultRecipes()
            .forgeHammerRecipes();
    });

    e.createMaterial(
        "Zinc",
        "zinc",
        0x82898c, // english name, internal name, and material color in hex
        (b) => {
            b.addParts(
                "dust",
                "tiny_dust",
                "rod",
                "gear",
                "ring",
                "blade",
                "rotor",
                "bolt",
                "large_plate"
            )
                // addParts adds the simple parts to the material ie, the one already defined in MI and that don't need more parameters
                .block("copper") // add a simple block with the "copper" texture (found in "textures/materialsets/blocks")
                .ore({
                    generate: true, // does the ore generate in the world
                    ore_set: "copper", // texture set, same principle as for blocks (found in "textures/materialsets/ores")
                    vein_size: 30,
                    veins_per_chunk: 12,
                    max_y: 64,
                })
                .addExternalPart("ingot", "create:zinc_ingot", "#c:zinc_ingots")
                .addExternalPart(
                    "nugget",
                    "create:zinc_nugget",
                    "#c:zinc_nuggets"
                )
                .addExternalPart(
                    "plate",
                    "createaddition:zinc_sheet",
                    "#c:plates/zinc"
                )
                .rawMetal("copper")
                .defaultRecipes()
                .forgeHammerRecipes();
        }
    );

    e.createMaterial("Brass", "brass", 0xb8a41f, (b) => {
        b.addParts(
            "dust",
            "rod",
            "gear",
            "ring",
            "blade",
            "rotor",
            "bolt",
            "large_plate"
        )
            .addExternalPart("ingot", "create:brass_ingot", "#c:ingots/brass")
            .addExternalPart(
                "nugget",
                "create:brass_nugget",
                "#c:brass_nuggets"
            )
            .addExternalPart("plate", "create:brass_sheet", "#c:plates/brass")
            .addExternalPart("block", "create:brass_block", "#c:brass_blocks")
            .defaultRecipes()
            .forgeHammerRecipes();
    });

    e.createMaterial("Flux", "flux", 0xfbfcf8, (b) => {
        b.addParts(
            "dust",
        )
            .defaultRecipes()
            .forgeHammerRecipes();
    });

    e.createMaterial("IronFlux", "flux_Iron", 0x6b6c69, (b) => {
        b.addParts(
            "dust",
        )
            .defaultRecipes()
            .forgeHammerRecipes();
    });
});

MIMachineEvents.registerCasings((event) => {
    event.register("brick_casing");
});

let CIRCUIT_ASSEMBLER;
let ROCKET_ASSEMBLER;
let LASER_MACHINE;
let PRIMITIVE_ALLOY_SMELTER;
let FORGE_HAMMER_MACHINE;
let BLENDER_MACHINE;
let ALLOY_SMELTER;

MIMachineEvents.registerRecipeTypes((event) => {
    CIRCUIT_ASSEMBLER = event
        .register("circuit_assembler")
        .withFluidInputs()
        .withItemInputs()
        .withItemOutputs();

    ROCKET_ASSEMBLER = event
        .register("rocket_assembler")
        .withItemInputs()
        .withItemOutputs();

    PRIMITIVE_ALLOY_SMELTER = event
        .register("primitive_alloy_smelter")
        .withItemInputs() // enable item inputs
        .withItemOutputs(); // enable item outputs

    LASER_MACHINE = event
        .register("laser_machine")
        .withItemInputs() // enable item inputs
        .withItemOutputs(); // enable item outputs

    ALLOY_SMELTER = event
        .register("alloy_smelter")
        .withItemInputs()
        .withItemOutputs();

    FORGE_HAMMER_MACHINE = event
        .register("forge_hammer_machine")
        .withItemInputs()
        .withItemOutputs();
    
    BLENDER_MACHINE = event
        .register("blender_machine")
        .withItemInputs()
        .withItemOutputs();
});

MIMachineEvents.registerMachines((event) => {
    event.craftingSingleBlock(
        /* GENERAL PARAMETERS FIRST */
        // English name, internal name, recipe type (see above),
        //list of tiers (can be bronze/steel/electric)
        "Circuit Assembler",
        "circuit_assembler",
        CIRCUIT_ASSEMBLER,
        ["electric"],

        /* GUI CONFIGURATION */
        // Background height (or -1 for default value), progress bar, efficiency bar, energy bar
        186,
        event.progressBar(105, 45, "circuit"),
        event.efficiencyBar(48, 86),
        event.energyBar(14, 44),

        /* SLOT CONFIGURATION */
        // Number of slots: item inputs, item outputs, fluid inputs, fluid outputs
        9,
        3,
        1,
        0,
        // Capacity for fluid slots (unused here)
        16,
        // Slot positions: items and fluids.
        // Explanation: 3x3 grid of item slots starting at position (42, 27),
        //then 1x3 grid of item slots starting at position (139, 27).
        (items) => items.addSlots(42, 27, 3, 3).addSlots(139, 27, 1, 3),
        (fluids) => fluids.addSlots(24, 63, 1, 1),

        /* MODEL CONFIGURATION */
        // front overlay?, top overlay?, side overlay?
        true,
        true,
        false
    );

    event.craftingSingleBlock(
        /* GENERAL PARAMETERS FIRST */
        // English name, internal name, recipe type (see above),
        //list of tiers (can be bronze/steel/electric)
        "Rocket Assembler",
        "rocket_assembler",
        ROCKET_ASSEMBLER,
        ["electric"],

        /* GUI CONFIGURATION */
        // Background height (or -1 for default value), progress bar, efficiency bar, energy bar
        186,
        event.progressBar(105, 45, "circuit"),
        event.efficiencyBar(48, 86),
        event.energyBar(14, 34),

        /* SLOT CONFIGURATION */
        // Number of slots: item inputs, item outputs, fluid inputs, fluid outputs
        9,
        2,
        0,
        0,
        // Capacity for fluid slots (unused here)
        16,
        // Slot positions: items and fluids.
        // Explanation: 3x3 grid of item slots starting at position (42, 27),
        //then 1x3 grid of item slots starting at position (139, 27).
        (items) => items.addSlots(42, 27, 3, 3).addSlots(139, 27, 1, 2),
        (fluids) => { },

        /* MODEL CONFIGURATION */
        // front overlay?, top overlay?, side overlay?
        true,
        true,
        false
    );

    event.craftingSingleBlock(
        /* GENERAL PARAMETERS FIRST */
        // English name, internal name, recipe type (see above),
        //list of tiers (can be bronze/steel/electric)
        "Laser Machine",
        "laser_machine",
        LASER_MACHINE,
        ["electric"],

        /* GUI CONFIGURATION */
        // Background height (or -1 for default value), progress bar, efficiency bar, energy bar
        186,
        event.progressBar(105, 45, "circuit"),
        event.efficiencyBar(48, 86),
        event.energyBar(14, 34),

        /* SLOT CONFIGURATION */
        // Number of slots: item inputs, item outputs, fluid inputs, fluid outputs
        2,
        1,
        0,
        0,
        // Capacity for fluid slots (unused here)
        16,
        // Slot positions: items and fluids.
        // Explanation: 3x3 grid of item slots starting at position (42, 27),
        //then 1x3 grid of item slots starting at position (139, 27).
        (items) => items.addSlots(42, 27, 2, 1).addSlots(139, 27, 1, 1),
        (fluids) => { },

        /* MODEL CONFIGURATION */
        // front overlay?, top overlay?, side overlay?
        true,
        false,
        false
    );

    event.craftingSingleBlock(
        /* GENERAL PARAMETERS FIRST */
        // English name, internal name, recipe type (see above),
        //list of tiers (can be bronze/steel/electric)
        "Alloy Smelter",
        "alloy_smelter",
        ALLOY_SMELTER,
        ["bronze", "steel", "electric"],

        /* GUI CONFIGURATION */
        // Background height (or -1 for default value), progress bar, efficiency bar, energy bar
        186,
        event.progressBar(105, 45, "arrow"),
        event.efficiencyBar(48, 86),
        event.energyBar(14, 34),

        /* SLOT CONFIGURATION */
        // Number of slots: item inputs, item outputs, fluid inputs, fluid outputs
        6,
        2,
        0,
        0,
        // Capacity for fluid slots (unused here)
        16,
        // Slot positions: items and fluids.
        // Explanation: 3x3 grid of item slots starting at position (42, 27),
        //then 1x3 grid of item slots starting at position (139, 27).
        (items) => items.addSlots(42, 27, 3, 2).addSlots(139, 27, 1, 2),
        (fluids) => { },

        /* MODEL CONFIGURATION */
        // front overlay?, top overlay?, side overlay?
        true,
        false,
        false
    );

    event.craftingSingleBlock(
        /* GENERAL PARAMETERS FIRST */
        // English name, internal name, recipe type (see above),
        //list of tiers (can be bronze/steel/electric)
        "Forge Hammer",
        "forge_hammer_machine",
        FORGE_HAMMER_MACHINE,
        ["bronze", "steel", "electric"],

        /* GUI CONFIGURATION */
        // Background height (or -1 for default value), progress bar, efficiency bar, energy bar
        186,
        event.progressBar(105, 45, "arrow"),
        event.efficiencyBar(48, 86),
        event.energyBar(14, 34),

        /* SLOT CONFIGURATION */
        // Number of slots: item inputs, item outputs, fluid inputs, fluid outputs
        1,
        3,
        0,
        0,
        // Capacity for fluid slots (unused here)
        16,
        // Slot positions: items and fluids.
        // Explanation: 3x3 grid of item slots starting at position (42, 27),
        //then 1x3 grid of item slots starting at position (139, 27).
        (items) => items.addSlots(42, 45, 1, 1).addSlots(139, 30, 1, 3),
        (fluids) => { },

        /* MODEL CONFIGURATION */
        // front overlay?, top overlay?, side overlay?
        true,
        false,
        false
    );

    event.craftingSingleBlock(
        /* GENERAL PARAMETERS FIRST */
        // English name, internal name, recipe type (see above),
        //list of tiers (can be bronze/steel/electric)
        "Bender Machine",
        "bender_machine",
        BLENDER_MACHINE,
        ["electric"],

        /* GUI CONFIGURATION */
        // Background height (or -1 for default value), progress bar, efficiency bar, energy bar
        186,
        event.progressBar(105, 45, "arrow"),
        event.efficiencyBar(48, 86),
        event.energyBar(14, 34),

        /* SLOT CONFIGURATION */
        // Number of slots: item inputs, item outputs, fluid inputs, fluid outputs
        1,
        1,
        0,
        0,
        // Capacity for fluid slots (unused here)
        16,
        // Slot positions: items and fluids.
        // Explanation: 3x3 grid of item slots starting at position (42, 27),
        //then 1x3 grid of item slots starting at position (139, 27).
        (items) => items.addSlots(42, 45, 1, 1).addSlots(139, 45, 1, 1),
        (fluids) => { },

        /* MODEL CONFIGURATION */
        // front overlay?, top overlay?, side overlay?
        true,
        false,
        false
    );

    const PASHatch = event.hatchOf("item_input", "item_output", "fluid_input");
    const brick_member = event.memberOfBlock("minecraft:bricks");
    const PASShapeBuilder = event.startShape("brick_casing");

    //this shit give me a mental breakdown
    PASShapeBuilder.add(-1, -1, 0, brick_member, PASHatch);
    PASShapeBuilder.add(-1, -1, 1, brick_member, PASHatch);
    PASShapeBuilder.add(-1, -1, 2, brick_member, PASHatch);
    PASShapeBuilder.add(0, -1, 0, brick_member, PASHatch);
    PASShapeBuilder.add(0, -1, 1, brick_member, event.noHatch());
    PASShapeBuilder.add(0, -1, 2, brick_member, PASHatch);
    PASShapeBuilder.add(1, -1, 0, brick_member, PASHatch);
    PASShapeBuilder.add(1, -1, 1, brick_member, PASHatch);
    PASShapeBuilder.add(1, -1, 2, brick_member, PASHatch);

    for (let y = 0; y <= 1; y++) {
        PASShapeBuilder.add(-1, y, 1, brick_member, event.noHatch());
        PASShapeBuilder.add(1, y, 1, brick_member, event.noHatch());
        PASShapeBuilder.add(0, y, 2, brick_member, event.noHatch());
    }
    PASShapeBuilder.add(0, 1, 0, brick_member, event.noHatch());


    // PASShapeBuilder.add(x, -1, z, brick_member, event.noHatch());

    const PASShape = PASShapeBuilder.build();
    event.simpleSteamCraftingMultiBlock(
        /* GENERAL PARAMETERS */
        // English name, internal name, recipe type, multiblock shape
        "Primitive Alloy Smelter", "primitive_alloy_smelter", PRIMITIVE_ALLOY_SMELTER, PASShape,
        /* REI DISPLAY CONFIGURATION */
        // REI progress bar
        event.progressBar(77, 33, "arrow"),
        // REI item inputs, item outputs, fluid inputs, fluid outputs
        itemInputs => itemInputs.addSlots(56, 35, 1, 3), itemOutputs => itemOutputs.addSlot(102, 35),
        fluidInputs => { }, fluidOutputs => { },
        /* MODEL CONFIGUATION */
        // casing of the controller, overlay folder, front overlay?, top overlay?, side overlay?
        "brick_casing", "primitive_alloy_smelter", true, false, false,
        /* OPTIONAL CONFIGURATION */
        config => { }
    );


});
