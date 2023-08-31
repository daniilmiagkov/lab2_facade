import { Operator } from "./Operator.js";
import { Site } from "./Resource.js";
export class InternetOperator extends Operator {
    constructor() {
        super(...arguments);
        this.channels = [
            new Site("Rutube", "https://rutube.ru/"),
            new Site("Youtube", "https://www.youtube.com/")
        ];
    }
    getChannel(value) {
        const index = this.inArray(value);
        if (index !== -1)
            return this.channels[index];
        return index;
    }
}
export class InternetOperatorPact extends InternetOperator {
    constructor() {
        super(...arguments);
        this.title = "InternetOperatorPact";
    }
}
//# sourceMappingURL=InternetOperator.js.map