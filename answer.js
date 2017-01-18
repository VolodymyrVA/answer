function Handler (name, calculateMethod) {
    this.name = name;
    this.calculateMethod = calculateMethod;
}



var minHandler = new Handler("min", function(array){
    return Math.min.apply( Math, array );
});
var maxHandler = new Handler("max", function(array){
    return Math.max.apply( Math, array );
});
var emptyHandler = new Handler();
var sumHandler = new Handler('sum', function(array) {
    var sum = 0;
    array.forEach(function (item) {
        sum += item;
    });
    return sum;
});
var averageHandler = new Handler('average', function(array) {
    var sum = 0,
        result;
    array.forEach(function (item) {
        sum += item;
    });
    result = sum / array.length;
    return result;

});




function HandlerController() {
    var _this = this,
        valueArray,
        method;

    this.addHandler = function (newMethod) {
        _this[newMethod.name] = newMethod.calculateMethod;
    };

    this.calculate = function(array, nameMethod) {
        valueArray = array;
        method = nameMethod;
    };

    this.print = function () {
        if(valueArray && method === undefined){
            Object.keys(_this).forEach(function(item){
                if(item !== 'addHandler' && item !== 'calculate' && item !== 'print'){
                    console.log("=>Handler " +
                        (typeof item !== 'string' ? '"empty name"' : '"' + item + '"') +
                        " return: " +
                        (typeof _this[item] !== 'function' ? '"сalculate method is empty"': _this[item](valueArray))
                    );
                }
            })
        }

        if(valueArray && method){
            Object.keys(_this).forEach(function(item){
                if(item !== 'addHandler' && item !== 'calculate' && item !== 'print'){
                    method.forEach(function (i) {
                        if(i === item){
                            console.log(
                                "=>Handler " +
                                (typeof item !== 'string' ? '"empty name"' : '"' + item + '"') +
                                " return: " +
                                (typeof _this[item] !== 'function' ? '"сalculate method is empty"': _this[item](valueArray))
                            )
                        }
                    })
                }
            })
        }

    };
};



var controller = new HandlerController();



controller.addHandler(minHandler);
controller.addHandler(maxHandler);
controller.addHandler(emptyHandler);
controller.addHandler(sumHandler);
controller.addHandler(averageHandler);



controller.calculate([1,2,3,5,6], ['min', 'sum', 'average']);
controller.print();