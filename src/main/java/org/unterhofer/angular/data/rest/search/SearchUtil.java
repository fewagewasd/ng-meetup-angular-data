package org.unterhofer.angular.data.rest.search;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public class SearchUtil {
    public static Pageable toPageable(TodoSearchRequest searchRequest) {
        return new PageRequest(
                Optional.ofNullable(searchRequest.start).orElse(0),
                Optional.ofNullable(searchRequest.size).orElse(10));
    }
}
