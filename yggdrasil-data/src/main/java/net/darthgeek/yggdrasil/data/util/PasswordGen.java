package net.darthgeek.yggdrasil.data.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Generates a password hash for testing purposes.
 *
 * @author jason
 */
public class PasswordGen {
  private static void genPasswordHash(final String password) {
    final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    final String hashedPassword = encoder.encode(password);
    System.out.println(String.format(password + ": " + hashedPassword));
  }

  public static void main(final String[] args) {
    System.out.println(String.format("Generating %d passwords:", args.length));
    for (final String arg : args) {
      genPasswordHash(arg);
    }
  }
}
