package com.klu;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DonationController {
    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/api/donations")
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    @PostMapping("/api/donations")
    public ResponseEntity<List<Donation>> createDonations(@Valid @RequestBody List<Donation> donations) {
        try {
            donations.forEach(donation -> {
                if (donation.getDescription() == null) {
                    donation.setDescription("Donation via web app");
                }
                if (donation.getImpact() == null) {
                    donation.setImpact("Positive community impact");
                }
            });
            List<Donation> savedDonations = donationRepository.saveAll(donations);
            return ResponseEntity.ok(savedDonations);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/contact")
    public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact) {
        Contact savedContact = contactRepository.save(contact);
        return ResponseEntity.ok(savedContact);
    }
}