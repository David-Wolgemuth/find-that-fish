fishModule.factory("fishFactory", function($http){
	var factory = {};
	factory.classes = function(callback){
		$http.get('/classes').then(function(res){
			var classes = res.data;
			callback(classes);
		})
	}

	factory.ordersByClassId = function(id, callback){
		$http.get("/orders?class=" + id).then(function(res){
			var orders = res.data;
			callback(orders);
		})
	}

	factory.familiesByOrderId = function(id, callback){
		$http.get("/families?order=" + id).then(function(res){
			var families = res.data;
			callback(families);
		})
	}

	factory.speciesByFamilyId = function(id, callback){
		$http.get("/species?family=" + id).then(function(res){
			var species = res.data;
			callback(species);
		})
	}
	return factory;
})