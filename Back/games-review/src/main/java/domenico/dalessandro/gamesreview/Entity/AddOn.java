package domenico.dalessandro.gamesreview.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class AddOn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String name;

    private String bonus;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    @JsonIgnore
    private Game gameAd;

    public AddOn() {
    }
    public AddOn(AddOn e) {
        this.bonus=e.bonus;
        this.name=e.name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBonus() {
        return bonus;
    }

    public void setBonus(String bonus) {
        this.bonus = bonus;
    }

    public Game getGameAd() {
        return gameAd;
    }

    public void setGameAd(Game gameAd) {
        this.gameAd = gameAd;
    }
}
