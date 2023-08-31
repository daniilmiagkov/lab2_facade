import { Operator } from "./Operator.js";
import { Channel } from "./Resource.js";
export class TVOperator extends Operator {
    constructor() {
        super(...arguments);
        this.channels = [
            new Channel("Первый"),
            new Channel("Россия 1"),
            new Channel("ТНТ"),
            new Channel("СТС"),
            new Channel("Культура"),
            new Channel("НТВ")
        ];
    }
    getChannel(value) {
        const index = Number.parseInt(value);
        if (index < this.channels.length && index >= 0) {
            this.numberChannel = index;
        }
        console.log(index, this.numberChannel, this.channels[this.numberChannel]);
        return this.channels[this.numberChannel];
    }
}
export class TVOperatorPact extends TVOperator {
    constructor() {
        super(...arguments);
        this.title = "InternetOperatorPact";
    }
}
//# sourceMappingURL=TVOperator.js.map