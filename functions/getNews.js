module.exports = {

    getNews : async function(keyword) {
        const fetch = require("node-fetch");
        const { Naver_Client_Id, Naver_Client_Secret } = require('../config.json');

        try {
            const header = new fetch.Headers({
                "X-Naver-Client-Id": Naver_Client_Id,
                "X-Naver-Client-Secret": Naver_Client_Secret,
            });
            
            let url = new URL(`https://openapi.naver.com/v1/search/news.json?query=${keyword}&display=100&start=1&sort=sim`);

            const response = await fetch(url, { headers: header });
            let data = await response.json();

            if (response.status == 200) {
                if (data.total_hits == 0) {
                    throw new Error("검색된 결과값이 없습니다.");
                }

                // console.log(data);
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log("api 호출 에러 발생 : ", error.message);
        }
    }, // getNews
    
}; // module.exports