package me.gestion_appareill.appareil.repository;


import me.gestion_appareill.appareil.domain.Appareil;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AppareilRepository extends JpaRepository<Appareil,Long> {

}
