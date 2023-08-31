export class Resource extends Object {
    constructor(title) {
        super();
        this.title = title || '';
    }
}
export class Channel extends Resource {
}
export class Site extends Resource {
    constructor(title, url) {
        super(title);
        this.url = url;
    }
}
//# sourceMappingURL=Resource.js.map