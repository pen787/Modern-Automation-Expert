// priority: 0
let MI = (id) => "modern_industrialization:" + id;
let MC = (id) => "minecraft:" + id;
let CE = (id) => "create:" + id;
let KJS = (id) => "kubejs:" + id;

let MI_ITEM = (amount, item) => {
    return { amount: amount, item: item };
};
let MI_TAG = (amount, item) => {
    return { amount: amount, tag: item };
};

ServerEvents.recipes((e) => {
    let assembler = (inputs, outputs, duration, power) =>
        e.custom({
            type: "modern_industrialization:assembler",
            duration: duration,
            eu: power,
            item_inputs: inputs,
            item_outputs: outputs,
        });

    //Better ME controller
    e.remove({ output: "ae2:controller", type: "crafting_shaped" });
    assembler(
        [
            MI_ITEM(1, "ae2:engineering_processor"),
            MI_ITEM(4, "ae2:fluix_crystal"),
            MI_ITEM(4, "ae2:smooth_sky_stone_block"),
            MI_ITEM(1, "modern_industrialization:electronic_circuit"),
        ],
        [MI_ITEM(1, "ae2:controller")],
        500,
        8
    );

    //Better ME Drive
    e.remove({ output: "ae2:drive", type: "crafting_shaped" });
    assembler(
        [
            MI_ITEM(2, "ae2:fluix_glass_cable"),
            MI_ITEM(4, "modern_industrialization:aluminum_plate"),
            MI_ITEM(2, "ae2:engineering_processor"),
            MI_ITEM(1, "modern_industrialization:electronic_circuit"),
        ],
        [MI_ITEM(1, "ae2:drive")],
        300,
        8
    );

    //Better ME Crafting Unit
    e.remove({ output: "ae2:crafting_unit", type: "crafting_shaped" });
    assembler(
        [
            MI_ITEM(2, "ae2:fluix_glass_cable"),
            MI_ITEM(4, "modern_industrialization:aluminum_plate"),
            MI_ITEM(2, "ae2:calculation_processor"),
            MI_ITEM(1, "ae2:logic_processor"),
            MI_ITEM(1, "modern_industrialization:electronic_circuit"),
        ],
        [MI_ITEM(1, "ae2:crafting_unit")],
        300,
        8
    );

    //Better ME Pattern Provider Unit
    e.remove({ output: "ae2:pattern_provider", type: "crafting_shaped" });
    assembler(
        [
            MI_ITEM(1, "ae2:annihilation_core"),
            MI_ITEM(1, "ae2:formation_core"),
            MI_ITEM(4, "modern_industrialization:aluminum_plate"),
            MI_ITEM(2, "minecraft:crafting_table"),
            MI_ITEM(1, "modern_industrialization:electronic_circuit"),
        ],
        [MI_ITEM(1, "ae2:pattern_provider")],
        300,
        8
    );

    //Better ME Pattern Provider Unit
    e.remove({ output: "ae2:interface", type: "crafting_shaped" });
    assembler(
        [
            MI_ITEM(1, "ae2:formation_core"),
            MI_ITEM(1, "ae2:annihilation_core"),
            MI_ITEM(4, "modern_industrialization:aluminum_plate"),
            MI_ITEM(2, "ae2:fluix_glass_cable"),
            MI_ITEM(1, "modern_industrialization:electronic_circuit"),
        ],
        [MI_ITEM(1, "ae2:interface")],
        300,
        8
    );

    //Better ME 'ae2:annihilation_core'
    e.remove({ output: "ae2:annihilation_core", type: "crafting_shaped" });
    assembler(
        [
            MI_ITEM(1, "minecraft:quartz"),
            MI_ITEM(1, "ae2:annihilation_core"),
            MI_ITEM(1, "ae2:logic_processor"),
        ],
        [MI_ITEM(2, "ae2:annihilation_core")],
        100,
        8
    );

    //Better ME 'ae2:formation_core'
    e.remove({ output: "ae2:formation_core", type: "crafting_shaped" });
    assembler(
        [
            MI_TAG(1, "ae2:all_certus_quartz"),
            MI_ITEM(1, "ae2:fluix_dust"),
            MI_ITEM(1, "ae2:logic_processor"),
        ],
        [MI_ITEM(2, "ae2:formation_core")],
        100,
        8
    );

	// Comment because it's not working for some reason

    // Replace all the molten redstone with red alloy
    // e.replaceInput(
    //     { mod: "modern_industrialization", type: "modern_industrialization:assembler" },
    //     "modern_industrialization:molten_redstone",
    //     "modern_industrialization:red_alloy_bucket"
    // );
});
