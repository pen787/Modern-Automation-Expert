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

    //replace a forge hammer recipe
    e.remove({output:"modern_industrialization:forge_hammer", input:"minecraft:iron_ingot"})
    e.shaped('modern_industrialization:forge_hammer', [
        "WWW",
        " A ",
        "BBB",
    ], {
        W:'modern_industrialization:wrought_iron_ingot',
        A: 'modern_industrialization:bronze_block',
        B: 'modern_industrialization:bronze_ingot'
    })
    
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
    e.remove({type:"minecraft:blasting",output:'modern_industrialization:steel_ingot'})
    e.smelting(MI('wrought_iron_ingot'), "minecraft:iron_ingot");

    e.replaceInput(
        { output: "modern_industrialization:uncooked_steel_dust" },
        "modern_industrialization:iron_dust",
        MI('wrought_iron_dust')
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
        f: 'minecraft:flint',
        c: 'minecraft:flower_pot',
    })

    //nerf bronze
    e.shapeless('modern_industrialization:copper_dust', ['kubejs:mortar', 'minecraft:raw_copper']).damageIngredient('kubejs:mortar')
    e.shapeless('modern_industrialization:tin_dust', ['kubejs:mortar', 'modern_industrialization:raw_tin']).damageIngredient('kubejs:mortar')

    e.shapeless('2x modern_industrialization:bronze_dust', ['modern_industrialization:tin_dust', '3x modern_industrialization:copper_dust'])
    
    //primitive alloy smelter
    e.recipes.modern_industrialization.primitive_alloy_smelter(2, 200)
        .itemIn('3x modern_industrialization:copper_dust')
        .itemIn('modern_industrialization:tin_dust')
        .itemOut('4x modern_industrialization:bronze_dust');

    // andesite alloyed
    e.recipes.modern_industrialization.primitive_alloy_smelter(2, 200)
        .itemIn("2x minecraft:andesite")
        .itemIn("2x minecraft:iron_nugget")
        .itemOut("2x create:andesite_alloy");

    e.recipes.modern_industrialization.primitive_alloy_smelter(2, 200)
        .itemIn("2x minecraft:andesite")
        .itemIn('2x #c:zinc_nuggets')
        .itemOut("2x create:andesite_alloy");

    //steam
    e.campfireCooking('modern_industrialization:steam_bucket', 'minecraft:water_bucket')

    // add brass mixing with dust
    e.recipes.create.mixing("2x modern_industrialization:brass_dust", ["modern_industrialization:copper_dust", "modern_industrialization:zinc_dust"])

    //recipe for 'kubejs:vacuum_tube'
    e.shaped('kubejs:vacuum_tube',
        [
            "   ",
            "BGB",
            "WWW",
        ],
        {
            B: 'modern_industrialization:iron_bolt',
            G: 'kubejs:component.glass.tube',
            W: 'modern_industrialization:red_alloy_fine_wire',
        }
    )

    e.shaped('kubejs:vacuum_tube',
        [
            "   ",
            "BGB",
            "WWW",
        ],
        {
            B: 'modern_industrialization:iron_bolt',
            G: 'kubejs:component.glass.tube',
            W: 'modern_industrialization:red_alloy_curved_plate',
        }
    )

    //recipe for redalloy
    e.shapeless('3x modern_industrialization:red_alloy_dust', ['modern_industrialization:copper_dust','minecraft:redstone','minecraft:redstone','minecraft:redstone','minecraft:redstone','minecraft:redstone'])

    e.recipes.modern_industrialization.assembler(8, 100)
        .itemIn('kubejs:component.glass.tube')
        .itemIn('3x modern_industrialization:red_alloy_wire')
        .itemIn('2x modern_industrialization:iron_bolt')
        .itemOut('2x kubejs:vacuum_tube')

    //glass tube recipe
    e.recipes.modern_industrialization.primitive_alloy_smelter(2, 100)
        .itemIn('minecraft:glass')
        .itemIn('kubejs:shape.mold.bun', 0)
        .itemOut('kubejs:component.glass.tube');


    //recipe for 'modern_industrialization:primitive_alloy_smelter'
    e.shaped('modern_industrialization:primitive_alloy_smelter',
        [
            "BFB",
            "BBB",
            "BFB",
        ],
        {
            B: 'minecraft:bricks',
            F: 'minecraft:furnace',
        }
    )
    
    //recipe for base mold

    e.custom({
        "type": "modern_industrialization:forge_hammer",
        "duration": 0,
        "eu": 15,
        "item_inputs": [
            {
                "amount": 4,
                "item": MI('wrought_iron_plate')
            }
        ],
        "item_outputs": [
            {
                "amount": 1,
                "item": KJS('shape.empty')
            }
        ]
    })

    let all_mold = [
        'kubejs:shape.mold.pickaxe',
        'kubejs:shape.mold.bun'
    ]

    all_mold.forEach(element => {
        e.custom({
            "type": "modern_industrialization:forge_hammer",
            "duration": 0,
            "eu": 15,
            "item_inputs": [
                {
                    "amount": 1,
                    "item": 'kubejs:shape.empty'
                }
            ],
            "item_outputs": [
                {
                    "amount": 1,
                    "item": element
                }
            ]
        })
    });


    // iron pickaxe
    e.recipes.modern_industrialization.primitive_alloy_smelter(2, 100)
        .itemIn('kubejs:shape.mold.pickaxe',0)
        .itemIn('3x minecraft:iron_ingot')
        .itemOut('kubejs:iron.pickaxe.head');

    e.remove({output: "minecraft:iron_pickaxe"})
    e.shapeless("minecraft:iron_pickaxe", ['kubejs:iron.pickaxe.head','minecraft:stick'])
});

