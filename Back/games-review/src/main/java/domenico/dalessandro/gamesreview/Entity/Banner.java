package domenico.dalessandro.gamesreview.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String name;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "genere_games",joinColumns=
            {@JoinColumn(name = "genere_id")}, inverseJoinColumns =
            {@JoinColumn(name = "game_id")}) // il primo dove ci troviamo il secondo dove andiamo)
    private List<Game> games;

    public Banner() {
    }
    public Banner(Banner gen) {
        this.name=gen.getName();
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

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }
}
