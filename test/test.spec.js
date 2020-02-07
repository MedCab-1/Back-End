const request = require('supertest');
const server = require ('../api/server.js');

describe("user router test", () => {
    describe("registering new user", () => {
        it("returns 201 if new user is registerd", async() => {
            const res = await request(server)
            .post("/api/user/register")
            .send({
                username: Date.now(),
                password: "test"
            })
            expect(res.status).toBe(201)
        });
        
        it("Error if creating a new user without credentials", async () => {
            const res = await request(server)
            .post("/api/user/register")
            // .send({
            //     username: Date.now(),
            //     password: "test"
            // })
            expect(res.status).toBe(500)
        })
    })

    describe("Logging in with a registered account", () => {
        it("returns 200 if a registerd user can log in", async () =>{
            const res = await request(server)
            .post ("/api/user/login")
            .send({
                username: "test",
                password: "test"
            })
            expect(res.status).toBe(200);
        })

        it("Gives an error if user logs in with incorrect credentials", async () => {
            const res = await request(server)
            .post("/api/user/login")
            .send({
                username: "LyerLyer",
                password: "PantsOnFire"
            })
            expect(res.status).toBe(401)
        })
    })
})