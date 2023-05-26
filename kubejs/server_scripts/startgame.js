// priority: 5

const $Class = Java.loadClass('java.lang.Class')
const $Class_RecipesEventJS = $Class.forName('dev.latvian.mods.kubejs.recipe.RecipesEventJS')

let MI = (id) => "modern_industrialization:" + id;
let MC = (id) => "minecraft:" + id;
let CE = (id) => "create:" + id;
let KJS = (id) => "kubejs:" + id;

let MI_ITEM = (amount, item) => {
    return { amount: amount, item: item };
};

ServerEvents.recipes((e) => {
    //get a recipe change for that item/block
    let allRecipes = (() => {
        let allRecipes = []

        let getField = (f) => {
            let field = $Class_RecipesEventJS.getDeclaredField(f)
            field.setAccessible(true)
            return field.get(e)
        }

        let originalRecipes = getField('originalRecipes')
        originalRecipes.forEach(r => allRecipes.push(r))

        let addedRecipes = getField('addedRecipes')
        addedRecipes.forEach(r => allRecipes.push(r))

        let modifiedRecipes = getField('modifiedRecipes')
        modifiedRecipes.forEach(r => allRecipes.push(r))

        let removedRecipes = getField('removedRecipes')
        allRecipes = allRecipes.filter(r => !removedRecipes.contains(r))

        return allRecipes
    })()
    let forEachRecipeByType = (recipeType) => allRecipes.filter(r => r.type == recipeType)

    let assembler = (inputs, outputs, duration, power) =>
        e.custom({
            type: "modern_industrialization:assembler",
            duration: duration,
            eu: power,
            item_inputs: inputs,
            item_outputs: outputs,
        });

    //Iron Furnace
    e.replaceInput(
        { output: "fabric-furnaces:iron_furnace" },
        "fabric-furnaces:fabric_furnace",
        "minecraft:furnace"
    );

    //bronze ingot from create mixing
    e.remove({ id: MI("materials/bronze_dust") });
    e.recipes.create
        .mixing("4x modern_industrialization:bronze_ingot", [
            "minecraft:copper_ingot",
            "minecraft:copper_ingot",
            "minecraft:copper_ingot",
            MI("tin_ingot"),
        ])
        .heated();
    e.recipes.create.mixing("4x modern_industrialization:bronze_dust", [
        "modern_industrialization:copper_dust",
        "modern_industrialization:copper_dust",
        "modern_industrialization:copper_dust",
        "#c:tin_dusts",
    ]);
    //harder paper
    e.remove({ output: MC("paper"), type: MC("crafting_shapeless") });
    e.remove({ output: MC("paper"), type: MC("crafting_shaped") });
    e.remove({ output: MC("paper"), type: CE("pressing") });
    e.recipes.create.compacting(
        [MC("paper")],
        ["minecraft:sugar_cane", Fluid.of("water", 10000)]
    );

    //harder steel
    e.smelting(MI("pig_iron_ingot"), "minecraft:iron_ingot");
    e.custom({
        "type": "modern_industrialization:forge_hammer",
        "duration": 0,
        "eu": 15,
        "item_inputs": [
            {
                "amount": 1,
                "item": MI("pig_iron_ingot")
            }
        ],
        "item_outputs": [
            {
                "amount": 1,
                "item": MI('wrought_iron_ingot')
            }
        ]
    })
    e.custom({
        "type": "modern_industrialization:compressor",
        "eu": 2,
        "duration": 100,
        "item_inputs": {
            "item": MI("pig_iron_ingot"),
            "amount": 1
        },
        "item_outputs": {
            "item": MI('wrought_iron_ingot'),
            "amount": 1
        }
    })

    e.replaceInput(
        { output: "modern_industrialization:uncooked_steel_dust" },
        "modern_industrialization:iron_dust",
        MI('wrought_iron_dust')
    );

    //harder item pipe and fluid pipe
    e.remove({ output: "moderndynamics:item_pipe" });
    e.remove({ output: "moderndynamics:fluid_pipe" });

    assembler(
        [MI_ITEM(2, MI("steel_ingot")), MI_ITEM(1, MC("glass"))],
        [MI_ITEM(8, "moderndynamics:item_pipe")],
        100,
        8
    );

    assembler(
        [MI_ITEM(2, MI("bronze_ingot")), MI_ITEM(1, MC("glass"))],
        [MI_ITEM(8, "moderndynamics:fluid_pipe")],
        100,
        8
    );

    //harder robotic arm
    e.replaceInput(
        { output: "modern_industrialization:robot_arm" },
        "modern_industrialization:analog_circuit",
        "create:mechanical_arm"
    );

    //harder mechanical_arm
    e.remove({ output: 'create:mechanical_arm' })
    e.shaped('create:mechanical_arm', [
        "GPA",
        "PC ",
        "OB ",
    ], {
        G: 'modern_industrialization:steel_gear',
        P: 'create:brass_sheet',
        A: 'create:andesite_alloy',
        C: 'modern_industrialization:analog_circuit',
        B: 'create:brass_casing',
        O: 'create:precision_mechanism',
    })

    //harder create belt and conveyor
    e.replaceInput(
        { output: "create:belt_connector" },
        "minecraft:dried_kelp",
        "modern_industrialization:rubber_sheet"
    );

    //rubber
    // e.recipes.create.compacting([Item.of('modern_industrialization:rubber_sheet', 2)], [Fluid.of('createaddition:seed_oil', 80000)])
    e.recipes.create.filling('modern_industrialization:rubber_sheet', [Fluid.of('createaddition:seed_oil', 80000), 'minecraft:paper'])

    //custom "create:belt_connector"
    e.shaped("modern_industrialization:conveyor", [" b ", "mwm", "   "], {
        b: "create:belt_connector",
        w: "modern_industrialization:tin_cable",
        m: "modern_industrialization:motor",
    });
    e.custom({
        type: "modern_industrialization:assembler",
        duration: 200,
        eu: 8,
        item_inputs: [
            {
                amount: 2,
                item: "modern_industrialization:motor",
            },
            {
                amount: 1,
                item: "create:belt_connector",
            },
            {
                amount: 1,
                item: "modern_industrialization:tin_cable",
            },
        ],
        item_outputs: [
            {
                amount: 1,
                item: "modern_industrialization:conveyor",
            },
        ],
    });

    //mortar
    e.shaped('kubejs:mortar', [
        ' f ',
        ' f ',
        ' c ',
    ], {
        f:'minecraft:flint',
        c:'minecraft:flower_pot',
    })

    //nerf bronze
    e.shapeless('modern_industrialization:copper_dust',['kubejs:mortar','minecraft:raw_copper']).damageIngredient('kubejs:mortar')
    e.shapeless('modern_industrialization:tin_dust',['kubejs:mortar','modern_industrialization:raw_tin']).damageIngredient('kubejs:mortar')

    e.shapeless('2x modern_industrialization:bronze_dust',['modern_industrialization:tin_dust','3x modern_industrialization:copper_dust'])

    // harder iron
    //flux
    e.recipes.modern_industrialization.macerator(2, 100)
        .itemIn('#c:limestone')
        .itemOut("2x modern_industrialization:flux_dust");
    
    e.remove({type: "minecraft:smelting", output:'minecraft:iron_ingot', input:'modern_industrialization:iron_dust'})
    e.remove({type: "minecraft:blasting", output:'minecraft:iron_ingot', input:'modern_industrialization:iron_dust'})

    e.replaceInput({input: 'minecraft:raw_iron', type: "smelting"}, 'minecraft:raw_iron','modern_industrialization:flux_Iron_dust')
    e.replaceInput({input: 'minecraft:raw_iron', type: "blasting"}, 'minecraft:raw_iron','modern_industrialization:flux_Iron_dust')

    e.recipes.create.milling('2x modern_industrialization:flux_dust', '#c:limestone')
    e.recipes.create.mixing('modern_industrialization:flux_Iron_dust',['modern_industrialization:flux_dust', 'minecraft:raw_iron'])

    e.recipes.modern_industrialization.blast_furnace(1,200)
        .itemIn('modern_industrialization:iron_dust')
        .itemOut('minecraft:iron_ingot');

    e.recipes.modern_industrialization.blast_furnace(1,200)
        .itemIn('#c:raw_iron_ores')
        .itemOut('minecraft:iron_ingot');

    e.recipes.modern_industrialization.blast_furnace(1,100)
        .itemIn('modern_industrialization:flux_Iron_dust')
        .itemOut('minecraft:iron_ingot');

    e.shapeless('modern_industrialization:flux_dust', ['kubejs:mortar','#c:limestone']).damageIngredient('kubejs:mortar')
    e.shapeless('modern_industrialization:flux_Iron_dust', ['kubejs:mortar','minecraft:raw_iron','modern_industrialization:flux_dust']).damageIngredient('kubejs:mortar')
    
    //easy input hatch
    e.shapeless('modern_industrialization:bronze_item_input_hatch',['4x modern_industrialization:bronze_large_plate','minecraft:chest'])
    e.shapeless('modern_industrialization:bronze_fluid_input_hatch',['4x modern_industrialization:bronze_large_plate','modern_industrialization:bronze_tank'])

    //primitive alloy smelter
    e.recipes.modern_industrialization.primitive_alloy_smelter(2,200)
        .itemIn('3x modern_industrialization:copper_dust')
        .itemIn('modern_industrialization:tin_dust')
        .itemOut('4x modern_industrialization:bronze_dust');
    
    // andesite alloyed
    e.recipes.modern_industrialization.primitive_alloy_smelter(2,200)
        .itemIn("2x minecraft:andesite")
        .itemIn("2x minecraft:iron_nugget")
        .itemOut("2x create:andesite_alloy");
    
    e.recipes.modern_industrialization.primitive_alloy_smelter(2,200)
        .itemIn("2x minecraft:andesite")
        .itemIn('2x #c:zinc_nuggets')
        .itemOut("2x create:andesite_alloy");
    
    //steam
    e.campfireCooking('modern_industrialization:steam_bucket','minecraft:water_bucket')

    //test
    // e.forEachRecipe({ type: 'create:crushing', output: '#create:crushed_ores' }, r => {
    //     let ingredients = r.originalRecipeIngredients
    //     let output = r.originalRecipeResult
    // })
});

//change ore drop to cursh ore
LootJS.modifiers((event) => {
    event.addBlockLootModifier('#forge:ores').modifyLoot('#forge:raw_materials', item => {
        const replacement = AlmostUnified.getReplacementForItem(item);
        if (replacement.isEmpty()) {
            return item;
        }
        replacement.setCount(item.getCount());
        return replacement;
    });
});
