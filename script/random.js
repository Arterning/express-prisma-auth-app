const { Random, mock } = require("mockjs");

const getRandomTodo = () => {
  const todo = {};

  todo.title = Random.ctitle();
  todo.description = Random.csentence();
  todo.status = mock({
    "array|1": [1, 0],
  }).array;
  todo.media = Random.boolean()
    ? Random.image("200x200", "#02adea", "测试")
    : "";

  return todo;
};

const getRandomProject = (authorId) => {
  const project = {};
  project.name = Random.ctitle();
  project.description = Random.csentence();
  project.author = { connect: { id: authorId } };
  return project
};

// const todo = getRandomTodo();
// console.log(todo);

module.exports = { getRandomTodo, getRandomProject };
