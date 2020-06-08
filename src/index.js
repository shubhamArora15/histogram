// Importing Histogram Library for web View
import { HistoGram } from './histogram-web/chart-web.js'
import { postObj, pageObj, postArray, pageArray } from './histogram_pattern.js';
let histogram = new HistoGram();

// Get Call for posts
let tempPosts = [];
let getPosts = (id) => {

    // Using concept of Memoization
    if (tempPosts.length > 0) {
        show(id);
        return
    }
    histogram.getPosts().then(posts => {
        tempPosts = posts
        iterateData(posts, id, 'post');
    }).catch(e => {
        console.log(e);
    });
}

// Get Call for pages
let tempPages = []
let getPages = (id) => {

    // Using concept of Memoization
    if (tempPages.length > 0) {
        show(id);
        return
    }
    histogram.getPages().then(pages => {
        tempPages = pages;
        iterateData(pages, id, 'page');
    }).catch(e => {
        console.log(e);
    });
}

// Iterate over main data

let iterateData = (data, id, type) => {
    data.forEach(item => {
        if (item.content && item.content.rendered) {
            // To check word count
            let count = histogram.getWordsCount(item.content.rendered);
            // To create Range of words w.r.t to data
            createRange(count, type);
        }
        if (data.length - 1 === data.indexOf(item)) {
            if (type === 'post') {
                histogram.createPostWordCountChart(commonArray);
                show(id);
            }else{
                histogram.createPagesWordCountChart(commonArray);
                show(id);
            }
        }
    });
}

// Create Range for POSTS / PAGES
let commonArray = [];
let createRange = (count, type) => {
    let iterateArray = type === 'post' ? postObj : pageObj
    commonArray = type === 'post' ? postArray : pageArray;

    iterateArray.forEach(item => {
        if ((count >= item.x && count < item.y)) {
            for (var i in commonArray) {
                if (commonArray[i][0] == (item.x + '-' + item.y)) {
                    commonArray[i][1] = commonArray[i][1] + 1
                }
            }
        }
        else if (count > iterateArray[iterateArray.length - 1]['x'] && item.y == 'infinity') {
            commonArray[commonArray.length - 1][1] = commonArray[commonArray.length - 1][1] + 1
        }
    });
}

let show = (id) => {
    document.getElementById(id).style.display = "block";
}
let hide = (id) =>{
    document.getElementById(id).style.display = "none";
}

document.getElementById("view_post").addEventListener("click", function () {
    hide('histogram_test');
    hide('histogram_page');
    getPosts('histogram_post');
});
document.getElementById("view_page").addEventListener("click", function () {
    hide('histogram_test');
    hide('histogram_post')
    getPages('histogram_page');
});
document.getElementById("view_test").addEventListener("click", function () {
    show('histogram_test');
    hide('histogram_post');
    hide('histogram_page');
});