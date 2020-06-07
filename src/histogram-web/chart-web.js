

class HistoGram {
    data;
    constructor() {
    }
    // Get posts using Axios's Get method
    getPosts = async () => {
        let posts = await axios.get('https://www.vdocipher.com/blog/wp-json/wp/v2/posts?per_page=100');
        let data = await posts.data;
        return data;
    }

    //  Get Pages of posts usign Axios's Get method
    getPages = async () => {
        let pages = await axios.get('https://www.vdocipher.com/blog/wp-json/wp/v2/pages?per_page=100');
        let data = await pages.data;
        return data;
    }

    // Get Word counts for POSTS / PAGES
    getWordsCount = (data) => {
        var span = document.createElement('span');
        span.innerHTML = data;
        if (!span.textContent.match(/\b\w+\b/g) || !span.innerText.match(/\b\w+\b/g)) {
            return 0
        }
        return span.textContent.match(/\b\w+\b/g).length || span.innerText.match(/\b\w+\b/g).length
    }

    // Create HISTOGRAM POST w.r.t word 
    createPostWordCountChart = (posts) => {

        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(this.drawAnnotations)
        posts.unshift(["Element", "Density", { role: "style" }]);
        google.charts.setOnLoadCallback(() =>{
            this.drawAnnotations({data:posts, id:'histogram_post', title:'Histogram Chart For POSTS'})
        })
    }


    // Create HISTOGRAM PAGE w.r.t word 
    createPagesWordCountChart = (pages) => {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        pages.unshift(["Element", "Density", { role: "style" }]);
        google.charts.setOnLoadCallback(() =>{
            this.drawAnnotations({data:pages, id:'histogram_page', title:'Histogram Chart For PAGES'})
        })
    }

    // PROCESS ANNOTATION CHART FOR POST / PAGES
    drawAnnotations(obj) {
        if(!obj){
            return
        }
        var data = google.visualization.arrayToDataTable(obj.data);
        var view = new google.visualization.DataView(data);

        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2]);

        var options = {
            title: obj.title,
            width: 1024,
            height: 400,
            bar: { groupWidth: "95%" },
            legend: { position: "none" },
        };

        var chart = new google.visualization.ColumnChart(document.getElementById(obj.id));
        chart.draw(data, options);
    }
}
export { HistoGram }