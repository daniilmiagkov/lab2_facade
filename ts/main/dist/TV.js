import { TVOperatorPact } from "./TVOperator.js";
import { InternetOperatorPact } from "./InternetOperator.js";
import { ProcessorIntel } from "./Processor.js";
import { SpeakersLG } from "./Speakers.js";
import { Resource } from "./Resource.js";
import fs from 'fs';
export class TV {
    constructor() {
        this.power = false;
        this.fs = fs;
    }
    changePower(obj) {
        if (obj.value === null) {
            this.power = (!this.power);
            if (!this.power) {
                if (this.resource) {
                    this.fs.writeFileSync('dataBase/channel.json', JSON.stringify(this.resource));
                    console.log('канал записался');
                }
                if (this.speakers)
                    this.fs.writeFileSync('dataBase/products.json', JSON.stringify(this.speakers));
            }
        }
        if (obj.value === false)
            this.power = false;
        console.log(obj);
        console.log(this.power);
        if (this.power) {
            try {
                const speakers = JSON.parse(this.fs.readFileSync('dataBase/products.json'));
                Object.assign(this.speakers, speakers);
                console.log(this.speakers);
                const resource = JSON.parse(this.fs.readFileSync('dataBase/channel.json'));
                Object.assign(this.resource, resource);
                console.log(this.resource);
                console.log(this.processor.getArrayVolume(this.speakers.maxVolume, this.speakers.volume, obj.w, obj.h));
                return {
                    array: this.processor.getArrayVolume(this.speakers.maxVolume, this.speakers.volume, obj.w, obj.h),
                    resource: this.resource,
                    power: this.power
                };
            }
            catch (thr) {
                console.log('error');
                return {
                    power: this.power
                };
            }
        }
        return {
            power: this.power
        };
    }
    changeVolume(obj) {
        console.log(typeof this.speakers);
        this.speakers.changeVolume(obj.value);
        return this.processor.getArrayVolume(this.speakers.maxVolume, this.speakers.volume, obj.w, obj.h);
    }
    changeChannel(obj) {
        let value = obj.value;
        this.resource = (value.indexOf('.', 0) != -1) ?
            this.tvOperator.changeChannel(Number.parseFloat(value) * 10) :
            this.tvOperator.getChannel(value);
        return this.resource;
    }
    getChannel(index) {
        this.resource = (isFinite(index)) ?
            this.tvOperator.getChannel(index) :
            this.internetOperator.getChannel(index);
        return this.resource;
    }
}
export class TV_LG extends TV {
    constructor() {
        super();
        this.title = "TV_LG";
        this.tvOperator = new TVOperatorPact();
        this.internetOperator = new InternetOperatorPact();
        this.speakers = new SpeakersLG();
        this.processor = new ProcessorIntel();
        this.resource = new Resource();
    }
}
//# sourceMappingURL=TV.js.map