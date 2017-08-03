function renderImage(img, width) {
	var source = API.Images.GetSourceUrl(img.id);
	var tags = "";
	img.tags.split(",").forEach(function(tag) {
		tags += `<a class="tag label label-primary" href="search.html?query=${tag}">${tag}</a>`
	});

	var html = `
	<div style="width: ${width}" class="image-thumbnail panel panel-default">
		<div class="panel-body">
			<a href="viewer.html?id=${img.id}" target="_blank">
				<img width="100%" src="${source}"></img>
			</a>
		</div>
		<div class="panel-footer">
			<strong>${img.title}</strong>
			<i>- ${img.uploader}</i>
			<button type="button" class="upvote btn btn-default btn-sm">
				Upvote (${img.upvotes})
			</button>
			<div class="tags">
				${tags}
			</div>
			<div class="clearfix"></div>
		</div>
	</div>`;

	return html;
}

function get(name){
	if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
		return decodeURIComponent(name[1]);
}
