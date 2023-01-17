const Employee = require("../lib/Employee");

describe('Employee class', () => {
    describe('constructor', () => {
        it('creates an object with correct properties', () => {
            const employee = new Employee('John Doe', '123', 'john@email.com');

    expect(employee.getName()).toBe('John Doe');
    expect(employee.getId()).toBe('123');
    expect(employee.getEmail()).toBe('john@email.com');
    expect(employee.getRole()).toBe('Employee');
        });
        });
    });





