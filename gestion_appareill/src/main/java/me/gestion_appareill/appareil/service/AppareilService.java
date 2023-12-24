package me.gestion_appareill.appareil.service;


import me.gestion_appareill.appareil.domain.Appareil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppareilService {
    Appareil save(Appareil appareil);
    Page<Appareil> getAll(Pageable pageable);
    Appareil update(Appareil appareil);
    boolean delete(Long id);
    Appareil getById(Long id);

    Appareil switchAppareil(Long id);

    void switchAll(int i);

    Page<Appareil> status(String status);

}
