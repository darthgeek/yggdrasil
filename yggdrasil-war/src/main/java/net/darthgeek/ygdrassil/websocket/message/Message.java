package net.darthgeek.ygdrassil.websocket.message;

/**
 * Created by jason on 7/16/2016.
 */
public class Message {
  private String text;

  public Message() {
  }

  public Message(final String text) {
    this.text = text;
  }

  public String getText() {
    return text;
  }

  public void setText(final String text) {
    this.text = text;
  }

  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder();
    sb.append("Message{");
    sb.append(text);
    sb.append("}");
    return sb.toString();
  }
}
