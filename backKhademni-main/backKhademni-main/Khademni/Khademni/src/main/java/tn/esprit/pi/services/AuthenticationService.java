package tn.esprit.pi.services;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import tn.esprit.pi.dto.requests.AuthenticationRequest;
import tn.esprit.pi.dto.requests.RegisterRequest;
import tn.esprit.pi.dto.responses.AuthenticationResponse;
import tn.esprit.pi.entities.User;

import java.io.IOException;

public interface AuthenticationService {
    public void register(RegisterRequest request) throws MessagingException;
    public AuthenticationResponse authenticate(AuthenticationRequest request) ;
    public AuthenticationResponse refreshToken(HttpServletRequest request, String refreshToken) throws IOException;

    public void logout() ;


    public String createVerifyAccountToken(User concernedUser ) ;




    public void sendVerifyAccountEmail(String email) throws  MessagingException;

    public void verifyAccount(String token) ;
}
