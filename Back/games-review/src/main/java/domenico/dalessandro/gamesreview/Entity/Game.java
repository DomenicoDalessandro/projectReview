package domenico.dalessandro.gamesreview.Entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    @Size(min = 3, max = 15)
    private String gameName;
    @NotBlank
    @Size(min = 3, max = 15)
    private String productHouse;

    @Min(1)
    @Max(15)
    private int nOfPlayer;

    @Min(1)
    @Max(5)
    private int difficulty;

    @Min(1)
    @Max(5)

    private int rate;
    @NotBlank
    private String imgUrl;

    private String description;
    @OneToMany(mappedBy = "game")
    private List<Review> review;
    @OneToMany(mappedBy = "gameAd")
    private List<AddOn> addon;

    @ManyToMany(mappedBy = "games")
    private List<Banner> banner;

    public Game() {
    }
    public Game(Game game) {
        this.description=game.description;
        this.rate=game.rate;
        this.gameName=game.gameName;
        this.difficulty=game.difficulty;
        this.imgUrl=game.imgUrl;
        this.productHouse=game.productHouse;
        this.nOfPlayer=game.nOfPlayer;
    }


    public List<Banner> getBanner() {
        return banner;
    }

    public void setBanner(List<Banner> banner) {
        this.banner = banner;
    }

    public List<AddOn> getAddon() {
        return addon;
    }

    public void setAddon(List<AddOn> addon) {
        this.addon = addon;
    }

    public List<Review> getReview() {
        return review;
    }

    public void setReview(List<Review> review) {
        this.review = review;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getProductHouse() {
        return productHouse;
    }

    public void setProductHouse(String productHouse) {
        this.productHouse = productHouse;
    }

    public int getnOfPlayer() {
        return nOfPlayer;
    }

    public void setnOfPlayer(int nOfPlayer) {
        this.nOfPlayer = nOfPlayer;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
