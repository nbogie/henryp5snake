interface CellCoordinate {
    x: number;
    y: number;
}


class Cell {
    _id: number;
    _x: number;
    _y: number;
    _coordinate: CellCoordinate;



    constructor(_id: number, _x: number, _y: number, _coordinate: CellCoordinate){
        this._id = _id;
        this._x = _x;
        this._y = _y;
        this._coordinate = _coordinate;


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
    get coordinate(): CellCoordinate{
        return this._coordinate;
    }
}

export default Cell;