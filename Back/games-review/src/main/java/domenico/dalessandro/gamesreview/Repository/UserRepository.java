package domenico.dalessandro.gamesreview.Repository;


import domenico.dalessandro.gamesreview.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
