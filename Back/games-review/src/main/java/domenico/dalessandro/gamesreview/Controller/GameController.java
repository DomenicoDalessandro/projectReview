package domenico.dalessandro.gamesreview.Controller;

import domenico.dalessandro.gamesreview.Entity.*;
import domenico.dalessandro.gamesreview.Repository.AddOnRepository;
import domenico.dalessandro.gamesreview.Repository.GameRepository;
import domenico.dalessandro.gamesreview.Repository.BannerRepository;
import domenico.dalessandro.gamesreview.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/game")
@CrossOrigin
public class GameController {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private AddOnRepository addOnRepository;

    @Autowired
    private BannerRepository bannerRepository;
    @GetMapping
    public List<Game> getAllGame(){
        System.out.println(gameRepository.findAll());
        return gameRepository.findAll();}
    @PostMapping
    public Game create(@RequestBody Game game){
        Optional<Game> result = gameRepository.findById(game.getId());
        if (result.isEmpty()){
            return gameRepository.save(game);
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
}
    @GetMapping("/{id}")
    public Game getById(@PathVariable Integer id){
        Optional<Game> result = gameRepository.findById(id);
        if(result.isPresent()){
            return result.get();
        } else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        Optional<Game> result = gameRepository.findById(id);
        if (result.isPresent()){
            if(result.get().getReview().isEmpty()&&result.get().getAddon().isEmpty()&&result.get().getBanner().isEmpty()) {
                gameRepository.deleteById(id);
            }else{
                List<Review> reviewList = result.get().getReview();
                for (Review rev : reviewList){
                    reviewRepository.delete(rev);
                }
                List<AddOn> addonList = result.get().getAddon();
                for (AddOn add : addonList){
                    addOnRepository.delete(add);
                }

                    List<Banner> bannerList =result.get().getBanner();
                    for (Banner gen: bannerList) {
                        List<Game> gameList=gen.getGames();
                        gameList.remove(result.get());
                        bannerRepository.save(gen);

                }
                gameRepository.deleteById(id);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }
    @PutMapping("/{id}")
    public Game putGame(@PathVariable Integer id,@RequestBody Game game){
        Optional<Game> result=gameRepository.findById(id);
        if(result.isPresent()){
            Game oldGame=result.get();
            Game newGame=new Game(game);
            newGame.setReview(oldGame.getReview());
            newGame.setId(oldGame.getId());
            newGame.setAddon(oldGame.getAddon());
            newGame.setBanner(oldGame.getBanner());

            return gameRepository.save(newGame);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{id}/genere/{ed}")
    public Game putGenere(@PathVariable("id")Integer id,@PathVariable ("ed")Integer ed){
        Optional<Game> result=gameRepository.findById(id);//game 1
        Optional<Banner> resultG= bannerRepository.findById(ed);
        if(result.isPresent()&&resultG.isPresent()){
            if(result.get().getBanner().contains(resultG.get())){
                Game oldGame=result.get();
                Banner gen=resultG.get();
                gen.getGames().remove(oldGame);
                bannerRepository.save(gen);
                List<Banner> newList=oldGame.getBanner();
                newList.remove(resultG.get());
                oldGame.setBanner(newList);
                resultG.get().getGames().remove(oldGame);
                return gameRepository.save(oldGame);
            }else{
            Game oldGame=result.get();
            List<Banner> newList=oldGame.getBanner();
            newList.add(resultG.get());
            oldGame.setBanner(newList);
            resultG.get().getGames().add(oldGame);
            return gameRepository.save(oldGame);}
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{id}/addon")
    public List<AddOn> getAddonByGameId(@PathVariable Integer id){
        Optional<Game> result=gameRepository.findById(id);
        if(result.isPresent()){
            return result.get().getAddon();
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}

