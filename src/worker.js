export default {
    fetch(req){
        let oUrl = new URL(req.url, "https://dummy");
        if(oUrl.pathname == "/"){
            return new Response(
`hello world`
            );
        }else if(oUrl.pathname.match(/^\/user\//)){
            let aMatches = oUrl.pathname.match(/^\/user\/(.*)/);
            /* aMatches with `request(app).get("/user/rich");` is:
            ```
            [
                '/user/rich',
                'rich',
                index: 0,
                input: '/user/rich',
                groups: undefined
            ]
            ```
            */
            let id = aMatches[1];
            return new Response(`hello ${id}`);
        }else{
            return new Response("unimplemented",{
                status: 500,
                statusText: "unimplemented"
            });
    
        }
    }
}