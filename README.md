# Cloudflare worker "routing" tdd example

TL;DR

```javascript

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

```
The part for getting the 2nd part of the path could maybe use some explanation. The `(.*)` part of the regular expression returns that part of the matched string in the first array element for the 1st occurence and in succeeding array elements for multiple occurences. For instance to get /user/rich/hildred you would use the pattern `(.*)\/(.*)`.

If you made it here you might be interested in the __tests__

```javascript

import { describe, it, expect } from 'vitest';
import createApp from '../src/ExpressApp.js';
import request from 'supertest';

describe("worker with routing", ()=>{
    it("routes /", async ()=>{
        const app = createApp();
        const rc = await request(app).get("/");
        expect(rc.status).toBe(200);
    });
    it("routes /user/rich", async ()=>{
        const app = createApp();
        const rc = await request(app).get("/user/rich");
        expect(rc.status).toBe(200);
    });

});

```

This is also an example of testing a cloudflare worker with supertest.