package net.darthgeek.yggdrasil.data.model;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Set;

/**
 * A permission within the system.
 *
 * @author jason
 */
@Entity
public class Permission implements GrantedAuthority {
  private static final String AUTH_PREFIX = "PERM_";
  private static final long serialVersionUID = 6446410903587627750L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(unique = true, nullable = false)
  @NotBlank
  @Pattern(regexp = "[A-Z_]+")
  private String name;

  @ManyToMany(fetch = FetchType.LAZY, mappedBy = "permissions")
  private Set<Role> roles;

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof Permission)) {
      return false;
    }
    Permission other = (Permission) obj;
    if (name == null) {
      if (other.name != null) {
        return false;
      }
    } else if (!name.equals(other.name)) {
      return false;
    }
    return true;
  }

  @Override
  public String getAuthority() {
    return AUTH_PREFIX + name;
  }

  public Long getId() {
    return id;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(final Set<Role> roles) {
    this.roles = roles;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + AUTH_PREFIX.hashCode();
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    return result;
  }

  @Override
  public String toString() {
    return getAuthority();
  }
}