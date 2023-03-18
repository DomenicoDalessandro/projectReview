package domenico.dalessandro.gamesreview.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;
    @NotBlank
    @Size( max = 20)
    private String name;
    @NotBlank
    @Size( max = 20 )
    private String lastname;

    @NotBlank
    @Size( max = 14)
    private String username;
    @Size( max = 20)
    @NotBlank
    private String password;
    @NotBlank
    @Size( max = 25)
    @Email(message = "Email should be valid")
    private String email;
    @OneToMany(mappedBy = "owner")
    private List<Review> review;

    public User() {
    }

    public User(User user) {
        this.name = user.name;
        this.lastname = user.lastname;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
