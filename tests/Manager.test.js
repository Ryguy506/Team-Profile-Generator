const Manager = require("../lib/Manager");

describe("Manager class", () => {
    describe("constructor", () => {
        it("creates an object with correct properties", () => {
            const manager = new Manager("James Doe", "123", "james@mail.com", "146");

            expect(manager.getName()).toBe("James Doe");
            expect(manager.getId()).toBe("123");
            expect(manager.getEmail()).toBe("james@mail.com")
            expect(manager.getOfficeNumber()).toBe("146");
            expect(manager.getRole()).toBe("Manager");
        });
    });
});
