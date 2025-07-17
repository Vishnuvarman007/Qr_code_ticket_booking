package com.example.ticketbooking.controller;

import com.example.ticketbooking.model.Ticket;
import com.example.ticketbooking.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    // 1. Get all tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // 2. Book a ticket
    @PostMapping
    public Ticket bookTicket(@RequestBody Ticket ticket) {
        ticket.setTicketId(UUID.randomUUID().toString());
        ticket.setScanned(false);
        return ticketRepository.save(ticket);
    }

    // 3. Get ticket by ID
    @GetMapping("/{ticketId}")
    public Ticket getTicketByTicketId(@PathVariable String ticketId) {
        return ticketRepository.findByTicketId(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found: " + ticketId));
    }

    // 4. Verify ticket
    @GetMapping("/verify/{ticketId}")
    public ResponseEntity<String> verifyTicket(@PathVariable String ticketId) {
        return ticketRepository.findByTicketId(ticketId)
                .map(ticket -> {
                    if (ticket.isScanned()) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body("⚠️ Ticket already scanned");
                    } else {
                        ticket.setScanned(true);
                        ticketRepository.save(ticket);
                        return ResponseEntity.ok("✅ Ticket verified successfully");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("❌ Invalid Ticket"));
    }

    // ✅ PATCH endpoint to mark scanned
    @PatchMapping("/{ticketId}/scan")
    public ResponseEntity<Ticket> markTicketAsScanned(@PathVariable String ticketId) {
        return ticketRepository.findByTicketId(ticketId)
                .map(ticket -> {
                    if (ticket.isScanned()) {
                        return ResponseEntity.status(HttpStatus.CONFLICT).body(ticket);
                    }
                    ticket.setScanned(true);
                    ticketRepository.save(ticket);
                    return ResponseEntity.ok(ticket);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
