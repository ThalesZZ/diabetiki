package com.diabetiki.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue
    @Column(updatable = false, nullable = false)
    private Long id;
    @Column(length = 30, nullable = false)
    private String name;
    @Column(nullable = false)
    private LocalDate birthDate;

    @OneToOne(mappedBy = "profile")
    private User user;

    public int age() {
        return Period.between(this.birthDate, LocalDate.now()).getYears();
    }
}
