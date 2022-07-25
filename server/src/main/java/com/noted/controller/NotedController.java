package com.noted.controller;

import com.noted.dao.NotedCardDao;
import com.noted.model.NotedCard;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
public class NotedController {

    private final NotedCardDao notedCardDao;

    public NotedController(NotedCardDao notedCardDao) {
        this.notedCardDao = notedCardDao;
    }

    @RequestMapping(path = "noted/entries")
    public List<NotedCard> listAllCards() {
        return notedCardDao.list();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "noted/entries", method = RequestMethod.POST)
    public NotedCard createCard(@Valid @RequestBody NotedCard notedCard) { return notedCardDao.createNotedCard(notedCard); }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(path = "noted/entries/{id}", method = RequestMethod.DELETE)
    public void deleteCard(@PathVariable Long id) { notedCardDao.deleteNotedCard(id); }

}
