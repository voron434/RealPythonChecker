function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelectorAll(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}



const checkArticles = () => {
  waitForElm('#resultsArea .stretched-link').then((articleTitles) => {
    for (let i = 0; i < articleTitles.length; i++) {
      let title = articleTitles[i]
      console.log(title)
      fetch(title.href)
        .then((response) => response.text())
        .then((html) => html.includes('The full article is for members only.'))
        .then((flag) => {
            if (flag) { title.style.color = "grey"}
        })
    }
})}


if (window.location.host == 'realpython.com') {
  console.log('Checker: RealPython detected');
  checkArticles();
}