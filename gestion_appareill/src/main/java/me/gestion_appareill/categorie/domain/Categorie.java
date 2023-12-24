package me.gestion_appareill.categorie.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.gestion_appareill.appareil.domain.Appareil;

import java.util.List;


@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;

    @OneToMany(mappedBy = "categorie",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Appareil> appareils;


}
