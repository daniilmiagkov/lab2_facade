export class Operator {
    changeChannel(value) {
        this.numberChannel += value;
        if (this.numberChannel >= this.channels.length)
            this.numberChannel = 0;
        if (this.numberChannel < 0)
            this.numberChannel = this.channels.length - 1;
        console.log(value, this.numberChannel, this.channels[this.numberChannel]);
        return this.channels[this.numberChannel];
    }
    inArray(value) {
        for (let i = 0; i < this.channels.length; i++) {
            if (this.channels[i].title === value) {
                return i;
            }
        }
        return -1;
    }
}
//# sourceMappingURL=Operator.js.map