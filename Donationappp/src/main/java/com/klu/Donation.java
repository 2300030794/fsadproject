package com.klu;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull
    private String type;

    private String description;

    @Column(nullable = false)
    @NotNull
    private int quantity;

    @Column(name = "total_amount", nullable = false)
    @NotNull
    private BigDecimal totalAmount;

    @Column(name = "donation_date", nullable = false)
    @NotNull
    @Temporal(TemporalType.DATE)
    private Date donationDate;

    private String impact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // Default constructor for JPA
    public Donation() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public Date getDonationDate() { return donationDate; }
    public void setDonationDate(Date donationDate) { this.donationDate = donationDate; }
    public String getImpact() { return impact; }
    public void setImpact(String impact) { this.impact = impact; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}