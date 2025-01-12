class NodeError extends Error{
    statusCode: Number;

    constructor(message:string , statusCode: number = 500){
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, NodeError.prototype);
    }
}

export {NodeError};