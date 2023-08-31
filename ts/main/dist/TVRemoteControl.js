export class TVRemoteControl {
    constructor(tv) {
        this.tv = tv;
    }
    changeChannel(obj) {
        if (this.tv.power) {
            return this.tv.changeChannel(obj);
        }
        return {};
    }
    changePower(obj) {
        return this.tv.changePower(obj);
    }
    changeVolume(obj) {
        if (this.tv.power) {
            return this.tv.changeVolume(obj);
        }
        return new Array();
    }
}
//# sourceMappingURL=TVRemoteControl.js.map