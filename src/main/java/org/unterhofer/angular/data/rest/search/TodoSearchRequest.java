package org.unterhofer.angular.data.rest.search;

import lombok.Data;

@Data
public class TodoSearchRequest {
    public Boolean done;
    public String task;
    public Integer start;
    public Integer size;
}
