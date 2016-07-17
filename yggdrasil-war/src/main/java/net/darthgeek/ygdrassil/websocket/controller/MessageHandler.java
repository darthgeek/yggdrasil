package net.darthgeek.ygdrassil.websocket.controller;

import net.darthgeek.ygdrassil.websocket.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;

/**
 * Created by jason on 7/16/2016.
 */
@Controller
public class MessageHandler {
  private static final Logger LOG = LoggerFactory.getLogger(MessageHandler.class);

  @Resource
  private SimpMessagingTemplate template;


  @MessageMapping("/hello")
  @SendTo("/topic/helloResponse")
  public Message hellowWorld(final Message msg) {
    LOG.info("Received: " + msg);
    return new Message("Hello, " + msg.getText() + "!");
  }

  @Scheduled(fixedDelay = 5000L)
  public void genMessage() {
    this.template.convertAndSend("/topic/messages", new Message("Message " + System.currentTimeMillis()));
  }
}
