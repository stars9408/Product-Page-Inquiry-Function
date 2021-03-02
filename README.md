2021년 1월 현재 직장에서 내부 개발로 맡아 진행했던 경험입니다.

# 요구사항:

1. 당사에서 취급하는 아이템 소개 페이지에 문의하기 기능을 개발하여 사용할 수 있도록 한다.
2. 아래 사항들을 모두 저장할 수 있어야 한다.
    1. 성함
    2. 회사명
    3. 연락처
    4. 이메일
3. 받아온 정보를 이메일로 담당자에게 전달한다.

# 활용 Skills:

1. ASP-HTML
    1. FORM 등
2. JAVASCRIPT
3. DB (Microsoft DB Server Management Service)

# 프로세스:

1. 해당 아이템 페이지 확인 및 수정
    1. 페이지와 연결된 javascript 확인 및 수정
    2. 페이지와 연결된 관련 DB 수정
2. 이메일 수신 확인

## 폼의 형태:

```html
<div id="section-subscribe1">
		<div class="container">
			<div class="row">
				<div class="title1 col-12">
					<h2>구매문의</h2>
				</div>
				<div class="form col-12 ez-animate" data-animation="fadeInUp">
					<FORM method="POST"  name="frmMain" >

						<input name="ProductMajorName" type="hidden" value="groupware">
						<input name="ProductMajorIdx" type="hidden" value="24">

						<input type="hidden" name="ProductTypeName" value = "그룹웨어(상품)"> 
						<input type="hidden" name="ncount" value = "1"> 
						<input type="hidden" name="quantity0" value = "1"> 
						<input type="hidden" name="product0" value = "groupware"> 

						<input type="text" name="uname" class="form-email form-element large" placeholder="성명 *" tabindex="2" required="" >
						<input type="text" name="company" class="form-email form-element large" placeholder="회사명 *" tabindex="2" required="" >
						<input type="text" name="hp" class="form-email form-element large" placeholder="연락처 *" tabindex="2" required="" >		
						<input type="text" name="uemail" class="form-email form-element large" placeholder="이메일 *" tabindex="2" required="" >
											
						<div style="width:640px;text-align:center;margin:50px auto 20px auto"> 
							<table width="100%" border="0" cellpadding="0" cellspacing="0" class="tb">
						        <tr>
							        <td width="33%">수집 및 이용목적</td>
							        <td width="33%">수집항목</td>
							        <td>보유/이용 기간</td>
						        </tr>
						        <tr>
					        		<td>온라인 상담/견적</td>
						        	<td>성명, 회사명, 연락처, 이메일</td>
							        <td>3년</td>
						        </tr>
					        </table>
							<div style="width:100%;padding:10px 0">소비자의 불만 또는 분쟁 처리에 관한 기록(전자상거래 등에서의 소비자보호에 관한 법률)</div>
					        <div style="width:100%;padding:10px 0"><input type="checkbox" name="checkbox">개인정보 수집 및 이용에 동의합니다(필수)</div>
						</div>
						
							<a href="javascript:gw_send(document.frmMain);" class="form-submit button text-uppercase bkg-theme bkg-hover-charcoal color-white color-hover-white text-medium">보내기</a><br>
							<button type="submit" class="shadow1 bgscheme">문의하기  ASP</button>
					</div>
				</form>  
                </div>
			</div>
```

- 위 코드는 .asp 파일에 있는 FORM 부분입니다. 해당 페이지는 하나의 asp 플랫폼을 그대로 받아왔기 때문에 새로운 기능을 만드는 것이 조금 난해하였습니다. 기존 세팅에 맞지 않는 부분이 하나라도 생성되는 경우, 페이지가 작동안하거나, 무한로딩 등의 문제가 발생하였습니다.
- 그렇기에 하나하나 기존 세팅값과 어긋나지 않게 개발을 진행하였습니다.

## Database

- DB 관련하여서도, 페이지에서 처리되는 값들이 서로 연결되어 있는 테이블이 3곳이나 있었기에, 새로은 아이템 값을 선정 해주고, 서로 매치되는 FOREIGN KEY또한 맞추어 주었습니다.
- DBConn 폴더에 존재하는 Configs 파일에 있는 DB 연결정보를 확인하여 전에 사용했던 DB가 아닌 다른 DB를 수정 및 활용 하였습니다.

## 동의사항 체크 확인!

- 아래와 같이 이번엔 동의사항을 체크 해야만 정보를 받아와 처리할 수 있었습니다. 그렇기에 밑에 javascript 내용에 checkbox.checked 기능을 추가하여, 동의받지 않은 경우엔 "동의가 필요하다"라는 문구를 주며 처리되지 않도록 하였습니다.

```jsx
function gw_send(obj){

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
		obj.checkbox.focus();
		return;
	}
    //obj.target = "!OK"
	obj.action="/purchase/purchase_comm_ok.asp";
	obj.submit();

}
```

## 이메일 처리


- 위와 같이, 지난번 개발하였던 NVIDIA_A100처럼, 처리된 제품명이 groupware인 경우, 주문/상담 이메일을 받는 수신자와 제목 등을 설정해주었고, 해당 이메일이 발송 된 후엔 다시 /gw 주소로 돌아가도록 설정하였습니다.

# 테스트

- **동의사항에 체크를 안한 경우, 아래와 같이 alert가 주어지며 "이용약관에 동의해주세요" 라는 문구가 표시됩니다!**

- **동아래와 같이 작성, 동의사항 체크 후 '보내기'로 FORM을 submit 해주게 되면...**

- **아래와 같이 잘 처리되어 이메일이 수신되는 것을 확인하였습니다.**

## 느낌점 및 후기:

- **기존에 사용하던 페이지를 활용하여 새로운 페이지와 해당 페이지에 요구되는 사항들에 맞추어 튜닝하는 방법에 대해 조금 더 능숙해진 것 같다는 느낌을 받았습니다. 또한, FTP를 통해 소스에 접근하여 소스에서 각 asp 파일 등에서 어떤 것들을 처리하고 어떤 다른 파일들과 연결되어 있는지 이전보다 더 수월하게 찾아낼 수 있었고, 기타 include된 파일들에 대한 구문과 그 경로, 그 기능까지 알아내는 부분에 이전보다 더 능숙해졌다는 느낌이 들었습니다.**
- **DB management service를 사용하여 새로운 DB에 연결하는 방법, 또한, 웹개발을 할 때엔 항상 DB 연결 정보를 기록해두는 파일을 만들어 놓아야 한다는 것을 다시 새길 수 있었습니다.**
- **하나의 템플릿/플랫폼을 통째로 가져와서 필요 기능을 추가하는 경우, 여러가지 에러가 발생할 수 있다는 것을 알게 되었고, 이런 경우엔 더 신경써서 디테일하게 작업해야 한다는 것에 대해 알 수 있었습니다.**
