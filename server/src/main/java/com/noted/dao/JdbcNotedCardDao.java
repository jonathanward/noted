package com.noted.dao;

import com.noted.model.NotedCard;

import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

@Component
public class JdbcNotedCardDao implements NotedCardDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcNotedCardDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<NotedCard> list() {
        List<NotedCard> cards = new ArrayList<>();
        String sql = "SELECT id, title, artist, album, url, description, body FROM noted;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()) {
            cards.add(mapRowToCard(results));
        }
        return cards;
    }

    @Override
    public NotedCard getNotedCardById(Long id) {
        NotedCard card = null;
        String sql = "SELECT id, title, artist, album, url, description, body FROM noted WHERE id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
        if (results.next()) {
            card = mapRowToCard(results);
        }
        return card;
    }

    @Override
    public NotedCard createNotedCard(NotedCard cardToSave) {
        String sql = "INSERT INTO noted (title, artist, album, url, description, body) " +
                "VALUES(?, ?, ?, ?, ?, ?) " +
                "RETURNING id;";
        Long newCardId = jdbcTemplate.queryForObject(sql, Long.class, cardToSave.getTitle(),
                cardToSave.getArtist(), cardToSave.getAlbum(), cardToSave.getUrl() ,cardToSave.getDescription(),
                cardToSave.getBody());
        return getNotedCardById(newCardId);
    }

    @Override
    public NotedCard updateNotedCard(NotedCard updatedCard) {
        String sql = "UPDATE noted " +
                "SET title = ?, artist = ?, album = ?, url = ?, description = ?, body = ? " +
                "WHERE id = ?;";
        jdbcTemplate.update(sql, updatedCard.getTitle(), updatedCard.getArtist(), updatedCard.getAlbum(),
                updatedCard.getUrl(), updatedCard.getDescription(), updatedCard.getBody(), updatedCard.getId());
        return getNotedCardById(updatedCard.getId());
    }

    @Override
    public void deleteNotedCard(Long id) {
        String sql = "DELETE from noted WHERE id = ?;";
        jdbcTemplate.update(sql, id);
    }

    private NotedCard mapRowToCard(SqlRowSet row) {
        NotedCard card = new NotedCard();
        card.setId(row.getLong("id"));
        card.setTitle(row.getString("title"));
        card.setArtist(row.getString("artist"));
        card.setAlbum(row.getString("album"));
        card.setUrl(row.getString(("url")));
        card.setDescription(row.getString("description"));
        card.setBody(row.getString("body"));
        return card;
    }

}
