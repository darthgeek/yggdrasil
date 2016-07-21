package net.darthgeek.yggdrasil.security;

import org.springframework.core.annotation.Order;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

/**
 * Created by jason on 7/21/2016.
 */
@Order(0)
public class SecurityWebAppInitializer extends AbstractSecurityWebApplicationInitializer {
}
