function getRootPath() {
	var fullPath = document.location.pathname;
	return fullPath.slice(0, fullPath.lastIndexOf('/'));
}