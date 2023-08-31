export class Resource extends Object{
    public title: string;

    public constructor(title?: string) {
        super();
        this.title = title || '';
    }
}

export class Channel extends Resource {
    public frequency: number;
}

export class Site extends Resource {
    public url: string;

    public constructor(title: string, url: string) {
        super(title)
        this.url = url;
    }
}