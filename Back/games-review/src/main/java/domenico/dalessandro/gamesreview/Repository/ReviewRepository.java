package domenico.dalessandro.gamesreview.Repository;

import domenico.dalessandro.gamesreview.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Integer> {
    List<Review> findByOwnerIdAndGameId(Integer userid, Integer gameid);
}
