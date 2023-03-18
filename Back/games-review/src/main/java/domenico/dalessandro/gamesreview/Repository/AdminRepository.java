package domenico.dalessandro.gamesreview.Repository;

import domenico.dalessandro.gamesreview.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}
