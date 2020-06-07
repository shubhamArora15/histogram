// Importing Histogram Library for web View
import { HistoGram } from './histogram-web/chart-web.js'
import { postObj, pageObj, postArray, pageArray } from './histogram_pattern.js';
let histogram = new HistoGram();
// Get Call for posts
let posts = histogram.getPosts().then(posts => {
    return posts
}).catch(e => {
    console.log(e);
});

// Get Call for pages
let pages = histogram.getPages().then(pages => {
    return pages
}).catch(e => {
    console.log(e);
});


Promise.all([posts, pages]).then(finalOutput => {
    let [postData, pageData] = finalOutput;

    postData.forEach(post => {
        if (post.content && post.content.rendered) {
            let count = histogram.getWordsCount(post.content.rendered);
            createRange(count, "post");
        }
        if (postData.length-1 ===  postData.indexOf(post)) {
            histogram.createPostWordCountChart(commonArray)
        }
    });
    // console.log(localPostObj)
    pageData.forEach(post => {
        if (post.content && post.content.rendered) {
            let count = histogram.getWordsCount(post.content.rendered);
            createRange(count, "page");
        }
        if (pageData.length-1 ===  pageData.indexOf(post)) {
            histogram.createPagesWordCountChart(commonArray)
        }
    });
});

let commonArray = [];
let createRange = (count, type) => {
    let iterateArray = type === 'post' ? postObj : pageObj
    commonArray = type === 'post' ? postArray : pageArray;
    iterateArray.forEach(item => {
        if ((count >= item.x && count < item.y)) {
            for (var i in commonArray) {
                if (commonArray[i][0] == (item.x + '-' + item.y)) {
                    commonArray[i][1] = commonArray[i][1] + count
                }
            }
        }
        else if (count > iterateArray[iterateArray.length - 1]['x'] && item.y == 'infinity') {
            commonArray[commonArray.length - 1][1] = commonArray[commonArray.length - 1][1] + count
        }
    });
}







