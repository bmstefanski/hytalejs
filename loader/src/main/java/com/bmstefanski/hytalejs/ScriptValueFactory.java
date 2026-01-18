package com.bmstefanski.hytalejs;

import org.graalvm.polyglot.Value;
import com.caoccao.javet.values.V8Value;

public final class ScriptValueFactory {
  private ScriptValueFactory() {}

  public static ScriptValue from(Object raw) {
    if (raw == null) {
      return null;
    }
    if (raw instanceof ScriptValue scriptValue) {
      return scriptValue;
    }
    if (raw instanceof Value value) {
      return new GraalScriptValue(value);
    }
    if (raw instanceof V8Value v8Value) {
      return new JavetScriptValue(v8Value);
    }
    return null;
  }
}
