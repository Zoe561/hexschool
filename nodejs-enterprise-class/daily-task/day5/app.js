// function correctTest(name) {
//     return new Promise((resolve, reject) => {
//         console.log("批改作業中")
//         setTimeout(() => {
//             const score = Math.round(Math.random() * 100);
//             resolve(
//                 {
//                     name,
//                     score
//                 }
//             )
//         }, Math.random() * 10000);
//     })
// }

// function checkReward(data) {
//     return new Promise((resolve, reject) => {
//         console.log("正在檢查獎品中");
//         console.log(data.score);
//         setTimeout(() => {
//             if (data.score >= 90) {
//                 resolve(`${data.name}獲得電影票`);
//             } else if (data.score >= 60 && data.score < 90) {
//                 resolve(`${data.name}獲得嘉獎`);
//             } else {
//                 reject(`您沒有獎品，打手心10下`);
//             }
//         }, 700);
//     })
// }

// 批改作業
function correctTest(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const score = Math.round(Math.random()*100);
        if(score >= 60) {
          resolve({
            name,
            score
          })
        } else {
          reject("您已達退學門檻")
        }
      }, 2000)
    })
  }
  // 檢查獎勵
  function checkReward(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(data.score >= 90) {
          resolve(`${data.name} 獲得電影票`);
        } else if (data.score >= 60 && data.score < 90) {
          resolve(`${data.name} 獲得嘉獎`);
        } else {
          reject(`您沒有獎品`)
        }
      }, 2000)
    })
  }

// async、await
const init = async function() {
    try {
        const studentA = await correctTest("小明");
        // 過一秒後才執行下段語法
        const rewardA = await checkReward(studentA);
        console.log(rewardA);
    } catch (error) {
        console.log(error);
    }
}

init();