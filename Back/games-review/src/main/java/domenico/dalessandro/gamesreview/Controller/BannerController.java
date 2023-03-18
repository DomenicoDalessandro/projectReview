package domenico.dalessandro.gamesreview.Controller;

import domenico.dalessandro.gamesreview.Entity.Banner;
import domenico.dalessandro.gamesreview.Entity.Game;
import domenico.dalessandro.gamesreview.Repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/banner")
@CrossOrigin
public class BannerController {
    @Autowired
    private BannerRepository bannerRepository;


    @GetMapping
    public List<Banner> getAll(){
        return bannerRepository.findAll();
    }
    @PostMapping
    public Banner postGenere(@RequestBody Banner gen){
        Optional<Banner> result= bannerRepository.findById(gen.getId());
        if(result.isEmpty()){
            return bannerRepository.save(gen);
        }else{
            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }
    @DeleteMapping("/{id}")
    public void deleteGenere(@PathVariable Integer id){
        Optional<Banner> result= bannerRepository.findById(id);
        if(result.isPresent()){
            bannerRepository.deleteById(id);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{id}")
    public Banner putBanner(@PathVariable Integer id,@RequestBody Banner banner){
        Optional<Banner> result =bannerRepository.findById(id);
        if(result.isPresent()){
            Banner oldbann=result.get();
            Banner newBann= new Banner(banner);
            newBann.setId(oldbann.getId());
            newBann.setGames(oldbann.getGames());
            return bannerRepository.save(newBann);
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
