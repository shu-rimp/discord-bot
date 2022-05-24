<div align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Discord.js v13-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>
</div>
<div align="center">
  <img src="./intro/title.gif">
  
  <p><a href="https://discord.com/oauth2/authorize?client_id=950075988639883324&permissions=84992&scope=applications.commands%20bot">
    <img src="https://img.shields.io/badge/invite link-5865F2?style=plastic&logo=Discord&logoColor=white"/></a>
    <a href="https://shurimp.tistory.com/category/DEVELOP/discord-bot">
    <img src="https://img.shields.io/badge/blog-D4AA00?style=plastic&logo=GitBook&logoColor=white"/></a>  
  </p>
  
  <hr>
  
  <img src="./intro/search.gif">
  <p>네이버뉴스 검색기능을 제공합니다.</p>  
</div>

------------------------------

## Commands ##
- /도와주새우 : 도움말 명령어를 표시합니다. 이 메시지는 본인에게만 보여집니다.
- /뉴스검색 <키워드> : 입력한 키워드로 뉴스를 검색합니다. 정확도가 반영된 100개의 최신 뉴스를 가져옵니다.
  > 선택메뉴를 통해 보고싶은 기사를 선택할 수 있습니다. 제목을 클릭하면 기사 전문으로 이동합니다.                    
  > <(이전페이지), >(다음페이지) 버튼으로 페이지를 이동할 수 있습니다.                         
  > X(검색종료) 버튼을 누르면 검색창을 닫을 수 있습니다. 메시지는 자동으로 삭제됩니다.
 
 ## Installation ##
 (봇을 이용만 할 경우 상단의 invite link를 눌러주세요.)
 
 - nodejs v16.0.0 이상이 필요합니다. lts버전 설치를 권장합니다.         
 ```
 > nvm install lts
 > nvm use 16.15.0 (다운받은 nodejs 버전 입력)
 > node -v (버전 확인)
 ```
 
 - 소스코드를 다운받은 후, 해당 폴더로 경로 이동 후 discord.js를 설치합니다.
 ```
 > npm init -y
 > npm install discord.js
 ```
 
 - 해당 봇은 [네이버 오픈 api](https://developers.naver.com/)를 사용합니다. 등록신청을 완료해야 사용 가능합니다.
 - config.json 파일을 생성 후, 발급받은 봇의 토큰과 api 키를 저장합니다.
 ```
 {
   "clientId" : "Your Bot's Client Id"
   "guildId" : "Your Server's Id",
  
   "token" : "Your Bot's Token here",
  
   "Naver_Client_Id" : "Your Naver api's Client Id",
   "Naver_Client_Secret" : "Your Naver api's Client Secret"
}
```
 
 

--------------------------------------
<div align="left"> 
  <a href="https://developers.naver.com/">Powered by NAVER OpenAPI</a><br>
  <a href="https://www.flaticon.com/free-icons/shrimp">Shrimp icons created by Freepik - Flaticon</a>
</div>
