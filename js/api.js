var API = {};

API.URL = "http://localhost:8080";

API.Request = {};

API.Request.Post = function(url, data, callback) {
	$.ajax({
		type: "POST",
		url: API.URL + url,
		data: data,
		dataType: "json",
		success: callback
	});
}

API.Request.Get = function(url, callback) {
	$.ajax({
		type: "GET",
		url: API.URL + url,
		dataType: "json",
		success: callback
	});
}

API.Request.Form = function(url, form, callback) {
	$.ajax({
		type: "POST",
		url: API.URL + url,
		data: form,
		processData: false,
		contentType: false,
		dataType: "json",
		success: callback
	});
}

API.Images = {};

API.Images.Upload = function(title, uploader, tags, image, callback) {
	var data = new FormData();
	data.append("title", title);
	data.append("uploader", uploader);
	data.append("tags", tags.join(","));
	data.append("image", image);

	API.Request.Form("/images", data, callback);
}

API.Images.GetAll = function(callback) {
	API.Request.Get("/images", callback);
}

API.Images.GetRecent = function(callback) {
	API.Request.Get("/images/recent", callback);
}

API.Images.GetRecentN = function(amt, callback) {
	API.Request.Get("/images/recent/" + amt, callback);
}

API.Images.Random = function(callback) {
	API.Images.GetAll(function(all) {
		var choice = all[Math.floor(Math.random() * all.length)];
		callback(choice);
	})
}

API.Images.RandomN = function(n, callback) {
	API.Images.GetAll(function(all) {
		var all = [];
		for (var i = 0; i < n; i++) {
			var choice = all[Math.floor(Math.random() * all.length)];
			all.push(choice);
		}
		callback(all);
	})
}

API.Images.Search = function(query, callback) {
	API.Request.Get("/images/search/" + query, callback);
}

API.Images.GetById = function(id, callback) {
	API.Request.Get("/images/" + id, callback);
}

API.Images.GetSourceUrl = function(id) {
	return API.URL + "/images/" + id + "/src";
}
