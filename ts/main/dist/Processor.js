export class Processor {
    getArrayVolume(maxVolume, volume, w, h) {
        const array = [];
        console.log(maxVolume, volume, w, h);
        maxVolume++;
        for (let i = 0; i <= volume; i++) {
            array.push({
                color: `rgb(${200 - i * 5},${255 - i * 5},${255 - i * 5})`,
                x: i * (w / maxVolume) + 0.5,
                y: h - (h / maxVolume) * i + 0.5,
                w: (w / maxVolume) + 0.5,
                h: i * (h / maxVolume) + 0.5,
            });
        }
        return array;
    }
}
export class ProcessorIntel extends Processor {
    constructor() {
        super(...arguments);
        this.title = "ProcessorIntel";
    }
}
//# sourceMappingURL=Processor.js.map