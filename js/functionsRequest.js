function requestApi(bodyString, callbackFunction){
    let xhr = new XMLHttpRequest();
	xhr.open("POST", "https://jscp-diplom.netoserver.ru/", true);
	xhr.responseType = "json";
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(bodyString);
	xhr.onload = () => {
		callbackFunction(xhr.response);
	};
}



