function gw_send(obj){
	window.alert("ATE");
	flag=false; 
	if(obj.uname.value == ""){
		alert("이름을 입력하세요");
		obj.uname.focus();
		return;
	}
	if(obj.company.value == ""){
		alert("회사명을 입력하세요");
		obj.company.focus();
		return;
	}
	if(obj.hp.value == ""){
		alert("연락처를 입력하세요");
		obj.hp.focus();
		return;
	}
	if(obj.uemail.value == ""){
		alert("이메일을 입력하세요");
		obj.uemail.focus();
		return;
	}
	if(obj.checkbox.checked == false){
		alert("이용약관에 동의해주세요");
		return;
	}

    //obj.target = "!OK"
	obj.action="/purchase/purchase_comm_ok.asp";
	obj.submit();
	
}




