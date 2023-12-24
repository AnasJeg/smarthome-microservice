package com.user_management.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lastName;
    private String firstName;
    private String login;
    private String  password;
    /*
    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;

     */
}
