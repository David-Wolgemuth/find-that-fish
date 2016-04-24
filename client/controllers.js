
fishModule.controller("fishController", function(fishFactory) {
    var ctrl = this;

    ctrl.classes = [];
    ctrl.orders = [];
    ctrl.families = [];
    ctrl.species = [];

    ctrl.class = {};
    ctrl.order = {};
    ctrl.family = {};
    ctrl.species = {};

    fishFactory.classes(function (classes) {
        ctrl.classes = classes;
    });

    ctrl.clickedClass = function (cls) {
        ctrl.class = cls;

        ctrl.order = {};
        ctrl.family = {};
        ctrl.currentSpecies = {};
        
        ctrl.orders = [];
        ctrl.families = [];
        ctrl.species = [];

        scrollTo("#orders");
        fishFactory.ordersByClassId(cls.id, function (orders) {
            ctrl.orders = orders;
        });
    };

    ctrl.clickedOrder = function (order) {
        ctrl.order = order;

        ctrl.family = {};
        ctrl.species = {};

        ctrl.families = [];
        ctrl.species = [];

        scrollTo("#families");
        fishFactory.familiesByOrderId(order.id, function(families) {
            ctrl.families = families;
        })
    }

    ctrl.clickedFamily = function (family) {
        ctrl.family = family;

        ctrl.species = {};

        ctrl.species = [];

        scrollTo("#species");
        fishFactory.speciesByFamilyId(family.id, function(species) {
            ctrl.species = species;
        })
    }

    ctrl.clickedSpecies = function (species) {
        ctrl.currentSpecies = species;
    }
});

function scrollTo (anchor) {
    $("html, body").animate({ scrollTop: $(anchor).prev().offset().top }, 1000);
}
