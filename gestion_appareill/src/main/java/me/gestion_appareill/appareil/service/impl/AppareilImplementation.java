package me.gestion_appareill.appareil.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.gestion_appareill.appareil.domain.Appareil;
import me.gestion_appareill.appareil.repository.AppareilRepository;
import me.gestion_appareill.appareil.service.AppareilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class AppareilImplementation implements AppareilService {
    private final AppareilRepository appareilRepository;

    @Override
    public Appareil save(Appareil appareil) {
        log.info("save Appareil : {}",appareil);
           return this.appareilRepository.save(appareil);
    }

    @Override
    public Page<Appareil> getAll(Pageable pageable) {
        log.info("get all Appareil page {} size {}", pageable.getPageNumber(), pageable.getPageSize());
        log.info("offset {},  isUnpaged {}", pageable.getOffset(), pageable.isUnpaged());
        return this.appareilRepository.findAll(pageable);
    }

    @Override
    public Appareil update(Appareil appareil) {
        log.info("update categorie {}",appareil);
       return this.appareilRepository.save(appareil);
    }

    @Override
    public boolean delete(Long id) {
        if(this.appareilRepository.findById(id).isPresent()){
            log.info("delete Appareil {}",id);
            this.appareilRepository.delete(this.appareilRepository.findById(id).get());
            return  true;
        }
        log.error("error delete Appareil {}",id);
        return false;
    }

    @Override
    public Appareil getById(Long id) {
        return this.appareilRepository.findById(id).get();
    }

    @Override
    public Appareil switchAppareil(Long id) {
      Appareil app=  this.getById(id);
        log.info("first state {}",app.isState());
      if(app.isState()){
          app.setState(false);
      }else{
          app.setState(true);
      }
        log.info("setState Appareil id {} and {}",id,app.isState());
        this.appareilRepository.save(app);
      return app;
    }

    @Override
    public void switchAll(int i) {
        log.info("switch all app {}",i);
        List<Appareil> appareils=this.appareilRepository.findAll();
        for(Appareil a:appareils){
            switch (i){
                case 1:
                    if(!a.isState()) {
                        a.setState(true);
                        this.appareilRepository.save(a);
                    }
                    break;
                case 2:
                    if(a.isState()){
                        a.setState(false);
                        this.appareilRepository.save(a);
                    }
                    break;
                default:
                    log.info("switch all app error on index {}",i);
                    break;
            }

        }
    }

    @Override
    public Page<Appareil> status(String status) {
        List<Appareil> appareils=this.appareilRepository.findAll();
        for(Appareil a:appareils){
            switch (status){
                case "on":
                    if(!a.isState()) {
                        a.setState(true);
                        this.appareilRepository.save(a);
                    }
                    break;
                case "off":
                    if(a.isState()){
                        a.setState(false);
                        this.appareilRepository.save(a);
                    }
                    break;
                default:
                    log.info("status error on index {}",status);
                    break;
            }

        }
        return null;
    }


}
