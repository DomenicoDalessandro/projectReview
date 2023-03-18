package domenico.dalessandro.gamesreview.Controller;

import domenico.dalessandro.gamesreview.Entity.AddOn;
import domenico.dalessandro.gamesreview.Entity.Game;
import domenico.dalessandro.gamesreview.Entity.Review;
import domenico.dalessandro.gamesreview.Entity.User;
import domenico.dalessandro.gamesreview.Repository.AddOnRepository;
import domenico.dalessandro.gamesreview.Repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/game/addon")
@CrossOrigin
public class AddOnController {
    @Autowired
    private AddOnRepository addOnRepository;

    @Autowired
    private GameRepository gameRepository;
    @GetMapping
    public List<AddOn> getAllAddOn(){
       return  addOnRepository.findAll();
    }
    @PostMapping("/{id}")
    public AddOn createReviewByOwnerAndGame(@RequestBody AddOn addon, @PathVariable ("id")Integer id){
        Optional<Game> result=gameRepository.findById(id);
        System.out.println(result.get());
        if(result.isEmpty()){
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND, "game with id" + id + "not found");
        } else {
            Game game= result.get();

            AddOn newAddon = new AddOn(addon);
            newAddon.setGameAd(game);

            return addOnRepository.save(newAddon);
        }
    }
    @DeleteMapping("/{id}")
    public void deleteAddonById(@PathVariable Integer id){
        addOnRepository.deleteById(id);
    }
    @PutMapping("/{id}")
    public AddOn putAddon(@PathVariable Integer id,@RequestBody AddOn addon){
        Optional<AddOn> result=addOnRepository.findById(id);
        if(result.isPresent()){
            AddOn oldAddon=result.get();
            AddOn newAddon=new AddOn(addon);
            newAddon.setId(oldAddon.getId());
            newAddon.setGameAd(oldAddon.getGameAd());

            return addOnRepository.save(newAddon);

        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
