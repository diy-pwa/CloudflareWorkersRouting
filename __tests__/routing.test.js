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