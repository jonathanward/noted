package com.noted.dao;

import com.noted.model.NotedCard;

import java.util.List;

public interface NotedCardDao {

    List<NotedCard> list();

    NotedCard getNotedCardById(long id);

    NotedCard createNotedCard(NotedCard cardToSave);

    NotedCard updateNotedCard(NotedCard updatedCard);

    void deleteNotedCard(long id);

}
