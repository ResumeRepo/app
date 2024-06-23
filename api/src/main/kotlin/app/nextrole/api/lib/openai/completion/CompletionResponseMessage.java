package app.nextrole.api.lib.openai.completion;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import net.functionhub.api.dto.GPTFunctionCall;

/**
 * @author Biz Melesse created on 6/13/23
 */
@Data
public class CompletionResponseMessage {
  private String role;
  private String content;

  @JsonProperty("function_call")
  GPTFunctionCall functionCall;
}
