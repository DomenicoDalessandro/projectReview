package domenico.dalessandro.gamesreview.Controller;

import domenico.dalessandro.gamesreview.Entity.Game;
import domenico.dalessandro.gamesreview.Entity.Review;
import domenico.dalessandro.gamesreview.Entity.User;
import domenico.dalessandro.gamesreview.Repository.GameRepository;
import domenico.dalessandro.gamesreview.Repository.ReviewRepository;
import domenico.dalessandro.gamesreview.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/review")
@CrossOrigin
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GameRepository gameRepository;

    @GetMapping
    public List<Review> getAllReview() {
        System.out.println(reviewRepository.findAll());
        return reviewRepository.findAll();
    }
    @GetMapping("/{id}")
    public Review getById(@PathVariable Integer id) {
        Optional<Review> result = reviewRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/{id}/review/{ed}")
    public Review createReviewByOwnerAndGame(@RequestBody Review revi, @PathVariable ("id")Integer id,@PathVariable("ed") Integer ed){
        Optional<User> result = userRepository.findById(id);
        Optional<Game> resultG=gameRepository.findById(ed);
        System.out.println(result.get());
        if(result.isEmpty()){
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND, "user with id" + id + "not found");
        } else {
            Game game= resultG.get();
            User owner = result.get();
            Review newReview = new Review(revi);
            newReview.setGame(game);
            newReview.setOwner(owner);
            return reviewRepository.save(newReview);
        }
    }
    @DeleteMapping("/{id}")
    public void deleteReviewById(@PathVariable Integer id){
        Optional<Review> result=reviewRepository.findById(id);
        if(result.isPresent()){
             reviewRepository.deleteById(id);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{id}")
    public Review putReview(@PathVariable Integer id,@RequestBody Review review){
        Optional<Review> result=reviewRepository.findById(id);
        if(result.isPresent()){
            Review oldreview=result.get();
            Review newReview=new Review(review);
            newReview.setOwner(oldreview.getOwner());
            newReview.setId(oldreview.getId());
            newReview.setGame(oldreview.getGame());
            return reviewRepository.save(newReview);

        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{id}/rev/{ed}")
    public List<Review> getReviewByUserAndGame(@PathVariable ("id")Integer id,@PathVariable("ed") Integer ed){
        Optional <User> result=userRepository.findById(id);
        Optional<Game> resultG=gameRepository.findById(ed);
        if(result.isPresent()&&resultG.isPresent()){
            List<Review> userReview=reviewRepository.findByOwnerIdAndGameId(id,ed);
            return userReview;
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
