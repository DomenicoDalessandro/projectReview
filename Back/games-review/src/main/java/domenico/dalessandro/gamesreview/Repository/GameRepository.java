package domenico.dalessandro.gamesreview.Repository;

import domenico.dalessandro.gamesreview.Entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game,Integer> {
}
