const expect = require("expect");

var {Users} = require("./../utils/users");

describe("Users", () => {
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Ishaan",
            room: "Room 1"
        },{
            id: "2",
            name: "Neelansh",
            room: "Room 2"
        },{
            id: "3",
            name: "Sarthak",
            room: "Room 1"
        }];
    });

    it("should add a new user", () => {
        var users = new Users();
        var user = {
            id: 123,
            name: "Ishaan",
            room: "Room 1"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users[0]).toMatchObject(user);
    });

    it("should remove user with user id", () => {
        var user = users.users[0];
        expect(users.removeUser("1")).toMatchObject(user);
        expect(users.users.length).toBe(2);
    });

    it("should not remove user with non-user id", () => {
        expect(users.removeUser("4")).toBeFalsy();;
        expect(users.users.length).toBe(3);
    });

    it("should find user with user id", () => {
        expect(users.getUser("1")).toMatchObject(users.users[0]);
    });

    it("should not find user with non-user id", () => {
        expect(users.getUser("4")).toBeFalsy();
    });

    it("should return names of same room", () => {
        var usersList = users.getUsersList("Room 1");
        expect(usersList).toEqual(["Ishaan", "Sarthak"]);
    });
});