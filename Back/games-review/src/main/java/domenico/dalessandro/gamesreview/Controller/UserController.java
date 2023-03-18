package domenico.dalessandro.gamesreview.Controller;

import domenico.dalessandro.gamesreview.Entity.Review;
import domenico.dalessandro.gamesreview.Entity.User;
import domenico.dalessandro.gamesreview.Repository.ReviewRepository;
import domenico.dalessandro.gamesreview.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping
    public List<User> getAllUsers(){
        System.out.println(userRepository.findAll());
        return userRepository.findAll();}
    @PostMapping
    public User create(@RequestBody User user){
        Optional<User> result = userRepository.findById(user.getId());
        if (result.isEmpty()){
            return userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }
    @GetMapping("/{id}")
    public User getById(@PathVariable Integer id){
        Optional<User> result = userRepository.findById(id);
        if(result.isPresent()){
            return result.get();
        } else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        Optional<User> result = userRepository.findById(id);
        if (result.isPresent()){
            if(result.get().getReview().isEmpty()) {
                userRepository.deleteById(id);
            }else{
                List<Review> reviewList = result.get().getReview();
                for (Review rev : reviewList){
                    rev.setOwner(null);
                }
                userRepository.deleteById(id);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }
    @PutMapping("/{id}")
    public User putUser(@PathVariable Integer id,@RequestBody User user){
        Optional<User> result=userRepository.findById(id);
        if(result.isPresent()){
            User oldUser=result.get();
            User newUser=new User(user);
            newUser.setId(oldUser.getId());
            newUser.setReview(oldUser.getReview());
            return userRepository.save(newUser);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{id}/review")
    public List<Review> getReviewByUserId(@PathVariable Integer id){
        Optional <User> result=userRepository.findById(id);
        if(result.isPresent()){
            return result.get().getReview();
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
