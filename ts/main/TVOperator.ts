//класс, который предоставляет каналы
import {Operator} from "./Operator.js";
import {Channel} from "./Resource.js";

export abstract class TVOperator extends  Operator {
    // массив сайтов
    protected override channels: Array<Channel> = [
        new Channel("Первый"),
        new Channel("Россия 1"),
        new Channel("ТНТ"),
        new Channel("СТС"),
        new Channel("Культура"),
        new Channel("НТВ")
    ]

    public override getChannel(value: string): any {
        const index: number = Number.parseInt(value);
        if (index < this.channels.length && index >= 0) {
            this.numberChannel = index;
        }
        console.log(index, this.numberChannel, this.channels[this.numberChannel])
        return this.channels[this.numberChannel];
    }
}

export class TVOperatorPact extends TVOperator {
    public override title: string = "InternetOperatorPact"
}