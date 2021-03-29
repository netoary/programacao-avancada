//console.log("Estou testando")

const router = async () =>{
    const routes = [
        {path: "/", view: ()=> console.log("Dashboard")},
        {path: "/posts", view: ()=> console.log("Posts")},
        {path: "/settings", view: ()=> console.log("Settings")}
    ];

    const potentialMatches = routes.map( route =>{
        return{
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match){
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    console.log(match);

};

document.addEventListener("DOMContentLoaded", () =>{
    router();
});