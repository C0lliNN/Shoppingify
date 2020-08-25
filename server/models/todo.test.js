const { validateTodo } = require('./todo');

describe('validateTodo should return true if', () => {
  it('title contains valid value', () => {
    const { error } = validateTodo({
      title: 'Todo Teste',
    });
    expect(error).toBeFalsy();
  });
  it('title, description contain valid values', () => {
    const { error } = validateTodo({
      title: 'Clean Bedroom',
      description: 'Clean that until tomorrow',
    });
    expect(error).toBeFalsy();
  });
  it('title, description and completed contain valid values', () => {
    const { error } = validateTodo({
      title: 'Clean Bedroom',
      description: 'Clean that until tomorrow',
      completed: true,
    });
    expect(error).toBeFalsy();
  });
});

describe('validateTodo should return false if', () => {
  it('title contains falsy values', () => {
    let error = validateTodo({
      title: '',
    }).error;
    expect(error).toBeTruthy();

    error = validateTodo({}).error;
    expect(error).toBeTruthy();

    error = validateTodo({ title: null }).error;
    expect(error).toBeTruthy();
  });
  it('the payload contains undeclared properties', () => {
    const { error } = validateTodo({
      title: 'Todo test',
      owner: 'Raphael Collin',
    });
    expect(error).toBeTruthy();
  });
});
