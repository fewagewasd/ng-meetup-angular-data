package org.unterhofer.angular.data.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.unterhofer.angular.data.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    public Page<Todo> findByDoneAndTaskContaining(Boolean done, String task, Pageable pageable);
}
