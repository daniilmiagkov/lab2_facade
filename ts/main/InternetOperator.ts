//класс, который предоставляет каналы
import {Operator} from "./Operator.js";
import {Site} from "./Resource.js";

export abstract class InternetOperator extends Operator {
    // массив сайтов
    protected override channels: Array<Site> = [
        new Site(
            "Rutube",
            "https://rutube.ru/")
        , new Site(
            "Youtube",
            "https://www.youtube.com/")
    ];


    public override getChannel(value: string): any {
        const index = this.inArray(value);
        if (index !== -1)
            return this.channels[index];
        return index;
    }
}

export class InternetOperatorPact extends InternetOperator {
    public override title: string = "InternetOperatorPact"
}