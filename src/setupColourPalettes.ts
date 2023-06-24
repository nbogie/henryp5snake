import p5 from "p5";
//@ts-ignore
import colour_palettes from "nice-color-palettes";

export function setupColourPalettes(p: p5) {
    // get a random colour palette
    let game_palette = p.random(colour_palettes) as any as string[];
    const colour1: string = game_palette[0];
    const colour2: string = game_palette[1];
    const colour3: string = game_palette[2];
    const colour4: string = game_palette[3];
    const colour5: string = game_palette[4];
    return { colour1, colour2, colour3, colour4, colour5 };
}
