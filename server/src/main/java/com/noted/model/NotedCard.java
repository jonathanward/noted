package com.noted.model;

public class NotedCard {

    private long id;
    private String title;
    private String artist;
    private String album;
    private String description;
    private String body;

    public NotedCard() {}

    public NotedCard(long id, String title, String artist, String album, String description, String body) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.description = description;
        this.body = body;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}