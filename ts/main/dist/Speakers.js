export class Speakers {
    constructor() {
        this.volume = 0;
        this.maxVolume = 20;
        this.minVolume = 0;
    }
    changeVolume(value) {
        this.volume = (this.volume + value < this.minVolume ||
            this.volume + value > this.maxVolume) ? this.volume :
            this.volume + value;
    }
}
export class SpeakersLG extends Speakers {
    constructor() {
        super(...arguments);
        this.title = "SpeakersLG";
    }
}
//# sourceMappingURL=Speakers.js.map