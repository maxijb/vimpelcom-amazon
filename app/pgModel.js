//will store the PGClient access here
var pg = null;

module.exports = function(pgClient) {

	//just instance model once
	if (!pg && pgClient) {
		pg = pgClient;
	}

	//expose API
	return {
		getAllData: getAllData,
		deleteAllData: deleteAllData,
		saveItem: saveItem,
		restartIDs: restartIDs
	} 

}

//restart the serial ID 
function restartIDs() {
	return pg.query("ALTER SEQUENCE data_id_seq RESTART WITH 1");
}


//fetch everything in the table
function getAllData() {
	return pg.query("SELECT * FROM data");
} 

//remove everything from the table
function deleteAllData() {
	return pg.query("DELETE FROM data");
} 


//create a new record with the provided data
function saveItem(fname, lname, age) {
	return pg.query("INSERT INTO data (first_name, last_name, age) VALUES ($1, $2, $3)", 
					[fname, lname, age]);
}