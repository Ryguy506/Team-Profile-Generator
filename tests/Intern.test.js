const Intern = require('../lib/Intern');

describe('Intern class', () => {
    describe('constructor', () => {
        it('creates an object with correct properties', () => {
            const intern = new Intern('Jane Doe', '123', 'jane@mail.com', 'University of Test');

    expect(intern.getName()).toBe('Jane Doe');
    expect(intern.getId()).toBe('123');
    expect(intern.getEmail()).toBe('jane@mail.com');
    expect(intern.getSchool()).toBe('University of Test');
    expect(intern.getRole()).toBe('Intern');
    });
    });
});

