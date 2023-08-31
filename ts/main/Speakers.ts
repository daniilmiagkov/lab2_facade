export abstract class Speakers {
    public abstract title: string;
    public volume: number = 0;
    public maxVolume: number = 20;
    public minVolume: number = 0;

    public changeVolume(value: number) {
        this.volume = (this.volume + value < this.minVolume ||
            this.volume + value > this.maxVolume) ? this.volume :
            this.volume + value

    }
}

export class SpeakersLG extends Speakers {
    public override title: string = "SpeakersLG";
}