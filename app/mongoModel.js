var model = null;

module.exports = function(mongoose) {

	//just instance model once
	if (!model && mongoose) {
		model = mongoose.model('data', { 
			id: Number, 
			first_name: String, 
			last_name: String, 
			age: Number 
		});
	}

	//expose API
	return {
		getAllData: getAllData,
		saveAllData: saveAllData,
		deleteAllData: deleteAllData
	} 

}


function getAllData() {
	return model.find();
} 

function deleteAllData() {
	return model.collection.remove();
}

function saveAllData(data) {
	//make sure there is data to be saved
	//otherwise return a resolved promise
	return data && data.length ? 
		model.collection.insert(data) : 
		Promise.resolve([]);
}
