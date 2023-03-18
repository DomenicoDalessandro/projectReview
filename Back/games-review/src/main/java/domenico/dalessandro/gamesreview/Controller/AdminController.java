package domenico.dalessandro.gamesreview.Controller;

import domenico.dalessandro.gamesreview.Entity.AddOn;
import domenico.dalessandro.gamesreview.Entity.Admin;
import domenico.dalessandro.gamesreview.Entity.User;
import domenico.dalessandro.gamesreview.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;


    @GetMapping
    public Admin getAdmin (){
        return adminRepository.findById(1).get();
    }
    @PutMapping
    public Admin postAdmin(@RequestBody Admin admin){
        Admin temp= new Admin();
        temp.setPassword(admin.getPassword());
        temp.setId(1);
        return adminRepository.save(temp);
    }


}
