package org.unterhofer.angular.data.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.unterhofer.angular.data.model.Todo;
import org.unterhofer.angular.data.repository.TodoRepository;
import org.unterhofer.angular.data.rest.search.SearchUtil;
import org.unterhofer.angular.data.rest.search.TodoSearchRequest;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoRepository todoRepository;

    @Autowired
    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional(readOnly = true)
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Page<Todo> find(TodoSearchRequest search) {
        if(search.done != null || search.task != null) {
            return todoRepository.findByDoneAndTaskContaining(search.done, search.task, SearchUtil.toPageable(search));
        } else {
            return todoRepository.findAll(SearchUtil.toPageable(search));
        }
    }

    @Transactional(readOnly = true)
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public Todo get(@PathVariable Long id) {
        return todoRepository.findOne(id);
    }

    @Transactional
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Todo create(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @Transactional
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Todo update(@PathVariable Long id, @RequestBody Todo todo) {
        Todo persistent = todoRepository.findOne(id);
        persistent.setDone(todo.isDone());
        persistent.setTask(todo.getTask());
        return todoRepository.save(persistent);
    }

    @Transactional
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        todoRepository.delete(id);
    }
}
