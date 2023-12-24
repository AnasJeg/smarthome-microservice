package me.gestion_appareill.categorie.service;


import me.gestion_appareill.categorie.domain.Categorie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategorieService {
    Categorie save(Categorie categorie);
    Page<Categorie> getAll(Pageable pageable);
    Categorie update(Categorie categorie);
    boolean delete(Long id);
    Categorie getById(Long id);


}
