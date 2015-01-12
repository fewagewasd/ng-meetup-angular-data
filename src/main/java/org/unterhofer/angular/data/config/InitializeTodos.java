package org.unterhofer.angular.data.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.unterhofer.angular.data.model.Todo;
import org.unterhofer.angular.data.repository.TodoRepository;

import javax.annotation.PostConstruct;

@Configuration // mark this to automatically run the class once on startup
public class InitializeTodos {
    @Autowired
    private TodoRepository todoRepository;

    @PostConstruct
    public void initializeTodos() {
        todoRepository.save(new Todo(false, "Buy Milk"));
        todoRepository.save(new Todo(false, "Rent a DVD"));
        todoRepository.save(new Todo(false, "Prepare Talk"));
        todoRepository.save(new Todo(true, "Wake Up"));
    }
}
