package com.noted.controller;

import com.noted.dao.NotedCardDao;
import com.noted.model.NotedCard;
import org.springframework.stereotype.Controller;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class NotedController {

    private final NotedCardDao notedCardDao;

    public NotedController(NotedCardDao notedCardDao) {
        this.notedCardDao = notedCardDao;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "http://localhost:8080/noted/entries", method = RequestMethod.POST)
    public NotedCard createCard(@RequestBody NotedCard notedCard) { return notedCardDao.createNotedCard(notedCard); }

}
