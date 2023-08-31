import {TVOperator, TVOperatorPact} from "./TVOperator.js";
import { InternetOperator, InternetOperatorPact } from "./InternetOperator.js";
import {Processor, ProcessorIntel} from "./Processor.js";
import {Speakers, SpeakersLG} from "./Speakers.js";
import {Resource} from "./Resource.js";
import fs from 'fs'

export abstract class TV {
    public abstract title: string;
    public power: boolean;
    protected abstract tvOperator: TVOperator;
    protected abstract internetOperator: InternetOperator;
    protected abstract speakers: Speakers;
    protected abstract processor: Processor;
    protected abstract resource: Resource;
    private fs: any;

    protected constructor() {
        this.power = false;
        this.fs = fs;
    }

    public changePower(obj: any): Object {
        if (obj.value === null) {
            this.power = (!this.power);
            if (!this.power)
                {
                    if (this.resource) {
                        this.fs.writeFileSync('dataBase/channel.json', JSON.stringify(this.resource));
                        console.log('канал записался')
                    }
                    if (this.speakers)
                        this.fs.writeFileSync('dataBase/products.json', JSON.stringify(this.speakers));
                }

        }
        if (obj.value === false)
            this.power = false;
        console.log(obj)
        console.log(this.power)
        if (this.power) {
            try {
                const speakers:Speakers = JSON.parse(this.fs.readFileSync('dataBase/products.json'))
                Object.assign(this.speakers, speakers)
                console.log(this.speakers)

                const resource: Resource = JSON.parse(this.fs.readFileSync('dataBase/channel.json'))
                Object.assign(this.resource, resource)
                console.log(this.resource)
                console.log(this.processor.getArrayVolume(
                    this.speakers.maxVolume,
                    this.speakers.volume,
                    obj.w,
                    obj.h,
                ))
                return {
                    array: this.processor.getArrayVolume(
                        this.speakers.maxVolume,
                        this.speakers.volume,
                        obj.w,
                        obj.h,
                    ),
                    resource: this.resource,
                    power: this.power
                }
            }
            catch (thr) {
                console.log('error')
                return {
                    power: this.power
                };
            }

        }



        return {
            power: this.power
        };
    }

    public changeVolume(obj: any): Array<object> {
        console.log(typeof this.speakers)
        this.speakers.changeVolume(obj.value);
        return this.processor.getArrayVolume(
            this.speakers.maxVolume,
            this.speakers.volume,
            obj.w,
            obj.h,
        );
    }

    public changeChannel(obj:any) : Resource {
        let value = obj.value;
        this.resource = (value.indexOf('.', 0) != -1) ?
            this.tvOperator.changeChannel(Number.parseFloat(value) * 10) :
            this.tvOperator.getChannel(value);

        return this.resource;
    }

    public getChannel(index: any): Resource {
        this.resource = (isFinite(index)) ?
            this.tvOperator.getChannel(index) :
            this.internetOperator.getChannel(index)
        return this.resource;
    }
}

export class TV_LG extends TV {
    public override title: string = "TV_LG";
    protected override tvOperator: TVOperator = new TVOperatorPact();
    protected override internetOperator: InternetOperator = new InternetOperatorPact();
    protected override speakers: Speakers = new SpeakersLG();
    protected override processor: Processor = new ProcessorIntel();
    protected override resource: Resource = new Resource();
    public constructor () {
        super();
    }
}