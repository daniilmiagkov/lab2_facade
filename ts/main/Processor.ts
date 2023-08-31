export abstract class Processor {
    public abstract title: string;
    public getArrayVolume(maxVolume:number,
                          volume:number,
                          w: number,
                          h: number):Array<object> {
        const array: Array<object> = [];
        console.log(maxVolume,
            volume,
            w,
            h)
        maxVolume++;
        for (let i = 0; i <= volume; i++) {
            array.push({
                color: `rgb(${200 - i * 5},${255 - i * 5},${255 - i * 5})`,
                x: i * (w / maxVolume) + 0.5,
                y: h - (h / maxVolume) * i + 0.5,
                w: (w / maxVolume) + 0.5,
                h: i * (h / maxVolume) + 0.5,
            })
        }
        return array;
    }
}

export class ProcessorIntel extends Processor {
    public override title: string = "ProcessorIntel";
}