class Cell {
    _id: number;
    _x: number;
    _y: number;
    constructor(_id: number, _x: number, _y: number){
        this._id = _id;
        this._x = _x;
        this._y = _y;


    }
    get id(): number{
        return this._id;
    }
    get x(): number{
        return this._x;
    }
    get y(): number{
        return this._y;
    }
}

export default Cell;