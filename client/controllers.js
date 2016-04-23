
fishModule.controller("fishController", function(fishFactory) {
    var ctrl = this;

    ctrl.classes = [];
    ctrl.orders = [];
    fishFactory.classes(function (classes) {
        ctrl.classes = classes;
    });

    ctrl.clickedClass = function (cls) {
        console.log(cls);
        fishFactory.ordersByClassId(cls.id, function (orders) {
            ctrl.orders = orders;
        });
    };

    ctrl.clickedOrder = function (order) {
        fishFactory.familiesByOrderId(order.id, function(families) {
            ctrl.families = families;
        })
    }

});
