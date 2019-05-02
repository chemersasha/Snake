var request;

function CreateRequest() {
	var request=null;
	try {
		request = new XMLHttpRequest();
	}
	catch (e) {
		try {
			request=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			request=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return request;
} 