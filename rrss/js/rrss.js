document.addEventListener("DOMContentLoaded", () => {
    const LINKS = [...document.getElementsByTagName("a")].filter( e => !/index/.test(e.href) );

    LINKS.forEach( link => {
        link.addEventListener( "click", e => e.preventDefault() );
    });
});