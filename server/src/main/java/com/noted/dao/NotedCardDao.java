package com.noted.dao;

import com.noted.model.NotedCard;

import java.util.List;

public interface NotedCardDao {

    List<NotedCard> list();

    NotedCard getNotedCardById(Long id);

    NotedCard createNotedCard(NotedCard cardToSave);

    NotedCard updateNotedCard(NotedCard updatedCard);

    void deleteNotedCard(Long id);

}
