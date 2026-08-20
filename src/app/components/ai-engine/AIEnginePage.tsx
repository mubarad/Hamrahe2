import { AIEngineProvider } from "../../context/AIEngineContext";
import { AIEngineShell } from "./AIEngineShell";
import { ContextualAssistant } from "./ContextualAssistant";

export function AIEnginePage() {
  return (
    <AIEngineProvider>
      <AIEngineShell />
      <ContextualAssistant />
    </AIEngineProvider>
  );
}
