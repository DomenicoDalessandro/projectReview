package domenico.dalessandro.gamesreview.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    @Size(min = 10, max = 250)
    private String review;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonIgnore
    private User owner;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    @JsonIgnore
    private Game game;
    public Review() {
    }

    public Review(Review review) {
        this.review = review.getReview();

    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
