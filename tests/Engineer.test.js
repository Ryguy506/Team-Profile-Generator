const Engineer = require('../lib/Engineer');

describe('Engineer class', () => {
    describe('constructor', () => {
        it('creates an object with correct properties', () => {
            const engineer = new Engineer('Josh Doe', '123', 'josh@mail.com' , 'JoshDoe');

    expect(engineer.getName()).toBe('Josh Doe');
    expect(engineer.getId()).toBe('123');
    expect(engineer.getEmail()).toBe('josh@mail.com');
    expect(engineer.getGithub()).toBe('JoshDoe');
    expect(engineer.getRole()).toBe('Engineer');
    });
    });
});
