//input box id="search"
const search = document.getElementById('search');
//result div id="results"
const results = document.getElementById('results');


//function fetches data, takes an input, filters through data, finds matching data, turns matches into html readable string

//fetching data
const mySongSearch = async searchText => {
    const hold = await fetch("data/data.json");
    const data = await hold.json();
    
    //filters through data to find matches
    let matches = data.filter(elem => {
        const regex = new RegExp(`${searchText}`, 'gi')
        return elem.title.match(regex)
    })

    //if input box is empty, empties out the results section
    if(searchText.length === 0){
        matches = []
        results.innerHTML = ''
    }
    
    //turns matches array into html readable string
    const goHTML = matches => {
        if(matches.length > 0){
            const correct = matches.map(elem => `
            <li class="content">
                <div onclick=show(this)>
                    <div class="single main-results">
                        <h4>
                            ${elem.title}
                        </h4>
                        <h4>
                            ${elem.artist}
                        </h4>
                        <h4>
                            ${elem.anime}
                        </h4>
                    </div>
                </div>
                <div class="wrapper wrapper-hidden" id="wrapper">
                    <p class="p1">
                        annid: ${elem.annid}
                    </p>
                    <p class="p2">
                        type: ${elem.type}
                    </p>
                    <a href=${elem.mp3} class="a1">
                        ${elem.mp3}
                    </a>
                    <a href=${elem[720]} class="a2">
                        ${elem[720]}
                    </a>
                    <a href=${elem[480]} class="a3">
                        ${elem[480]}
                    </a>
                </div>
            </li>
            `).join('')
            results.innerHTML = correct
        }
    }

    //calls html conversion function
    goHTML(matches)
}

//upon every change in input, runs through the song searching function
search.addEventListener('input', () => mySongSearch(search.value))