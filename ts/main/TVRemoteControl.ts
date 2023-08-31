import {TV} from "./TV";

export abstract class TVRemoteControl {
    public tv: TV;

    protected constructor(tv: TV) {
        this.tv = tv;
    }

    public changeChannel(obj: any): Object {
        if (this.tv.power) {
            return this.tv.changeChannel(obj);
        }
        return {};
    }


    public changePower(obj: any): Object {
        return this.tv.changePower(obj)
    }

    public changeVolume(obj: object): Array<object> {
        if (this.tv.power) {
            return this.tv.changeVolume(obj);
        }
        return new Array<object>()
    }

}