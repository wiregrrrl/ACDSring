const DATA_FOR_WEBRING = "https://raw.githubusercontent.com/wiregrrrl/ACDSring/main/webring.json";

var $style = document.createElement('style');
$style.appendChild(document.createTextNode(style));
document.head.appendChild($style);

const template = document.createElement("template");
template.innerHTML = `
<style>
.webring {
border: 4px solid #222;
padding: 0.4rem; 

display: flex;
grid-template-columns: 1fr 4fr 1fr;
grid-gap: 1rem;

text-align: center;
background-color: rgba(0, 0, 0, 0.55);

    font: 70% Cursive, Brush Script MT;
        }
        .icon {
        font-size: 20px;
        }



a{
    color: rgba(255, 0, 132, 255);
}
p{
    color: rgba(255, 255, 255, 255);
}




</style>

<div class="webring">

<div id="copy">

</div>

</div>`;

var style = (

    'webring-css {\n'+
    'display: block;\n'+
    'max-width: 400px;\n'+
    'margin: 0.2rem auto;\n'+
    '}'
)



class WebRing extends HTMLElement {
connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // e.g. https://css-tricks.com
    const thisSite = this.getAttribute("site");

    fetch(DATA_FOR_WEBRING)
    .then((response) => response.json())
    .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
        (site) => site.url === thisSite
        );
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length) nextSiteIndex = 0;

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `
        <h1 style="font: 170% Fantasy, Copperplate; color:rgba(255, 220, 0, 1);">ACDS RING</h1>
        <p>
            <a href="${matchedSite.url}">${matchedSite.name}</a> is owned by ${matchedSite.owner}
        </p>

        <p>
            <a href="${sites[prevSiteIndex].url}">[Prev]</a>
            <a href="${sites[nextSiteIndex].url}">[Next]</a>
            <a href="${sites[randomSiteIndex].url}">[Random]</a>
            <a href="https://raw.githubusercontent.com/wiregrrrl/ACDSring/main/webring.json">[List]</a>
        </p>
        <p><a href="https://github.com/wiregrrrl/ACDSring"><img src="https://raw.githubusercontent.com/wiregrrrl/ACDSring/main/ACDS.gif"></a></p>
        `;

        this.shadowRoot
        .querySelector("#copy")
        .insertAdjacentHTML("afterbegin", cp);
    });
}

getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}

window.customElements.define("webring-css", WebRing);

