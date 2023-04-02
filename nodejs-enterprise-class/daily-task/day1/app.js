// 以下為一段判斷分數是否及格的函式，請嘗試將此函式使用 Promise 語法改寫
// const checkScore = (score) => {
//     /* 回傳一個 Promise，並執行以下非同步操作*/
//     const score = Math.round(Math.random() * 100);
//     /* 判斷流程請嘗試使用 setTimeout() 執行 */
//     if(score >= 60) {
//       console.log(score); // 執行實現方法
//     } else {
//       console.log("不及格"); // 執行拒絕方法
//     }
//   }

const checkScore = () => {
    /* 回傳一個 Promise，並執行以下非同步操作*/
    const score = Math.round(Math.random() * 100);
    /* 判斷流程請嘗試使用 setTimeout() 執行 */
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (score >= 60) {
                resolve(`${score}分，及格`); // 執行實現方法
            } else {
                reject(`${score}分，不及格`); // 執行拒絕方法
            }
        }, 1000);
    })
}

checkScore()
    .then(data => console.log(data))
    .catch((error => console.log(error)));