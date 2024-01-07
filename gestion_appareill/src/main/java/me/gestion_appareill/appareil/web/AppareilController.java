package me.gestion_appareill.appareil.web;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import me.gestion_appareill.appareil.domain.Appareil;
import me.gestion_appareill.appareil.service.AppareilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
// import jakarta.validation.Valid;

@RestController
@RequestMapping("api/appareils")
@RequiredArgsConstructor
@CrossOrigin
public class AppareilController {
    private final AppareilService appareilService;

    @PostMapping("/save")
    public ResponseEntity<Appareil> save(@RequestBody Appareil appareil){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/save").toUriString());
        return  ResponseEntity.ok(appareilService.save(appareil));
    }

    @GetMapping("/")
    public ResponseEntity<Page<Appareil>> getAll(Pageable pageable){
            return ResponseEntity.ok().body(appareilService.getAll(pageable));
    }

    @PutMapping("/update")
    public  ResponseEntity<Appareil> update(@RequestBody Appareil appareil){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/update").toUriString());
        return ResponseEntity.created(uri).body(appareilService.update(appareil));
    }

    @GetMapping("/get")
    public ResponseEntity<Appareil> getById(@PathParam(value = "id") Long id){
        return ResponseEntity.ok().body(appareilService.getById(id));
    }

    @GetMapping("/app")
    public ResponseEntity<Page<Appareil>> getOn(@PathParam(value = "value") String status){
        return ResponseEntity.ok().body(appareilService.status(status));
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@PathParam(value = "id") Long id){
        this.appareilService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/switch")
    public ResponseEntity<?> switchApp(@RequestParam(value = "id") Long id) {
        return ResponseEntity.ok(appareilService.switchAppareil(id));
    }

    @PutMapping("/switchAll")
    public void switchAllApp(@RequestParam(value = "index") int id) {
         appareilService.switchAll(id);
    }
}
