import { Resource } from "./Resource.js";

//абстрактный класс, который предоставляет каналы и сайты
export abstract class Operator {
    public abstract title: string;
    // массив каналов
    protected abstract channels: Array<Resource>;
    protected numberChannel: number;

    public abstract getChannel(value: string): any

    public changeChannel(value: number): Resource {
        this.numberChannel += value;
        if (this.numberChannel >= this.channels.length)
            this.numberChannel = 0;
        if (this.numberChannel < 0)
            this.numberChannel = this.channels.length - 1
        console.log(value, this.numberChannel, this.channels[this.numberChannel])
        return this.channels[this.numberChannel];
    }

    protected inArray(value: string): number {
        for (let i = 0; i < this.channels.length; i++) {
            if (this.channels[i].title === value) {
                return i;
            }
        }
        return -1;
    }
}
